"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

function source(relativePath) {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

test("active runtime stores logos and configuration in Neon without Blob write fallbacks", () => {
  const teamLogoApi = source("api/team-logo.js");
  const settings = source("lib/settings.cjs");
  const logoAccess = source("lib/logo-access.cjs");
  const migration = source("lib/migrate-neon.cjs");

  assert.doesNotMatch(teamLogoApi, /uploadImmutableImage|writeBuffer|writeJson/);
  assert.match(teamLogoApi, /writeTeamLogo/);
  assert.match(settings, /scrittura runtime bloccata per evitare fallback Blob/);
  assert.match(logoAccess, /reset codice bloccato per evitare fallback Blob/);
  assert.doesNotMatch(migration, /writeJson|writeBuffer|uploadImmutableImage/);
  assert.match(migration, /readJson/);
});

test("Vercel configuration exposes no media cron and gives migration enough runtime", () => {
  const config = JSON.parse(source("vercel.json"));
  assert.equal(config.crons, undefined);
  assert.equal(config.functions?.["api/admin.js"]?.maxDuration, 300);
  assert.equal(config.functions?.["api/player-media.js"]?.maxDuration, 300);
});

test("team logo URLs are served by the Neon-backed API", () => {
  const { teamLogoUrl } = require("../lib/settings.cjs");
  const url = teamLogoUrl("fp", "Nicolò - Gabriele", "abcdef1234567890");
  assert.match(url, /^\/api\/team-logo\?/);
  assert.match(url, /league=fp/);
  assert.match(url, /team=Nicol%C3%B2\+-\+Gabriele/);
  assert.match(url, /v=abcdef1234567890/);
});
