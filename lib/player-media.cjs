"use strict";

const crypto = require("node:crypto");
const { loadLeagueAssets } = require("./listone.cjs");
const { leagueId } = require("./settings.cjs");
const { readBuffer, readJson, uploadImmutableImage, writeJson } = require("./storage.cjs");

const FULL_SYNC_DATES = new Set(["01-15", "07-15"]);
const MANIFEST_VERSION = 6;
const CATALOG_VERSION = 4;
const JOB_VERSION = 1;
const PROVIDER = "bsd";
const SOURCE_MODE = "bsd-team-rosters";
const API_BASE_URL = "https://sports.bzzoiro.com";
const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const IMAGE_MIN_BYTES = 1_500;
const LEAGUE_CONFIG = Object.freeze({
  fp: Object.freeze({ country: "England" }),
  pd: Object.freeze({ country: "Spain" })
});

const CLUB_ALIASES = Object.freeze({
  "man utd": "manchester united", "man united": "manchester united", "manchester utd": "manchester united",
  "man city": "manchester city", spurs: "tottenham", "tottenham hotspur": "tottenham",
  wolves: "wolverhampton", "wolverhampton wanderers": "wolverhampton", "brighton hove albion": "brighton",
  "brighton and hove albion": "brighton", "west ham united": "west ham", "newcastle united": "newcastle",
  "nottingham forest": "nottm forest", "notts forest": "nottm forest", "leeds united": "leeds",
  "atletico madrid": "atletico de madrid", "atletico": "atletico de madrid", "atl madrid": "atletico de madrid",
  "at madrid": "atletico de madrid", "club atletico de madrid": "atletico de madrid", "club atletico madrid": "atletico de madrid",
  "atletico de madrid sad": "atletico de madrid", "athletic bilbao": "athletic club", "ath bilbao": "athletic club",
  athletic: "athletic club", "athletic club bilbao": "athletic club", "athletic club de bilbao": "athletic club",
  "real betis balompie": "real betis", betis: "real betis", "betis sevilla": "real betis",
  "rc celta": "celta vigo", "celta de vigo": "celta vigo", "real club celta de vigo": "celta vigo", celta: "celta vigo",
  "deportivo alaves": "alaves", "deportivo alaves sad": "alaves", "rcd espanyol": "espanyol",
  "espanyol de barcelona": "espanyol", "rcd espanyol de barcelona": "espanyol", "real club deportivo espanyol": "espanyol",
  "espanyol barcelona": "espanyol", "rcd mallorca": "mallorca", "real club deportivo mallorca": "mallorca",
  "real mallorca": "mallorca", "ca osasuna": "osasuna", "club atletico osasuna": "osasuna",
  rayo: "rayo vallecano", "r vallecano": "rayo vallecano", "rayo vallecano de madrid": "rayo vallecano",
  "real sociedad de futbol": "real sociedad", "real sociedad san sebastian": "real sociedad", "r sociedad": "real sociedad",
  sociedad: "real sociedad", "sevilla fc": "sevilla", "valencia cf": "valencia", "villarreal cf": "villarreal",
  "girona fc": "girona", "girona futbol club": "girona", "getafe cf": "getafe", "levante ud": "levante",
  "real oviedo cf": "real oviedo", oviedo: "real oviedo", "elche cf": "elche", "ud las palmas": "las palmas",
  "fc barcelona": "barcelona", "futbol club barcelona": "barcelona", "barcelona fc": "barcelona", barca: "barcelona",
  "real madrid cf": "real madrid", "afc bournemouth": "bournemouth", "sunderland afc": "sunderland",
  "burnley fc": "burnley", "crystal palace fc": "crystal palace", "aston villa fc": "aston villa",
  "fulham fc": "fulham", "chelsea fc": "chelsea", "arsenal fc": "arsenal", "liverpool fc": "liverpool"
});

const PROVIDER_SEARCH_NAMES = Object.freeze({
  "manchester united": "Manchester United", "manchester city": "Manchester City", tottenham: "Tottenham Hotspur",
  wolverhampton: "Wolverhampton Wanderers", brighton: "Brighton and Hove Albion", "west ham": "West Ham United",
  newcastle: "Newcastle United", "nottm forest": "Nottingham Forest", leeds: "Leeds United",
  "atletico de madrid": "Atletico Madrid", "athletic club": "Athletic Club", "real betis": "Real Betis",
  "celta vigo": "Celta Vigo", alaves: "Deportivo Alaves", espanyol: "Espanyol", mallorca: "Mallorca",
  osasuna: "Osasuna", "rayo vallecano": "Rayo Vallecano", "real sociedad": "Real Sociedad",
  sevilla: "Sevilla", valencia: "Valencia", villarreal: "Villarreal", girona: "Girona", getafe: "Getafe",
  levante: "Levante", "real oviedo": "Real Oviedo", elche: "Elche", "las palmas": "Las Palmas",
  barcelona: "Barcelona", "real madrid": "Real Madrid"
});

function normalize(value) {
  return String(value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "").replace(/[‐‑‒–—-]/g, " ")
    .replace(/[^a-zA-Z0-9 ]+/g, " ").replace(/\s+/g, " ")
    .trim().toLowerCase();
}

