"use strict";
const { normalize, getScore } = require('./media-engine/matcher.cjs');
const { bsdFetch } = require('./media-engine/api-client.cjs');
const { loadLeagueAssets } = require("./listone.cjs");
const { leagueId } = require("./settings.cjs");
const { databaseConfigured, readManifestCache, readPlayerOverrides, readTeamOverrides, upsertPlayerOverride, upsertTeamOverrides, writeManifestCache } = require("./neon.cjs");

const API_BASE = "https://sports.bzzoiro.com";
const CACHE_TTL = 6 * 60 * 60 * 1000;

async function buildDirectState(rawId, options = {}) {
  const id = leagueId(rawId);
  if (!options.fresh && databaseConfigured()) {
    const cached = await readManifestCache(id);
    if (cached && (new Date(cached.generatedAt).getTime() + CACHE_TTL) > Date.now()) return cached.state;
  }

  const { assets } = await loadLeagueAssets(id);
  const playerOverrides = await readPlayerOverrides(id);
  const manifest = { players: {}, updatedAt: new Date().toISOString() };

  const uniqueClubs = [...new Set(assets.map(a => a.realTeam).filter(Boolean))];
  
  for (const club of uniqueClubs) {
    try {
      const bsdData = await bsdFetch(`${API_BASE}/api/players/?search=${encodeURIComponent(club)}`, {
        headers: { Authorization: `Token ${process.env.BSD_API_KEY}` }
      });
      
      const bsdRoster = (bsdData.results || []).map(p => ({
        id: p.id,
        name: p.full_name || p.name,
        team: club
      }));

      assets.filter(a => a.realTeam === club).forEach(asset => {
        const key = `${normalize(asset.displayName)}|${normalize(asset.realTeam)}`;
        const override = playerOverrides[key];
        
        if (override) {
          manifest.players[key] = { status: "resolved", photoUrl: `https://sports.bzzoiro.com/img/player/${override.id}/`, externalId: override.id, matchedBy: "manual-neon" };
        } else {
          let best = null; let max = 0;
          bsdRoster.forEach(cand => {
            const score = getScore(asset.displayName, cand.name);
            if (score > max) { max = score; best = cand; }
          });
          if (best && max >= 85) {
            manifest.players[key] = { status: "resolved", photoUrl: `https://sports.bzzoiro.com/img/player/${best.id}/`, externalId: best.id, matchedBy: "automatic" };
          } else {
            manifest.players[key] = { status: "unresolved", listoneName: asset.displayName, realTeam: asset.realTeam };
          }
        }
      });
    } catch (e) { console.error(`Error club ${club}`, e); }
  }

  if (databaseConfigured()) await writeManifestCache(id, manifest);
  return manifest;
}

async function mediaStatus(id) {
  const m = await buildDirectState(id);
  const p = Object.values(m.players);
  return {
    summary: {
      resolved: p.filter(x => x.status === "resolved").length,
      bsdResolved: p.filter(x => x.status === "resolved").length,
      unresolved: p.filter(x => x.status === "unresolved").length
    },
    players: m.players
  };
}

module.exports = { 
  mediaStatus, 
  readManifest: buildDirectState, 
  publicManifest: (m) => m,
  linkManual: async (id, key, cand) => {
    await upsertPlayerOverride(id, key, cand.id, cand.name);
    return buildDirectState(id, { fresh: true });
  },
  refreshDirectManifest: (id) => buildDirectState(id, { fresh: true })
};
