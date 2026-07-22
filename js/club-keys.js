(function (g) {
  "use strict";
  const ALIASES = Object.freeze({
    "man utd": "manchester united", "man united": "manchester united",
    "atletico madrid": "atletico de madrid", "barca": "barcelona"
  });
  function normalize(v) {
    return String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  }
  function key(v) {
    let n = normalize(v).replace(/^(afc|fc|cf|rcd|ud) /g, "").replace(/ (afc|fc|cf|rcd|ud|sad)$/g, "");
    return ALIASES[n] || n;
  }
  g.LineupClubKeys = Object.freeze({ normalize, key });
})(window);
