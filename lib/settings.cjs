"use strict";
const fs = require("node:fs/promises");
const path = require("node:path");
const { databaseConfigured, listTeamLogoMetadata, readFantasyTeams, readRuntimeSetting, writeFantasyTeams, writeRuntimeSetting } = require("./neon.cjs");

function leagueId(value) {
  const id = String(value || "").trim().toLowerCase();
  return ["fp", "pd"].includes(id) ? id : "fp";
}

function cleanUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try { return new URL(raw).toString(); } catch { return ""; }
}

function normalizeSettings(raw = {}, fallback = {}) {
  const leagues = { fp: {}, pd: {} };
  ["fp", "pd"].forEach(id => {
    leagues[id] = {
      listoneCsvUrl: cleanUrl(raw?.leagues?.[id]?.listoneCsvUrl || fallback?.leagues?.[id]?.listoneCsvUrl),
      standingsCsvUrl: cleanUrl(raw?.leagues?.[id]?.standingsCsvUrl || fallback?.leagues?.[id]?.standingsCsvUrl),
      disciplineDocUrl: cleanUrl(raw?.leagues?.[id]?.disciplineDocUrl || fallback?.leagues?.[id]?.disciplineDocUrl)
    };
  });
  return { version: 1, leagues, updatedAt: raw.updatedAt || null };
}

async function readSettings() {
  let repo = { leagues: { fp: {}, pd: {} } };
  try {
    const data = await fs.readFile(path.join(process.cwd(), "data", "settings.json"), "utf8");
    repo = JSON.parse(data);
  } catch (e) {}
  if (databaseConfigured()) {
    try {
      const row = await readRuntimeSetting("settings");
      if (row?.value) return normalizeSettings(row.value, repo);
    } catch (e) {}
  }
  return normalizeSettings(repo);
}

async function readTeamProfiles(id) {
  const l = leagueId(id);
  if (databaseConfigured()) {
    const [rt, logos] = await Promise.all([readFantasyTeams(l), listTeamLogoMetadata(l)]);
    const teams = rt?.teams || {};
    Object.entries(logos || {}).forEach(([n, lg]) => {
      teams[n] = { ...(teams[n] || {}), logoUrl: `/api/team-logo?league=${l}&team=${encodeURIComponent(n)}&v=${lg.sha256.slice(0,16)}` };
    });
    return { teams, updatedAt: rt?.updatedAt };
  }
  return { teams: {} };
}

async function saveLeagueSettings(id, s) {
  const curr = await readSettings();
  curr.leagues[leagueId(id)] = s;
  curr.updatedAt = new Date().toISOString();
  if (databaseConfigured()) await writeRuntimeSetting("settings", curr);
  return curr;
}

async function saveTeamProfiles(id, doc) {
  if (databaseConfigured()) return await writeFantasyTeams(leagueId(id), doc.teams);
  return { document: doc };
}

module.exports = { readSettings, readTeamProfiles, saveLeagueSettings, saveTeamProfiles, leagueId };
