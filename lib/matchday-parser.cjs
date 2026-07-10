"use strict";

function decodeHtmlEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"'
  };

  return String(value ?? "").replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    const normalized = String(entity).toLowerCase();
    if (normalized[0] === "#") {
      const hex = normalized[1] === "x";
      const raw = normalized.slice(hex ? 2 : 1);
      const codepoint = Number.parseInt(raw, hex ? 16 : 10);
      return Number.isFinite(codepoint) ? String.fromCodePoint(codepoint) : match;
    }
    return Object.prototype.hasOwnProperty.call(named, normalized) ? named[normalized] : match;
  });
}

function stripEmojiText(value) {
  return String(value ?? "")
    .replace(/[\u200d\ufe0e\ufe0f\u20e3]/g, "")
    .replace(/[\u{1f1e6}-\u{1f1ff}]/gu, "")
    .replace(/[\u{1f3fb}-\u{1f3ff}]/gu, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToLines(html) {
  const withoutNoise = String(html ?? "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:li|p|div|h[1-6]|tr|section|article)>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "");

  return decodeHtmlEntities(withoutNoise)
    .replace(/[\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g, "")
    .split(/\r?\n/)
    .map((line) => line.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim())
    .map((line) => line.replace(/^[*•·]\s*/, "").trim())
    .filter(Boolean);
}

function parseNumber(value) {
  const normalized = String(value ?? "").trim().replace(",", ".");
  if (!/^[-+]?\d+(?:\.\d+)?$/.test(normalized)) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function formatNumber(value) {
  if (value === null || value === undefined) return null;
  return Number.isInteger(value) ? String(value) : String(value).replace(".", ",");
}

function normalizeTeamName(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function parseMatchHeader(line) {
  const cleanLine = stripEmojiText(line);
  const match = cleanLine.match(/^(?:\d+\.\s*)?(.+?)\s+vs\s+(.+?)$/i);
  if (!match) return null;
  return {
    homeTeam: stripEmojiText(match[1]),
    awayTeam: stripEmojiText(match[2])
  };
}

function isTeamLabel(line) {
  if (!/:$/.test(line)) return false;
  const upper = line.toUpperCase();
  return upper !== "TOTALE:" && upper !== "A DISPOSIZIONE:";
}

function cleanPlayerName(value) {
  return stripEmojiText(value)
    .replace(/[©®]/g, "")
    .replace(/\(s\+?\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parsePlayer(rawLine) {
  const sourceRaw = String(rawLine ?? "").trim();
  const captain = /©/.test(sourceRaw);
  const switchMatch = sourceRaw.match(/\(s(\+)?\)/i);
  const switchType = switchMatch ? (switchMatch[1] ? "plus" : "base") : null;
  const raw = stripEmojiText(sourceRaw);
  const replacementMatch = raw.match(/[\{(]\s*([^{}()]+?)\s+([-+]?\d+(?:[.,]\d+)?)\s*[\})]\s*$/);

  let main = replacementMatch ? raw.slice(0, replacementMatch.index).trim() : raw;
  const replacementVote = replacementMatch ? parseNumber(replacementMatch[2]) : null;
  const replacement = replacementMatch ? {
    name: cleanPlayerName(replacementMatch[1]),
    vote: replacementVote,
    displayVote: formatNumber(replacementVote)
  } : undefined;

  const statusMatch = main.match(/(?:\s|©️?)(n\/?a|s\.?v\.?)\s*$/i);
  const status = statusMatch ? statusMatch[1].toLowerCase().replace(/\s+/g, "") : null;
  if (statusMatch) main = main.slice(0, statusMatch.index).trim();

  let vote = null;
  let displayVote = null;

  if (!status) {
    const voteMatch = main.match(/\s+([-+]?\d+(?:[.,]\d+)?)\s*$/);
    if (voteMatch) {
      vote = parseNumber(voteMatch[1]);
      displayVote = formatNumber(vote);
      main = main.slice(0, voteMatch.index).trim();
    }
  }

  const name = cleanPlayerName(main);

  return {
    raw,
    name,
    vote,
    displayVote,
    status,
    captain,
    switchPlayer: Boolean(switchType),
    switchType,
    ...(replacement ? { replacement } : {})
  };
}

function emptyTeam(team, alias = "") {
  return {
    team,
    alias,
    starters: [],
    total: null,
    playersCount: null,
    bench: []
  };
}

function parseMatchBlock(header, lines) {
  const teams = [];
  let current = null;
  let section = "starters";

  for (const line of lines) {
    if (isTeamLabel(line)) {
      if (teams.length >= 2) continue;
      const officialTeam = teams.length === 0 ? header.homeTeam : header.awayTeam;
      current = emptyTeam(stripEmojiText(officialTeam), stripEmojiText(line.slice(0, -1)));
      teams.push(current);
      section = "starters";
      continue;
    }

    if (!current) continue;

    const totalMatch = line.match(/^TOTALE:\s*([-+]?\d+(?:[.,]\d+)?)?\s*(?:\((\d+)\))?\s*$/i);
    if (totalMatch) {
      current.total = parseNumber(totalMatch[1]);
      current.playersCount = totalMatch[2] ? Number(totalMatch[2]) : null;
      continue;
    }

    if (/^A DISPOSIZIONE:\s*$/i.test(line)) {
      section = "bench";
      continue;
    }

    if (section === "bench") current.bench.push(parsePlayer(line));
    else current.starters.push(parsePlayer(line));
  }

  return {
    homeTeam: header.homeTeam,
    awayTeam: header.awayTeam,
    home: teams[0] ?? emptyTeam(header.homeTeam, header.homeTeam),
    away: teams[1] ?? emptyTeam(header.awayTeam, header.awayTeam)
  };
}

function parseMatchdayLines(lines, sourceUrl = "") {
  const title = stripEmojiText(lines.find((line) => /GIORNATA/i.test(line)) ?? "Giornata");
  const titleNumbers = title.match(/\((\d+)\)/);
  const fantasyMatchdayNumber = titleNumbers ? Number(titleNumbers[1]) : null;
  const starts = [];

  lines.forEach((line, index) => {
    const header = parseMatchHeader(line);
    if (header) starts.push({ index, header });
  });

  const matches = starts.map((entry, position) => {
    const nextIndex = starts[position + 1]?.index ?? lines.length;
    return parseMatchBlock(entry.header, lines.slice(entry.index + 1, nextIndex));
  });

  return {
    title,
    sourceUrl,
    fantasyMatchdayNumber,
    matches
  };
}

function parseMatchdayHtml(html, sourceUrl = "") {
  return parseMatchdayLines(htmlToLines(html), sourceUrl);
}

function selectMatchup(data, options = {}) {
  const home = normalizeTeamName(options.homeTeam);
  const away = normalizeTeamName(options.awayTeam);

  const named = data.matches.find((matchup) => (
    normalizeTeamName(matchup.homeTeam) === home
    && normalizeTeamName(matchup.awayTeam) === away
  ));

  const index = Number(options.matchIndex);
  return named ?? (Number.isInteger(index) ? data.matches[index] : null) ?? null;
}

module.exports = {
  formatNumber,
  htmlToLines,
  normalizeTeamName,
  parseMatchdayHtml,
  parseMatchdayLines,
  parseNumber,
  parsePlayer,
  selectMatchup,
  stripEmojiText
};
