// Lineup Fanta matchday snapshot runtime.
const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");
const { parseMatchdayHtml } = require("./matchday-parser.cjs");
const { extractSeason, normalizeSeason } = require("./season.cjs");
const {
  RUNTIME_PREFIX,
  blobAuthOptions,
  normalizeLeagueId,
  useLocalRuntime
} = require("./runtime-data.cjs");
const { parseLeagueCsv, normalizeToken, splitLine } = require("../js/csv-parser.js");

const SNAPSHOT_VERSION = 1;
const LOCAL_RUNTIME_DIR = path.join(process.cwd(), ".lineup-runtime");
let blobSdkPromise = null;

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeDay(value) {
  const day = Number(value);
  if (!Number.isInteger(day) || day <= 0) throw new Error("Giornata non valida");
  return day;
}

function getBlobSdk() {
  if (!blobSdkPromise) blobSdkPromise = import("@vercel/blob");
  return blobSdkPromise;
}

function snapshotPathname(leagueId, season, day) {
  const league = normalizeLeagueId(leagueId);
  const normalizedSeason = normalizeSeason(season);
  if (!normalizedSeason) throw new Error("Stagione non valida");
  return `${RUNTIME_PREFIX}/matchdays/${league}/${normalizedSeason}/${normalizeDay(day)}.json`;
}

function pointerPathname(leagueId, day) {
  return `${RUNTIME_PREFIX}/matchdays/${normalizeLeagueId(leagueId)}/current/${normalizeDay(day)}.json`;
}

function localPathFor(pathname) {
  const relative = String(pathname).replace(new RegExp(`^${RUNTIME_PREFIX}/`), "");
  return path.join(LOCAL_RUNTIME_DIR, ...relative.split("/"));
}