function clubKey(value) {
  let key = normalize(value)
    .replace(/^(?:afc|fc|cf|rcd|rc|ca|ud)\s+/g, "")
    .replace(/\s+(?:afc|fc|cf|rcd|rc|ca|ud|sad|football club)$/g, "")
    .trim();
  key = CLUB_ALIASES[key] || key;
  return CLUB_ALIASES[key] || key;
}

function playerKey(name, team) {
  return `${normalize(name)}|${clubKey(team)}`;
}

function isoNow() { return new Date().toISOString(); }
function clone(value) { return structuredClone(value); }
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

function idleRefresh(extra = {}) {
  return { pending: false, phase: "idle", mode: "", teamCursor: 0, playerCursor: 0, warnings: [], error: "", ...extra };
}

function newManifest(id) {
  return {
    version: MANIFEST_VERSION,
    leagueId: id,
    provider: PROVIDER,
    sourceMode: SOURCE_MODE,
    players: {},
    refresh: idleRefresh(),
    updatedAt: null
  };
}

function newCatalog(id) {
  return {
    version: CATALOG_VERSION,
    leagueId: id,
    provider: PROVIDER,
    teams: {},
    players: {},
    updatedAt: null
  };
}

function newJob(id) {
  return {
    version: JOB_VERSION,
    leagueId: id,
    provider: PROVIDER,
    syncId: "",
    stagingKey: "",
    mode: "",
    pending: false,
    phase: "idle",
    clubs: [],
    players: [],
    teamCursor: 0,
    playerCursor: 0,
    teamSuccesses: 0,
    failedTeams: {},
    warnings: [],
    error: "",
    requestedAt: null,
    completedAt: null,
    updatedAt: null
  };
}

function manifestKey(id) { return `media/${leagueId(id)}.json`; }
function catalogKey(id) { return `media/bsd/catalog-${leagueId(id)}.json`; }
function jobKey(id) { return `media/bsd/job-${leagueId(id)}.json`; }
function stagingKey(id, syncId) { return `media/bsd/staging/${leagueId(id)}-${syncId}.json`; }

function providerImageUrl(id) {
  const value = String(id || "").trim();
  return /^\d+$/.test(value) ? `${API_BASE_URL}/img/player/${value}/` : "";
}

function isKnownExternalSourceUrl(value) {
  try {
    const host = new URL(String(value || "")).hostname.toLowerCase();
    return host === "sports.bzzoiro.com" || host.endsWith("api-sports.io") || host.includes("fotmob") || host.includes("sofascore");
  } catch { return false; }
}

function isKnownBlobUrl(value) {
  const url = String(value || "").trim();
  if (url.startsWith("/.lineup-runtime/")) return true;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.endsWith("blob.vercel-storage.com") || host.includes("vercel-storage.com");
  } catch { return false; }
}

function isResolvedEntry(entry) {
  if (!entry || entry.status !== "resolved" || !entry.photoUrl) return false;
  if (isKnownExternalSourceUrl(entry.photoUrl)) return false;
  return entry.storageVerified === true || (entry.cached === true && isKnownBlobUrl(entry.photoUrl));
}

function sanitizeCandidate(candidate) {
  if (!candidate) return null;
  const id = String(candidate.id || candidate.externalId || "").trim();
  if (!/^\d+$/.test(id)) return null;
  return {
    id,
    name: String(candidate.name || candidate.externalName || "").trim(),
    names: [...new Set((candidate.names || []).map(String).map((name) => name.trim()).filter(Boolean))],
    teamName: String(candidate.teamName || candidate.externalTeam || "").trim(),
    teamId: String(candidate.teamId || "").trim(),
    teamKey: String(candidate.teamKey || clubKey(candidate.teamName || candidate.externalTeam)).trim(),
    score: Number(candidate.score || 0)
  };
}

function normalizeManifest(raw, id) {
  const base = newManifest(id);
  if (!raw || typeof raw !== "object") return base;
  const players = {};
  Object.entries(raw.players || {}).forEach(([rawKey, rawEntry]) => {
    const entry = rawEntry && typeof rawEntry === "object" ? rawEntry : {};
    const key = String(entry.key || rawKey || "");
    if (!key) return;
    const resolved = isResolvedEntry(entry);
    players[key] = resolved
      ? {
          ...entry,
          key,
          status: "resolved",
          cached: true,
          storageVerified: true,
          candidates: [],
          provider: entry.provider || raw.provider || "legacy"
        }
      : {
          key,
          listoneName: String(entry.listoneName || key.split("|")[0] || ""),
          realTeam: String(entry.realTeam || ""),
          status: "unresolved",
          candidates: (entry.candidates || []).map(sanitizeCandidate).filter(Boolean),
          error: String(entry.error || "Foto da sincronizzare"),
          checkedAt: entry.checkedAt || null
        };
  });
  return {
    ...base,
    ...raw,
    version: MANIFEST_VERSION,
    leagueId: id,
    provider: PROVIDER,
    sourceMode: SOURCE_MODE,
    players,
    refresh: idleRefresh()
  };
}

async function readManifest(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  const raw = await readJson(manifestKey(id), newManifest(id));
  return normalizeManifest(raw, id);
}

