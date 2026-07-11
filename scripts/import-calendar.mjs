#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { parsePublishedCalendar, toCalendarCsv } = require("../lib/calendar-parser.cjs");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEAGUES = new Set(["fp", "pd"]);

function readLeagueBlock(configText, leagueId) {
  const start = configText.indexOf(`  ${leagueId}: Object.freeze({`);
  if (start < 0) throw new Error(`Configurazione ${leagueId.toUpperCase()} non trovata.`);

  const nextLeague = leagueId === "fp"
    ? configText.indexOf("  pd: Object.freeze({", start + 1)
    : configText.length;

  return configText.slice(start, nextLeague < 0 ? configText.length : nextLeague);
}

function readStringProperty(block, property) {
  return block.match(new RegExp(`${property}\\s*:\\s*"([^"]*)"`))?.[1] ?? "";
}

function readNumberProperty(block, property, fallback) {
  const raw = block.match(new RegExp(`${property}\\s*:\\s*(\\d+)`))?.[1];
  return raw ? Number(raw) : fallback;
}

async function fetchDocument(sourceUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const separator = sourceUrl.includes("?") ? "&" : "?";
    const response = await fetch(`${sourceUrl}${separator}_lf=${Date.now()}`, {
      cache: "no-store",
      signal: controller.signal,
      headers: { "user-agent": "Lineup-Fanta calendar importer" }
    });

    if (!response.ok) throw new Error(`Download Calendario fallito: HTTP ${response.status}`);
    return response.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function writeAtomically(outputPath, content) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.tmp-${process.pid}`;
  await fs.writeFile(temporaryPath, content, "utf8");
  await fs.rename(temporaryPath, outputPath);
}

async function main() {
  const leagueId = String(process.argv[2] ?? "fp").toLowerCase();
  if (!LEAGUES.has(leagueId)) {
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

  const html = await fetchDocument(sourceUrl);
  const matchdays = parsePublishedCalendar(html, expectedMatches);
  if (matchdays.length === 0) {
    throw new Error("Nessuna giornata riconosciuta nel documento pubblicato.");
  }

  const outputPath = path.join(ROOT, csvUrl.replace(/^\//, ""));
  await writeAtomically(outputPath, toCalendarCsv(matchdays));

  const complete = matchdays.filter((matchday) => matchday.status === "calcolata").length;
  console.log(
    `✓ ${leagueId.toUpperCase()}: ${matchdays.length} giornate importate, `
    + `${complete} calcolate, file ${path.relative(ROOT, outputPath)}`
  );
}

main().catch((error) => {
  console.error(`✗ ${error.message ?? error}`);
  process.exitCode = 1;
});
