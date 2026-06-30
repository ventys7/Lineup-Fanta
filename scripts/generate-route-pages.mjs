#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const checkOnly = process.argv.includes("--check");
const template = readFileSync(resolve(root, "index.html"), "utf8");

const routes = {
  fp: {
    name: "PianginaCUP",
    favicon: "/assets/identity/fp-logo.png",
    appleTouchIcon: "/assets/identity/fp-apple-touch-icon.png",
    manifest: "/manifests/fp.webmanifest",
    themeColor: "#7c3aed"
  },
  pd: {
    name: "LaLigaCUP",
    favicon: "/assets/identity/pd-logo.png",
    appleTouchIcon: "/assets/identity/pd-apple-touch-icon.png",
    manifest: "/manifests/pd.webmanifest",
    themeColor: "#b91c1c"
  }
};

function renderRoutePage(id, identity) {
  const staticHead = [
    `  <meta name="apple-mobile-web-app-title" content="${identity.name}" data-lineup-static-identity>`,
    `  <meta name="theme-color" content="${identity.themeColor}" data-lineup-static-identity>`,
    `  <link rel="icon" type="image/png" sizes="any" href="${identity.favicon}" data-lineup-static-identity>`,
    `  <link rel="apple-touch-icon" sizes="180x180" href="${identity.appleTouchIcon}" data-lineup-static-identity>`,
    `  <link rel="manifest" href="${identity.manifest}" data-lineup-static-identity>`
  ].join("\n");

  return template
    .replace('<html lang="it">', `<html lang="it" data-static-league-identity="${id}">`)
    .replace('<title>Lineup Fanta</title>', `<title>${identity.name} · Lineup Fanta</title>`)
    .replace('<script src="js/config.js"></script>', `${staticHead}\n<script src="js/config.js"></script>`);
}

const outOfSync = [];
for (const [id, identity] of Object.entries(routes)) {
  const target = resolve(root, id, "index.html");
  const expected = renderRoutePage(id, identity);
  let current = null;
  try {
    current = readFileSync(target, "utf8");
  } catch {
    // Generated below when not running in verification mode.
  }

  if (current !== expected) {
    outOfSync.push(`${id}/index.html`);
    if (!checkOnly) {
      mkdirSync(resolve(root, id), { recursive: true });
      writeFileSync(target, expected, "utf8");
    }
  }
}

if (checkOnly && outOfSync.length) {
  console.error(`Route statiche non aggiornate: ${outOfSync.join(", ")}`);
  console.error("Esegui: node scripts/generate-route-pages.mjs");
  process.exit(1);
}

if (!checkOnly) {
  console.log(`✓ Generate route statiche aggiornate: ${outOfSync.length || 0}`);
}
