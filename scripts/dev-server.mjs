#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = path.resolve(process.argv[2] || process.cwd());
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";

const apiHandlers = new Map();
for (const [route, relative] of [
  ["/api/calendar", "api/calendar.js"],
  ["/api/matchday", "api/matchday.js"],
  ["/api/admin-links", "api/admin-links.js"]
]) {
  const absolute = path.join(root, relative);
  try {
    apiHandlers.set(route, require(absolute));
  } catch (error) {
    console.warn(`API locale non caricata (${route}):`, error.message);
  }
}

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".csv", "text/csv; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"]
]);

function noStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

function createApiResponse(res) {
  noStore(res);

  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };

  res.json = (payload) => {
    if (!res.headersSent) res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(payload));
    return res;
  };

  res.send = (payload) => {
    if (Buffer.isBuffer(payload) || typeof payload === "string") {
      res.end(payload);
    } else {
      res.json(payload);
    }
    return res;
  };

  return res;
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return undefined;

  const text = Buffer.concat(chunks).toString("utf8");
  const contentType = String(req.headers["content-type"] || "");

  if (contentType.includes("application/json")) {
    try { return JSON.parse(text); } catch { return text; }
  }

  return text;
}

async function handleApi(req, res, url) {
  const handler = apiHandlers.get(url.pathname);
  if (!handler) return false;

  req.query = Object.fromEntries(url.searchParams.entries());
  req.body = await readBody(req);

  try {
    await handler(req, createApiResponse(res));
  } catch (error) {
    console.error(`Errore API locale ${url.pathname}:`, error);
    if (!res.writableEnded) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ error: "Errore interno API locale" }));
    }
  }

  return true;
}

function safeFilePath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const normalized = path.normalize(decoded).replace(/^([.][.][/\\])+/, "");
  const relative = normalized.replace(/^[/\\]+/, "");
  const absolute = path.resolve(root, relative);
  return absolute.startsWith(root + path.sep) || absolute === root ? absolute : null;
}

async function resolveStaticPath(pathname) {
  const requested = safeFilePath(pathname);
  if (!requested) return null;

  const candidates = [];
  if (pathname.endsWith("/")) {
    candidates.push(path.join(requested, "index.html"));
  } else {
    candidates.push(requested, path.join(requested, "index.html"));
  }

  for (const candidate of candidates) {
    try {
      const stats = await fs.stat(candidate);
      if (stats.isFile()) return candidate;
    } catch {}
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (await handleApi(req, res, url)) return;

  const filePath = await resolveStaticPath(url.pathname);
  if (!filePath) {
    noStore(res);
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("404 - File non trovato");
    return;
  }

  try {
    const body = await fs.readFile(filePath);
    noStore(res);
    res.statusCode = 200;
    res.setHeader("Content-Type", mimeTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream");
    res.end(body);
  } catch (error) {
    console.error("Errore file statico:", error);
    res.statusCode = 500;
    res.end("Errore interno");
  }
});

server.listen(port, host, () => {
  console.log(`✓ Lineup-Fanta dev server live: http://localhost:${port}`);
  console.log("✓ API Calendario e scontri attive anche da mobile LAN");
  console.log("✓ Cache disabilitata per file statici e API");
});