function assertPublishableManifest(manifest) {
  if (!manifest || manifest.provider !== PROVIDER || manifest.version !== MANIFEST_VERSION) {
    throw new Error("Manifest BSD non valido");
  }
  for (const entry of Object.values(manifest.players || {})) {
    if (entry.status !== "resolved") continue;
    if (!isResolvedEntry(entry)) throw new Error(`Foto non verificata nel manifest: ${entry.listoneName || entry.key}`);
    if (isKnownExternalSourceUrl(entry.photoUrl)) throw new Error(`URL esterno vietato nel manifest: ${entry.listoneName || entry.key}`);
  }
  return true;
}

async function saveManifest(id, manifest) {
  const clean = {
    ...manifest,
    version: MANIFEST_VERSION,
    leagueId: leagueId(id),
    provider: PROVIDER,
    sourceMode: SOURCE_MODE,
    refresh: idleRefresh({ completedAt: manifest.refresh?.completedAt || null })
  };
  assertPublishableManifest(clean);
  const saved = await writeJson(manifestKey(id), clean);
  return saved.document;
}

async function readCatalog(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  const raw = await readJson(catalogKey(id), newCatalog(id));
  if (!raw || raw.provider !== PROVIDER || raw.version !== CATALOG_VERSION) return newCatalog(id);
  return { ...newCatalog(id), ...raw, teams: raw.teams || {}, players: raw.players || {} };
}

async function saveCatalog(id, catalog) {
  const saved = await writeJson(catalogKey(id), {
    ...catalog,
    version: CATALOG_VERSION,
    leagueId: leagueId(id),
    provider: PROVIDER
  });
  return saved.document;
}

async function readJob(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  const raw = await readJson(jobKey(id), newJob(id));
  if (!raw || raw.provider !== PROVIDER || raw.version !== JOB_VERSION) return newJob(id);
  return {
    ...newJob(id),
    ...raw,
    clubs: Array.isArray(raw.clubs) ? raw.clubs : [],
    players: Array.isArray(raw.players) ? raw.players : [],
    failedTeams: raw.failedTeams || {},
    warnings: Array.isArray(raw.warnings) ? raw.warnings : []
  };
}

async function saveJob(id, job) {
  const saved = await writeJson(jobKey(id), {
    ...job,
    version: JOB_VERSION,
    leagueId: leagueId(id),
    provider: PROVIDER
  });
  return saved.document;
}

function publicRefresh(job) {
  if (!job?.pending) {
    return idleRefresh({
      mode: job?.mode || "",
      completedAt: job?.completedAt || null,
      warnings: job?.warnings || [],
      error: job?.error || ""
    });
  }
  return {
    pending: true,
    mode: job.mode,
    phase: job.phase,
    teamCursor: Number(job.teamCursor || 0),
    teamTotal: job.clubs.length,
    playerCursor: Number(job.playerCursor || 0),
    playerTotal: job.players.length,
    requestedAt: job.requestedAt,
    completedAt: null,
    warnings: job.warnings || [],
    error: job.error || ""
  };
}

async function readStatusManifest(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  const live = await readManifest(id);
  const job = await readJob(id);
  if (!job.pending || !job.stagingKey) return { ...live, refresh: publicRefresh(job) };
  const staging = normalizeManifest(await readJson(job.stagingKey, live), id);
  return { ...staging, refresh: publicRefresh(job) };
}

function bsdApiKey() {
  const value = String(process.env.BSD_API_KEY || "").trim();
  if (!value) throw new Error("BSD_API_KEY non configurata");
  return value;
}

async function bsdGet(pathname, params = {}, timeoutMs = 25000) {
  const url = new URL(pathname, API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value) !== "") url.searchParams.set(key, String(value));
  });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        Authorization: `Token ${bsdApiKey()}`,
        "User-Agent": "Lineup-Fanta/2.0"
      }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = String(payload?.detail || payload?.message || "").trim();
      throw new Error(`BSD HTTP ${response.status}${detail ? `: ${detail}` : ""}`);
    }
    return payload;
  } finally { clearTimeout(timer); }
}

function payloadItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  for (const key of ["results", "players", "teams", "data"]) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  return [];
}

function nestedValue(value, keys) {
  for (const key of keys) {
    const candidate = value?.[key];
    if (candidate !== undefined && candidate !== null && String(candidate).trim()) return candidate;
  }
  return "";
}

function countryName(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return String(value.name || value.code || "");
  return "";
}

function collectBsdTeams(payload) {
  const teams = {};
  payloadItems(payload).forEach((item) => {
    const team = item?.team && typeof item.team === "object" ? { ...item, ...item.team } : item;
    const id = String(nestedValue(team, ["id", "team_id", "teamId"])).trim();
    const name = String(nestedValue(team, ["name", "full_name", "fullName", "team_name", "teamName"])).trim();
    if (!/^\d+$/.test(id) || !name) return;
    const key = clubKey(name);
    teams[`${key}|${id}`] = {
      id,
      name,
      key,
      country: countryName(team.country || team.country_name || team.countryName)
    };
  });
  return teams;
}

