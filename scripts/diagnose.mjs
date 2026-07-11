#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

function ok(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  errors.push(message);
  console.error(`✗ ${message}`);
}

function warn(message) {
  warnings.push(message);
  console.warn(`! ${message}`);
}

async function exists(relativePath) {
  try {
    await fs.access(path.join(ROOT, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function read(relativePath) {
  return fs.readFile(path.join(ROOT, relativePath), "utf8");
}

async function checkRequiredFiles() {
  const required = [
    "index.html",
    "fp/index.html",
    "pd/index.html",
    "js/config.js",
    "js/csv-parser.js",
    "js/csv-formation-db.js",
    "assets/dashboard/dashboard.js",
    "assets/dashboard/dashboard.css",
    "data/matchday-links.json",
    "dashboard/src/main.tsx",
    "api/league-data.js",
    "lib/runtime-data.cjs"
  ];

  const missing = [];
  for (const file of required) {
    if (!(await exists(file))) missing.push(file);
  }

  if (missing.length) fail(`File obbligatori mancanti: ${missing.join(", ")}`);
  else ok(`${required.length} file obbligatori presenti`);
}

async function checkJson() {
  const files = [
    "data/matchday-links.json",
    "data/fp/teams.json",
    "data/pd/teams.json",
    "package.json",
    "dashboard/package.json",
    "dashboard/tsconfig.json"
  ];

  for (const file of files) {
    if (!(await exists(file))) {
      warn(`${file} non presente`);
      continue;
    }
    try {
      JSON.parse(await read(file));
      ok(`${file} valido`);
    } catch (error) {
      fail(`${file} non è JSON valido: ${error.message}`);
    }
  }
}

async function checkHtmlScripts() {
  const pages = ["index.html", "fp/index.html", "pd/index.html"];
  const requiredScripts = [
    "js/debug.js",
    "js/csv-parser.js",
    "js/csv-formation-db.js",
    "js/csv.js",
    "js/league-dashboard.js"
  ];

  for (const page of pages) {
    const html = await read(page);
    const positions = requiredScripts.map((script) => html.indexOf(script));
    const missing = requiredScripts.filter((_, index) => positions[index] < 0);
    if (missing.length) {
      fail(`${page}: script mancanti: ${missing.join(", ")}`);
      continue;
    }
    const ordered = positions.every((position, index) => index === 0 || position > positions[index - 1]);
    if (!ordered) fail(`${page}: ordine script parser/dashboard non valido`);
    else ok(`${page}: ordine script valido`);
  }
}

async function checkGeneratedAssets() {
  const sourceFiles = await fs.readdir(path.join(ROOT, "dashboard/src/styles"), { recursive: true });
  const cssSources = sourceFiles.filter((file) => file.endsWith(".css"));
  const builtCss = await read("assets/dashboard/dashboard.css");
  const builtJs = await read("assets/dashboard/dashboard.js");

  if (builtCss.length < 10_000) fail("Bundle CSS dashboard sospettosamente piccolo");
  else ok(`Bundle CSS presente (${Math.round(builtCss.length / 1024)} KiB)`);

  if (builtJs.length < 50_000) fail("Bundle JS dashboard sospettosamente piccolo");
  else ok(`Bundle JS presente (${Math.round(builtJs.length / 1024)} KiB)`);

  if (cssSources.length < 8) warn("CSS dashboard poco modularizzato");
  else ok(`${cssSources.length} moduli CSS sorgente`);
}

async function checkConfig() {
  const config = await read("js/config.js");
  for (const league of ["fp", "pd"]) {
    if (!config.includes(`${league}: Object.freeze({`)) {
      fail(`Configurazione lega ${league.toUpperCase()} non trovata`);
    } else {
      ok(`Configurazione ${league.toUpperCase()} presente`);
    }
  }

  if (!config.includes("csvUrl")) fail("csvUrl non trovato nella configurazione");
  if (!config.includes("calendarCsvUrl")) fail("calendarCsvUrl non trovato nella configurazione");
}


async function checkRuntimeStorage() {
  const packageJson = JSON.parse(await read("package.json"));
  if (packageJson.dependencies?.["@vercel/blob"]) {
    ok(`@vercel/blob configurato (${packageJson.dependencies["@vercel/blob"]})`);
  } else {
    fail("Dipendenza @vercel/blob non configurata");
  }

  const devServer = await read("scripts/dev-server.mjs");
  if (devServer.includes('/api/league-data')) {
    ok("API dati dinamici registrata nel server locale");
  } else {
    fail("API /api/league-data non registrata nel server locale");
  }
}

async function main() {
  console.log("Lineup-Fanta · diagnosi statica\n");
  await checkRequiredFiles();
  await checkJson();
  await checkHtmlScripts();
  await checkGeneratedAssets();
  await checkConfig();
  await checkRuntimeStorage();

  console.log(`\nRisultato: ${errors.length} errori, ${warnings.length} avvisi.`);
  if (errors.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
