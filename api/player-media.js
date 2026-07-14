const { isAuthenticated } = require("../lib/admin-auth.cjs");
const { methodNotAllowed, readBody } = require("../lib/http.cjs");
const { leagueId } = require("../lib/settings.cjs");
const {
  linkManual,
  markFullSync,
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
      const wantsFresh = String(req.query?.fresh || "") === "1" && isAuthenticated(req);
      if (wantsFresh) privateNoStore(res); else publicCache(res);
      const id = leagueId(req.query?.league);
      return res.status(200).json(publicManifest(await readManifest(id)));
    }

    if (req.method !== "POST") return methodNotAllowed(res, ["GET", "POST"]);
    privateNoStore(res);
    const body = readBody(req);
    const id = leagueId(body.leagueId);

    // Pubblico e idempotente: confronta soltanto i nuovi nomi del Listone con
    // il catalogo locale. Non interroga API-Football e non consuma quota.
    if (body.action === "discover") {
      const synced = await syncMissing(id, { limit: 6, refreshTeams: false });
      return res.status(200).json({ ...publicManifest(synced.manifest), remaining: synced.remaining });
    }

    if (!isAuthenticated(req)) return res.status(401).json({ error: "Accesso admin richiesto" });

    if (body.action === "sync-missing") {
      const synced = await syncMissing(id, { limit: 12, refreshTeams: true });
      return res.status(200).json({ ...publicManifest(synced.manifest), remaining: synced.remaining, processed: synced.processed });
    }
    if (body.action === "full-sync") {
      await markFullSync(id);
      const manifest = await processFullSync(id, 6);
      return res.status(200).json(publicManifest(manifest));
    }
    if (body.action === "continue-full-sync") {
      const manifest = await processFullSync(id, 6);
      return res.status(200).json(publicManifest(manifest));
    }
    if (body.action === "search") {
      return res.status(200).json({ candidates: await searchProvider(id, body.query, body.teamName) });
    }
    if (body.action === "link") {
      return res.status(200).json({ entry: await linkManual(id, body.key, body.candidate) });
    }
    if (body.action === "link-id") {
      const match = String(body.externalId || "").match(/(?:player(?:s|id)?[\/=:-]*)?(\d{3,})/i);
      if (!match) return res.status(400).json({ error: "ID API-Football non valido" });
      return res.status(200).json({ entry: await linkManual(id, body.key, { id: match[1] }) });
    }
    return res.status(400).json({ error: "Azione non riconosciuta" });
  } catch (error) {
    return res.status(502).json({ error: error.message || "Media non disponibili" });
  }
};
