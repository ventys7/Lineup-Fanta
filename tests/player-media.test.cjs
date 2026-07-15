"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  assertPublishableManifest,
  chooseCandidate,
  clubKey,
  collectBsdPlayers,
  collectBsdTeams,
  isFullSyncDate,
  isResolvedEntry,
  keepExistingOrUnresolved,
  playerKey,
  playerPhotoUrl
} = require("../lib/player-media.cjs");

test("media keys normalize club aliases without touching fantasy roles", () => {
  assert.equal(clubKey("Man Utd"), "manchester united");
  assert.equal(clubKey("Atlético Madrid"), "atletico de madrid");
  assert.equal(clubKey("Atl. Madrid"), "atletico de madrid");
  assert.equal(clubKey("RCD Espanyol de Barcelona"), "espanyol");
  assert.equal(clubKey("R. Sociedad"), "real sociedad");
  assert.equal(clubKey("Levante UD"), "levante");
  assert.equal(playerKey("João Pedro", "Chelsea"), "joao pedro|chelsea");
});

test("full image refresh is scheduled only twice per year", () => {
  assert.equal(isFullSyncDate(new Date("2026-01-15T04:00:00Z")), true);
  assert.equal(isFullSyncDate(new Date("2026-07-15T04:00:00Z")), true);
  assert.equal(isFullSyncDate(new Date("2026-08-15T04:00:00Z")), false);
});

test("BSD team payload is normalized into stable provider IDs", () => {
  const teams = collectBsdTeams({
    count: 3,
    results: [
      { id: 18, name: "Arsenal", country: "England" },
      { id: 57, name: "Real Madrid", country: { name: "Spain" } },
      { id: 58, name: "Atletico Madrid", country_name: "Spain" }
    ]
  });
  assert.equal(Object.values(teams).find((team) => team.key === "arsenal")?.id, "18");
  assert.equal(Object.values(teams).find((team) => team.key === "real madrid")?.id, "57");
  assert.equal(Object.values(teams).find((team) => team.key === "atletico de madrid")?.id, "58");
});

test("BSD player payload yields names and the standard portrait URL", () => {
  const squad = collectBsdPlayers({
    count: 2,
    results: [
      { id: 455, full_name: "Bukayo Saka", short_name: "B. Saka", position: "F" },
      { id: 594, name: "Kylian Mbappé", position: "F" }
    ]
  }, { id: "18", name: "Arsenal", key: "arsenal" });

  assert.equal(squad.length, 2);
  assert.equal(squad[0].teamKey, "arsenal");
  assert.deepEqual(squad[0].names, ["Bukayo Saka", "B. Saka"]);
  assert.equal(squad[1].photoUrl, playerPhotoUrl("594"));
  assert.equal(playerPhotoUrl("594"), "https://sports.bzzoiro.com/img/player/594/");
});

test("BSD abbreviated names match the Listone only inside the same club", () => {
  const result = chooseCandidate(
    { displayName: "Riccardo Calafiori", realTeam: "Arsenal" },
    [
      { id: "157052", name: "R. Calafiori", names: ["R. Calafiori"], teamName: "Arsenal", teamKey: "arsenal" },
      { id: "999", name: "R. Calafiori", names: ["R. Calafiori"], teamName: "Real Madrid", teamKey: "real madrid" }
    ]
  );
  assert.equal(result.selected?.id, "157052");
});

test("a failed refresh preserves the previous verified Blob entry", () => {
  const existing = {
    key: "bukayo saka|arsenal",
    listoneName: "Bukayo Saka",
    realTeam: "Arsenal",
    status: "resolved",
    photoUrl: "https://example.public.blob.vercel-storage.com/player-faces/bsd/455/portrait.png",
    cached: true,
    storageVerified: true,
    externalId: "455"
  };
  const next = keepExistingOrUnresolved(
    { displayName: "Bukayo Saka", realTeam: "Arsenal" },
    existing,
    [],
    "Foto BSD HTTP 503"
  );
  assert.equal(next.status, "resolved");
  assert.equal(next.photoUrl, existing.photoUrl);
  assert.equal(next.lastRefreshError, "Foto BSD HTTP 503");
  assert.equal(isResolvedEntry(next), true);
});

test("publish validation rejects provider CDN URLs and accepts verified Blob URLs", () => {
  const base = {
    version: 6,
    leagueId: "fp",
    provider: "bsd",
    sourceMode: "bsd-team-rosters",
    refresh: { pending: false },
    players: {}
  };
  assert.throws(() => assertPublishableManifest({
    ...base,
    players: {
      bad: {
        key: "bad",
        listoneName: "Bad",
        status: "resolved",
        photoUrl: "https://sports.bzzoiro.com/img/player/455/",
        storageVerified: true
      }
    }
  }), /Foto non verificata|URL esterno vietato/);

  assert.equal(assertPublishableManifest({
    ...base,
    players: {
      good: {
        key: "good",
        listoneName: "Good",
        status: "resolved",
        photoUrl: "https://example.public.blob.vercel-storage.com/player-faces/bsd/455/portrait.png",
        storageVerified: true
      }
    }
  }), true);
});
