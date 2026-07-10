"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  parseMatchdayHtml,
  parsePlayer,
  selectMatchup
} = require("../lib/matchday-parser.cjs");

test("player parser removes emoji and preserves switch/replacement data", () => {
  const player = parsePlayer("⚽ Tielemans (s+) 6,5 {Gravenberch 6}");

  assert.equal(player.name, "Tielemans");
  assert.equal(player.vote, 6.5);
  assert.equal(player.switchType, "plus");
  assert.deepEqual(player.replacement, {
    name: "Gravenberch",
    vote: 6,
    displayVote: "6"
  });
});

test("matchday parser reads teams, totals and bench", () => {
  const html = `
    <h1>III Giornata (1)</h1>
    <p>Alpha vs Beta</p>
    <p>Coach Alpha:</p>
    <p>Tielemans 6,5</p>
    <p>TOTALE: 70,5 (11)</p>
    <p>A DISPOSIZIONE:</p>
    <p>Pedro Neto</p>
    <p>Coach Beta:</p>
    <p>Wissa 6</p>
    <p>TOTALE: 66 (11)</p>
    <p>A DISPOSIZIONE:</p>
    <p>Mukiele</p>
  `;

  const parsed = parseMatchdayHtml(html, "https://example.test/doc");
  const matchup = selectMatchup(parsed, { homeTeam: "Alpha", awayTeam: "Beta" });

  assert.ok(matchup);
  assert.equal(matchup.home.total, 70.5);
  assert.equal(matchup.home.playersCount, 11);
  assert.equal(matchup.home.bench[0].name, "Pedro Neto");
  assert.equal(matchup.away.bench[0].name, "Mukiele");
});
