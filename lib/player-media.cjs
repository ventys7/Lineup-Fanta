"use strict";

const { loadLeagueAssets } = require("./listone.cjs");
const { leagueId } = require("./settings.cjs");
const { readJson, uploadImmutableImage, writeJson } = require("./storage.cjs");

const FULL_SYNC_DATES = new Set(["08-01", "08-15", "08-30", "09-03", "10-01", "12-01", "01-01", "01-15", "01-30", "02-03", "03-01", "05-01"]);
const MANIFEST_VERSION = 5;
const CATALOG_VERSION = 3;
const PROVIDER = "api-football";
const SOURCE_MODE = "api-football-squads";
const API_BASE_URL = "https://v3.football.api-sports.io";
const API_DAILY_SAFETY_LIMIT = 90;
const TEAM_CATALOG_MAX_AGE_MS = 32 * 24 * 60 * 60 * 1000;
const LEAGUE_CONFIG = Object.freeze({
  fp: Object.freeze({ providerLeagueId: 39, seedSeason: 2024, country: "England" }),
  pd: Object.freeze({ providerLeagueId: 140, seedSeason: 2024, country: "Spain" })
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
  "real madrid cf": "real madrid"
});

const PROVIDER_SEARCH_NAMES = Object.freeze({
  "manchester united": "Manchester United", "manchester city": "Manchester City", tottenham: "Tottenham",
  wolverhampton: "Wolves", brighton: "Brighton", "west ham": "West Ham", newcastle: "Newcastle",
  "nottm forest": "Nottingham Forest", leeds: "Leeds", "atletico de madrid": "Atletico Madrid",
  "athletic club": "Athletic Club", "real betis": "Real Betis", "celta vigo": "Celta Vigo",
  alaves: "Alaves", espanyol: "Espanyol", mallorca: "Mallorca", osasuna: "Osasuna",
  "rayo vallecano": "Rayo Vallecano", "real sociedad": "Real Sociedad", sevilla: "Sevilla",
  valencia: "Valencia", villarreal: "Villarreal", girona: "Girona", getafe: "Getafe",
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
function utcDay(date = new Date()) { return date.toISOString().slice(0, 10); }
function ageMs(value) {
  const time = Date.parse(String(value || ""));
  return Number.isFinite(time) ? Date.now() - time : Number.POSITIVE_INFINITY;
}

function newManifest(id) {
  return {
    version: MANIFEST_VERSION,
    leagueId: id,
    provider: PROVIDER,
    sourceMode: SOURCE_MODE,
    players: {},
    refresh: { pending: false, phase: "idle", teamCursor: 0, playerCursor: 0 },
    updatedAt: null
  };
}

function newCatalog(id) {
  return {
    version: CATALOG_VERSION,
    leagueId: id,
    provider: PROVIDER,
    seed: { loadedAt: null, teams: {} },
    teams: {},
    players: {},
    quota: { date: utcDay(), used: 0, safetyLimit: API_DAILY_SAFETY_LIMIT },
    updatedAt: null
  };
}

async function readManifest(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  const raw = await readJson(`media/${id}.json`, newManifest(id));
  if (!raw || raw.provider !== PROVIDER || raw.version !== MANIFEST_VERSION) return newManifest(id);
  return {
    ...newManifest(id),
    ...raw,
    version: MANIFEST_VERSION,
    provider: PROVIDER,
    sourceMode: SOURCE_MODE,
    players: raw.players || {},
    refresh: { ...newManifest(id).refresh, ...(raw.refresh || {}) }
  };
}

async function saveManifest(id, manifest) {
  const saved = await writeJson(`media/${leagueId(id)}.json`, {
    ...manifest,
    version: MANIFEST_VERSION,
    provider: PROVIDER,
    sourceMode: SOURCE_MODE
  });
  return saved.document;
}

async function readCatalog(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  const raw = await readJson(`media/catalog-${id}.json`, newCatalog(id));
  if (!raw || raw.provider !== PROVIDER || raw.version !== CATALOG_VERSION) return newCatalog(id);
  const catalog = {
    ...newCatalog(id),
    ...raw,
    seed: { loadedAt: null, teams: {}, ...(raw.seed || {}) },
    teams: raw.teams || {},
    players: raw.players || {},
    quota: { ...newCatalog(id).quota, ...(raw.quota || {}) }
  };
  if (catalog.quota.date !== utcDay()) catalog.quota = { date: utcDay(), used: 0, safetyLimit: API_DAILY_SAFETY_LIMIT };
  return catalog;
}

async function saveCatalog(id, catalog) {
  const saved = await writeJson(`media/catalog-${leagueId(id)}.json`, {
    ...catalog,
    version: CATALOG_VERSION,
    provider: PROVIDER
  });
  return saved.document;
}

async function readApiQuota() {
  const fallback = { date: utcDay(), used: 0, safetyLimit: API_DAILY_SAFETY_LIMIT };
  const quota = await readJson("media/api-football-quota.json", fallback);
  if (!quota || quota.date !== utcDay()) return fallback;
  return { ...fallback, ...quota, used: Math.max(0, Number(quota.used || 0)) };
}

async function saveApiQuota(quota) {
  const safe = quota?.date === utcDay()
    ? { date: utcDay(), used: Math.max(0, Number(quota.used || 0)), safetyLimit: API_DAILY_SAFETY_LIMIT }
    : { date: utcDay(), used: 0, safetyLimit: API_DAILY_SAFETY_LIMIT };
  const saved = await writeJson("media/api-football-quota.json", safe);
  return saved.document;
}

function apiKey() {
  const value = String(process.env.API_FOOTBALL_KEY || "").trim();
  if (!value) throw new Error("API_FOOTBALL_KEY non configurata");
  return value;
}

function reserveApiRequest(catalog) {
  const today = utcDay();
  if (catalog.quota?.date !== today) catalog.quota = { date: today, used: 0, safetyLimit: API_DAILY_SAFETY_LIMIT };
  const used = Number(catalog.quota.used || 0);
  if (used >= API_DAILY_SAFETY_LIMIT) throw new Error(`Limite prudenziale API-Football raggiunto (${used}/${API_DAILY_SAFETY_LIMIT})`);
  catalog.quota.used = used + 1;
}

async function apiFootballGet(pathname, params, catalog, timeoutMs = 20000) {
  reserveApiRequest(catalog);
  const url = new URL(pathname, API_BASE_URL);
  Object.entries(params || {}).forEach(([key, value]) => {
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
        "x-apisports-key": apiKey(),
        "User-Agent": "Lineup-Fanta/1.0"
      }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(`API-Football HTTP ${response.status}`);
    const errors = payload?.errors;
    const hasErrors = Array.isArray(errors) ? errors.length > 0 : Boolean(errors && Object.keys(errors).length);
    if (hasErrors) {
      const values = Array.isArray(errors) ? errors : Object.values(errors);
      const message = values.map((value) => typeof value === "string" ? value : JSON.stringify(value)).join(" · ");
      throw new Error(`API-Football: ${message || "richiesta non riuscita"}`);
    }
    return payload;
  } finally { clearTimeout(timer); }
}

async function fetchImage(url, timeoutMs = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: { Accept: "image/png,image/jpeg,image/webp,*/*;q=0.5", "User-Agent": "Lineup-Fanta/1.0" }
    });
    if (!response.ok) throw new Error(`Foto API-Football HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!bytes.length || bytes.length > 4 * 1024 * 1024) throw new Error("Foto API-Football non valida");
    let mimeType = String(response.headers.get("content-type") || "image/png").split(";")[0];
    if (!/^image\/(png|jpeg|webp)$/.test(mimeType)) mimeType = "image/png";
    return { bytes, mimeType };
  } finally { clearTimeout(timer); }
}

function playerPhotoUrl(id) {
  const value = String(id || "").trim();
  return /^\d+$/.test(value) ? `https://media.api-sports.io/football/players/${value}.png` : "";
}

async function cacheFirstImage(folder, name, urls) {
  let lastError = null;
  const uniqueUrls = [...new Set((urls || []).filter(Boolean))];
  for (const url of uniqueUrls) {
    try {
      const image = await fetchImage(url);
      const stored = await uploadImmutableImage(folder, name, image.bytes, image.mimeType);
      return { url: stored.url, sourceUrl: url, cached: true };
    } catch (error) { lastError = error; }
  }
  // Il CDN ufficiale resta un fallback valido. Al prossimo full sync si ritenta
  // la copia su Blob senza bloccare la faccia nel frontend.
  if (uniqueUrls[0]) return { url: uniqueUrls[0], sourceUrl: uniqueUrls[0], cached: false, cacheError: lastError?.message || "" };
  if (lastError) throw lastError;
  throw new Error("Foto API-Football non disponibile");
}

function collectApiFootballTeams(payload) {
  const teams = {};
  (payload?.response || []).forEach((entry) => {
    const team = entry?.team || entry;
    const id = String(team?.id || "").trim();
    const name = String(team?.name || "").trim();
    if (!/^\d+$/.test(id) || !name) return;
    const key = clubKey(name);
    teams[key] = { id, name, key, country: String(team?.country || "") };
  });
  return teams;
}

function collectApiFootballSquad(payload, team) {
  const entries = payload?.response || [];
  const root = entries.find((entry) => String(entry?.team?.id || "") === String(team.id)) || entries[0] || {};
  const players = Array.isArray(root.players) ? root.players : [];
  return players.map((player) => {
    const id = String(player?.id || "").trim();
    const name = String(player?.name || "").trim();
    if (!/^\d+$/.test(id) || !name) return null;
    const photo = String(player?.photo || playerPhotoUrl(id)).trim();
    return {
      id,
      name,
      names: [...new Set([name].filter(Boolean))],
      teamName: String(team.name || root?.team?.name || ""),
      teamId: String(team.id),
      teamKey: String(team.key || clubKey(team.name)),
      photoUrl: photo,
      photoUrls: [photo, playerPhotoUrl(id)].filter(Boolean),
      providerPosition: String(player?.position || ""),
      providerNumber: player?.number ?? null,
      providerAge: player?.age ?? null
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
  if (map?.[target]) return map[target];
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

async function ensureSeedTeams(id, catalog, { force = false } = {}) {
  const config = LEAGUE_CONFIG[id];
  if (!config) throw new Error("Lega API-Football non configurata");
  const usable = Object.keys(catalog.seed?.teams || {}).length > 0 && ageMs(catalog.seed?.loadedAt) < TEAM_CATALOG_MAX_AGE_MS;
  if (!force && usable) return catalog;
  const payload = await apiFootballGet("/teams", { league: config.providerLeagueId, season: config.seedSeason }, catalog);
  const teams = collectApiFootballTeams(payload);
  if (!Object.keys(teams).length) throw new Error("API-Football non ha restituito le squadre base");
  catalog.seed = { loadedAt: isoNow(), season: config.seedSeason, teams };
  return catalog;
}

async function searchProviderTeam(id, rawTeamName, catalog) {
  const config = LEAGUE_CONFIG[id];
  const key = clubKey(rawTeamName);
  const query = PROVIDER_SEARCH_NAMES[key] || rawTeamName;
  const payload = await apiFootballGet("/teams", { search: query }, catalog);
  const teams = collectApiFootballTeams(payload);
  return bestProviderTeam(rawTeamName, teams, config.country);
}

async function resolveProviderTeam(id, rawTeamName, catalog) {
  const key = clubKey(rawTeamName);
  const existing = catalog.teams[key];
  if (existing?.id) return existing;

  const config = LEAGUE_CONFIG[id];
  const fromSeed = bestProviderTeam(rawTeamName, catalog.seed?.teams || {}, config.country);
  const found = fromSeed || await searchProviderTeam(id, rawTeamName, catalog);
  if (!found?.id) throw new Error(`Squadra API-Football non trovata: ${rawTeamName}`);
  const team = {
    id: String(found.id),
    name: String(found.name || rawTeamName),
    listoneName: rawTeamName,
    key,
    country: String(found.country || config.country || ""),
    playerIds: existing?.playerIds || [],
    checkedAt: existing?.checkedAt || null,
    error: ""
  };
  catalog.teams[key] = team;
  return team;
}

async function refreshTeamSquad(id, rawTeamName, catalog, { force = false } = {}) {
  const key = clubKey(rawTeamName);
  const team = await resolveProviderTeam(id, rawTeamName, catalog);
  const current = catalog.teams[key] || team;
  const usable = Array.isArray(current.playerIds) && current.playerIds.length > 0;
  if (!force && usable) return current;

  try {
    const payload = await apiFootballGet("/players/squads", { team: team.id }, catalog);
    const candidates = collectApiFootballSquad(payload, { ...team, key });
    if (!candidates.length) throw new Error(`API-Football non ha restituito la rosa di ${team.name}`);
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
  return { selected, candidates: ranked.slice(0, 12).map(({ candidate, score }) => ({ ...candidate, score })) };
}

function candidatesForAsset(catalog, asset) {
  const target = clubKey(asset.realTeam);
  return Object.values(catalog.players || {}).filter((candidate) => String(candidate.teamKey || clubKey(candidate.teamName)) === target);
}

function resolveAssetFromCatalog(catalog, asset) {
  return chooseCandidate(asset, candidatesForAsset(catalog, asset));
}

async function storeResolved(id, asset, candidate, manifest, matchedBy = "automatic") {
  const key = playerKey(asset.displayName, asset.realTeam);
  const externalId = String(candidate?.id || candidate?.playerId || "").trim();
  if (!/^\d+$/.test(externalId)) throw new Error("Giocatore API-Football non valido");
  const externalName = String(candidate?.name || candidate?.playerName || asset.displayName);
  const sourceUrls = candidate?.photoUrls?.length
    ? candidate.photoUrls
    : [candidate?.photoUrl, playerPhotoUrl(externalId)].filter(Boolean);
  const photo = await cacheFirstImage(`player-images/${id}`, `${externalId}-${externalName}`, sourceUrls);
  const entry = {
    key,
    listoneName: asset.displayName,
    realTeam: asset.realTeam,
    externalId,
    externalName,
    externalTeam: String(candidate?.teamName || asset.realTeam || ""),
    photoUrl: photo.url,
    sourcePhotoUrl: photo.sourceUrl,
    cached: photo.cached,
    cacheError: photo.cacheError || "",
    status: "resolved",
    matchedBy,
    checkedAt: isoNow(),
    candidates: []
  };
  manifest.players[key] = entry;
  return entry;
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

async function syncMissing(rawLeagueId, options = {}) {
  const id = leagueId(rawLeagueId);
  let manifest = await readManifest(id);
  let catalog = await readCatalog(id);
  catalog.quota = await readApiQuota();
  const { assets } = await loadLeagueAssets(id);
  const players = listonePlayers(assets);
  const missing = players.filter((asset) => !manifest.players[playerKey(asset.displayName, asset.realTeam)]);
  const limit = Math.max(0, Math.min(Number(options.limit ?? 4), 24));
  const targets = missing.slice(0, limit);

  if (options.refreshTeams && targets.length) {
    try {
      catalog = await ensureSeedTeams(id, catalog);
      const clubs = uniqueClubs(targets).slice(0, 4);
      for (const club of clubs) {
        const hasCandidates = Object.values(catalog.players).some((candidate) => String(candidate.teamKey) === clubKey(club));
        if (!hasCandidates) {
          try { await refreshTeamSquad(id, club, catalog, { force: true }); }
          catch {}
        }
      }
      catalog = await saveCatalog(id, catalog);
      await saveApiQuota(catalog.quota);
    } catch {
      await saveApiQuota(catalog.quota).catch(() => {});
    }
  }

  for (const asset of targets) {
    const key = playerKey(asset.displayName, asset.realTeam);
    try {
      const result = resolveAssetFromCatalog(catalog, asset);
      if (result.selected) await storeResolved(id, asset, result.selected, manifest);
      else manifest.players[key] = {
        key,
        listoneName: asset.displayName,
        realTeam: asset.realTeam,
        status: "unresolved",
        candidates: result.candidates,
        checkedAt: isoNow(),
        error: result.candidates.length ? "Associazione da confermare" : "Giocatore non trovato nel catalogo API-Football"
      };
    } catch (error) {
      manifest.players[key] = { key, listoneName: asset.displayName, realTeam: asset.realTeam, status: "unresolved", candidates: [], error: error.message, checkedAt: isoNow() };
    }
  }

  if (targets.length || options.forceSave) manifest = await saveManifest(id, manifest);
  return { manifest, total: players.length, processed: targets.length, remaining: Math.max(0, missing.length - targets.length) };
}

async function markFullSync(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  let manifest = await readManifest(id);
  manifest.refresh = {
    pending: true,
    phase: "teams",
    teamCursor: 0,
    playerCursor: 0,
    requestedAt: isoNow(),
    completedAt: null,
    error: ""
  };
  manifest = await saveManifest(id, manifest);
  return manifest;
}

async function processFullSync(rawLeagueId, limit = 6) {
  const id = leagueId(rawLeagueId);
  let manifest = await readManifest(id);
  if (!manifest.refresh?.pending) return manifest;
  let catalog = await readCatalog(id);
  catalog.quota = await readApiQuota();
  const { assets } = await loadLeagueAssets(id);
  const clubs = uniqueClubs(assets);
  const players = listonePlayers(assets);
  const batchLimit = Math.max(1, Math.min(Number(limit || 6), 10));

  try {
    if (manifest.refresh.phase === "teams") {
      catalog = await ensureSeedTeams(id, catalog);
      const start = Number(manifest.refresh.teamCursor || 0);
      const batch = clubs.slice(start, start + batchLimit);
      for (const club of batch) {
        try { await refreshTeamSquad(id, club, catalog, { force: true }); }
        catch (error) {
          // Salviamo l'errore del singolo club e continuiamo con gli altri.
          const key = clubKey(club);
          catalog.teams[key] = { ...(catalog.teams[key] || {}), key, listoneName: club, error: error.message, checkedAt: isoNow() };
        }
      }
      catalog = await saveCatalog(id, catalog);
      await saveApiQuota(catalog.quota);
      const next = start + batch.length;
      const quotaUsed = Number(catalog.quota?.used || 0);
      if (next >= clubs.length) manifest.refresh = { ...manifest.refresh, phase: "players", teamCursor: clubs.length, playerCursor: 0, teamTotal: clubs.length, playerTotal: players.length, quotaUsed, quotaLimit: API_DAILY_SAFETY_LIMIT, error: "" };
      else manifest.refresh = { ...manifest.refresh, teamCursor: next, teamTotal: clubs.length, playerTotal: players.length, quotaUsed, quotaLimit: API_DAILY_SAFETY_LIMIT, error: "" };
      manifest = await saveManifest(id, manifest);
      return manifest;
    }

    const start = Number(manifest.refresh.playerCursor || 0);
    // Le facce non consumano quota API, ma download e upload vengono tenuti in
    // piccoli gruppi paralleli per non allungare troppo una singola Function.
    const playerBatchSize = Math.max(4, Math.min(8, batchLimit + 2));
    const batch = players.slice(start, start + playerBatchSize);
    await Promise.all(batch.map(async (asset) => {
      const key = playerKey(asset.displayName, asset.realTeam);
      try {
        const existing = manifest.players[key];
        const pinned = existing?.matchedBy === "manual" && /^\d+$/.test(String(existing.externalId || ""))
          ? catalog.players[String(existing.externalId)] || {
              id: String(existing.externalId),
              name: existing.externalName || asset.displayName,
              teamName: existing.externalTeam || asset.realTeam,
              teamKey: clubKey(asset.realTeam),
              photoUrls: [existing.sourcePhotoUrl, playerPhotoUrl(existing.externalId)].filter(Boolean)
            }
          : null;
        const result = pinned ? { selected: pinned, candidates: [] } : resolveAssetFromCatalog(catalog, asset);
        if (result.selected) await storeResolved(id, asset, result.selected, manifest, pinned ? "manual" : "full-sync");
        else manifest.players[key] = {
          key,
          listoneName: asset.displayName,
          realTeam: asset.realTeam,
          status: "unresolved",
          candidates: result.candidates,
          checkedAt: isoNow(),
          error: result.candidates.length ? "Associazione da confermare" : "Giocatore non trovato nella rosa API-Football del club"
        };
      } catch (error) {
        manifest.players[key] = { key, listoneName: asset.displayName, realTeam: asset.realTeam, status: "unresolved", candidates: [], checkedAt: isoNow(), error: error.message };
      }
    }));
    const next = start + batch.length;
    manifest.refresh = next >= players.length
      ? { pending: false, phase: "idle", teamCursor: 0, playerCursor: 0, teamTotal: clubs.length, playerTotal: players.length, quotaUsed: Number(catalog.quota?.used || 0), quotaLimit: API_DAILY_SAFETY_LIMIT, completedAt: isoNow(), error: "" }
      : { ...manifest.refresh, phase: "players", playerCursor: next, teamTotal: clubs.length, playerTotal: players.length, quotaUsed: Number(catalog.quota?.used || 0), quotaLimit: API_DAILY_SAFETY_LIMIT, error: "" };
    manifest = await saveManifest(id, manifest);
    return manifest;
  } catch (error) {
    manifest.refresh = { ...manifest.refresh, quotaUsed: Number(catalog.quota?.used || 0), quotaLimit: API_DAILY_SAFETY_LIMIT, error: error.message || "Sincronizzazione fallita" };
    await saveCatalog(id, catalog);
    await saveApiQuota(catalog.quota).catch(() => {});
    return saveManifest(id, manifest);
  }
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
    .map(({ candidate, score }) => ({ ...candidate, score }));
}

async function linkManual(rawLeagueId, key, candidate) {
  const id = leagueId(rawLeagueId);
  let manifest = await readManifest(id);
  const existing = manifest.players[key];
  if (!existing) throw new Error("Giocatore del Listone non trovato");
  const externalId = String(candidate?.id || candidate?.externalId || "").trim();
  const entry = await storeResolved(id, { displayName: existing.listoneName, realTeam: existing.realTeam }, {
    ...candidate,
    id: externalId,
    name: candidate?.name || existing.listoneName,
    teamName: candidate?.teamName || existing.realTeam,
    photoUrls: candidate?.photoUrls?.length ? candidate.photoUrls : [candidate?.photoUrl, playerPhotoUrl(externalId)].filter(Boolean)
  }, manifest, "manual");
  manifest = await saveManifest(id, manifest);
  return entry;
}

function summary(manifest) {
  const values = Object.values(manifest.players || {});
  return {
    resolved: values.filter((entry) => entry.status === "resolved" && entry.photoUrl).length,
    unresolved: values.filter((entry) => entry.status !== "resolved" || !entry.photoUrl).length,
    refreshPending: Boolean(manifest.refresh?.pending)
  };
}

function publicManifest(manifest) {
  return {
    version: MANIFEST_VERSION,
    leagueId: manifest.leagueId,
    provider: PROVIDER,
    sourceMode: SOURCE_MODE,
    updatedAt: manifest.updatedAt,
    players: manifest.players,
    refresh: manifest.refresh,
    summary: summary(manifest)
  };
}

function isFullSyncDate(date = new Date()) {
  const monthDay = `${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  return FULL_SYNC_DATES.has(monthDay);
}

module.exports = {
  API_DAILY_SAFETY_LIMIT,
  FULL_SYNC_DATES,
  clubKey,
  chooseCandidate,
  collectApiFootballSquad,
  collectApiFootballTeams,
  isFullSyncDate,
  linkManual,
  markFullSync,
  playerKey,
  playerPhotoUrl,
  processFullSync,
  publicManifest,
  readManifest,
  searchProvider,
  summary,
  syncMissing
};
