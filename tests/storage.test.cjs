"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { LOCAL_ROOT, readBuffer, statBuffer, uploadImmutableImage } = require("../lib/storage.cjs");

test("immutable image uploads expose a verifiable content-addressed key", async () => {
  const folder = `tests/player-faces/${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const bytes = Buffer.from("lineup-fanta-storage-verification");
  const expectedDigest = crypto.createHash("sha256").update(bytes).digest("hex").slice(0, 12);

  const stored = await uploadImmutableImage(folder, "portrait", bytes, "image/png");
  assert.match(stored.key, new RegExp(`portrait-${expectedDigest}\\.png$`));
  assert.equal(stored.digest, expectedDigest);
  assert.deepEqual(await readBuffer(stored.key), bytes);
  const metadata = await statBuffer(stored.key);
  assert.equal(metadata.size, bytes.length);

  await fs.rm(path.join(LOCAL_ROOT, ...folder.split("/")), { recursive: true, force: true });
});
