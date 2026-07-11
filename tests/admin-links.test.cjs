const test = require("node:test");
const assert = require("node:assert/strict");

const { __test } = require("../api/admin-links.js");

test("admin session token is signed and expires after 30 minutes", () => {
  const secret = "test-secret";
  const token = __test.createSessionToken(secret, 1_000);
  assert.equal(__test.verifySessionToken(token, secret, 1_001), true);
  assert.equal(__test.verifySessionToken(token, "wrong-secret", 1_001), false);
  assert.equal(
    __test.verifySessionToken(token, secret, 1_000 + __test.SESSION_TTL_SECONDS + 1),
    false
  );
});

test("team logo update preserves credits and uploads an immutable URL", async () => {
  const current = {
    version: 1,
    teams: {
      Paolo: { credits: 120, logoUrl: "https://old.example/logo.png" },
      Edis: { credits: 90, logoUrl: "" }
    }
  };

  const result = await __test.buildTeamsUpdate({
    leagueId: "fp",
    currentTeams: current,
    rawLogos: { Paolo: "https://ignored.example/logo.png", Edis: "" },
    rawUploads: {
      Paolo: {
        mimeType: "image/png",
        dataBase64: Buffer.from("png").toString("base64"),
        width: 32,
        height: 32
      }
    },
    uploadLogo: async () => ({
      url: "https://store.public.blob.vercel-storage.com/lineup-fanta/team-logos/fp/paolo-random.png"
    })
  });

  assert.equal(result.document.teams.Paolo.credits, 120);
  assert.match(result.document.teams.Paolo.logoUrl, /blob\.vercel-storage\.com/);
  assert.equal(result.document.teams.Edis.credits, 90);
  assert.equal(result.logoUrls.Edis, "");
});

test("admin save writes one runtime document and does not create a deploy", async () => {
  const writes = [];
  const deleted = [];
  const runtime = {
    readRuntimeDocument: async () => ({
      source: "repository",
      etag: null,
      document: {
        version: 1,
        leagueId: "fp",
        updatedAt: null,
        registry: { activeFantasyMatchday: null, matchdays: {} },
        teams: { version: 1, teams: { Paolo: { credits: 120, logoUrl: "" } } }
      }
    }),
    uploadTeamLogo: async () => ({
      url: "https://store.public.blob.vercel-storage.com/lineup-fanta/team-logos/fp/paolo-random.png"
    }),
    writeRuntimeDocument: async (leagueId, document, options) => {
      writes.push({ leagueId, document, options });
      return {
        source: "blob",
        document: { ...document, updatedAt: "2026-07-11T00:00:00.000Z" }
      };
    },
    deleteManagedLogo: async (url) => deleted.push(url)
  };

  const result = await __test.saveAdminData({
    leagueId: "fp",
    registry: {
      activeFantasyMatchday: 3,
      matchdays: { 3: { url: "https://docs.google.com/document/d/e/test/pub" } }
    },
    logos: { Paolo: "" },
    logoUploads: {}
  }, { runtime });

  assert.equal(writes.length, 1);
  assert.equal(writes[0].leagueId, "fp");
  assert.equal(writes[0].document.registry.activeFantasyMatchday, 3);
  assert.equal(writes[0].document.teams.teams.Paolo.credits, 120);
  assert.match(result.message, /Nessun deploy/);
  assert.deepEqual(deleted, []);
});

test("unknown fantasy teams and invalid uploads are rejected", async () => {
  const current = {
    version: 1,
    teams: { Paolo: { credits: 120, logoUrl: "" } }
  };

  await assert.rejects(
    __test.buildTeamsUpdate({
      leagueId: "fp",
      currentTeams: current,
      rawLogos: { Sconosciuta: "https://example.com/logo.png" },
      rawUploads: {},
      uploadLogo: async () => ({ url: "https://example.com/upload.png" })
    }),
    /non riconosciuta/
  );

  await assert.rejects(
    __test.buildTeamsUpdate({
      leagueId: "fp",
      currentTeams: current,
      rawLogos: { Paolo: "" },
      rawUploads: {
        Paolo: { mimeType: "image/svg+xml", dataBase64: "PHN2Zz4=", width: 1, height: 1 }
      },
      uploadLogo: async () => ({ url: "https://example.com/upload.png" })
    }),
    /PNG/
  );
});
