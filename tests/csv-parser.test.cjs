"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function loadParser() {
  const source = fs.readFileSync(path.join(__dirname, "../js/csv-parser.js"), "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: "csv-parser.js" });
  return context.window.LineupCsvParser;
}

test("CSV parser reads assets and live credits from columns O/P", () => {
  const parser = loadParser();
  const rows = [
    "metadata",
    "metadata",
    "metadata",
    "metadata",
    "metadata",
    "metadata",
    "Tag,Ruolo,Nome,Squadra,Quotazione,Prezzo Acquisto,,,,,,,,,Partecipante,Crediti",
    "Paolo,C,Tielemans,Aston Villa,15,20,,,,,,,,,Paolo,123",
    "Luca,A,Wissa,Newcastle,10,15,,,,,,,,,Luca,98"
  ];

  const result = parser.parseLeagueCsv(rows.join("\n"));

  assert.equal(result.assets.length, 2);
  assert.equal(result.assets[0].displayName, "Tielemans");
  assert.equal(result.assets[0].managerCredits, 123);
  assert.equal(result.assets[1].managerCredits, 98);
});

test("CSV parser accepts semicolon-delimited exports", () => {
  const parser = loadParser();
  const csv = [
    "Tag;Ruolo;Nome;Squadra;Quotazione;Prezzo Acquisto",
    "Paolo;D;Mukiele;Sunderland;7;9"
  ].join("\n");

  const result = parser.parseLeagueCsv(csv);
  assert.equal(result.assets.length, 1);
  assert.equal(result.assets[0].role, "D");
  assert.equal(result.assets[0].displayName, "Mukiele");
});
