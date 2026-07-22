"use strict";
const { normalize } = require('./media-engine/matcher.cjs');
const { bsdFetch } = require('./media-engine/api-client.cjs');
const { loadLeagueAssets } = require("./listone.cjs");
const { leagueId } = require("./settings.cjs");
const { databaseConfigured, readManifestCache, readPlayerOverrides, writeManifestCache, clearManifestCache } = require("./neon.cjs");

const API_BASE = "https://sports.bzzoiro.com";
const CACHE_TTL = 6 * 60 * 60 * 1000;

function playerKey(name, team) {
  return `${normalize(name)}|${normalize(team)}`;
}

async function buildDirectState(rawId, options = {}) {
  const id = leagueId(rawId);
  
  if (!options.fresh && databaseConfigured()) {
    const cached = await readManifestCache(id);
    if (cached && (new Date(cached.generatedAt).getTime() + CACHE_TTL) > Date.now()) {
      return cached.state;
    }
  }

  const { assets } = await loadLeagueAssets(id);
  const playerOverrides = await readPlayerOverrides(id);
  const manifest = { 
    players: {}, 
    updatedAt: new Date().toISOString(),
    leagueId: id,
    version: 8
  };

  const uniqueClubs = [...new Set(assets.map(a => a.realTeam).filter(Boolean))];
  
  for (const club of uniqueClubs) {
    try {
      const bsdData = await bsdFetch(`${API_BASE}/api/players/?team_name=${encodeURIComponent(club)}`, {
        headers: { Authorization: `Token ${process.env.BSD_API_KEY}` }
      });
      
      const bsdRoster = (bsdData.results || []).map(p => ({
        id: String(p.id),
        name: p.full_name || p.name
      }));

      assets.filter(a => a.realTeam === club).forEach(asset => {
        const key = playerKey(asset.displayName, asset.realTeam);
        const override = playerOverrides[key];
        
        if (override) {
          manifest.players[key] = { 
            status: "resolved", 
            photoUrl: `https://sports.bzzoiro.com/img/player/${override.id}/`, 
            externalId: override.id, 
            matchedBy: "manual-neon",
            listoneName: asset.displayName,
            realTeam: asset.realTeam
          };
        } else {
          const best = bsdRoster.find(cand => normalize(cand.name) === normalize(asset.displayName));
          if (best) {
            manifest.players[key] = { 
              status: "resolved", 
              photoUrl: `https://sports.bzzoiro.com/img/player/${best.id}/`, 
              externalId: best.id, 
              matchedBy: "automatic",
              listoneName: asset.displayName,
              realTeam: asset.realTeam
            };
          } else {
            manifest.players[key] = { 
              status: "unresolved", 
              listoneName: asset.displayName, 
              realTeam: asset.realTeam,
              candidates: bsdRoster.slice(0, 5)
            };
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
  const playersArr = Object.values(m.players || {});
  return {
    ...m,
    summary: {
      resolved: playersArr.filter(x => x.status === "resolved").length,
      bsdResolved: playersArr.filter(x => x.status === "resolved").length,
      unresolved: playersArr.filter(x => x.status === "unresolved").length
    }
  };
}

module.exports = { 
  mediaStatus, 
  readManifest: buildDirectState, 
  publicManifest: (m) => m,
  linkManual: async (id, key, cand) => {
    const { upsertPlayerOverride } = require("./neon.cjs");
    await upsertPlayerOverride(id, key, cand.id, cand.name);
    return await buildDirectState(id, { fresh: true });
  },
  refreshDirectManifest: (id) => buildDirectState(id, { fresh: true })
};
