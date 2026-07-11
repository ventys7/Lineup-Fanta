const test = require("node:test");
const assert = require("node:assert/strict");
const { extractSeason, normalizeSeason } = require("../lib/season.cjs");

test("normalizza le stagioni supportate", () => {
  assert.equal(normalizeSeason("26-27"), "2026-27");
  assert.equal(normalizeSeason("2026-27"), "2026-27");
  assert.equal(normalizeSeason("2026/2027"), "2026-27");
});

test("estrae la stagione dal titolo della giornata", () => {
  assert.equal(extractSeason("III Giornata 26-27 (1)"), "2026-27");
  assert.equal(extractSeason("XXXVII Giornata (36) 25-26"), "2025-26");
});

test("rifiuta intervalli non consecutivi", () => {
  assert.equal(normalizeSeason("26-28"), null);
  assert.equal(extractSeason("III Giornata (1)"), null);
});