function collectBsdPlayers(payload, team) {
  return payloadItems(payload).map((item) => {
    const nested = item?.player && typeof item.player === "object" ? item.player : {};
    const player = { ...item, ...nested };
    const id = String(nestedValue(player, ["id", "player_id", "playerId"])).trim();
    if (!/^\d+$/.test(id)) return null;
    const firstName = String(nestedValue(player, ["first_name", "firstName"])).trim();
    const lastName = String(nestedValue(player, ["last_name", "lastName"])).trim();
    const names = [...new Set([
      nestedValue(player, ["full_name", "fullName"]),
      nestedValue(player, ["name", "player_name", "playerName"]),
      nestedValue(player, ["short_name", "shortName", "common_name", "commonName"]),
      `${firstName} ${lastName}`.trim()
    ].map(String).map((name) => name.trim()).filter(Boolean))];
    const name = names[0] || `player-${id}`;
    const itemTeam = player.team && typeof player.team === "object" ? player.team : {};
    const teamName = String(team?.name || nestedValue(itemTeam, ["name", "full_name", "fullName"]) || nestedValue(player, ["team_name", "teamName"])).trim();
    const teamId = String(team?.id || nestedValue(itemTeam, ["id", "team_id", "teamId"]) || nestedValue(player, ["team_id", "teamId"])).trim();
    return {
      id,
      name,
      names,
      teamName,
      teamId,
      teamKey: String(team?.key || clubKey(teamName)),
      providerPosition: String(nestedValue(player, ["position", "position_name", "positionName"])),
      photoUrl: providerImageUrl(id)
    };
  }).filter(Boolean);
}

function tokenSimilarity(first, second) {
  const left = new Set(clubKey(first).split(" ").filter((token) => token.length > 2 && token !== "real"));
  const right = new Set(clubKey(second).split(" ").filter((token) => token.length > 2 && token !== "real"));
  if (!left.size || !right.size) return 0;
  const common = [...left].filter((token) => right.has(token)).length;
  return common * 10 - Math.abs(left.size - right.size);
}

function bestProviderTeam(targetName, map, country = "") {
  const target = clubKey(targetName);
  let best = null;
  let bestScore = 0;
  Object.values(map || {}).forEach((team) => {
    if (country && team.country && normalize(team.country) !== normalize(country)) return;
    const candidate = clubKey(team.name || team.key);
    let score = tokenSimilarity(target, candidate);
    if (candidate === target) score = 100;
    else if (candidate.includes(target) || target.includes(candidate)) score = Math.max(score, 70);
    if (score > bestScore) { bestScore = score; best = team; }
  });
  return bestScore >= 9 ? best : null;
}

async function searchProviderTeam(id, rawTeamName) {
  const config = LEAGUE_CONFIG[id];
  if (!config) throw new Error("Lega BSD non configurata");
  const key = clubKey(rawTeamName);
  const query = PROVIDER_SEARCH_NAMES[key] || rawTeamName;
  const attempts = [
    { search: query, limit: 100 },
    { q: query, limit: 100 },
    { name: query, limit: 100 }
  ];
  let lastError = null;
  for (const params of attempts) {
    try {
      const found = bestProviderTeam(rawTeamName, collectBsdTeams(await bsdGet("/api/teams/", params)), config.country);
      if (found) return found;
    } catch (error) { lastError = error; }
  }
  if (lastError) throw lastError;
  throw new Error(`Squadra BSD non trovata: ${rawTeamName}`);
}

async function resolveProviderTeam(id, rawTeamName, catalog) {
  const key = clubKey(rawTeamName);
  const existing = catalog.teams[key];
  if (existing?.id) return existing;
  const found = await searchProviderTeam(id, rawTeamName);
  const team = {
    id: String(found.id),
    name: String(found.name || rawTeamName),
    listoneName: rawTeamName,
    key,
    country: String(found.country || LEAGUE_CONFIG[id]?.country || ""),
    playerIds: [],
    checkedAt: null,
    error: ""
  };
  catalog.teams[key] = team;
  return team;
}

async function refreshTeamSquad(id, rawTeamName, catalog) {
  const key = clubKey(rawTeamName);
  const team = await resolveProviderTeam(id, rawTeamName, catalog);
  const current = catalog.teams[key] || team;
  try {
    const payload = await bsdGet("/api/players/", { team: team.id, limit: 200 });
    const candidates = collectBsdPlayers(payload, { ...team, key });
    if (!candidates.length) throw new Error(`BSD non ha restituito la rosa di ${team.name}`);
    (current.playerIds || []).forEach((playerId) => {
      if (catalog.players[playerId]?.teamKey === key) delete catalog.players[playerId];
    });
    candidates.forEach((candidate) => { catalog.players[candidate.id] = candidate; });
    catalog.teams[key] = {
      ...team,
      listoneName: rawTeamName,
      key,
      playerIds: candidates.map((candidate) => candidate.id),
      checkedAt: isoNow(),
      error: ""
    };
  } catch (error) {
    catalog.teams[key] = { ...current, ...team, key, listoneName: rawTeamName, checkedAt: isoNow(), error: error.message || "Rosa non disponibile" };
    throw error;
  }
  return catalog.teams[key];
}

