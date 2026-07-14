"use strict";

function noStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

function methodNotAllowed(res, methods) {
  res.setHeader("Allow", methods.join(", "));
  return res.status(405).json({ error: "Metodo non consentito" });
}

module.exports = { methodNotAllowed, noStore, readBody };
