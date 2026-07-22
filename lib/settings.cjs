"use strict";
const fs = require("node:fs/promises");
const path = require("node:path");
const { databaseConfigured, listTeamLogoMetadata, readFantasyTeams, readRuntimeSetting, writeFantasyTeams, writeRuntimeSetting } = require("./neon.cjs");
const { readJson, writeJson } = require("./storage.cjs");

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
  return {
    version: 1,
    leagues: {
      fp: {
        listoneCsvUrl: cleanUrl(raw?.leagues?.fp?.listoneCsvUrl || fallback?.leagues?.fp?.listoneCsvUrl),
        standingsCsvUrl: cleanUrl(raw?.leagues?.fp?.standingsCsvUrl || fallback?.leagues?.fp?.standingsCsvUrl),
        disciplineDocUrl: cleanUrl(raw?.leagues?.fp?.disciplineDocUrl || fallback?.leagues?.fp?.disciplineDocUrl)
      },
      pd: {
        listoneCsvUrl: cleanUrl(raw?.leagues?.pd?.listoneCsvUrl || fallback?.leagues?.pd?.listoneCsvUrl),
        standingsCsvUrl: cleanUrl(raw?.leagues?.pd?.standingsCsvUrl || fallback?.leagues?.pd?.standingsCsvUrl),
        disciplineDocUrl: cleanUrl(raw?.leagues?.pd?.disciplineDocUrl || fallback?.leagues?.pd?.disciplineDocUrl)
      }
    },
    updatedAt: raw.updatedAt || null
  };
}

async function readSettings() {
  let repo = { leagues: { fp: {}, pd: {} } };
  try {
    const data = await fs.readFile(path.join(process.cwd(), "data", "settings.json"), "utf8");
    repo = normalizeSettings(JSON.parse(data));
  } catch (e) {}
  if (databaseConfigured()) {
    try {
      const row = await readRuntimeSetting("settings");
      if (row?.value) return normalizeSettings(row.value, repo);
    } catch (e) { console.error("Neon settings error", e); }
  }
  return repo;
}

async function readTeamProfiles(id) {
  const l = leagueId(id);
  if (databaseConfigured()) {
    const [rt, logos] = await Promise.all([readFantasyTeams(l), listTeamLogoMetadata(l)]);
    const teams = rt?.teams || {};
    Object.entries(logos || {}).forEach(([n, lg]) => {
      teams[n] = { ...(teams[n] || {}), logoUrl: teamLogoUrl(l, n, lg.sha256) };
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

function teamLogoUrl(l, n, hash = "") {
  return `/api/team-logo?league=${l}&team=${encodeURIComponent(n)}&v=${hash.slice(0,16)}`;
}

module.exports = { readSettings, readTeamProfiles, saveLeagueSettings, saveTeamProfiles, leagueId, teamLogoUrl };
