// Lineup Fanta matchday snapshot: season helpers.
function normalizeSeason(value) {
  const raw = String(value ?? "")
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/\s+/g, "")
    .trim();
  const match = raw.match(/^(\d{2}|\d{4})[-/](\d{2}|\d{4})$/);
  if (!match) return null;

  const start = match[1].length === 2 ? 2000 + Number(match[1]) : Number(match[1]);
  let end = match[2].length === 2 ? 2000 + Number(match[2]) : Number(match[2]);
  if (match[2].length === 2 && end < start) end += 100;
  if (!Number.isInteger(start) || !Number.isInteger(end) || end !== start + 1) return null;
  return `${start}-${String(end).slice(-2)}`;
}

function extractSeason(...values) {
  for (const value of values) {
    const normalizedText = String(value ?? "").replace(/[‐‑‒–—]/g, "-");
    const candidates = normalizedText.match(/(?:^|\D)(\d{2}|\d{4})\s*[-/]\s*(\d{2}|\d{4})(?:\D|$)/g) || [];
    for (const candidate of candidates) {
      const compact = candidate.replace(/^\D+|\D+$/g, "").replace(/\s+/g, "");
      const season = normalizeSeason(compact);
      if (season) return season;
    }
  }
  return null;
}

module.exports = { extractSeason, normalizeSeason };
