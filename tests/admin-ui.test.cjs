"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

function source(relativePath) {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

const REQUIRED_IDS = [
  "loginView", "adminView", "loginForm", "adminPassword", "leagueSettings", "logoCodes",
  "adminFeedback", "saveSettings", "migrateNeon", "logoutButton", "mediaRefresh",
  "mediaStatus", "unresolvedTeams", "unresolvedPlayers"
];

test("FP and PD admin redesign preserve every functional hook", () => {
  for (const file of ["fp/admin-links/index.html", "pd/admin-links/index.html"]) {
    const html = source(file);
    for (const id of REQUIRED_IDS) assert.match(html, new RegExp(`id=["']${id}["']`), `${file}: ${id}`);
    assert.match(html, /admin-toolbar/);
    assert.match(html, /admin-dashboard-grid/);
    assert.match(html, /admin-card--media/);
  }
});

test("admin panel remains responsive and accessible after the visual redesign", () => {
  const css = source("css/admin-links.css");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /admin-feedback:empty/);
});
