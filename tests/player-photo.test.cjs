"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const handler = require("../api/player-photo.js");

function responseRecorder() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) { this.headers[String(name).toLowerCase()] = String(value); },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
    send(value) { this.body = value; return this; },
    end(value) { this.body = value ?? null; return this; }
  };
}

test("player photo proxy rejects oversized responses before buffering them", async () => {
  const previous = global.fetch;
  let arrayBufferCalled = false;
  global.fetch = async () => ({
    ok: true,
    status: 200,
    headers: new Headers({ "content-type": "image/png", "content-length": String(6 * 1024 * 1024) }),
    body: null,
    async arrayBuffer() { arrayBufferCalled = true; return new ArrayBuffer(0); }
  });
  try {
    const res = responseRecorder();
    await handler({ method: "GET", query: { id: "455" } }, res);
    assert.equal(res.statusCode, 502);
    assert.equal(arrayBufferCalled, false);
    assert.match(String(res.body?.error || ""), /non disponibile|troppo pesante/i);
  } finally {
    global.fetch = previous;
  }
});

test("player photo proxy serves a valid image with long-lived cache headers", async () => {
  const previous = global.fetch;
  const payload = Buffer.from([137, 80, 78, 71]);
  global.fetch = async () => new Response(payload, {
    status: 200,
    headers: { "content-type": "image/png", "content-length": String(payload.length) }
  });
  try {
    const res = responseRecorder();
    await handler({ method: "GET", query: { id: "455" } }, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, payload);
    assert.equal(res.headers["content-type"], "image/png");
    assert.match(res.headers["cache-control"], /s-maxage=2592000/);
  } finally {
    global.fetch = previous;
  }
});
