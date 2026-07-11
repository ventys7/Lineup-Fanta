const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");

const CONFIG_VERSION = 1;
const RUNTIME_PREFIX = "lineup-fanta";
const LOCAL_RUNTIME_DIR = path.join(process.cwd(), ".lineup-runtime");

let blobSdkPromise = null;

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeLeagueId(value) {
  if (value === "fp" || value === "pd") return value;
  throw new Error("Lega non valida");
}

function normalizeMatchdayEntry(rawValue) {
  const url = typeof rawValue === "string"
    ? rawValue.trim()
    : String(rawValue?.url ?? "").trim();
  if (!/^https?:\/\//i.test(url)) return null;

  const label = isRecord(rawValue) ? String(rawValue.label ?? "").trim() : "";
  return { url, ...(label ? { label } : {}) };
}

function normalizeRegistry(rawValue) {
  const source = isRecord(rawValue) ? rawValue : {};
  const hasNewShape = Object.prototype.hasOwnProperty.call(source, "matchdays")
    || Object.prototype.hasOwnProperty.call(source, "activeFantasyMatchday");

  const activeValue = Number(source.activeFantasyMatchday);
  const activeFantasyMatchday = Number.isInteger(activeValue) && activeValue > 0
    ? activeValue
    : null;

  const rawMatchdays = hasNewShape && isRecord(source.matchdays)
    ? source.matchdays
    : source;
  const matchdays = {};

  for (const [key, rawEntry] of Object.entries(rawMatchdays)) {
    const day = Number(key);
    if (!Number.isInteger(day) || day <= 0) continue;
    const entry = normalizeMatchdayEntry(rawEntry);
    if (entry) matchdays[String(day)] = entry;
  }

  return { activeFantasyMatchday, matchdays };
}

function normalizeTeamsDocument(rawValue) {
  const source = isRecord(rawValue) ? structuredClone(rawValue) : {};
  source.version = Number.isInteger(source.version) ? source.version : 1;
  source.teams = isRecord(source.teams) ? source.teams : {};
  return source;
}

function normalizeRuntimeDocument(rawValue, leagueId) {
  const league = normalizeLeagueId(leagueId);
  const source = isRecord(rawValue) ? rawValue : {};

  return {
    version: CONFIG_VERSION,
    leagueId: league,
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : null,
    registry: normalizeRegistry(source.registry),
    teams: normalizeTeamsDocument(source.teams)
  };
}

function configPathname(leagueId) {
  return `${RUNTIME_PREFIX}/config/${normalizeLeagueId(leagueId)}.json`;
}

function localConfigPath(leagueId) {
  return path.join(LOCAL_RUNTIME_DIR, "config", `${normalizeLeagueId(leagueId)}.json`);
}

function hasBlobCredentials() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN
    || (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN)
  );
}

function useLocalRuntime() {
  return !process.env.VERCEL && !hasBlobCredentials();
}

async function getBlobSdk() {
  if (!blobSdkPromise) blobSdkPromise = import("@vercel/blob");
  return blobSdkPromise;
}

async function readJsonFile(filePath, fallback = {}) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return fallback;
    throw error;
  }
}

async function readRepositoryFallback(leagueId) {
  const league = normalizeLeagueId(leagueId);
  const [registryDocument, teamsDocument] = await Promise.all([
    readJsonFile(path.join(process.cwd(), "data", "matchday-links.json"), {}),
    readJsonFile(path.join(process.cwd(), "data", league, "teams.json"), {})
  ]);

  return normalizeRuntimeDocument({
    registry: registryDocument[league],
    teams: teamsDocument
  }, league);
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

  text += decoder.decode();
  return text;
}

async function readBlobDocument(leagueId) {
  const { get } = await getBlobSdk();
  const result = await get(configPathname(leagueId), {
    access: "public",
    useCache: false
  });

  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await streamToText(result.stream);

  return {
    document: normalizeRuntimeDocument(JSON.parse(text || "{}"), leagueId),
    etag: result.blob.etag || null,
    source: "blob",
    url: result.blob.url || ""
  };
}

