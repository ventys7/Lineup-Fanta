"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  chooseCandidate,
  clubKey,
  collectApiFootballSquad,
  collectApiFootballTeams,
  isFullSyncDate,
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

test("full image sync dates match the agreed calendar", () => {
  assert.equal(isFullSyncDate(new Date("2026-08-15T04:00:00Z")), true);
  assert.equal(isFullSyncDate(new Date("2026-11-15T04:00:00Z")), false);
  assert.equal(isFullSyncDate(new Date("2027-02-03T04:00:00Z")), true);
});

test("API-Football team payload is normalized into stable provider IDs", () => {
  const teams = collectApiFootballTeams({
    response: [
      { team: { id: 42, name: "Arsenal", country: "England" } },
      { team: { id: 541, name: "Real Madrid", country: "Spain" } },
      { team: { id: 530, name: "Atletico Madrid", country: "Spain" } }
    ]
  });
  assert.equal(teams.arsenal.id, "42");
  assert.equal(teams["real madrid"].id, "541");
  assert.equal(teams["atletico de madrid"].id, "530");
});

test("API-Football squad payload yields one face URL per player", () => {
  const squad = collectApiFootballSquad({
    response: [{
      team: { id: 42, name: "Arsenal" },
      players: [
        { id: 2273, name: "Kepa", age: 31, number: 13, position: "Goalkeeper", photo: "https://media.api-sports.io/football/players/2273.png" },
        { id: 157052, name: "R. Calafiori", age: 23, number: 33, position: "Defender", photo: "https://media.api-sports.io/football/players/157052.png" }
      ]
    }]
  }, { id: "42", name: "Arsenal", key: "arsenal" });

  assert.equal(squad.length, 2);
  assert.equal(squad[0].teamKey, "arsenal");
  assert.equal(squad[1].photoUrl, playerPhotoUrl("157052"));
});


test("API-Football abbreviated names match the Listone only inside the same club", () => {
  const result = chooseCandidate(
    { displayName: "Riccardo Calafiori", realTeam: "Arsenal" },
    [
      { id: "157052", name: "R. Calafiori", names: ["R. Calafiori"], teamName: "Arsenal", teamKey: "arsenal" },
      { id: "999", name: "R. Calafiori", names: ["R. Calafiori"], teamName: "Real Madrid", teamKey: "real madrid" }
    ]
  );
  assert.equal(result.selected?.id, "157052");
});
