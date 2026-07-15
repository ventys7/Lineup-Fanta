"use strict";

const { parseLeagueCsv } = require("../js/csv-parser.js");
const { leagueId, readSettings } = require("./settings.cjs");

async function fetchText(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: { Accept: "text/csv,text/plain;q=0.9,*/*;q=0.5" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (/^\s*<!doctype html/i.test(text)) throw new Error("La fonte ha restituito HTML invece del CSV");
    return text;
  } finally { clearTimeout(timer); }
}

async function loadLeagueAssets(rawLeagueId) {
  const id = leagueId(rawLeagueId);
  const settings = await readSettings();
  const url = settings.leagues[id].listoneCsvUrl;
  if (!url) return { assets: [], csvText: "", url: "" };
  const csvText = await fetchText(url);
  return { ...parseLeagueCsv(csvText), csvText, url };
}

function teamNamesFromAssets(assets) {
  return [...new Set(assets.map((asset) => String(asset.ownerTag || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "it", { sensitivity: "base" }));
}

module.exports = { fetchText, loadLeagueAssets, teamNamesFromAssets };
