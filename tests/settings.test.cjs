"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeSettings } = require("../lib/settings.cjs");

test("runtime settings keep separate sources for FP and PD", () => {
  const settings = normalizeSettings({ leagues: {
    fp: { listoneCsvUrl: "https://example.com/fp.csv", standingsCsvUrl: "https://example.com/fp-standings.csv", disciplineDocUrl: "https://example.com/fp-doc" },
    pd: { listoneCsvUrl: "https://example.com/pd.csv", standingsCsvUrl: "", disciplineDocUrl: "" }
  }});
  assert.equal(settings.leagues.fp.listoneCsvUrl, "https://example.com/fp.csv");
  assert.equal(settings.leagues.pd.listoneCsvUrl, "https://example.com/pd.csv");
  assert.equal(settings.leagues.pd.standingsCsvUrl, "");
});
