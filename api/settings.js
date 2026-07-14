const { noStore, methodNotAllowed } = require("../lib/http.cjs");
const { leagueId, readSettings, readTeamProfiles } = require("../lib/settings.cjs");

module.exports = async function handler(req, res) {
  noStore(res);
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);
  try {
    const settings = await readSettings();
    const requestedLeague = req.query?.league;
    if (requestedLeague) {
      const id = leagueId(requestedLeague);
      const profiles = await readTeamProfiles(id);
      return res.status(200).json({ leagueId: id, ...settings.leagues[id], teams: profiles.teams, updatedAt: settings.updatedAt });
    }
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Configurazione non disponibile" });
  }
};
