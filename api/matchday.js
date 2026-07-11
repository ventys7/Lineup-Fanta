const {
  parseMatchdayHtml,
  selectMatchup
} = require("../lib/matchday-parser.cjs");

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

const { readRuntimeDocument } = require("../lib/runtime-data.cjs");

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

  let leagueRegistry;
  try {
    const runtime = await readRuntimeDocument(leagueId);
    leagueRegistry = runtime.document.registry;
  } catch (error) {
    console.error("matchday registry read error", error);
    return res.status(500).json({ error: "Registro giornate non disponibile" });
  }
  const rawEntry = leagueRegistry.matchdays?.[String(day)];
  const sourceUrl = typeof rawEntry === "string"
    ? rawEntry.trim()
    : String(rawEntry?.url ?? "").trim();

  if (!/^https?:\/\//i.test(sourceUrl)) {
    return res.status(404).json({ error: "Documento della giornata non configurato" });
  }

  let parsed;

  try {
    const separator = sourceUrl.includes("?") ? "&" : "?";
    const response = await fetch(`${sourceUrl}${separator}v=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0",
        "Pragma": "no-cache",
        "User-Agent": "Lineup-Fanta/1.0 (+https://github.com/ventys7/Lineup-Fanta)"
      }
    });

    if (!response.ok) throw new Error(`Google Docs HTTP ${response.status}`);
    const html = await response.text();
    parsed = parseMatchdayHtml(html, sourceUrl);
  } catch (error) {
    console.error("matchday upstream parse error", error);
    return res.status(502).json({
      error: "Documento live non disponibile",
      detail: String(error?.message ?? error ?? "")
    });
  }

  const matchup = selectMatchup(parsed, {
    homeTeam,
    awayTeam,
    matchIndex
  });

  if (!matchup) {
    return res.status(404).json({ error: "Scontro non trovato nel documento" });
  }

  return res.status(200).json({
    title: parsed.title || `Giornata Fanta ${day}`,
    sourceUrl: parsed.sourceUrl || sourceUrl,
    fantasyMatchdayNumber: parsed.fantasyMatchdayNumber || day,
    matchup
  });
};
