"use strict";
function normalize(v) {
  return String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/ø/g, "o").replace(/ß/g, "ss").replace(/[’']/g, "")
    .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}
function getScore(target, candidate) {
  const t = normalize(target);
  const c = normalize(candidate);
  if (!t || !c) return 0;
  if (t === c) return 100;
  const tTokens = t.split(" ");
  const cTokens = c.split(" ");
  if (tTokens.every(token => c.includes(token))) return 95;
  if (cTokens.at(-1) === tTokens.at(-1) && tTokens[0][0] === cTokens[0][0]) return 90;
  return 0;
}
module.exports = { normalize, getScore };
