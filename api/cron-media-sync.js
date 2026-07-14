const { isFullSyncDate, markFullSync, processFullSync, readManifest, syncMissing } = require("../lib/player-media.cjs");

module.exports = async function handler(req, res) {
  const configuredSecret = String(process.env.CRON_SECRET || "").trim();
  if (configuredSecret && req.headers?.authorization !== `Bearer ${configuredSecret}`) {
    return res.status(401).json({ error: "Non autorizzato" });
  }

  const scheduledToday = isFullSyncDate();
  const deadline = Date.now() + 245_000;
  const result = {};

  for (const id of ["fp", "pd"]) {
    try {
      let manifest = await readManifest(id);
      let discovery = { processed: 0, remaining: 0, manifest };

      if (!scheduledToday && !manifest.refresh?.pending) {
        discovery = await syncMissing(id, { limit: 12, refreshTeams: false });
        manifest = discovery.manifest;
      }

      if (scheduledToday && !manifest.refresh?.pending) manifest = await markFullSync(id);

      let iterations = 0;
      while (manifest.refresh?.pending && !manifest.refresh?.error && Date.now() < deadline && iterations < 32) {
        manifest = await processFullSync(id, 8);
        iterations += 1;
      }

      result[id] = {
        discovered: Number(discovery.processed || 0),
        discoveryRemaining: Number(discovery.remaining || 0),
        pending: Boolean(manifest.refresh?.pending),
        phase: manifest.refresh?.phase || "idle",
        teamCursor: Number(manifest.refresh?.teamCursor || 0),
        playerCursor: Number(manifest.refresh?.playerCursor || 0),
        quotaUsed: Number(manifest.refresh?.quotaUsed || 0),
        iterations,
        error: String(manifest.refresh?.error || "")
      };
    } catch (error) {
      result[id] = { error: error.message || "Sincronizzazione fallita" };
    }
  }

  return res.status(200).json({ scheduledToday, result });
};
