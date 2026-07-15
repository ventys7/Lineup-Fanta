const { isAuthenticated } = require("../lib/admin-auth.cjs");
const { methodNotAllowed, readBody } = require("../lib/http.cjs");
const { leagueId } = require("../lib/settings.cjs");
const {
  linkManual,
  markFullSync,
  mediaStatus,
  processFullSync,
  publicManifest,
  readManifest,
  searchProvider,
  syncMissing
} = require("../lib/player-media.cjs");

function publicCache(res) {
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=86400");
}

function privateNoStore(res) {
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const authenticated = isAuthenticated(req);
      const wantsFresh = String(req.query?.fresh || "") === "1" && authenticated;
      if (wantsFresh) {
        privateNoStore(res);
        return res.status(200).json(await mediaStatus(req.query?.league));
      }
      publicCache(res);
      const id = leagueId(req.query?.league);
      return res.status(200).json(publicManifest(await readManifest(id)));
    }

    if (req.method !== "POST") return methodNotAllowed(res, ["GET", "POST"]);
    privateNoStore(res);
    if (!isAuthenticated(req)) return res.status(401).json({ error: "Accesso admin richiesto" });

    const body = readBody(req);
    const id = leagueId(body.leagueId);

    if (body.action === "sync-missing") {
      const synced = await syncMissing(id, { limit: 4 });
      return res.status(200).json({ ...publicManifest(synced.manifest), remaining: synced.remaining, processed: synced.processed });
    }
    if (body.action === "full-sync") {
      await markFullSync(id);
      const manifest = await processFullSync(id, 4);
      return res.status(200).json(publicManifest(manifest));
    }
    if (body.action === "continue-sync" || body.action === "continue-full-sync") {
      const manifest = await processFullSync(id, 4);
      return res.status(200).json(publicManifest(manifest));
    }
    if (body.action === "search") {
      return res.status(200).json({ candidates: await searchProvider(id, body.query, body.teamName) });
    }
    if (body.action === "link") {
      return res.status(200).json({ entry: await linkManual(id, body.key, body.candidate) });
    }
    if (body.action === "link-id") {
      const match = String(body.externalId || "").match(/(?:player(?:s|id)?[\/=:-]*)?(\d+)/i);
      if (!match) return res.status(400).json({ error: "ID BSD non valido" });
      return res.status(200).json({ entry: await linkManual(id, body.key, { id: match[1] }) });
    }
    return res.status(400).json({ error: "Azione non riconosciuta" });
  } catch (error) {
    return res.status(502).json({ error: error.message || "Media non disponibili" });
  }
};
