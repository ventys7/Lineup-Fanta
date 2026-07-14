"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const { readJson, writeJson } = require("./storage.cjs");

const LEAGUES = new Set(["fp", "pd"]);

function leagueId(value) {
  const id = String(value || "").trim().toLowerCase();
  if (!LEAGUES.has(id)) throw new Error("Lega non valida");
  return id;
}

function cleanUrl(value, { allowEmpty = true } = {}) {
  const raw = String(value || "").trim();
  if (!raw && allowEmpty) return "";
  let parsed;
  try { parsed = new URL(raw); } catch { throw new Error("URL non valido"); }
  if (!["https:", "http:"].includes(parsed.protocol)) throw new Error("URL non valido");
  return parsed.toString();
}

function normalizeLeagueSettings(raw = {}) {
  return {
    listoneCsvUrl: cleanUrl(raw.listoneCsvUrl || raw.csvUrl || ""),
    standingsCsvUrl: cleanUrl(raw.standingsCsvUrl || ""),
    disciplineDocUrl: cleanUrl(raw.disciplineDocUrl || "")
  };
}

function normalizeSettings(raw = {}, fallback = {}) {
  return {
    version: 1,
    leagues: {
      fp: normalizeLeagueSettings(raw?.leagues?.fp || fallback?.leagues?.fp || {}),
      pd: normalizeLeagueSettings(raw?.leagues?.pd || fallback?.leagues?.pd || {})
    },
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : null
  };
}

async function repositorySettings() {
  try {
    const raw = JSON.parse(await fs.readFile(path.join(process.cwd(), "data", "settings.json"), "utf8"));
    return normalizeSettings(raw);
  } catch {
    return normalizeSettings({});
  }
}

async function readSettings() {
  const fallback = await repositorySettings();
  const runtime = await readJson("settings.json", null);
  return normalizeSettings(runtime || fallback, fallback);
}

async function saveSettings(raw) {
  const current = await readSettings();
  const normalized = normalizeSettings(raw, current);
  return writeJson("settings.json", normalized);
}

async function saveLeagueSettings(rawLeagueId, rawLeagueSettings) {
  const id = leagueId(rawLeagueId);
  const current = await readSettings();
  const next = structuredClone(current);
  next.leagues[id] = normalizeLeagueSettings(rawLeagueSettings || {});
  return writeJson("settings.json", normalizeSettings(next, current));
}

async function readTeamProfiles(id) {
  const league = leagueId(id);
  let fallback = { version: 1, teams: {} };
  try {
    fallback = JSON.parse(await fs.readFile(path.join(process.cwd(), "data", league, "teams.json"), "utf8"));
  } catch {}
  const runtime = await readJson(`teams/${league}.json`, null);
  const source = runtime || fallback;
  const teams = source && typeof source.teams === "object" && source.teams ? source.teams : {};
  return { version: 1, leagueId: league, teams, updatedAt: source.updatedAt || null };
}

async function saveTeamProfiles(id, document) {
  const league = leagueId(id);
  return writeJson(`teams/${league}.json`, {
    version: 1,
    leagueId: league,
    teams: document?.teams && typeof document.teams === "object" ? document.teams : {}
  });
}

module.exports = {
  cleanUrl,
  leagueId,
  normalizeSettings,
  readSettings,
  readTeamProfiles,
  saveLeagueSettings,
  saveSettings,
  saveTeamProfiles
};
