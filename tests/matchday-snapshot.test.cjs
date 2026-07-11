const test = require("node:test");
const assert = require("node:assert/strict");
const { __test } = require("../lib/matchday-snapshot.cjs");

function parsedWith(player, section = "starters") {
  return {
    title: "III Giornata 26-27 (1)",
    fantasyMatchdayNumber: 1,
    matches: [{
      homeTeam: "Paolo",
      awayTeam: "Sebastian",
      home: { team: "Paolo", alias: "Paolo", starters: section === "starters" ? [player] : [], bench: section === "bench" ? [player] : [] },
      away: { team: "Sebastian", alias: "Sebastian", starters: [], bench: [] }
    }]
  };
}

test("conserva identità e chiave quando il giocatore passa in panchina", () => {
  const assets = [{ active: true, ownerTag: "Paolo", displayName: "Mohamed Salah", docsName: "M. Salah", assetCode: "A-SALAH", role: "A", realTeam: "Liverpool" }];
  const first = __test.enrichParsed(parsedWith({ name: "M. Salah", raw: "M. Salah", vote: null }), null, assets);
  const snapshot = { parsed: first };
  const second = __test.enrichParsed(parsedWith({ name: "M. Salah", raw: "M. Salah", vote: 7.5 }, "bench"), snapshot, []);
  const oldPlayer = first.matches[0].home.starters[0];
  const newPlayer = second.matches[0].home.bench[0];
  assert.equal(newPlayer.identity.assetCode, "A-SALAH");
  assert.equal(newPlayer.identityKey, oldPlayer.identityKey);
});

test("non accetta un parsing che perde quasi tutti i giocatori", () => {
  const previous = { stats: { matches: 4, players: 100 } };
  const broken = { fantasyMatchdayNumber: 1, matches: [{ homeTeam: "A", awayTeam: "B", home: { starters: [] }, away: { starters: [] } }] };
  assert.throws(() => __test.validateParsed(broken, 1, previous), /Parsing sospetto/);
});

test("separa i percorsi per stagione", () => {
  assert.equal(__test.snapshotPathname("fp", "26-27", 1), "lineup-fanta/matchdays/fp/2026-27/1.json");
});
