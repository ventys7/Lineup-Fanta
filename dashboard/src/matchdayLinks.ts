export type MatchdayLinkEntry = {
  fantasyMatchdayNumber: number;
  url: string;
  label: string;
};

export type MatchdayLinksMap = Map<number, MatchdayLinkEntry>;

export type MatchdayRegistry = {
  activeFantasyMatchday: number | null;
  matchdays: MatchdayLinksMap;
};

type RawMatchdayLink = string | {
  url?: unknown;
  label?: unknown;
};

type RawLeagueRegistry = {
  activeFantasyMatchday?: unknown;
  matchdays?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isSafeMatchdayUrl(value: string): boolean {
  const url = value.trim();
  return url.startsWith("https://") || url.startsWith("http://") || url.startsWith("/");
}

function parseLinks(value: unknown): MatchdayLinksMap {
  if (!isRecord(value)) return new Map();

  const links = new Map<number, MatchdayLinkEntry>();

  for (const [key, rawValue] of Object.entries(value as Record<string, RawMatchdayLink>)) {
    const fantasyMatchdayNumber = Number(key);
    if (!Number.isInteger(fantasyMatchdayNumber) || fantasyMatchdayNumber <= 0) continue;

    const url = typeof rawValue === "string"
      ? rawValue.trim()
      : String(rawValue?.url ?? "").trim();

    if (!url || !isSafeMatchdayUrl(url)) continue;

    const label = typeof rawValue === "object" && rawValue !== null
      ? String(rawValue.label ?? "").trim()
      : "";

    links.set(fantasyMatchdayNumber, {
      fantasyMatchdayNumber,
      url,
      label: label || "Apri documento originale"
    });
  }

  return links;
}

export function parseMatchdayRegistryJson(
  jsonText: string,
  leagueId: "fp" | "pd"
): MatchdayRegistry {
  const parsed = JSON.parse(String(jsonText ?? "{}")) as Record<string, unknown>;
  const rawLeagueValue = parsed?.[leagueId];

  if (!isRecord(rawLeagueValue)) {
    return { activeFantasyMatchday: null, matchdays: new Map() };
  }

  const registry = rawLeagueValue as RawLeagueRegistry;
  const hasNewShape = Object.prototype.hasOwnProperty.call(registry, "matchdays")
    || Object.prototype.hasOwnProperty.call(registry, "activeFantasyMatchday");

  const activeCandidate = Number(registry.activeFantasyMatchday);
  const activeFantasyMatchday = Number.isInteger(activeCandidate) && activeCandidate > 0
    ? activeCandidate
    : null;

  return {
    activeFantasyMatchday,
    matchdays: parseLinks(hasNewShape ? registry.matchdays : rawLeagueValue)
  };
}
