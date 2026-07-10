"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  parsePublishedCalendar,
  toCalendarCsv
} = require("../lib/calendar-parser.cjs");

test("calendar parser recognizes complete and pending matchdays", () => {
  const html = `
    <h2>III GIORNATA (1)</h2>
    <p>Alpha (66,5) vs Beta (72) -> 1-2</p>
    <p>Gamma (70) vs Delta (65,5) -> 1-0</p>
    <h2>IV GIORNATA (2)</h2>
    <p>Alpha vs Gamma -> -</p>
    <p>Beta vs Delta -> -</p>
  `;

  const matchdays = parsePublishedCalendar(html, 2);

  assert.equal(matchdays.length, 2);
  assert.equal(matchdays[0].realRoundNumber, 3);
  assert.equal(matchdays[0].fantasyMatchdayNumber, 1);
  assert.equal(matchdays[0].status, "calcolata");
  assert.equal(matchdays[0].matches[0].homeTotal, 66.5);
  assert.equal(matchdays[1].status, "da_calcolare");
});

test("calendar CSV keeps the public contract stable", () => {
  const csv = toCalendarCsv([
    {
      realRoundNumber: 3,
      fantasyMatchdayNumber: 1,
      status: "calcolata",
      matches: [{
        homeTeam: "Alpha",
        awayTeam: "Beta",
        homeTotal: 66.5,
        awayTotal: 72,
        homeGoals: 1,
        awayGoals: 2,
        note: ""
      }]
    }
  ]);

  assert.match(csv, /^real_round_number,fantasy_matchday_number,status,/);
  assert.match(csv, /3,1,calcolata,Alpha,Beta,66\.5,72,1,2,/);
});
