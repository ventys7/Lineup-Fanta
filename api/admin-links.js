const crypto = require("node:crypto");

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function timingSafeEqualText(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  return leftBuffer.length === rightBuffer.length
    && crypto.timingSafeEqual(leftBuffer, rightBuffer);
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

module.exports = async function handler(req, res) {
  setNoStore(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const passwordHash = process.env.ADMIN_LINKS_PASSWORD_HASH;
  if (!passwordHash) {
    return res.status(503).json({
      error: "ADMIN_LINKS_PASSWORD_HASH non configurato su Vercel"
    });
  }

  let rawBody = req.body;
  if (typeof rawBody === "string") {
    try { rawBody = JSON.parse(rawBody); } catch { rawBody = {}; }
  }
  const body = isRecord(rawBody) ? rawBody : {};
  const leagueId = body.leagueId === "pd" ? "pd" : body.leagueId === "fp" ? "fp" : null;

  if (!leagueId) return res.status(400).json({ error: "Lega non valida" });

  let passwordValid = false;
  try {
    passwordValid = await verifyPassword(body.password, passwordHash);
  } catch (error) {
    console.error("admin password verify error", error);
  }

  if (!passwordValid) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return res.status(401).json({ error: "Password errata" });
  }

  let leaguePayload;
  try {
    leaguePayload = normalizeLeaguePayload(body.registry);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Dati non validi" });
  }

  const repo = repositoryName();
  const branch = process.env.ADMIN_GITHUB_BRANCH || "main";
  const filePath = "data/matchday-links.json";
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");

  try {
    const current = await githubRequest(
      `/repos/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`
    );

    const decoded = Buffer.from(current.content || "", "base64").toString("utf8");
    const registry = JSON.parse(decoded || "{}");
    registry.fp = isRecord(registry.fp) ? registry.fp : {
      activeFantasyMatchday: null,
      matchdays: {}
    };
    registry.pd = isRecord(registry.pd) ? registry.pd : {
      activeFantasyMatchday: null,
      matchdays: {}
    };
    registry[leagueId] = leaguePayload;

    const content = Buffer.from(
      `${JSON.stringify(registry, null, 2)}\n`,
      "utf8"
    ).toString("base64");

    const updated = await githubRequest(
      `/repos/${repo}/contents/${encodedPath}`,
      {
        method: "PUT",
        body: JSON.stringify({
          message: `chore: update ${leagueId.toUpperCase()} matchday links`,
          content,
          sha: current.sha,
          branch
        })
      }
    );

    return res.status(200).json({
      ok: true,
      message: "Configurazione salvata. Vercel avvierà un nuovo deploy.",
      commitUrl: updated?.commit?.html_url || ""
    });
  } catch (error) {
    console.error("admin links GitHub update error", error);
    return res.status(502).json({
      error: error.message || "Salvataggio GitHub non riuscito"
    });
  }
};
