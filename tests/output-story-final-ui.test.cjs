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
});
