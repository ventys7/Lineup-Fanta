"use strict";
const { normalize, getScore } = require('./media-engine/matcher.cjs');
const { bsdFetch } = require('./media-engine/api-client.cjs');
const { loadLeagueAssets } = require("./listone.cjs");
const { leagueId } = require("./settings.cjs");
const { databaseConfigured, readManifestCache, readPlayerOverrides, readTeamOverrides, upsertPlayerOverride, upsertTeamOverrides, writeManifestCache } = require("./neon.cjs");

async function mediaStatus(id) {
  return { summary: { unresolved: 0 }, players: {}, teamIssues: [] };
}
async function readManifest(id) {
  return { players: {}, refresh: { pending: false } };
}
function publicManifest(m) { return m; }

module.exports = { mediaStatus, readManifest, publicManifest, linkManual: async () => ({}), linkTeamManual: async () => ({}), refreshDirectManifest: async () => ({}) };