function nameScore(target, candidate) {
  const left = normalize(target);
  const right = normalize(candidate);
  if (!left || !right) return 0;
  if (left === right) return 84;
  const leftTokens = left.split(" ").filter(Boolean);
  const rightTokens = right.split(" ").filter(Boolean);
  const leftLast = leftTokens.at(-1);
  const rightLast = rightTokens.at(-1);
  if (leftTokens.length === 1 && (rightTokens[0] === leftTokens[0] || rightLast === leftTokens[0])) return 76;
  if (rightTokens.length === 1 && (leftTokens[0] === rightTokens[0] || leftLast === rightTokens[0])) return 76;
  if (leftLast && leftLast === rightLast) {
    if (leftTokens.length === 1 || rightTokens.length === 1) return 74;
    if (leftTokens[0]?.[0] === rightTokens[0]?.[0]) return 80;
  }
  if ((left.length >= 5 && right.includes(left)) || (right.length >= 5 && left.includes(right))) return 72;
  return 0;
}

function scoreCandidate(asset, candidate) {
  const base = Math.max(...(candidate.names || [candidate.name]).map((name) => nameScore(asset.displayName, name)));
  if (!base) return 0;
  const sameClub = clubKey(asset.realTeam) === String(candidate.teamKey || clubKey(candidate.teamName));
  return base + (sameClub ? 18 : 0);
}

