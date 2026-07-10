#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
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

function decodeHtml(value) {
  return value
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
    String(html)
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
  const normalized = line
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  const arrowIndex = normalized.indexOf("->");
  if (arrowIndex < 0) return null;

  const fixturePart = normalized.slice(0, arrowIndex).trim();
  const resultPart = normalized.slice(arrowIndex + 2).trim();
  const versus = fixturePart.match(/^(.*?)\s+vs\s+(.*?)$/i);
  if (!versus) return null;

  const parseSide = (side) => {
    const match = side.trim().match(/^(.*?)(?:\s*\(([^()]*)\)(\*)?)?$/);
    const name = String(match?.[1] ?? "").trim();
    const totalRaw = String(match?.[2] ?? "").trim();
    return {
      name,
      total: parseNumber(totalRaw),
      marked: Boolean(match?.[3]) || totalRaw.includes("*")
    };
  };

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
    note: [home.marked ? `${home.name}: *` : "", away.marked ? `${away.name}: *` : ""]
      .filter(Boolean)
      .join("; ")
  };
}

export function parsePublishedCalendar(html, expectedMatches) {
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
      matchday.matches.length === expectedMatches &&
      matchday.matches.every((match) => match.homeGoals !== null && match.awayGoals !== null)
    );

    return {
      ...matchday,
      status: complete ? "calcolata" : "da_calcolare"
    };
  });
}

function csvCell(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(matchdays) {
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

function readLeagueBlock(configText, leagueId) {
  const start = configText.indexOf(`  ${leagueId}: Object.freeze({`);
  if (start < 0) throw new Error(`Configurazione ${leagueId.toUpperCase()} non trovata.`);

  const nextLeague = leagueId === "fp"
    ? configText.indexOf("  pd: Object.freeze({", start + 1)
    : configText.length;

  return configText.slice(start, nextLeague < 0 ? configText.length : nextLeague);
}

function readStringProperty(block, property) {
  const match = block.match(new RegExp(`${property}\\s*:\\s*"([^"]*)"`));
  return match?.[1] ?? "";
}

function readNumberProperty(block, property, fallback) {
  const match = block.match(new RegExp(`${property}\\s*:\\s*(\\d+)`));
  return match ? Number(match[1]) : fallback;
}

async function main() {
  const leagueId = String(process.argv[2] ?? "fp").toLowerCase();
  if (!new Set(["fp", "pd"]).has(leagueId)) {
    throw new Error("Usa: node scripts/import-calendar.mjs fp|pd");
  }

  const configText = await fs.readFile(path.join(ROOT, "js/config.js"), "utf8");
  const block = readLeagueBlock(configText, leagueId);
  const sourceUrl = readStringProperty(block, "calendarDocUrl");
  const csvUrl = readStringProperty(block, "calendarCsvUrl");
  const expectedMatches = readNumberProperty(block, "calendarExpectedMatches", 4);

  if (!sourceUrl) {
    console.log(`ℹ ${leagueId.toUpperCase()}: calendarDocUrl vuoto, import saltato.`);
    return;
  }

  if (!csvUrl.startsWith("/data/")) {
    throw new Error(`${leagueId.toUpperCase()}: calendarCsvUrl deve puntare a /data/...`);
  }

  const response = await fetch(`${sourceUrl}${sourceUrl.includes("?") ? "&" : "?"}v=${Date.now()}`, {
    headers: { "user-agent": "Lineup-Fanta calendar importer" },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Download Calendario fallito: HTTP ${response.status}`);
  }

  const html = await response.text();
  const matchdays = parsePublishedCalendar(html, expectedMatches);
  if (matchdays.length === 0) {
    throw new Error("Nessuna giornata riconosciuta nel documento pubblicato.");
  }

  const outputPath = path.join(ROOT, csvUrl.replace(/^\//, ""));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const temporaryPath = `${outputPath}.tmp`;
  await fs.writeFile(temporaryPath, toCsv(matchdays), "utf8");
  await fs.rename(temporaryPath, outputPath);

  const calculated = matchdays.filter((matchday) => matchday.status === "calcolata").length;
  console.log(
    `✓ ${leagueId.toUpperCase()}: ${matchdays.length} giornate importate ` +
    `(${calculated} calcolate, ${matchdays.length - calculated} da calcolare)`
  );
  console.log(`✓ CSV aggiornato: ${path.relative(ROOT, outputPath)}`);
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`ERRORE: ${error.message}`);
    process.exitCode = 1;
  });
}
