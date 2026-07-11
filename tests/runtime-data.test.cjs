const test = require("node:test");
const assert = require("node:assert/strict");

const runtime = require("../lib/runtime-data.cjs");

test("runtime document normalizes registry and teams", () => {
  const document = runtime.normalizeRuntimeDocument({
    registry: {
      activeFantasyMatchday: "4",
      matchdays: {
        4: "https://docs.google.com/document/d/e/test/pub",
        invalid: "https://example.com/nope"
      }
    },
    teams: {
      version: 1,
      teams: { Paolo: { credits: 100, logoUrl: "" } }
    }
  }, "fp");

  assert.equal(document.leagueId, "fp");
  assert.equal(document.registry.activeFantasyMatchday, 4);
  assert.deepEqual(document.registry.matchdays["4"], {
    url: "https://docs.google.com/document/d/e/test/pub"
  });
  assert.equal(document.teams.teams.Paolo.credits, 100);
});

test("Blob config and logo paths are separated by league", () => {
  assert.equal(runtime.configPathname("fp"), "lineup-fanta/config/fp.json");
  assert.equal(runtime.configPathname("pd"), "lineup-fanta/config/pd.json");
  assert.throws(() => runtime.configPathname("xx"), /Lega non valida/);
});

test("managed Blob logos are recognized without matching external URLs", () => {
  assert.equal(
    runtime.isManagedBlobUrl(
      "https://store.public.blob.vercel-storage.com/lineup-fanta/team-logos/fp/paolo-random.png"
    ),
    true
  );
  assert.equal(runtime.isManagedBlobUrl("https://example.com/logo.png"), false);
  assert.equal(runtime.isManagedLogoUrl("/.lineup-runtime/logos/fp/paolo.png"), true);
});
