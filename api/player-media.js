const { isAuthenticated } = require("../lib/admin-auth.cjs");
const { methodNotAllowed, readBody } = require("../lib/http.cjs");
const { leagueId } = require("../lib/settings.cjs");
const {
  mediaStatus,
  publicManifest,
  readManifest,
  refreshDirectManifest,
  searchProvider,
  searchProviderTeams
} = require("../lib/player-media.cjs");

function publicCache(res) {
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400");
}

function privateNoStore(res) {
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const authenticated = isAuthenticated(req);
      const fresh = String(req.query?.fresh || "") === "1" && authenticated;
      const id = leagueId(req.query?.league);
      if (fresh) {
        privateNoStore(res);
        return res.status(200).json(await mediaStatus(id, { fresh: true }));
      }
      publicCache(res);
      return res.status(200).json(publicManifest(await readManifest(id)));
    }

    if (req.method !== "POST") return methodNotAllowed(res, ["GET", "POST"]);
    privateNoStore(res);
    if (!isAuthenticated(req)) return res.status(401).json({ error: "Accesso admin richiesto" });

    const body = readBody(req);
    const id = leagueId(body.leagueId);

    if (["refresh", "sync-missing", "full-sync", "continue-sync", "continue-full-sync"].includes(body.action)) {
      return res.status(200).json(publicManifest(await refreshDirectManifest(id)));
    }
    if (body.action === "search") {
      return res.status(200).json({ candidates: await searchProvider(id, body.query, body.teamName) });
    }
    if (body.action === "search-team") {
      return res.status(200).json({ candidates: await searchProviderTeams(id, body.teamName) });
    }
    if (["link", "link-id", "link-team"].includes(body.action)) {
      return res.status(409).json({
        code: "DIRECT_BSD_IMAGES",
        error: "Le facce usano URL BSD diretti. I collegamenti manuali persistenti sono disattivati per non scrivere nel Blob."
      });
    }
    return res.status(400).json({ error: "Azione non riconosciuta" });
  } catch (error) {
    return res.status(502).json({ error: error.message || "Media non disponibili" });
  }
};
