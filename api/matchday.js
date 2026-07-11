const { selectMatchup } = require("../lib/matchday-parser.cjs");
const { readRuntimeDocument } = require("../lib/runtime-data.cjs");
const {
  effectiveParsed,
  isSnapshotStale,
  readCalendarSeasonHint,
  readCurrentMatchdaySnapshot,
  syncMatchdaySnapshot
} = require("../lib/matchday-snapshot.cjs");

const DEFAULT_MAX_AGE_MS = 2 * 60 * 1000;

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

function snapshotMaxAgeMs() {
  const configured = Number(process.env.MATCHDAY_SNAPSHOT_MAX_AGE_MS);
  return Number.isFinite(configured) && configured >= 0 ? configured : DEFAULT_MAX_AGE_MS;
}

module.exports = async function handler(req, res) {
  setNoStore(res);
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const leagueId = req.query.league === "pd" ? "pd" : "fp";
  const day = Number(req.query.day);
  const matchIndex = Number(req.query.match);
  const homeTeam = String(req.query.home ?? "").trim();
  const awayTeam = String(req.query.away ?? "").trim();
  if (!Number.isInteger(day) || day <= 0) {
    return res.status(400).json({ error: "Giornata non valida" });
  }

  let sourceUrl = "";
  try {
    const runtime = await readRuntimeDocument(leagueId);
    const rawEntry = runtime.document.registry.matchdays?.[String(day)];
    sourceUrl = typeof rawEntry === "string" ? rawEntry.trim() : String(rawEntry?.url ?? "").trim();
  } catch (error) {
    console.error("matchday registry read error", error);
    return res.status(500).json({ error: "Registro giornate non disponibile" });
  }
  if (!/^https?:\/\//i.test(sourceUrl)) {
    return res.status(404).json({ error: "Documento della giornata non configurato" });
  }

  let snapshot = null;
  let staleFallback = false;
  let warning = null;
  try {
    snapshot = await readCurrentMatchdaySnapshot(leagueId, day);
    if (!snapshot || isSnapshotStale(snapshot, snapshotMaxAgeMs())) {
      try {
        const calendarSeason = await readCalendarSeasonHint(leagueId, day);
        const synced = await syncMatchdaySnapshot({
          leagueId,
          day,
          sourceUrl,
          seasonHint: calendarSeason || (snapshot?.sourceUrl === sourceUrl ? snapshot.season : "")
        });
        snapshot = synced.snapshot;
      } catch (error) {
        warning = String(error?.message ?? error ?? "");
        if (!snapshot) throw error;
        staleFallback = true;
        console.error("matchday snapshot refresh fallback", error);
      }
    }
  } catch (error) {
    console.error("matchday snapshot unavailable", error);
    return res.status(502).json({
      error: "Documento live non disponibile e nessuna fotografia valida presente",
      detail: String(error?.message ?? error ?? "")
    });
  }

  const parsed = effectiveParsed(snapshot);
  const matchup = selectMatchup(parsed, { homeTeam, awayTeam, matchIndex });
  if (!matchup) {
    return res.status(404).json({ error: "Scontro non trovato nella fotografia della giornata" });
  }
  return res.status(200).json({
    title: parsed.title || snapshot.title || `Giornata Fanta ${day}`,
    sourceUrl: snapshot.sourceUrl || sourceUrl,
    fantasyMatchdayNumber: parsed.fantasyMatchdayNumber || day,
    matchup,
    snapshot: {
      season: snapshot.season,
      syncedAt: snapshot.syncedAt,
      staleFallback,
      warning
    }
  });
};
