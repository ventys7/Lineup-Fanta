(function exposeClubKeys(global) {
  "use strict";

  const ALIASES = Object.freeze({
    "man utd": "manchester united",
    "man united": "manchester united",
    "manchester utd": "manchester united",
    "man city": "manchester city",
    "spurs": "tottenham",
    "tottenham hotspur": "tottenham",
    "wolves": "wolverhampton",
    "wolverhampton wanderers": "wolverhampton",
    "brighton hove albion": "brighton",
    "west ham united": "west ham",
    "newcastle united": "newcastle",
    "leeds united": "leeds",
    "nottingham forest": "nottm forest",
    "notts forest": "nottm forest",
    "atletico madrid": "atletico de madrid",
    "atletico": "atletico de madrid",
    "atl madrid": "atletico de madrid",
    "at madrid": "atletico de madrid",
    "club atletico de madrid": "atletico de madrid",
    "club atletico madrid": "atletico de madrid",
    "atletico de madrid sad": "atletico de madrid",
    "athletic bilbao": "athletic club",
    "ath bilbao": "athletic club",
    "athletic": "athletic club",
    "athletic club bilbao": "athletic club",
    "athletic club de bilbao": "athletic club",
    "real betis balompie": "real betis",
    "betis": "real betis",
    "betis sevilla": "real betis",
    "rc celta": "celta vigo",
    "celta de vigo": "celta vigo",
    "real club celta de vigo": "celta vigo",
    "celta": "celta vigo",
    "deportivo alaves": "alaves",
    "deportivo alaves sad": "alaves",
    "rcd espanyol": "espanyol",
    "espanyol de barcelona": "espanyol",
    "rcd espanyol de barcelona": "espanyol",
    "real club deportivo espanyol": "espanyol",
    "espanyol barcelona": "espanyol",
    "rcd mallorca": "mallorca",
    "real club deportivo mallorca": "mallorca",
    "ca osasuna": "osasuna",
    "club atletico osasuna": "osasuna",
    "rayo": "rayo vallecano",
    "rayo vallecano de madrid": "rayo vallecano",
    "r vallecano": "rayo vallecano",
    "real sociedad de futbol": "real sociedad",
    "real sociedad san sebastian": "real sociedad",
    "r sociedad": "real sociedad",
    "sociedad": "real sociedad",
    "sevilla fc": "sevilla",
    "valencia cf": "valencia",
    "villarreal cf": "villarreal",
    "girona fc": "girona",
    "girona futbol club": "girona",
    "getafe cf": "getafe",
    "levante ud": "levante",
    "real oviedo cf": "real oviedo",
    "oviedo": "real oviedo",
    "elche cf": "elche",
    "ud las palmas": "las palmas",
    "fc barcelona": "barcelona",
    "futbol club barcelona": "barcelona",
    "barca": "barcelona",
    "real madrid cf": "real madrid"
  });

  function normalize(value) {
    return String(value || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[‐‑‒–—-]/g, " ")
      .replace(/[^a-zA-Z0-9 ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim().toLowerCase();
  }

  function key(value) {
    let normalized = normalize(value)
      .replace(/^(?:afc|fc|cf|rcd|rc|ca|ud)\s+/g, "")
      .replace(/\s+(?:afc|fc|cf|rcd|rc|ca|ud|sad|football club)$/g, "")
      .trim();
    normalized = ALIASES[normalized] || normalized;
    return ALIASES[normalized] || normalized;
  }

  global.LineupClubKeys = Object.freeze({ aliases: ALIASES, normalize, key });
})(window);
