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

test("team logo update preserves credits and rejects unknown teams", () => {
  const current = {
    version: 1,
    teams: {
      Paolo: { credits: 120, logoUrl: "" },
      Edis: { credits: 90, logoUrl: "https://old.example/logo.png" }
    }
  };

  const updated = __test.normalizeTeamsDocument(current, {
    Paolo: "https://cdn.example/paolo.png",
    Edis: ""
  });

  assert.equal(updated.teams.Paolo.credits, 120);
  assert.equal(updated.teams.Paolo.logoUrl, "https://cdn.example/paolo.png");
  assert.equal(updated.teams.Edis.credits, 90);
  assert.equal(updated.teams.Edis.logoUrl, "");
  assert.throws(
    () => __test.normalizeTeamsDocument(current, { Sconosciuta: "https://x.test/a.png" }),
    /non riconosciuta/
  );
});

test("uploaded team logo becomes a deterministic repository asset", () => {
  const png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
  const current = {
    version: 1,
    teams: {
      Paolo: { credits: 120, logoUrl: "https://old.example/logo.png" }
    }
  };

  const updated = __test.prepareTeamsUpdate(
    current,
    { Paolo: "https://ignored.example/logo.png" },
    {
      Paolo: {
        mimeType: "image/png",
        dataBase64: png,
        width: 1,
        height: 1
      }
    },
    "fp"
  );

  const assetPath = __test.teamLogoAssetPath("fp", "Paolo");
  assert.equal(updated.document.teams.Paolo.credits, 120);
  assert.equal(updated.document.teams.Paolo.logoUrl, `/${assetPath}`);
  assert.equal(updated.logoUrls.Paolo, `/${assetPath}`);
  assert.deepEqual(updated.files[assetPath], {
    content: png,
    encoding: "base64"
  });
});

test("logo uploads reject invalid formats and unknown teams", () => {
  const current = {
    version: 1,
    teams: { Paolo: { credits: 120, logoUrl: "" } }
  };

  assert.throws(
    () => __test.prepareTeamsUpdate(current, { Paolo: "" }, {
      Paolo: { mimeType: "image/svg+xml", dataBase64: "PHN2Zz4=", width: 1, height: 1 }
    }, "fp"),
    /PNG/
  );

  assert.throws(
    () => __test.prepareTeamsUpdate(current, { Paolo: "" }, {
      Sconosciuta: { mimeType: "image/png", dataBase64: "AAAA", width: 1, height: 1 }
    }, "fp"),
    /non riconosciuta/
  );

  assert.equal(__test.normalizeLogoUrl("/assets/team-logos/fp/paolo.png"), "/assets/team-logos/fp/paolo.png");
});