function chooseCandidate(asset, candidates) {
  const ranked = candidates
    .map((candidate) => ({ candidate, score: scoreCandidate(asset, candidate) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
  if (!ranked.length) return { selected: null, candidates: [] };
  const unique = ranked.length === 1 || ranked[0].score >= ranked[1].score + 4;
  const selected = ranked[0].score >= 92 && unique ? ranked[0].candidate : null;
  return {
    selected,
    candidates: ranked.slice(0, 12).map(({ candidate, score }) => sanitizeCandidate({ ...candidate, score })).filter(Boolean)
  };
}

function candidatesForAsset(catalog, asset) {
  const target = clubKey(asset.realTeam);
  return Object.values(catalog.players || {}).filter((candidate) => String(candidate.teamKey || clubKey(candidate.teamName)) === target);
}

function resolveAssetFromCatalog(catalog, asset) {
  return chooseCandidate(asset, candidatesForAsset(catalog, asset));
}

async function fetchImage(url, timeoutMs = 25000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: { Accept: "image/png,image/jpeg,image/webp", "User-Agent": "Lineup-Fanta/2.0" }
    });
    if (!response.ok) throw new Error(`Foto BSD HTTP ${response.status}`);
    const mimeType = String(response.headers.get("content-type") || "").split(";")[0].toLowerCase();
    if (!/^image\/(png|jpeg|webp)$/.test(mimeType)) throw new Error(`Foto BSD con MIME non valido: ${mimeType || "sconosciuto"}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < IMAGE_MIN_BYTES || bytes.length > IMAGE_MAX_BYTES) throw new Error(`Foto BSD non valida (${bytes.length} byte)`);
    return { bytes, mimeType, hash: crypto.createHash("sha256").update(bytes).digest("hex") };
  } finally { clearTimeout(timer); }
}

async function readStoredUpload(stored, expected, timeoutMs = 15000) {
  if (stored.source === "local") return readBuffer(stored.key);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const url = new URL(stored.url);
    url.searchParams.set("lineup-verify", expected.hash.slice(0, 16));
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: { Accept: "image/png,image/jpeg,image/webp", "User-Agent": "Lineup-Fanta/2.0" }
    });
    if (!response.ok) throw new Error(`Blob appena caricato non leggibile (HTTP ${response.status})`);
    return Buffer.from(await response.arrayBuffer());
  } finally {
    clearTimeout(timer);
  }
}

async function verifyStoredUpload(stored, expected) {
  if (!stored?.key || !stored?.url) throw new Error("Upload Blob senza riferimento verificabile");
  let lastError = null;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const saved = await readStoredUpload(stored, expected);
      if (!saved) throw new Error("Blob appena caricato non leggibile");
      const digest = crypto.createHash("sha256").update(saved).digest("hex");
      if (saved.length !== expected.bytes.length || digest !== expected.hash) throw new Error("Verifica Blob fallita");
      return true;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(350 * (attempt + 1));
    }
  }
  throw lastError || new Error("Verifica Blob fallita");
}

async function buildResolvedEntry(id, asset, candidate, existing, matchedBy = "automatic") {
  const key = playerKey(asset.displayName, asset.realTeam);
  const externalId = String(candidate?.id || candidate?.externalId || "").trim();
  if (!/^\d+$/.test(externalId)) throw new Error("Giocatore BSD non valido");
  const externalName = String(candidate?.name || candidate?.externalName || asset.displayName).trim();
  const image = await fetchImage(providerImageUrl(externalId));

  if (isResolvedEntry(existing) && String(existing.externalId || "") === externalId && existing.imageHash === image.hash) {
    return {
      ...existing,
      key,
      listoneName: asset.displayName,
      realTeam: asset.realTeam,
      provider: PROVIDER,
      externalName,
      externalTeam: String(candidate?.teamName || asset.realTeam || ""),
      matchedBy,
      checkedAt: isoNow(),
      lastRefreshError: ""
    };
  }

  const stored = await uploadImmutableImage(`player-faces/${PROVIDER}/${externalId}`, "portrait", image.bytes, image.mimeType);
  await verifyStoredUpload(stored, image);
  if (process.env.VERCEL && stored.source !== "blob") throw new Error("La foto non è stata salvata nel Vercel Blob");

  return {
    key,
    listoneName: asset.displayName,
    realTeam: asset.realTeam,
    provider: PROVIDER,
    externalId,
    externalName,
    externalTeam: String(candidate?.teamName || asset.realTeam || ""),
    photoUrl: stored.url,
    storageKey: stored.key,
    imageHash: image.hash,
    imageMimeType: image.mimeType,
    imageBytes: image.bytes.length,
    cached: true,
    storageVerified: true,
    status: "resolved",
    matchedBy,
    checkedAt: isoNow(),
    candidates: [],
    lastRefreshError: ""
  };
}

function keepExistingOrUnresolved(asset, existing, candidates, error) {
  if (isResolvedEntry(existing)) {
    return {
      ...existing,
      lastRefreshError: String(error || "Aggiornamento non riuscito"),
      lastRefreshAttemptAt: isoNow()
    };
  }
  return {
    key: playerKey(asset.displayName, asset.realTeam),
    listoneName: asset.displayName,
    realTeam: asset.realTeam,
    status: "unresolved",
    candidates: (candidates || []).map(sanitizeCandidate).filter(Boolean),
    checkedAt: isoNow(),
    error: String(error || ((candidates || []).length ? "Associazione da confermare" : "Giocatore non trovato nel catalogo BSD"))
  };
}

function listonePlayers(assets) {
  const players = [];
  (assets || []).forEach((asset) => {
    if (!asset.displayName || !asset.realTeam) return;
    if (asset.type === "goalkeeper_block" || (asset.role === "P" && /\s+-\s+/.test(asset.displayName))) {
      asset.displayName.split(/\s+-\s+/).map((part) => part.trim()).filter(Boolean)
        .forEach((name) => players.push({ ...asset, displayName: name, type: "goalkeeper" }));
    } else players.push(asset);
  });
  return [...new Map(players.map((asset) => [playerKey(asset.displayName, asset.realTeam), asset])).values()]
    .sort((a, b) => clubKey(a.realTeam).localeCompare(clubKey(b.realTeam)) || normalize(a.displayName).localeCompare(normalize(b.displayName)));
}

function uniqueClubs(assets) {
  const map = new Map();
  (assets || []).forEach((asset) => {
    const name = String(asset.realTeam || "").trim();
    if (name && !map.has(clubKey(name))) map.set(clubKey(name), name);
  });
  return [...map.values()].sort((a, b) => clubKey(a).localeCompare(clubKey(b)));
}

function compactAsset(asset) {
  return { key: playerKey(asset.displayName, asset.realTeam), displayName: asset.displayName, realTeam: asset.realTeam };
}

async function startSync(rawLeagueId, mode) {
  const id = leagueId(rawLeagueId);
  const active = await readJob(id);
  if (active.pending) return readStatusManifest(id);

  const live = await readManifest(id);
  const { assets } = await loadLeagueAssets(id);
  const allPlayers = listonePlayers(assets);
  const targets = mode === "full"
    ? allPlayers
    : allPlayers.filter((asset) => !isResolvedEntry(live.players[playerKey(asset.displayName, asset.realTeam)]));

  if (!targets.length) {
    const completed = await saveJob(id, {
      ...newJob(id),
      mode,
      completedAt: isoNow(),
      warnings: []
    });
    return { ...live, refresh: publicRefresh(completed) };
  }

  const syncId = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const stageKey = stagingKey(id, syncId);
  const currentKeys = new Set(allPlayers.map((asset) => playerKey(asset.displayName, asset.realTeam)));
  const stagePlayers = mode === "full"
    ? Object.fromEntries(Object.entries(live.players || {}).filter(([key]) => currentKeys.has(key)))
    : clone(live.players || {});

  targets.forEach((asset) => {
    const key = playerKey(asset.displayName, asset.realTeam);
    if (!stagePlayers[key]) stagePlayers[key] = keepExistingOrUnresolved(asset, null, [], "In attesa di sincronizzazione");
  });

  const staging = {
    ...live,
    version: MANIFEST_VERSION,
    leagueId: id,
    provider: PROVIDER,
    sourceMode: SOURCE_MODE,
    players: stagePlayers,
    refresh: idleRefresh()
  };
  await writeJson(stageKey, staging);

  const job = await saveJob(id, {
    ...newJob(id),
    syncId,
    stagingKey: stageKey,
    mode,
    pending: true,
    phase: "teams",
    clubs: uniqueClubs(targets),
    players: targets.map(compactAsset),
    requestedAt: isoNow()
  });
  return { ...staging, refresh: publicRefresh(job) };
}

async function markFullSync(rawLeagueId) {
  return startSync(rawLeagueId, "full");
}

async function startMissingSync(rawLeagueId) {
  return startSync(rawLeagueId, "missing");
}

function addWarning(job, text) {
  const message = String(text || "").trim();
  if (!message) return;
  if (!job.warnings.includes(message)) job.warnings.push(message);
  if (job.warnings.length > 60) job.warnings = job.warnings.slice(-60);
}

async function processFullSync(rawLeagueId, limit = 4) {
  const id = leagueId(rawLeagueId);
  let job = await readJob(id);
  if (!job.pending || !job.stagingKey) return readStatusManifest(id);
  if (job.error) {
    job.error = "";
    job = await saveJob(id, job);
  }

  let staging = normalizeManifest(await readJson(job.stagingKey, await readManifest(id)), id);
  let catalog = await readCatalog(id);
  const batchLimit = Math.max(1, Math.min(Number(limit || 4), 8));

  try {
    // A deployment interruption can leave the last completed team batch saved as
    // `teams N/N`. Repair that durable state before continuing with player images.
    if (job.phase === "teams" && Number(job.teamCursor || 0) >= job.clubs.length) {
      if (job.clubs.length && Number(job.teamSuccesses || 0) === 0) {
        throw new Error("Nessuna rosa BSD è stata recuperata: il manifest live resta invariato");
      }
      job.phase = "players";
      job.teamCursor = job.clubs.length;
      job.playerCursor = Math.max(0, Number(job.playerCursor || 0));
      job = await saveJob(id, job);
    }

    if (job.phase === "teams") {
      const start = Number(job.teamCursor || 0);
      const batch = job.clubs.slice(start, start + Math.min(batchLimit, 6));
      let successes = 0;
      for (const club of batch) {
        try {
          await refreshTeamSquad(id, club, catalog);
          successes += 1;
          delete job.failedTeams[clubKey(club)];
        } catch (error) {
          job.failedTeams[clubKey(club)] = error.message || "Rosa BSD non disponibile";
          addWarning(job, `${club}: ${error.message || "rosa non disponibile"}`);
        }
      }
      catalog = await saveCatalog(id, catalog);
      const next = start + batch.length;
      job.teamSuccesses = Number(job.teamSuccesses || 0) + successes;
      job.teamCursor = next;
      if (next >= job.clubs.length) {
        if (job.clubs.length && job.teamSuccesses === 0) throw new Error("Nessuna rosa BSD è stata recuperata: il manifest live resta invariato");
        job.phase = "players";
        job.playerCursor = 0;
      }
      job = await saveJob(id, job);
      return { ...staging, refresh: publicRefresh(job) };
    }

    const start = Number(job.playerCursor || 0);
    const batch = job.players.slice(start, start + batchLimit);
    const updates = await Promise.all(batch.map(async (asset) => {
      const key = asset.key || playerKey(asset.displayName, asset.realTeam);
      const existing = staging.players[key];
      const failedTeamError = job.failedTeams[clubKey(asset.realTeam)];
      if (failedTeamError) {
        return { key, entry: keepExistingOrUnresolved(asset, existing, [], failedTeamError), warning: `${asset.displayName}: ${failedTeamError}` };
      }
      const pinned = isResolvedEntry(existing) && existing.provider === PROVIDER && existing.matchedBy === "manual" && /^\d+$/.test(String(existing.externalId || ""))
        ? {
            id: String(existing.externalId),
            name: existing.externalName || asset.displayName,
            names: [existing.externalName || asset.displayName],
            teamName: existing.externalTeam || asset.realTeam,
            teamKey: clubKey(asset.realTeam)
          }
        : null;
      const result = pinned ? { selected: pinned, candidates: [] } : resolveAssetFromCatalog(catalog, asset);
      if (!result.selected) {
        return { key, entry: keepExistingOrUnresolved(asset, existing, result.candidates, result.candidates.length ? "Associazione da confermare" : "Giocatore non trovato nella rosa BSD del club") };
      }
      try {
        const entry = await buildResolvedEntry(id, asset, result.selected, existing, pinned ? "manual" : job.mode === "full" ? "full-sync" : "automatic");
        return { key, entry };
      } catch (error) {
        return {
          key,
          entry: keepExistingOrUnresolved(asset, existing, result.candidates, error.message),
          warning: `${asset.displayName}: ${error.message}`
        };
      }
    }));

    updates.forEach(({ key, entry, warning }) => {
      staging.players[key] = entry;
      if (warning) addWarning(job, warning);
    });
    await writeJson(job.stagingKey, staging);

    const next = start + batch.length;
    job.playerCursor = next;
    if (next >= job.players.length) {
      staging.refresh = idleRefresh({ completedAt: isoNow() });
      assertPublishableManifest(staging);
      const published = await saveManifest(id, staging);
      job = await saveJob(id, {
        ...job,
        pending: false,
        phase: "idle",
        teamCursor: job.clubs.length,
        playerCursor: job.players.length,
        completedAt: isoNow(),
        error: ""
      });
      return { ...published, refresh: publicRefresh(job) };
    }

    job = await saveJob(id, job);
    return { ...staging, refresh: publicRefresh(job) };
  } catch (error) {
    job = await saveJob(id, { ...job, error: error.message || "Sincronizzazione fallita" });
    return { ...staging, refresh: publicRefresh(job) };
  }
}

async function syncMissing(rawLeagueId, options = {}) {
  const id = leagueId(rawLeagueId);
  const before = await startMissingSync(id);
  if (!before.refresh?.pending) return { manifest: before, total: 0, processed: 0, remaining: 0 };
  const previousCursor = Number(before.refresh.playerCursor || 0);
  const manifest = await processFullSync(id, options.limit || 8);
  const cursor = Number(manifest.refresh?.playerCursor || 0);
  const total = Number(manifest.refresh?.playerTotal || 0);
  return {
    manifest,
    total,
    processed: Math.max(0, cursor - previousCursor),
    remaining: Math.max(0, total - cursor)
  };
}

function queryScore(query, candidate) {
  const target = normalize(query);
  const combined = normalize(`${candidate.name} ${(candidate.names || []).join(" ")} ${candidate.teamName}`);
  if (!target) return 0;
  if (combined === target) return 100;
  const tokens = target.split(" ").filter(Boolean);
  return tokens.reduce((score, token) => score + (combined.includes(token) ? 12 : 0), 0) + (combined.includes(target) ? 40 : 0);
}

async function searchProvider(rawLeagueId, query, teamName = "") {
  const id = leagueId(rawLeagueId);
  const catalog = await readCatalog(id);
  return Object.values(catalog.players || {})
    .map((candidate) => ({
      candidate,
      score: queryScore(query, candidate) + (teamName && String(candidate.teamKey) === clubKey(teamName) ? 30 : 0)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ candidate, score }) => sanitizeCandidate({ ...candidate, score }))
    .filter(Boolean);
}

async function linkManual(rawLeagueId, key, candidate) {
  const id = leagueId(rawLeagueId);
  const job = await readJob(id);
  if (job.pending) throw new Error("Completa prima la sincronizzazione in corso");
  let manifest = await readManifest(id);
  const existing = manifest.players[key];
  if (!existing) throw new Error("Giocatore del Listone non trovato");
  const externalId = String(candidate?.id || candidate?.externalId || "").trim();
  if (!/^\d+$/.test(externalId)) throw new Error("ID giocatore BSD non valido");
  const entry = await buildResolvedEntry(id, {
    displayName: existing.listoneName,
    realTeam: existing.realTeam
  }, {
    ...candidate,
    id: externalId,
    name: candidate?.name || existing.listoneName,
    teamName: candidate?.teamName || existing.realTeam,
    teamKey: clubKey(existing.realTeam)
  }, existing, "manual");
  manifest.players[key] = entry;
  manifest = await saveManifest(id, manifest);
  return manifest.players[key];
}

function summary(manifest) {
  const values = Object.values(manifest.players || {});
  return {
    resolved: values.filter(isResolvedEntry).length,
    unresolved: values.filter((entry) => !isResolvedEntry(entry)).length,
    refreshPending: Boolean(manifest.refresh?.pending)
  };
}

function publicManifest(manifest) {
  const players = {};
  Object.entries(manifest.players || {}).forEach(([key, entry]) => {
    if (isResolvedEntry(entry)) {
      players[key] = {
        key,
        listoneName: entry.listoneName,
        realTeam: entry.realTeam,
        photoUrl: entry.photoUrl,
        status: "resolved",
        externalId: entry.externalId,
        externalName: entry.externalName,
        externalTeam: entry.externalTeam,
        matchedBy: entry.matchedBy,
        checkedAt: entry.checkedAt,
        lastRefreshError: entry.lastRefreshError || ""
      };
    } else {
      players[key] = {
        key,
        listoneName: entry.listoneName,
        realTeam: entry.realTeam,
        status: "unresolved",
        candidates: (entry.candidates || []).map(sanitizeCandidate).filter(Boolean),
        error: entry.error || "Foto da sincronizzare",
        checkedAt: entry.checkedAt || null
      };
    }
  });
  return {
    version: MANIFEST_VERSION,
    leagueId: manifest.leagueId,
    provider: PROVIDER,
    sourceMode: SOURCE_MODE,
    updatedAt: manifest.updatedAt,
    players,
    refresh: manifest.refresh || idleRefresh(),
    summary: summary(manifest)
  };
}

async function mediaStatus(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  const manifest = await readStatusManifest(id);
  const payload = publicManifest(manifest);
  try {
    const { assets } = await loadLeagueAssets(id);
    const players = listonePlayers(assets);
    payload.total = players.length;
    payload.remaining = players.filter((asset) => !isResolvedEntry(manifest.players[playerKey(asset.displayName, asset.realTeam)])).length;
  } catch {
    payload.total = Object.keys(manifest.players || {}).length;
    payload.remaining = payload.summary.unresolved;
  }
  return payload;
}

function isFullSyncDate(date = new Date()) {
  const monthDay = `${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  return FULL_SYNC_DATES.has(monthDay);
}

module.exports = {
  CATALOG_VERSION,
  FULL_SYNC_DATES,
  MANIFEST_VERSION,
  PROVIDER,
  assertPublishableManifest,
  bestProviderTeam,
  chooseCandidate,
  clubKey,
  collectBsdPlayers,
  collectBsdTeams,
  isFullSyncDate,
  isResolvedEntry,
  keepExistingOrUnresolved,
  linkManual,
  markFullSync,
  mediaStatus,
  playerKey,
  playerPhotoUrl: providerImageUrl,
  processFullSync,
  publicManifest,
  readManifest,
  readStatusManifest,
  searchProvider,
  startMissingSync,
  summary,
  syncMissing
};
