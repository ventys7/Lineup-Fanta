"use strict";
const fs = require("node:fs/promises");
const path = require("node:path");
const { databaseConfigured, readRuntimeSetting } = require("./neon.cjs");

async function readSettings() {
  let settings = null;
  // Prova Neon
  if (databaseConfigured()) {
    try {
      const row = await readRuntimeSetting("settings");
      if (row) settings = row.value;
    } catch (e) { console.error("Neon settings read failed, falling back to disk", e); }
  }
  // Fallback disco
  if (!settings) {
    try {
      const raw = await fs.readFile(path.join(process.cwd(), "data", "settings.json"), "utf8");
      settings = JSON.parse(raw);
    } catch (e) { settings = { leagues: { fp: {}, pd: {} } }; }
  }
  return settings;
}

function leagueId(v) {
  const id = String(v || "").toLowerCase().trim();
  return ["fp", "pd"].includes(id) ? id : "fp";
}

module.exports = { readSettings, leagueId };
