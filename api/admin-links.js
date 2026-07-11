const crypto = require("node:crypto");
const {
  deleteManagedLogo,
  isManagedLogoUrl,
  isPreconditionError,
  normalizeLeagueId,
  normalizeRegistry,
  normalizeTeamsDocument,
  readRuntimeDocument,
  uploadTeamLogo,
  writeRuntimeDocument
} = require("../lib/runtime-data.cjs");

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

function normalizeLogoUrl(rawValue) {
  const value = String(rawValue ?? "").trim();
  if (!value) return "";

  if (value.startsWith("/") && !value.startsWith("//")) return value;

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

  return { bytes, sizeBytes: bytes.length, width, height };
}

function validateTeamKeys(teamsDocument, logos, uploads) {
  const knownTeams = teamsDocument.teams;
  for (const teamName of new Set([...Object.keys(logos), ...Object.keys(uploads)])) {
    if (!Object.prototype.hasOwnProperty.call(knownTeams, teamName)) {
      throw new Error(`Fantasquadra non riconosciuta: ${teamName}`);
    }
  }
}

function readBody(req) {
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return isRecord(req.body) ? req.body : {};
}

async function buildTeamsUpdate({
  leagueId,
  currentTeams,
  rawLogos,
  rawUploads,
  uploadLogo = uploadTeamLogo
}) {
  const document = normalizeTeamsDocument(currentTeams);
  const logos = isRecord(rawLogos) ? rawLogos : {};
  const uploads = rawUploads === undefined ? {} : rawUploads;
  if (!isRecord(uploads)) throw new Error("Dati upload loghi non validi");

  validateTeamKeys(document, logos, uploads);

  const uploadedUrls = [];
  const replacedManagedUrls = [];
  const logoUrls = {};
  let totalUploadBytes = 0;

  for (const [teamName, rawProfile] of Object.entries(document.teams)) {
    const profile = isRecord(rawProfile) ? { ...rawProfile } : {};
    const previousLogoUrl = typeof profile.logoUrl === "string" ? profile.logoUrl.trim() : "";

    if (Object.prototype.hasOwnProperty.call(uploads, teamName)) {
      const upload = normalizeLogoUpload(uploads[teamName]);
      totalUploadBytes += upload.sizeBytes;
      if (totalUploadBytes > MAX_LOGO_UPLOAD_TOTAL_BYTES) {
        throw new Error("Gli upload dei loghi superano il limite totale");
      }

      const uploaded = await uploadLogo(leagueId, teamName, upload.bytes);
      profile.logoUrl = uploaded.url;
      uploadedUrls.push(uploaded.url);
    } else if (Object.prototype.hasOwnProperty.call(logos, teamName)) {
      profile.logoUrl = normalizeLogoUrl(logos[teamName]);
    } else if (typeof profile.logoUrl !== "string") {
      profile.logoUrl = "";
    }

    if (
      previousLogoUrl
      && previousLogoUrl !== profile.logoUrl
      && isManagedLogoUrl(previousLogoUrl)
    ) {
      replacedManagedUrls.push(previousLogoUrl);
    }

    document.teams[teamName] = profile;
    logoUrls[teamName] = profile.logoUrl;
  }

  return { document, logoUrls, uploadedUrls, replacedManagedUrls };
}

async function saveAdminData(body, dependencies = {}) {
  const leagueId = normalizeLeagueId(body.leagueId);
  const runtime = dependencies.runtime || {
    readRuntimeDocument,
    writeRuntimeDocument,
    uploadTeamLogo,
    deleteManagedLogo
  };

  const current = await runtime.readRuntimeDocument(leagueId, { requireWritable: true });
  const registry = normalizeRegistry(body.registry);
  const teamsUpdate = await buildTeamsUpdate({
    leagueId,
    currentTeams: current.document.teams,
    rawLogos: body.logos,
    rawUploads: body.logoUploads,
    uploadLogo: runtime.uploadTeamLogo
  });

  try {
    const written = await runtime.writeRuntimeDocument(leagueId, {
      ...current.document,
      registry,
      teams: teamsUpdate.document
    }, {
      ifMatch: current.source === "blob" ? current.etag : null
    });

    await Promise.allSettled(
      teamsUpdate.replacedManagedUrls.map((url) => runtime.deleteManagedLogo(url))
    );

    return {
      message: written.source === "blob"
        ? "Configurazione salvata. Nessun deploy avviato."
        : "Configurazione salvata nel runtime locale.",
      storage: written.source,
      updatedAt: written.document.updatedAt,
      logoUrls: teamsUpdate.logoUrls
    };
  } catch (error) {
    await Promise.allSettled(
      teamsUpdate.uploadedUrls.map((url) => runtime.deleteManagedLogo(url))
    );
    throw error;
  }
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
    console.error("admin runtime storage update error", error);

    if (isPreconditionError(error)) {
      return res.status(409).json({
        error: "I dati sono cambiati durante il salvataggio. Ricarica il pannello e riprova."
      });
    }

    const status = /non valid|non riconosciuta|Lega|Logo|logo|upload|immagine|Dimensioni/.test(
      String(error.message)
    ) ? 400 : /non configurato/.test(String(error.message)) ? 503 : 502;

    return res.status(status).json({
      error: error.message || "Salvataggio su Vercel Blob non riuscito"
    });
  }
}

module.exports = handler;
module.exports.__test = {
  SESSION_TTL_SECONDS,
  buildTeamsUpdate,
  createSessionToken,
  normalizeLogoUpload,
  normalizeLogoUrl,
  saveAdminData,
  verifySessionToken
};
