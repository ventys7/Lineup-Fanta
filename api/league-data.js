const {
  normalizeLeagueId,
  readRuntimeDocument
} = require("../lib/runtime-data.cjs");

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

module.exports = async function handler(req, res) {
  setNoStore(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  let leagueId;
  try {
    leagueId = normalizeLeagueId(req.query?.league === "pd" ? "pd" : "fp");
  } catch {
    return res.status(400).json({ error: "Lega non valida" });
  }

  const resource = String(req.query?.resource || "all");

  try {
    const runtime = await readRuntimeDocument(leagueId);
    const { document } = runtime;

    if (resource === "matchdays") {
      return res.status(200).json({ [leagueId]: document.registry });
    }

    if (resource === "teams") {
      return res.status(200).json(document.teams);
    }

    return res.status(200).json({
      leagueId,
      source: runtime.source,
      updatedAt: document.updatedAt,
      registry: document.registry,
      teams: document.teams
    });
  } catch (error) {
    console.error("league runtime data read error", error);
    return res.status(500).json({
      error: "Configurazione dinamica non disponibile"
    });
  }
};