async function readLocalDocument(leagueId) {
  const filePath = localConfigPath(leagueId);
  try {
    const raw = JSON.parse(await fs.readFile(filePath, "utf8"));
    return {
      document: normalizeRuntimeDocument(raw, leagueId),
      etag: null,
      source: "local",
      url: ""
    };
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function readRuntimeDocument(leagueId, options = {}) {
  const league = normalizeLeagueId(leagueId);
  const fallback = await readRepositoryFallback(league);

  if (useLocalRuntime()) {
    const local = await readLocalDocument(league);
    return local || { document: fallback, etag: null, source: "repository", url: "" };
  }

  if (!hasBlobCredentials()) {
    if (options.requireWritable) {
      throw new Error("Vercel Blob non configurato per questo ambiente");
    }
    return { document: fallback, etag: null, source: "repository", url: "" };
  }

  try {
    const blob = await readBlobDocument(league);
    return blob || { document: fallback, etag: null, source: "repository", url: "" };
  } catch (error) {
    if (options.requireWritable) throw error;
    console.error("runtime Blob read error; using repository fallback", error);
    return { document: fallback, etag: null, source: "repository", url: "" };
  }
}

async function writeRuntimeDocument(leagueId, rawDocument, options = {}) {
  const league = normalizeLeagueId(leagueId);
  const document = normalizeRuntimeDocument({
    ...rawDocument,
    updatedAt: new Date().toISOString()
  }, league);
  const json = `${JSON.stringify(document, null, 2)}\n`;

  if (useLocalRuntime()) {
    const filePath = localConfigPath(league);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, json, "utf8");
    return { document, etag: null, source: "local", url: "" };
  }

  if (!hasBlobCredentials()) {
    throw new Error("Vercel Blob non configurato per questo ambiente");
  }

  const { put } = await getBlobSdk();
  const blob = await put(configPathname(league), json, {
    access: "public",
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
    allowOverwrite: true,
    ...(options.ifMatch ? { ifMatch: options.ifMatch } : {})
  });

  return {
    document,
    etag: blob.etag || null,
    source: "blob",
    url: blob.url || ""
  };
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "fantasquadra";
}

function localLogoUrl(relativePath) {
  return `/.lineup-runtime/${relativePath.split(path.sep).join("/")}`;
}

async function uploadTeamLogo(leagueId, teamName, bytes) {
  const league = normalizeLeagueId(leagueId);
  const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  const basename = `${slugify(teamName)}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}.png`;

  if (useLocalRuntime()) {
    const relative = path.join("logos", league, basename);
    const filePath = path.join(LOCAL_RUNTIME_DIR, relative);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, buffer);
    return { url: localLogoUrl(relative), pathname: filePath, source: "local" };
  }

  if (!hasBlobCredentials()) {
    throw new Error("Vercel Blob non configurato per questo ambiente");
  }

  const { put } = await getBlobSdk();
  const blob = await put(`${RUNTIME_PREFIX}/team-logos/${league}/${basename}`, buffer, {
    access: "public",
    contentType: "image/png",
    cacheControlMaxAge: 31536000,
    addRandomSuffix: true
  });

  return { url: blob.url, pathname: blob.pathname, source: "blob" };
}

function isManagedBlobUrl(value) {
  try {
    const parsed = new URL(String(value));
    return parsed.hostname.endsWith(".blob.vercel-storage.com")
      && parsed.pathname.includes(`/${RUNTIME_PREFIX}/team-logos/`);
  } catch {
    return false;
  }
}

function localPathFromUrl(value) {
  const prefix = "/.lineup-runtime/";
  const url = String(value || "");
  if (!url.startsWith(prefix)) return null;
  const relative = url.slice(prefix.length).split("/").join(path.sep);
  const absolute = path.resolve(LOCAL_RUNTIME_DIR, relative);
  return absolute.startsWith(`${path.resolve(LOCAL_RUNTIME_DIR)}${path.sep}`) ? absolute : null;
}


function isManagedLogoUrl(value) {
  return Boolean(localPathFromUrl(value)) || isManagedBlobUrl(value);
}

async function deleteManagedLogo(value) {
  const localPath = localPathFromUrl(value);
  if (localPath) {
    try { await fs.unlink(localPath); } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
    return;
  }

  if (!isManagedBlobUrl(value) || !hasBlobCredentials()) return;
  const { del } = await getBlobSdk();
  await del(value);
}

function isPreconditionError(error) {
  return error?.name === "BlobPreconditionFailedError"
    || error?.code === "BLOB_PRECONDITION_FAILED"
    || /precondition/i.test(String(error?.message || ""));
}

module.exports = {
  CONFIG_VERSION,
  RUNTIME_PREFIX,
  configPathname,
  hasBlobCredentials,
  isManagedBlobUrl,
  isManagedLogoUrl,
  isPreconditionError,
  normalizeLeagueId,
  normalizeRegistry,
  normalizeRuntimeDocument,
  normalizeTeamsDocument,
  readRepositoryFallback,
  readRuntimeDocument,
  writeRuntimeDocument,
  uploadTeamLogo,
  deleteManagedLogo,
  useLocalRuntime
};
