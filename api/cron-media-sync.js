const {
  isFullSyncDate,
  markFullSync,
  mediaStatus,
  processFullSync,
  syncMissing
} = require("../lib/player-media.cjs");

function sameUtcDay(value, date = new Date()) {
  const parsed = new Date(String(value || ""));
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
}

module.exports = async function handler(req, res) {
  const configuredSecret = String(process.env.CRON_SECRET || "").trim();
  if (configuredSecret && req.headers?.authorization !== `Bearer ${configuredSecret}`) {
    return res.status(401).json({ error: "Non autorizzato" });
  }

  const now = new Date();
  const scheduledToday = isFullSyncDate(now);
  const deadline = Date.now() + 245_000;
  const result = {};

  for (const id of ["fp", "pd"]) {
    try {
      let status = await mediaStatus(id);
      const alreadyRefreshedToday = status.refresh?.mode === "full" && sameUtcDay(status.refresh?.completedAt, now);

      if (!status.refresh?.pending) {
        if (scheduledToday && !alreadyRefreshedToday) {
          await markFullSync(id);
        } else if (!scheduledToday) {
          await syncMissing(id, { limit: 10 });
        }
        status = await mediaStatus(id);
      }

      let iterations = 0;
      while (status.refresh?.pending && !status.refresh?.error && Date.now() < deadline && iterations < 80) {
        await processFullSync(id, 10);
        status = await mediaStatus(id);
        iterations += 1;
      }

      result[id] = {
        mode: status.refresh?.mode || "",
        pending: Boolean(status.refresh?.pending),
        phase: status.refresh?.phase || "idle",
        teamCursor: Number(status.refresh?.teamCursor || 0),
        playerCursor: Number(status.refresh?.playerCursor || 0),
        resolved: Number(status.summary?.resolved || 0),
        unresolved: Number(status.summary?.unresolved || 0),
        remaining: Number(status.remaining || 0),
        warnings: Array.isArray(status.refresh?.warnings) ? status.refresh.warnings.length : 0,
        iterations,
        error: String(status.refresh?.error || "")
      };
    } catch (error) {
      result[id] = { error: error.message || "Sincronizzazione fallita" };
    }
  }

  return res.status(200).json({ scheduledToday, result });
};
