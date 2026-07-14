const { noStore, methodNotAllowed, readBody } = require("../lib/http.cjs");
const { checkCode } = require("../lib/logo-access.cjs");
const { loadLeagueAssets, teamNamesFromAssets } = require("../lib/listone.cjs");
const { leagueId, readTeamProfiles, saveTeamProfiles } = require("../lib/settings.cjs");
const { uploadImmutableImage } = require("../lib/storage.cjs");

const MAX_BYTES = 700 * 1024;

function decodeUpload(raw) {
  if (!raw || typeof raw !== "object") throw new Error("Immagine non valida");
  const mimeType = String(raw.mimeType || "");
  if (!["image/png", "image/jpeg", "image/webp"].includes(mimeType)) throw new Error("Formato non supportato");
  const data = String(raw.dataBase64 || "");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(data)) throw new Error("Immagine non valida");
  const bytes = Buffer.from(data, "base64");
  if (!bytes.length || bytes.length > MAX_BYTES) throw new Error("Immagine troppo pesante");
  return { bytes, mimeType };
}

module.exports = async function handler(req, res) {
  noStore(res);
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);
  const body = readBody(req);
  try {
    const id = leagueId(body.leagueId);
    const teamName = String(body.teamName || "").trim();
    const profiles = await readTeamProfiles(id);
    let names = Object.keys(profiles.teams || {});
    try { names = [...new Set([...names, ...teamNamesFromAssets((await loadLeagueAssets(id)).assets)])]; } catch {}
    if (!names.includes(teamName)) throw new Error("Fantasquadra non riconosciuta");
    if (!(await checkCode(id, teamName, body.code))) return res.status(401).json({ error: "Codice stemma errato" });
    const upload = decodeUpload(body.upload);
    const stored = await uploadImmutableImage(`team-logos/${id}`, teamName, upload.bytes, upload.mimeType);
    profiles.teams[teamName] = { ...(profiles.teams[teamName] || {}), logoUrl: stored.url };
    await saveTeamProfiles(id, profiles);
    return res.status(200).json({ message: "Stemma aggiornato.", logoUrl: stored.url });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Upload non riuscito" });
  }
};