async function streamToText(stream) {
  if (!stream) return "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

async function readStoredJson(pathname) {
  if (useLocalRuntime()) {
    try {
      return JSON.parse(await fs.readFile(localPathFor(pathname), "utf8"));
    } catch (error) {
      if (error?.code === "ENOENT") return null;
      throw error;
    }
  }
  const { get } = await getBlobSdk();
  try {
    const result = await get(pathname, {
      access: "public",
      useCache: false,
      ...blobAuthOptions()
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return JSON.parse(await streamToText(result.stream));
  } catch (error) {
    if (/not found|404/i.test(String(error?.message || ""))) return null;
    throw error;
  }
}

async function writeStoredJson(pathname, value) {
  const body = JSON.stringify(value);
  if (useLocalRuntime()) {
    const filePath = localPathFor(pathname);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, `${body}\n`, "utf8");
    return { source: "local", pathname };
  }
  const { put } = await getBlobSdk();
  const blob = await put(pathname, body, {
    access: "public",
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
    addRandomSuffix: false,
    allowOverwrite: true,
    ...blobAuthOptions()
  });
  return { source: "blob", pathname: blob.pathname || pathname };
}

function sha256(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function keyText(value) {
  return normalizeToken(cleanText(value)).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x";
}

function sourceFingerprint(parsed, sourceUrl) {
  return sha256({
    sourceUrl,
    title: parsed?.title || "",
    fantasyMatchdayNumber: parsed?.fantasyMatchdayNumber || null,
    matches: parsed?.matches || []
  });
}

function countParsed(parsed) {
  let players = 0;
  for (const match of parsed?.matches || []) {
    for (const team of [match?.home, match?.away]) {
      players += Array.isArray(team?.starters) ? team.starters.length : 0;
      players += Array.isArray(team?.bench) ? team.bench.length : 0;
    }
  }
  return { matches: Array.isArray(parsed?.matches) ? parsed.matches.length : 0, players };
}

function validateParsed(parsed, day, previousSnapshot) {
  const expectedDay = normalizeDay(day);
  const stats = countParsed(parsed);
  if (!stats.matches) throw new Error("Il documento non contiene partite riconoscibili");
  if (parsed?.fantasyMatchdayNumber && Number(parsed.fantasyMatchdayNumber) !== expectedDay) {
    throw new Error(`Il documento sembra appartenere alla giornata ${parsed.fantasyMatchdayNumber}, non alla ${expectedDay}`);
  }
  for (const [index, match] of (parsed.matches || []).entries()) {
    if (!cleanText(match?.homeTeam) || !cleanText(match?.awayTeam)) {
      throw new Error(`Partita ${index + 1} senza entrambe le fantasquadre`);
    }
  }
  const previousStats = previousSnapshot?.stats || countParsed(previousSnapshot?.parsed);
  if (previousStats.matches >= 4 && stats.matches < Math.ceil(previousStats.matches * 0.5)) {
    throw new Error(`Parsing sospetto: ${stats.matches} partite invece delle precedenti ${previousStats.matches}`);
  }
  if (previousStats.players >= 20 && stats.players < Math.floor(previousStats.players * 0.35)) {
    throw new Error(`Parsing sospetto: ${stats.players} giocatori invece dei precedenti ${previousStats.players}`);
  }
  return stats;
}

function configBlockForLeague(source, leagueId) {
  const marker = `${leagueId}: Object.freeze({`;
  const start = source.indexOf(marker);
  if (start < 0) return "";
  const nextFp = source.indexOf("fp: Object.freeze({", start + marker.length);
  const nextPd = source.indexOf("pd: Object.freeze({", start + marker.length);
  const candidates = [nextFp, nextPd].filter((value) => value > start);
  const end = candidates.length ? Math.min(...candidates) : source.length;
  return source.slice(start, end);
}

async function readListoneUrl(leagueId) {
  const source = await fs.readFile(path.join(process.cwd(), "js", "config.js"), "utf8");
  const block = configBlockForLeague(source, normalizeLeagueId(leagueId));
  const match = block.match(/csvUrl\s*:\s*["']([^"']+)["']/);
  if (!match) throw new Error("URL del listone non trovato in js/config.js");
  return match[1];
}

async function fetchText(url, userAgent = "Lineup-Fanta/1.0") {
  const separator = url.includes("?") ? "&" : "?";
  const response = await fetch(`${url}${separator}v=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      "Pragma": "no-cache",
      "User-Agent": userAgent
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

async function loadListone(leagueId) {
  const url = await readListoneUrl(leagueId);
  const parsed = parseLeagueCsv(await fetchText(url));
  return Array.isArray(parsed?.assets) ? parsed.assets : [];
}

async function readCalendarSeasonHint(leagueId, day) {
  const league = normalizeLeagueId(leagueId);
  const fantasyMatchdayNumber = normalizeDay(day);
  const dataDirectory = path.join(process.cwd(), "data", league);

  try {
    const metadata = JSON.parse(
      await fs.readFile(path.join(dataDirectory, "calendario.meta.json"), "utf8")
    );
    const perMatchday = normalizeSeason(
      metadata?.matchdays?.[String(fantasyMatchdayNumber)]
    );
    const calendarSeason = normalizeSeason(metadata?.season);
    return perMatchday || calendarSeason;
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }

  // Compatibility fallback for a temporary/local CSV that still contains a
  // season column. The public CSV generated by the importer no longer does.
  try {
    const text = await fs.readFile(path.join(dataDirectory, "calendario.csv"), "utf8");
    const lines = text.split(/\r?\n/).filter((line) => line.trim());
    const headerIndex = lines.findIndex((line) =>
      splitLine(line).map(cleanText).includes("fantasy_matchday_number")
    );
    if (headerIndex < 0) return null;
    const header = splitLine(lines[headerIndex]).map(cleanText);
    const dayIndex = header.indexOf("fantasy_matchday_number");
    const seasonIndex = header.indexOf("season");
    if (dayIndex < 0 || seasonIndex < 0) return null;
    for (const line of lines.slice(headerIndex + 1)) {
      const row = splitLine(line);
      if (Number(row[dayIndex]) !== fantasyMatchdayNumber) continue;
      const season = normalizeSeason(row[seasonIndex]);
      if (season) return season;
    }
    return null;
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}
function assetAliases(asset) {
  const values = [asset.displayName, asset.docsName, asset.assetCode];
  if (Array.isArray(asset.goalkeeperParts)) values.push(...asset.goalkeeperParts);
  return [...new Set(values.map(cleanText).filter(Boolean))];
}

function ownerMatches(asset, team) {
  const wanted = new Set([team?.team, team?.alias].map(keyText).filter(Boolean));
  return wanted.has(keyText(asset?.ownerTag));
}

function nameTokens(value) {
  return normalizeToken(cleanText(value)).split(/[_\s]+/).filter(Boolean);
}

function scoreAlias(rawName, alias) {
  const query = normalizeToken(cleanText(rawName));
  const candidate = normalizeToken(cleanText(alias));
  if (!query || !candidate) return 0;
  if (query === candidate) return 1;
  const q = nameTokens(query);
  const c = nameTokens(candidate);
  if (!q.length || !c.length) return 0;
  const qLast = q[q.length - 1];
  const cLast = c[c.length - 1];
  if (qLast === cLast && q.length >= 2 && c.length >= 2 && q[0][0] === c[0][0]) return 0.97;
  if (qLast === cLast && (q.length === 1 || c.length === 1)) return 0.91;
  if (candidate.endsWith(` ${query}`) || query.endsWith(` ${candidate}`)) return 0.90;
  return 0;
}

function resolveIdentity(rawName, team, assets) {
  const ownerAssets = (assets || []).filter((asset) => asset?.active !== false && ownerMatches(asset, team));
  const ranked = [];
  for (const asset of ownerAssets) {
    let score = 0;
    for (const alias of assetAliases(asset)) score = Math.max(score, scoreAlias(rawName, alias));
    if (score > 0) ranked.push({ asset, score });
  }
  ranked.sort((left, right) => right.score - left.score);
  if (!ranked.length || ranked[0].score < 0.91) return null;
  if (ranked[1] && ranked[1].score === ranked[0].score) return null;
  const { asset, score } = ranked[0];
  const role = cleanText(asset.role).toUpperCase();
  return {
    matched: true,
    displayName: cleanText(asset.displayName || rawName),
    role: ["P", "D", "C", "A"].includes(role) ? role : "",
    realTeam: cleanText(asset.realTeam),
    assetCode: cleanText(asset.assetCode),
    confidence: score,
    source: "listone"
  };
}

function defaultIdentity(rawName) {
  return {
    matched: false,
    displayName: cleanText(rawName),
    role: "",
    realTeam: "",
    assetCode: "",
    confidence: 0,
    source: "unresolved"
  };
}

function collectPreviousIdentities(snapshot) {
  const byKey = new Map();
  const byTeamAndName = new Map();
  for (const match of snapshot?.parsed?.matches || []) {
    for (const side of ["home", "away"]) {
      const team = match?.[side];
      for (const section of ["starters", "bench"]) {
        for (const player of team?.[section] || []) {
          const fallbackKey = `${keyText(team?.team)}|${keyText(player?.name || player?.raw)}`;
          const entry = {
            identity: player?.identity,
            identityKey: player?.identityKey || fallbackKey
          };
          if (player?.snapshotKey && player?.identity) byKey.set(player.snapshotKey, entry);
          if (player?.identity) byTeamAndName.set(fallbackKey, entry);
          if (player?.replacement?.identity) {
            const replacementFallbackKey = `${keyText(team?.team)}|${keyText(player.replacement.name)}`;
            const replacementEntry = {
              identity: player.replacement.identity,
              identityKey: player.replacement.identityKey || replacementFallbackKey
            };
            if (player.replacement.snapshotKey) byKey.set(player.replacement.snapshotKey, replacementEntry);
            byTeamAndName.set(replacementFallbackKey, replacementEntry);
          }
        }
      }
    }
  }
  return { byKey, byTeamAndName };
}

function clone(value) {
  return structuredClone(value);
}

function enrichParsed(parsed, previousSnapshot, assets) {
  const output = clone(parsed);
  const previous = collectPreviousIdentities(previousSnapshot);
  for (const match of output.matches || []) {
    const matchKey = `${keyText(match.homeTeam)}--${keyText(match.awayTeam)}`;
    for (const side of ["home", "away"]) {
      const team = match[side];
      for (const section of ["starters", "bench"]) {
        const occurrences = new Map();
        for (const player of team?.[section] || []) {
          const rawName = cleanText(player?.name || player?.raw);
          const base = keyText(rawName);
          const occurrence = (occurrences.get(base) || 0) + 1;
          occurrences.set(base, occurrence);
          player.snapshotKey = `${matchKey}|${side}|${section}|${base}|${occurrence}`;
          const fallbackKey = `${keyText(team?.team)}|${base}`;
          const prior = previous.byKey.get(player.snapshotKey) || previous.byTeamAndName.get(fallbackKey);
          player.identityKey = prior?.identityKey || fallbackKey;
          player.identity = prior?.identity || resolveIdentity(rawName, team, assets) || defaultIdentity(rawName);
          if (player.replacement) {
            const replacementName = cleanText(player.replacement.name);
            const replacementFallbackKey = `${keyText(team?.team)}|${keyText(replacementName)}`;
            player.replacement.snapshotKey = `${player.snapshotKey}|replacement|${keyText(replacementName)}`;
            const replacementPrior = previous.byKey.get(player.replacement.snapshotKey)
              || previous.byTeamAndName.get(replacementFallbackKey);
            player.replacement.identityKey = replacementPrior?.identityKey || replacementFallbackKey;
            player.replacement.identity = replacementPrior?.identity
              || resolveIdentity(replacementName, team, assets)
              || defaultIdentity(replacementName);
          }
        }
      }
    }
  }
  return output;
}

function normalizeOverride(value) {
  if (!isRecord(value)) return null;
  const result = {};
  for (const field of ["displayName", "role", "realTeam", "assetCode"]) {
    if (Object.prototype.hasOwnProperty.call(value, field)) result[field] = cleanText(value[field]);
  }
  if (result.role) result.role = result.role.toUpperCase();
  return Object.keys(result).length ? result : null;
}

function normalizeOverrides(value) {
  const output = {};
  if (!isRecord(value)) return output;
  for (const [key, rawOverride] of Object.entries(value)) {
    const normalized = normalizeOverride(rawOverride);
    if (key && normalized) output[key] = normalized;
  }
  return output;
}

function applyIdentityOverride(identity, override) {
  if (!override) return identity;
  return {
    ...identity,
    ...override,
    matched: Boolean(override.displayName || override.role || override.realTeam || identity?.matched),
    source: "manual",
    confidence: 1
  };
}

function effectiveParsed(snapshot) {
  const parsed = clone(snapshot?.parsed || { matches: [] });
  const overrides = normalizeOverrides(snapshot?.overrides);
  for (const match of parsed.matches || []) {
    for (const side of ["home", "away"]) {
      const team = match?.[side];
      for (const section of ["starters", "bench"]) {
        for (const player of team?.[section] || []) {
          player.identity = applyIdentityOverride(
            player.identity || defaultIdentity(player.name || player.raw),
            overrides[player.identityKey || player.snapshotKey]
          );
          if (player.replacement) {
            player.replacement.identity = applyIdentityOverride(
              player.replacement.identity || defaultIdentity(player.replacement.name),
              overrides[player.replacement.identityKey || player.replacement.snapshotKey]
            );
          }
        }
      }
    }
  }
  return parsed;
}

function identityStats(parsed) {
  let players = 0;
  let resolved = 0;
  for (const match of parsed?.matches || []) {
    for (const side of ["home", "away"]) {
      const team = match?.[side];
      for (const section of ["starters", "bench"]) {
        for (const player of team?.[section] || []) {
          players += 1;
          if (player?.identity?.matched && ["P", "D", "C", "A"].includes(player?.identity?.role)) resolved += 1;
        }
      }
    }
  }
  return {
    matches: Array.isArray(parsed?.matches) ? parsed.matches.length : 0,
    players,
    resolved,
    unresolved: Math.max(0, players - resolved)
  };
}

async function readCurrentMatchdaySnapshot(leagueId, day) {
  const pointer = await readStoredJson(pointerPathname(leagueId, day));
  if (!pointer?.season) return null;
  return readStoredJson(snapshotPathname(leagueId, pointer.season, day));
}

async function writeSnapshot(snapshot) {
  const pathname = snapshotPathname(snapshot.leagueId, snapshot.season, snapshot.fantasyMatchdayNumber);
  const result = await writeStoredJson(pathname, snapshot);
  const pointerPath = pointerPathname(snapshot.leagueId, snapshot.fantasyMatchdayNumber);
  const existingPointer = await readStoredJson(pointerPath);
  if (existingPointer?.season !== snapshot.season || existingPointer?.pathname !== pathname) {
    await writeStoredJson(pointerPath, {
      version: 1,
      leagueId: snapshot.leagueId,
      fantasyMatchdayNumber: snapshot.fantasyMatchdayNumber,
      season: snapshot.season,
      pathname,
      updatedAt: snapshot.syncedAt
    });
  }
  return result;
}

async function syncMatchdaySnapshot({ leagueId, day, sourceUrl, seasonHint = "" }) {
  const league = normalizeLeagueId(leagueId);
  const fantasyMatchdayNumber = normalizeDay(day);
  const url = cleanText(sourceUrl);
  if (!/^https?:\/\//i.test(url)) throw new Error("Documento della giornata non configurato");

  const current = await readCurrentMatchdaySnapshot(league, fantasyMatchdayNumber);
  const html = await fetchText(url, "Lineup-Fanta/1.0 (+https://github.com/ventys7/Lineup-Fanta)");
  const parsed = parseMatchdayHtml(html, url);
  const hintedSeason = normalizeSeason(seasonHint);
  const titleSeason = extractSeason(parsed?.title);
  if (hintedSeason && titleSeason && hintedSeason !== titleSeason) {
    throw new Error(`Stagione incoerente: Calendario ${hintedSeason}, documento ${titleSeason}`);
  }
  const sameSourceSeason = current?.sourceUrl === url ? normalizeSeason(current?.season) : null;
  const season = hintedSeason || titleSeason || sameSourceSeason;
  if (!season) {
    throw new Error("Stagione non riconosciuta nel Calendario. Usa un titolo come: III Giornata 26-27 (1) e reimporta il calendario");
  }
  const previous = current?.season === season ? current : null;
  const baseStats = validateParsed(parsed, fantasyMatchdayNumber, previous);
  const sourceHash = sourceFingerprint(parsed, url);
  if (previous?.sourceHash === sourceHash && previous?.sourceUrl === url) {
    return { snapshot: previous, changed: false, storage: "unchanged" };
  }

  let assets = [];
  let listoneWarning = null;
  try {
    assets = await loadListone(league);
  } catch (error) {
    listoneWarning = `Listone non disponibile durante il riconoscimento: ${String(error?.message || error)}`;
  }
  const enriched = enrichParsed(parsed, previous, assets);
  const stats = identityStats(enriched);
  const now = new Date().toISOString();
  const snapshot = {
    version: SNAPSHOT_VERSION,
    leagueId: league,
    season,
    fantasyMatchdayNumber,
    sourceUrl: url,
    sourceHash,
    title: cleanText(parsed?.title) || `Giornata Fanta ${fantasyMatchdayNumber}`,
    syncedAt: now,
    parsed: enriched,
    overrides: normalizeOverrides(previous?.overrides),
    stats: { ...baseStats, ...stats },
    warnings: listoneWarning ? [listoneWarning] : []
  };
  const written = await writeSnapshot(snapshot);
  return { snapshot, changed: true, storage: written.source };
}

async function saveMatchdayOverrides({ leagueId, day, overrides }) {
  const snapshot = await readCurrentMatchdaySnapshot(leagueId, day);
  if (!snapshot) throw new Error("Fotografia della giornata non ancora creata");
  const normalized = normalizeOverrides(overrides);
  const currentHash = sha256(normalizeOverrides(snapshot.overrides));
  const nextHash = sha256(normalized);
  if (currentHash === nextHash) return { snapshot, changed: false, storage: "unchanged" };
  snapshot.overrides = normalized;
  snapshot.overridesUpdatedAt = new Date().toISOString();
  snapshot.stats = identityStats(effectiveParsed(snapshot));
  const written = await writeStoredJson(
    snapshotPathname(snapshot.leagueId, snapshot.season, snapshot.fantasyMatchdayNumber),
    snapshot
  );
  return { snapshot, changed: true, storage: written.source };
}

function snapshotStatus(snapshot) {
  if (!snapshot) return { exists: false };
  return {
    exists: true,
    season: snapshot.season,
    syncedAt: snapshot.syncedAt,
    sourceUrl: snapshot.sourceUrl,
    stats: identityStats(effectiveParsed(snapshot)),
    warnings: Array.isArray(snapshot.warnings) ? snapshot.warnings : [],
    overridesUpdatedAt: snapshot.overridesUpdatedAt || null,
    snapshot,
    effective: effectiveParsed(snapshot)
  };
}

function isSnapshotStale(snapshot, maxAgeMs) {
  const timestamp = Date.parse(snapshot?.syncedAt || "");
  return !Number.isFinite(timestamp) || Date.now() - timestamp > maxAgeMs;
}

module.exports = {
  effectiveParsed,
  isSnapshotStale,
  readCalendarSeasonHint,
  readCurrentMatchdaySnapshot,
  saveMatchdayOverrides,
  snapshotStatus,
  syncMatchdaySnapshot,
  __test: {
    countParsed,
    enrichParsed,
    extractSeason,
    identityStats,
    normalizeOverrides,
    snapshotPathname,
    validateParsed
  }
};
