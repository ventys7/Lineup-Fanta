const { methodNotAllowed } = require("../lib/http.cjs");

const SOURCE = "https://sports.bzzoiro.com";
const MAX_BYTES = 5 * 1024 * 1024;

module.exports = async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);
  const id = String(req.query?.id || "").trim();
  if (!/^\d+$/.test(id)) return res.status(400).json({ error: "ID BSD non valido" });

  try {
    const response = await fetch(`${SOURCE}/img/player/${id}/`, {
      headers: { Accept: "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.5" },
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) return res.status(response.status === 404 ? 404 : 502).end();
    const mimeType = String(response.headers.get("content-type") || "").split(";")[0].trim();
    if (!["image/png", "image/jpeg", "image/webp", "image/avif"].includes(mimeType)) {
      return res.status(502).json({ error: "BSD ha restituito un formato immagine non valido" });
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!bytes.length || bytes.length > MAX_BYTES) return res.status(502).json({ error: "Immagine BSD non valida" });
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Length", String(bytes.length));
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=31536000");
    return res.status(200).send(bytes);
  } catch (error) {
    return res.status(502).json({ error: error?.name === "TimeoutError" ? "Timeout immagine BSD" : "Immagine BSD non disponibile" });
  }
};
