import { isLocalPreviewHostname } from "./shared/environment";
import { fetchNoStoreJson } from "./shared/network";
import { normalizeSearchText, stripEmojiText } from "./shared/text";

export type SwitchType = "base" | "plus" | null;

export type MatchdayIdentity = {
  matched: boolean;
  displayName: string;
  role: string;
  realTeam: string;
  assetCode: string;
  confidence?: number;
  source?: string;
};

export type MatchdayReplacement = {
  name: string;
  vote: number | null;
  displayVote: string | null;
  snapshotKey?: string;
  identity?: MatchdayIdentity;
};

export type MatchdayPlayer = {
  raw: string;
  name: string;
  vote: number | null;
  displayVote: string | null;
  status: string | null;
  captain: boolean;
  switchPlayer: boolean;
  switchType: SwitchType;
  replacement?: MatchdayReplacement;
  snapshotKey?: string;
  identity?: MatchdayIdentity;
};

export type MatchdayTeam = {
  team: string;
  alias: string;
  starters: MatchdayPlayer[];
  total: number | null;
  playersCount: number | null;
  bench: MatchdayPlayer[];
};

export type MatchdayMatchup = {
  homeTeam: string;
  awayTeam: string;
  home: MatchdayTeam;
  away: MatchdayTeam;
};

export type MatchdayDetailResponse = {
  title: string;
  sourceUrl: string;
  fantasyMatchdayNumber: number;
  matchup: MatchdayMatchup;
};

export type CachedMatchdayDetails = {
  title: string;
  sourceUrl: string;
  fantasyMatchdayNumber: number;
  matches: MatchdayMatchup[];
};

function normalizeTeamName(value: string): string {
  return normalizeSearchText(value);
}

function parseIdentity(value: unknown, fallbackName: string): MatchdayIdentity | undefined {
  if (!value || typeof value !== "object") return undefined;
  const source = value as Partial<MatchdayIdentity>;
  return {
    matched: Boolean(source.matched),
    displayName: stripEmojiText(source.displayName ?? fallbackName),
    role: String(source.role ?? "").trim().toUpperCase(),
    realTeam: stripEmojiText(source.realTeam ?? ""),
    assetCode: String(source.assetCode ?? "").trim(),
    confidence: typeof source.confidence === "number" ? source.confidence : undefined,
    source: typeof source.source === "string" ? source.source : undefined
  };
}

function parseLegacyPlayer(value: unknown): MatchdayPlayer {
  if (typeof value === "string") {
    const raw = stripEmojiText(value);
    const switchMatch = raw.match(/\(s(\+)?\)/i);
    const switchType: SwitchType = switchMatch
      ? (switchMatch[1] ? "plus" : "base")
      : null;
    const name = raw.replace(/\(s\+?\)/gi, "").trim();

    return {
      raw,
      name,
      vote: null,
      displayVote: null,
      status: null,
      captain: false,
      switchPlayer: Boolean(switchType),
      switchType
    };
  }

  const source = (value && typeof value === "object")
    ? value as Partial<MatchdayPlayer>
    : {};
  const legacySwitch = Boolean(source.switchPlayer);
  const switchType: SwitchType = source.switchType === "plus"
    ? "plus"
    : source.switchType === "base" || legacySwitch
      ? "base"
      : null;
  const replacement = source.replacement
    ? {
      name: stripEmojiText(source.replacement.name),
      vote: source.replacement.vote ?? null,
      displayVote: source.replacement.displayVote ?? null, snapshotKey: source.replacement.snapshotKey, identity: parseIdentity(source.replacement.identity, source.replacement.name)
    }
    : undefined;

  return {
    raw: stripEmojiText(source.raw ?? source.name ?? ""),
    name: stripEmojiText(source.name ?? source.raw ?? ""),
    vote: source.vote ?? null,
    displayVote: source.displayVote ?? null,
    status: source.status ?? null,
    captain: Boolean(source.captain),
    switchPlayer: Boolean(switchType),
    switchType, snapshotKey: source.snapshotKey, identity: parseIdentity(source.identity, source.name ?? source.raw ?? ""),
    ...(replacement ? { replacement } : {})
  };
}

function normalizeTeam(team: MatchdayTeam): MatchdayTeam {
  return {
    team: stripEmojiText(team?.team ?? ""),
    alias: stripEmojiText(team?.alias ?? ""),
    starters: Array.isArray(team?.starters)
      ? team.starters.map(parseLegacyPlayer)
      : [],
    total: team?.total ?? null,
    playersCount: team?.playersCount ?? null,
    bench: Array.isArray(team?.bench)
      ? team.bench.map(parseLegacyPlayer)
      : []
  };
}

function normalizeMatchup(matchup: MatchdayMatchup): MatchdayMatchup {
  return {
    homeTeam: stripEmojiText(matchup?.homeTeam ?? ""),
    awayTeam: stripEmojiText(matchup?.awayTeam ?? ""),
    home: normalizeTeam(matchup?.home),
    away: normalizeTeam(matchup?.away)
  };
}

function normalizeResponse(response: MatchdayDetailResponse): MatchdayDetailResponse {
  return {
    title: stripEmojiText(response?.title ?? "Giornata"),
    sourceUrl: response?.sourceUrl ?? "",
    fantasyMatchdayNumber: response?.fantasyMatchdayNumber ?? 0,
    matchup: normalizeMatchup(response?.matchup)
  };
}

function selectCachedMatchup(
  data: CachedMatchdayDetails,
  matchIndex: number,
  homeTeam: string,
  awayTeam: string
): MatchdayMatchup | null {
  const normalizedHome = normalizeTeamName(homeTeam);
  const normalizedAway = normalizeTeamName(awayTeam);

  const named = data.matches.find((matchup) => (
    normalizeTeamName(matchup.homeTeam) === normalizedHome
    && normalizeTeamName(matchup.awayTeam) === normalizedAway
  ));

  return named ?? data.matches[matchIndex] ?? null;
}

export async function fetchMatchdayDetail(options: {
  leagueId: "fp" | "pd";
  fantasyMatchdayNumber: number;
  matchIndex: number;
  homeTeam: string;
  awayTeam: string;
  signal: AbortSignal;
}): Promise<MatchdayDetailResponse> {
  const params = new URLSearchParams({
    league: options.leagueId,
    day: String(options.fantasyMatchdayNumber),
    match: String(options.matchIndex),
    home: options.homeTeam,
    away: options.awayTeam,
    v: String(Date.now())
  });

  try {
    const response = await fetchNoStoreJson<MatchdayDetailResponse>(
      `/api/matchday?${params.toString()}`,
      options.signal
    );
    return normalizeResponse(response);
  } catch (apiError) {
    if (options.signal.aborted) throw apiError;
    if (!isLocalPreviewHostname(window.location.hostname)) throw apiError;

    const fallbackUrl = `/data/${options.leagueId}/matchdays/${options.fantasyMatchdayNumber}.json`;
    const cached = await fetchNoStoreJson<CachedMatchdayDetails>(
      fallbackUrl,
      options.signal
    );
    const matchup = selectCachedMatchup(
      cached,
      options.matchIndex,
      options.homeTeam,
      options.awayTeam
    );

    if (!matchup) throw apiError;

    return normalizeResponse({
      title: cached.title,
      sourceUrl: cached.sourceUrl,
      fantasyMatchdayNumber: cached.fantasyMatchdayNumber,
      matchup
    });
  }
}
