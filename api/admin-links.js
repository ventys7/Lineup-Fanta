const crypto = require("node:crypto");

const SESSION_COOKIE = "lineup_admin_session";
const SESSION_TTL_SECONDS = 30 * 60;
const MAX_LOGO_UPLOAD_BYTES = 600 * 1024;
const MAX_LOGO_UPLOAD_TOTAL_BYTES = 3 * 1024 * 1024;

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function scryptAsync(password, salt, keyLength) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, keyLength, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

async function verifyPassword(password, encodedHash) {
  const [algorithm, saltHex, hashHex] = String(encodedHash ?? "").split("$");
  if (algorithm !== "scrypt" || !saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = await scryptAsync(String(password ?? ""), salt, expected.length);

  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function sessionSecret(passwordHash) {
  return process.env.ADMIN_LINKS_SESSION_SECRET
    || crypto.createHash("sha256")
      .update(`lineup-admin-session:${String(passwordHash)}`)
      .digest("hex");
}

function signSessionPayload(encodedPayload, secret) {
  return crypto.createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

function createSessionToken(secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  const payload = Buffer.from(JSON.stringify({
    version: 1,
    issuedAt: nowSeconds,
    expiresAt: nowSeconds + SESSION_TTL_SECONDS
  }), "utf8").toString("base64url");

  return `${payload}.${signSessionPayload(payload, secret)}`;
}

function verifySessionToken(token, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  const [payload, signature] = String(token ?? "").split(".");
  if (!payload || !signature) return false;

  const expected = signSessionPayload(payload, secret);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return decoded.version === 1
      && Number.isInteger(decoded.expiresAt)
      && decoded.expiresAt > nowSeconds;
  } catch {
    return false;
  }
}

function parseCookies(header) {
  const cookies = {};
  String(header ?? "").split(";").forEach((part) => {
    const separator = part.indexOf("=");
    if (separator < 0) return;
    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (key) cookies[key] = decodeURIComponent(value);
  });
  return cookies;
}

function isSecureRequest(req) {
  const forwarded = String(req.headers?.["x-forwarded-proto"] ?? "").toLowerCase();
  return forwarded === "https" || Boolean(process.env.VERCEL);
}

function setSessionCookie(req, res, token) {
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${SESSION_TTL_SECONDS}`,
    "HttpOnly",
    "SameSite=Lax"
  ];
  if (isSecureRequest(req)) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

function clearSessionCookie(req, res) {
  const parts = [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "SameSite=Lax"
  ];
  if (isSecureRequest(req)) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

function hasValidSession(req, passwordHash) {
  const token = parseCookies(req.headers?.cookie)[SESSION_COOKIE];
  return verifySessionToken(token, sessionSecret(passwordHash));
}

function normalizeEntry(rawValue) {
  const url = typeof rawValue === "string"
    ? rawValue.trim()
    : String(rawValue?.url ?? "").trim();

  if (!/^https?:\/\//i.test(url)) return null;

  const label = isRecord(rawValue) ? String(rawValue.label ?? "").trim() : "";
  return { url, ...(label ? { label } : {}) };
}

function normalizeLeaguePayload(rawValue) {
  if (!isRecord(rawValue)) throw new Error("Dati lega non validi");

  const activeCandidate = rawValue.activeFantasyMatchday;
  const activeFantasyMatchday = activeCandidate === null || activeCandidate === ""
    ? null
    : Number(activeCandidate);

  if (
    activeFantasyMatchday !== null
    && (!Number.isInteger(activeFantasyMatchday) || activeFantasyMatchday <= 0)
  ) {
    throw new Error("Giornata attiva non valida");
  }

  const rawMatchdays = isRecord(rawValue.matchdays) ? rawValue.matchdays : {};
  const matchdays = {};

  for (const [key, rawEntry] of Object.entries(rawMatchdays)) {
    const day = Number(key);
    if (!Number.isInteger(day) || day <= 0) continue;
    const entry = normalizeEntry(rawEntry);
    if (entry) matchdays[String(day)] = entry;
  }

  return { activeFantasyMatchday, matchdays };
}

function normalizeLogoUrl(rawValue) {
  const value = String(rawValue ?? "").trim();
  if (!value) return "";

  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("URL logo non valido");
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("I loghi devono usare un URL HTTP o HTTPS");
  }

  return value;
}

function teamLogoAssetPath(leagueId, teamName) {
  const slug = String(teamName)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "fantasquadra";
  const hash = crypto.createHash("sha1").update(String(teamName)).digest("hex").slice(0, 8);
  return `assets/team-logos/${leagueId}/${slug}-${hash}.png`;
}

function normalizeLogoUpload(rawUpload) {
  if (!isRecord(rawUpload)) throw new Error("Dati upload logo non validi");
  if (rawUpload.mimeType !== "image/png") {
    throw new Error("Il logo caricato deve essere convertito in PNG");
  }

  const dataBase64 = String(rawUpload.dataBase64 ?? "").trim();
  if (!dataBase64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(dataBase64)) {
    throw new Error("Contenuto del logo non valido");
  }

  const bytes = Buffer.from(dataBase64, "base64");
  if (!bytes.length || bytes.length > MAX_LOGO_UPLOAD_BYTES) {
    throw new Error("Logo troppo pesante");
  }

  const width = Number(rawUpload.width);
  const height = Number(rawUpload.height);
  if (
    !Number.isInteger(width)
    || !Number.isInteger(height)
    || width <= 0
    || height <= 0
    || width > 256
    || height > 256
  ) {
    throw new Error("Dimensioni logo non valide");
  }

  return {
    dataBase64: bytes.toString("base64"),
    sizeBytes: bytes.length,
    width,
    height
  };
}

function prepareTeamsUpdate(rawDocument, rawLogos, rawUploads, leagueId) {
  if (leagueId !== "fp" && leagueId !== "pd") throw new Error("Lega non valida");

  const document = isRecord(rawDocument) ? structuredClone(rawDocument) : {};
  document.version = Number.isInteger(document.version) ? document.version : 1;
  document.teams = isRecord(document.teams) ? document.teams : {};

  if (!isRecord(rawLogos)) throw new Error("Dati loghi non validi");
  const uploads = rawUploads === undefined ? {} : rawUploads;
  if (!isRecord(uploads)) throw new Error("Dati upload loghi non validi");

  for (const teamName of new Set([...Object.keys(rawLogos), ...Object.keys(uploads)])) {
    if (!Object.prototype.hasOwnProperty.call(document.teams, teamName)) {
      throw new Error(`Fantasquadra non riconosciuta: ${teamName}`);
    }
  }

  const files = {};
  const logoUrls = {};
  let totalUploadBytes = 0;

  for (const [teamName, rawProfile] of Object.entries(document.teams)) {
    const profile = isRecord(rawProfile) ? { ...rawProfile } : {};

    if (Object.prototype.hasOwnProperty.call(uploads, teamName)) {
      const upload = normalizeLogoUpload(uploads[teamName]);
      totalUploadBytes += upload.sizeBytes;
      if (totalUploadBytes > MAX_LOGO_UPLOAD_TOTAL_BYTES) {
        throw new Error("Gli upload dei loghi superano il limite totale");
      }

      const assetPath = teamLogoAssetPath(leagueId, teamName);
      profile.logoUrl = `/${assetPath}`;
      files[assetPath] = {
        content: upload.dataBase64,
        encoding: "base64"
      };
    } else if (Object.prototype.hasOwnProperty.call(rawLogos, teamName)) {
      profile.logoUrl = normalizeLogoUrl(rawLogos[teamName]);
    } else if (typeof profile.logoUrl !== "string") {
      profile.logoUrl = "";
    }

    document.teams[teamName] = profile;
    logoUrls[teamName] = profile.logoUrl;
  }

  return { document, files, logoUrls };
}

function normalizeTeamsDocument(rawDocument, rawLogos) {
  return prepareTeamsUpdate(rawDocument, rawLogos, {}, "fp").document;
}

function repositoryName() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;

  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const slug = process.env.VERCEL_GIT_REPO_SLUG;
  if (owner && slug) return `${owner}/${slug}`;

  return "ventys7/Lineup-Fanta";
}

async function githubRequest(pathname, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN non configurato");

  const response = await fetch(`https://api.github.com${pathname}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let payload = null;
  try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }

  if (!response.ok) {
    const message = payload?.message || `GitHub HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

async function readRepositoryJson(repo, branch, filePath) {
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  const current = await githubRequest(
    `/repos/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`
  );
  const decoded = Buffer.from(current.content || "", "base64").toString("utf8");
  return JSON.parse(decoded || "{}");
}

async function commitRepositoryFiles(repo, branch, files, message) {
  const encodedBranch = encodeURIComponent(branch);
  const ref = await githubRequest(`/repos/${repo}/git/ref/heads/${encodedBranch}`);
  const headSha = ref?.object?.sha;
  if (!headSha) throw new Error("Impossibile leggere il branch GitHub");

  const currentCommit = await githubRequest(`/repos/${repo}/git/commits/${headSha}`);
  const baseTree = currentCommit?.tree?.sha;
  if (!baseTree) throw new Error("Impossibile leggere l'albero GitHub");

  const tree = [];
  for (const [filePath, rawFile] of Object.entries(files)) {
    const file = typeof rawFile === "string"
      ? { content: rawFile, encoding: "utf-8" }
      : rawFile;
    if (!isRecord(file) || typeof file.content !== "string") {
      throw new Error(`Contenuto file non valido: ${filePath}`);
    }
    const encoding = file.encoding === "base64" ? "base64" : "utf-8";
    const blob = await githubRequest(`/repos/${repo}/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: file.content, encoding })
    });
    tree.push({ path: filePath, mode: "100644", type: "blob", sha: blob.sha });
  }

  const createdTree = await githubRequest(`/repos/${repo}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseTree, tree })
  });

  const commit = await githubRequest(`/repos/${repo}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: createdTree.sha,
      parents: [headSha]
    })
  });

  await githubRequest(`/repos/${repo}/git/refs/heads/${encodedBranch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false })
  });

  return commit;
}

function readBody(req) {
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return isRecord(req.body) ? req.body : {};
}

async function saveAdminData(body) {
  const leagueId = body.leagueId === "pd" ? "pd" : body.leagueId === "fp" ? "fp" : null;
  if (!leagueId) throw new Error("Lega non valida");

  const leaguePayload = normalizeLeaguePayload(body.registry);
  const repo = repositoryName();
  const branch = process.env.ADMIN_GITHUB_BRANCH || "main";
  const registryPath = "data/matchday-links.json";
  const teamsPath = `data/${leagueId}/teams.json`;

  const [registryDocument, teamsDocument] = await Promise.all([
    readRepositoryJson(repo, branch, registryPath),
    readRepositoryJson(repo, branch, teamsPath)
  ]);

  registryDocument.fp = isRecord(registryDocument.fp)
    ? registryDocument.fp
    : { activeFantasyMatchday: null, matchdays: {} };
  registryDocument.pd = isRecord(registryDocument.pd)
    ? registryDocument.pd
    : { activeFantasyMatchday: null, matchdays: {} };
  registryDocument[leagueId] = leaguePayload;

  const teamsUpdate = prepareTeamsUpdate(
    teamsDocument,
    body.logos,
    body.logoUploads,
    leagueId
  );
  const files = {
    [registryPath]: `${JSON.stringify(registryDocument, null, 2)}\n`,
    [teamsPath]: `${JSON.stringify(teamsUpdate.document, null, 2)}\n`,
    ...teamsUpdate.files
  };

  const commit = await commitRepositoryFiles(
    repo,
    branch,
    files,
    `chore: update ${leagueId.toUpperCase()} admin data`
  );

  return {
    message: "Configurazione salvata. Vercel avvierà un nuovo deploy.",
    commitUrl: commit?.html_url || "",
    logoUrls: teamsUpdate.logoUrls
  };
}

async function handler(req, res) {
  setNoStore(res);

  const passwordHash = process.env.ADMIN_LINKS_PASSWORD_HASH;
  if (!passwordHash) {
    return res.status(503).json({
      error: "ADMIN_LINKS_PASSWORD_HASH non configurato su Vercel"
    });
  }

  if (req.method === "GET") {
    return res.status(200).json({ authenticated: hasValidSession(req, passwordHash) });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const body = readBody(req);
  const action = String(body.action || "save");

  if (action === "login") {
    let valid = false;
    try {
      valid = await verifyPassword(body.password, passwordHash);
    } catch (error) {
      console.error("admin password verify error", error);
    }

    if (!valid) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return res.status(401).json({ error: "Password errata" });
    }

    setSessionCookie(req, res, createSessionToken(sessionSecret(passwordHash)));
    return res.status(200).json({ ok: true, authenticated: true });
  }

  if (action === "logout") {
    clearSessionCookie(req, res);
    return res.status(200).json({ ok: true, authenticated: false });
  }

  if (!hasValidSession(req, passwordHash)) {
    clearSessionCookie(req, res);
    return res.status(401).json({ error: "Sessione scaduta", authenticated: false });
  }

  if (action !== "save") {
    return res.status(400).json({ error: "Azione non valida" });
  }

  try {
    const result = await saveAdminData(body);
    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error("admin GitHub update error", error);
    const status = /non valid|non riconosciuta|Lega|Logo|logo|upload|immagine|Dimensioni/.test(
      String(error.message)
    ) ? 400 : 502;
    return res.status(status).json({
      error: error.message || "Salvataggio GitHub non riuscito"
    });
  }
}

module.exports = handler;
module.exports.__test = {
  SESSION_TTL_SECONDS,
  createSessionToken,
  verifySessionToken,
  normalizeLeaguePayload,
  normalizeLogoUrl,
  normalizeLogoUpload,
  teamLogoAssetPath,
  prepareTeamsUpdate,
  normalizeTeamsDocument
};
