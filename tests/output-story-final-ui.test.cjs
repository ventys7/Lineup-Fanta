const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("Visualizza/Copia renders one direct output without format previews", () => {
  for (const file of ["index.html", "fp/index.html", "pd/index.html"]) {
    const html = read(file);
    assert.match(html, /id="outputText" readonly aria-label="Output formazione"/);
    assert.match(html, /id="copyOutputBtn"[^>]*>Copia formazione</);
    assert.doesNotMatch(html, /Anteprima per WhatsApp|Anteprima per Docs|Seleziona un’anteprima/);
  }

  const output = read("js/output.js");
  assert.match(output, /function buildOutputText\(\)/);
  assert.match(output, /renderOutput\(\);\s*toggleModal\(true\)/);
  assert.doesNotMatch(output, /buildWhatsAppOutput|buildDocsOutput|copyWhatsAppBtn|copyDocsBtn/);
});

test("9:16 cards keep role, portrait, player name and team in formation order", () => {
  const story = read("js/story.js");
  const shirt = story.slice(story.indexOf("function drawShirt"), story.indexOf("function drawStarterRows"));
  const role = shirt.indexOf("roleStyle.fill");
  const portrait = shirt.indexOf("portraitSize");
  const name = shirt.indexOf("const name =");
  const team = shirt.indexOf("const team =");

  assert.ok(role >= 0 && portrait > role && name > portrait && team > name);
  assert.match(shirt, /const height = 158|portraitY = y \+ 40/);
  assert.match(shirt, /centerX - 16, y \+ 10, 32, 22/);
  assert.match(shirt, /lastNameY \+ lineHeight \/ 2 \+ 8/);
});

test("formation role badges are slightly smaller and the unified text output is visually structured", () => {
  const css = read("css/formation-clean.css");
  const output = read("js/output.js");

  assert.match(css, /\.formation-shirt__role \{[\s\S]*?width: 21px;[\s\S]*?height: 18px;[\s\S]*?font-size: \.56rem;/);
  assert.match(output, /⚽ FORMAZIONE · \${model\.manager}/);
  assert.match(output, /XI TITOLARE/);
  assert.match(output, /PANCHINA/);
  assert.match(output, /🟨 P|🟦 D|🟩 C|🟥 A/);
  assert.match(output, /━━━━━━━━━━━━━━━━━━━━/);
});

test("standings keep inline penalties and remove the duplicate strip below the table", () => {
  const standings = read("dashboard/src/pages/Standings.tsx");
  const css = read("dashboard/src/styles/standings.css");

  assert.match(standings, /className="lf-standings-penalty"/);
  assert.doesNotMatch(standings, /lf-standings-penalty-note|penalizedTeams/);
  assert.doesNotMatch(css, /\.lf-standings-penalty-note/);
});
