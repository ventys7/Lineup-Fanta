"use strict";
const { normalize, getScore } = require('./media-engine/matcher.cjs');
const { bsdFetch } = require('./media-engine/api-client.cjs');
const { loadLeagueAssets } = require("./listone.cjs");
const { leagueId } = require("./settings.cjs");
const { databaseConfigured, readManifestCache, readPlayerOverrides, writeManifestCache } = require("./neon.cjs");

const API_BASE = "https://sports.bzzoiro.com";
const CACHE_TTL = 6 * 60 * 60 * 1000;

function clubKey(v) {
  const ALIASES = { "man utd": "manchester united", "man united": "manchester united", "nottm forest": "nottingham forest", "atletico madrid": "atletico de madrid", "barca": "barcelona" };
  let n = normalize(v).replace(/^(afc|fc|cf|rcd|ud) /g, "").replace(/ (afc|fc|cf|rcd|ud|sad)$/g, "");
  return ALIASES[n] || n;
}

function playerKey(name, team) {
  return `${normalize(name)}|${clubKey(team)}`;
}

async function buildDirectState(rawId, options = {}) {
  const id = leagueId(rawId);
  if (!options.fresh && databaseConfigured()) {
    const cached = await readManifestCache(id);
    if (cached?.state?.players && (new Date(cached.generatedAt).getTime() + CACHE_TTL) > Date.now()) return cached.state;
  }

  const { assets } = await loadLeagueAssets(id);
  const playerOverrides = await readPlayerOverrides(id);
  const manifest = { players: {}, updatedAt: new Date().toISOString(), leagueId: id, version: 8 };

  const clubs = [...new Set(assets.map(a => a.realTeam).filter(Boolean))];
  for (const club of clubs) {
    try {
      const bsdName = clubKey(club);
      const bsdData = await bsdFetch(`${API_BASE}/api/players/?search=${encodeURIComponent(bsdName)}`, {
        headers: { Authorization: `Token ${process.env.BSD_API_KEY}` }
      });
      const roster = (bsdData?.results || []).map(p => ({ id: String(p.id), name: p.full_name || p.name }));

      assets.filter(a => a.realTeam === club).forEach(asset => {
        // Gestione blocchi portieri: scompone "Nome A - Nome B"
        const playerNames = asset.displayName.split(/\s+-\s+/).map(n => n.trim());
        
        playerNames.forEach(name => {
          const key = playerKey(name, club);
          const ovr = playerOverrides[key];
          if (ovr) {
            manifest.players[key] = { status: "resolved", photoUrl: `https://sports.bzzoiro.com/img/player/${ovr.id}/`, externalId: ovr.id, listoneName: name, realTeam: club };
          } else {
            let best = null; let max = 0;
            roster.forEach(cand => {
              const score = getScore(name, cand.name);
              if (score > max) { max = score; best = cand; }
            });
            if (best && max >= 85) {
              manifest.players[key] = { status: "resolved", photoUrl: `https://sports.bzzoiro.com/img/player/${best.id}/`, externalId: best.id, matchedBy: "automatic", listoneName: name, realTeam: club };
            } else {
              manifest.players[key] = { status: "unresolved", listoneName: name, realTeam: club, candidates: roster.slice(0, 5) };
            }
          }
        });
      });
    } catch (e) {}
  }
  if (databaseConfigured() && Object.keys(manifest.players).length > 0) await writeManifestCache(id, manifest);
  return manifest;
}

module.exports = {
  clubKey, playerKey,
  mediaStatus: async (id) => {
    const m = await buildDirectState(id);
    const p = Object.values(m.players || {});
    return { ...m, summary: { resolved: p.filter(x => x.status === "resolved").length, unresolved: p.filter(x => x.status === "unresolved").length } };
  },
  readManifest: buildDirectState,
  publicManifest: (m) => ({ players: {}, ...(m || {}) }),
  linkManual: async (id, key, cand) => {
    const { upsertPlayerOverride } = require("./neon.cjs");
    await upsertPlayerOverride(id, key, cand.id, cand.name);
    return await buildDirectState(id, { fresh: true });
  },
  refreshDirectManifest: (id) => buildDirectState(id, { fresh: true })
};
