#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] || process.cwd());
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";

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
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
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

  const candidates = pathname.endsWith("/")
    ? [path.join(requested, "index.html")]
    : [requested, path.join(requested, "index.html")];

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
  console.log(`✓ Lineup-Fanta live: http://localhost:${port}`);
  console.log("✓ App statica: Formazione, Kick-off, Listone, Rose e Classifica");
  console.log("✓ Cache disabilitata durante lo sviluppo");
});
