"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const originalCwd = process.cwd();
let tempRoot;
let media;
let storage;
let mode = "success";

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" }
  });
}

function csvResponse() {
  const csv = [
    "Tag,Ruolo,Nome,Squadra,Quotazione,Prezzo Acquisto",
    "Paolo,A,Bukayo Saka,Arsenal,40,50",
    "Paolo,A,Gabriel Martinelli,Arsenal,30,35"
  ].join("\n");
  return new Response(csv, { status: 200, headers: { "content-type": "text/csv" } });
}

async function setup() {
  tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "lineup-media-atomic-"));
  await fs.mkdir(path.join(tempRoot, "data"), { recursive: true });
  await fs.writeFile(path.join(tempRoot, "data", "settings.json"), JSON.stringify({
    version: 1,
    leagues: {
      fp: { listoneCsvUrl: "https://example.test/fp.csv", standingsCsvUrl: "", disciplineDocUrl: "" },
      pd: { listoneCsvUrl: "", standingsCsvUrl: "", disciplineDocUrl: "" }
    }
  }));
  process.chdir(tempRoot);
  process.env.BSD_API_KEY = "test-token";

  global.fetch = async (input) => {
    const url = new URL(String(input));
    if (url.hostname === "example.test") return csvResponse();
    if (url.pathname === "/api/teams/") {
      if (mode === "team-failure") return jsonResponse({ detail: "temporary outage" }, 503);
      return jsonResponse({ count: 1, results: [{ id: 18, name: "Arsenal", country: "England" }] });
    }
    if (url.pathname === "/api/players/") {
      return jsonResponse({
        count: 2,
        results: [
          { id: 455, full_name: "Bukayo Saka" },
          { id: 456, full_name: "Gabriel Martinelli" }
        ]
      });
    }
    if (url.pathname === "/img/player/455/" || url.pathname === "/img/player/456/") {
      return new Response(Buffer.alloc(2_048, 7), { status: 200, headers: { "content-type": "image/png" } });
    }
    throw new Error(`Unexpected fetch: ${url}`);
  };

  media = require(path.join(originalCwd, "lib", "player-media.cjs"));
  storage = require(path.join(originalCwd, "lib", "storage.cjs"));
}

async function teardown() {
  process.chdir(originalCwd);
  delete process.env.BSD_API_KEY;
  delete global.fetch;
  if (tempRoot) await fs.rm(tempRoot, { recursive: true, force: true });
}

test("player media staging is atomic and failure-safe", async (t) => {
  await setup();
  t.after(teardown);

  await t.test("live manifest stays unchanged until verified publication", async () => {
    mode = "success";
    await fs.rm(path.join(tempRoot, ".lineup-runtime"), { recursive: true, force: true });
    await storage.writeJson("media/fp.json", {
      version: 7,
      leagueId: "fp",
      provider: "bsd",
      sourceMode: "bsd-team-rosters",
      players: {
        "bukayo saka|arsenal": {
          key: "bukayo saka|arsenal",
          listoneName: "Bukayo Saka",
          realTeam: "Arsenal",
          status: "resolved",
          photoUrl: "/.lineup-runtime/player-faces/bsd/455/old.png",
          cached: true,
          storageVerified: true,
          provider: "bsd",
          externalId: "455",
          storageKey: "player-faces/bsd/455/old.png"
        }
      },
      refresh: { pending: false }
    });

    const started = await media.startMissingSync("fp");
    assert.equal(started.refresh.pending, true);
    assert.equal(started.refresh.playerTotal, 1);

    const liveDuringStaging = await media.readManifest("fp");
    assert.equal(Boolean(liveDuringStaging.players["gabriel martinelli|arsenal"]), false);
    assert.equal(liveDuringStaging.players["bukayo saka|arsenal"].photoUrl.includes("old.png"), true);

    let status = started;
    for (let iteration = 0; status.refresh.pending && iteration < 5; iteration += 1) {
      status = await media.processFullSync("fp", 10);
    }
    assert.equal(status.refresh.pending, false);
    assert.equal(status.refresh.error, "");

    const published = await media.readManifest("fp");
    const martinelli = published.players["gabriel martinelli|arsenal"];
    assert.equal(martinelli.status, "resolved");
    assert.equal(martinelli.storageVerified, true);
    assert.match(martinelli.photoUrl, /^\/\.lineup-runtime\/player-faces\/bsd\/456\//);
    assert.equal(martinelli.photoUrl.includes("sports.bzzoiro.com"), false);
  });

  await t.test("a persisted teams N/N job repairs itself and starts player uploads", async () => {
    mode = "success";
    await fs.rm(path.join(tempRoot, ".lineup-runtime"), { recursive: true, force: true });

    let status = await media.startMissingSync("fp");
    assert.equal(status.refresh.phase, "teams");

    status = await media.processFullSync("fp", 10);
    assert.equal(status.refresh.phase, "players");
    assert.equal(status.refresh.teamCursor, status.refresh.teamTotal);

    const stuckJob = await storage.readJson("media/bsd/job-fp.json", null);
    await storage.writeJson("media/bsd/job-fp.json", {
      ...stuckJob,
      pending: true,
      phase: "teams",
      teamCursor: stuckJob.clubs.length,
      playerCursor: 0,
      error: ""
    });

    status = await media.processFullSync("fp", 1);
    assert.notEqual(status.refresh.phase, "teams");
    assert.equal(Number(status.refresh.playerCursor || 0) > 0, true);
  });

  await t.test("systemic BSD failure leaves the previous live manifest active", async () => {
    mode = "team-failure";
    await fs.rm(path.join(tempRoot, ".lineup-runtime"), { recursive: true, force: true });
    await storage.writeJson("media/fp.json", {
      version: 7,
      leagueId: "fp",
      provider: "bsd",
      sourceMode: "bsd-team-rosters",
      players: {
        "bukayo saka|arsenal": {
          key: "bukayo saka|arsenal",
          listoneName: "Bukayo Saka",
          realTeam: "Arsenal",
          status: "resolved",
          photoUrl: "/.lineup-runtime/player-faces/bsd/455/old.png",
          cached: true,
          storageVerified: true,
          provider: "bsd",
          externalId: "455",
          storageKey: "player-faces/bsd/455/old.png"
        }
      },
      refresh: { pending: false }
    });

    await media.markFullSync("fp");
    const status = await media.processFullSync("fp", 10);
    assert.equal(status.refresh.pending, true);
    assert.match(status.refresh.error, /Nessuna rosa BSD/);

    const live = await media.readManifest("fp");
    assert.deepEqual(Object.keys(live.players), ["bukayo saka|arsenal"]);
    assert.equal(live.players["bukayo saka|arsenal"].photoUrl.includes("old.png"), true);
  });
});
