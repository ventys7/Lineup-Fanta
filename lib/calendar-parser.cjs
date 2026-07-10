function decodeHtml(value) {
  return String(value ?? "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function htmlToLines(html) {
  const text = decodeHtml(
    String(html ?? "")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<(?:br|hr)\b[^>]*>/gi, "\n")
      .replace(/<\/(?:p|div|li|h1|h2|h3|h4|h5|h6|tr)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  );

  return text
    .replace(/\u00a0/g, " ")
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s•*·]+/, "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function romanToInteger(value) {
  const symbols = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  let previous = 0;

  for (const char of String(value).toUpperCase().split("").reverse()) {
    const current = symbols[char] ?? 0;
    total += current < previous ? -current : current;
    previous = Math.max(previous, current);
  }

  return total;
}

function parseNumber(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;

  const cleaned = raw.replace(/\*/g, "").replace(",", ".").trim();
  if (!/^[+-]?\d+(?:\.\d+)?$/.test(cleaned)) return null;

  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function parseMatch(line) {
  const normalized = String(line ?? "")
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  const arrowIndex = normalized.indexOf("->");
  if (arrowIndex < 0) return null;

  const fixturePart = normalized.slice(0, arrowIndex).trim();
  const resultPart = normalized.slice(arrowIndex + 2).trim();
  const versus = fixturePart.match(/^(.*?)\s+vs\s+(.*?)$/i);
  if (!versus) return null;

  function parseSide(side) {
    const match = side.trim().match(/^(.*?)(?:\s*\(([^()]*)\)(\*)?)?$/);
    const name = String(match?.[1] ?? "").trim();
    const totalRaw = String(match?.[2] ?? "").trim();

    return {
      name,
      total: parseNumber(totalRaw),
      marked: Boolean(match?.[3]) || totalRaw.includes("*")
    };
  }

  const home = parseSide(versus[1]);
  const away = parseSide(versus[2]);
  if (!home.name || !away.name) return null;

  const result = resultPart.match(/^(\d+)\s*-\s*(\d+)$/);

  return {
    homeTeam: home.name,
    awayTeam: away.name,
    homeTotal: home.total,
    awayTotal: away.total,
    homeGoals: result ? Number(result[1]) : null,
    awayGoals: result ? Number(result[2]) : null,
    note: [
      home.marked ? `${home.name}: *` : "",
      away.marked ? `${away.name}: *` : ""
    ].filter(Boolean).join("; ")
  };
}

function parsePublishedCalendar(html, expectedMatches = 4) {
  const lines = htmlToLines(html);
  const matchdays = [];
  let current = null;

  for (const line of lines) {
    const heading = line.match(/^([IVXLCDM]+)\s+GIORNATA\s*\((\d+)\)$/i);
    if (heading) {
      if (current) matchdays.push(current);
      current = {
        realRoundNumber: romanToInteger(heading[1]),
        fantasyMatchdayNumber: Number(heading[2]),
        matches: []
      };
      continue;
    }

    if (!current) continue;
    const match = parseMatch(line);
    if (match) current.matches.push(match);
  }

  if (current) matchdays.push(current);

  return matchdays.map((matchday) => {
    const complete = (
      matchday.matches.length === expectedMatches
      && matchday.matches.every(
        (match) => match.homeGoals !== null && match.awayGoals !== null
      )
    );

    return {
      ...matchday,
      status: complete ? "calcolata" : "da_calcolare"
    };
  });
}

const CSV_HEADER = [
  "real_round_number",
  "fantasy_matchday_number",
  "status",
  "home_team",
  "away_team",
  "home_total",
  "away_total",
  "home_goals",
  "away_goals",
  "note"
].join(",");

function csvCell(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCalendarCsv(matchdays) {
  const rows = [CSV_HEADER];

  for (const matchday of matchdays) {
    for (const match of matchday.matches) {
      rows.push([
        matchday.realRoundNumber,
        matchday.fantasyMatchdayNumber,
        matchday.status,
        match.homeTeam,
        match.awayTeam,
        match.homeTotal,
        match.awayTotal,
        match.homeGoals,
        match.awayGoals,
        match.note
      ].map(csvCell).join(","));
    }
  }

  return `${rows.join("\n")}\n`;
}

module.exports = {
  parsePublishedCalendar,
  toCalendarCsv
};
