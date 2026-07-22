"use strict";
function normalize(v) {
  return String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}
function getScore(target, candidate) {
  const t = normalize(target);
  const c = normalize(candidate);
  if (t === c) return 100;
  if (c.includes(t) || t.includes(c)) return 85;
  return 0;
}
module.exports = { normalize, getScore };
