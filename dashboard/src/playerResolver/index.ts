import type { DashboardAsset } from "../types";
import { createLogger } from "../debug/logger";
import { listoneCandidates, ownerCandidates } from "./candidates";
import {
  normalizeSearchText,
  looksLikeAcronym,
  parseInitialSurname,
  splitSearchWords,
  stripEmojiText
} from "./normalization";
import { pickUnambiguousCandidate, rankCandidates } from "./scoring";
import type {
  PlayerRoleHint,
  ResolvedRosterPlayer,
  RosterResolver,
  ScoredCandidate
} from "./types";

export type { PlayerRoleHint, ResolvedRosterPlayer, RosterResolver } from "./types";
export { stripEmojiText } from "./normalization";

const log = createLogger("resolver");

function fallbackResult(originalName: string): ResolvedRosterPlayer {
  const clean = stripEmojiText(originalName);
  return {
    matched: false,
    originalName: clean,
    displayName: clean,
    role: "",
    realTeam: "",
    assetCode: "",
    confidence: 0
  };
}

function resolvedResult(
  originalName: string,
  winner: ScoredCandidate
): ResolvedRosterPlayer {
  const { asset, goalkeeperParts } = winner.candidate;
  const isGoalkeeperPart = asset.type === "goalkeeper_block"
    && goalkeeperParts.some((part) => (
      normalizeSearchText(part) === normalizeSearchText(originalName)
    ));

  const initialSurname = parseInitialSurname(originalName);
  const assetWords = splitSearchWords(asset.displayName);
  const preserveDocumentInitial = Boolean(
    initialSurname
    && assetWords.length === 1
    && assetWords[0] === initialSurname.surname
  );

  return {
    matched: true,
    originalName,
    displayName: stripEmojiText(
      isGoalkeeperPart || preserveDocumentInitial
        ? originalName
        : asset.displayName
    ),
    role: stripEmojiText(asset.role),
    realTeam: stripEmojiText(asset.realTeam || (isGoalkeeperPart ? asset.displayName : "")),
    assetCode: asset.assetCode,
    confidence: winner.score
  };
}

function thresholds(playerName: string, global: boolean) {
  const acronym = looksLikeAcronym(playerName);
  const initialSurname = Boolean(parseInitialSurname(playerName));

  if (global) {
    return {
      minimum: initialSurname ? 98 : acronym ? 97 : 96,
      margin: initialSurname ? 3 : 2
    };
  }

  return {
    minimum: initialSurname ? 95 : acronym ? 96 : 84,
    margin: initialSurname ? 3 : acronym ? 2 : 4
  };
}

export function createRosterResolver(assets: DashboardAsset[]): RosterResolver {
  const ownerCache = new Map<string, ReturnType<typeof ownerCandidates>>();
  const resultCache = new Map<string, ResolvedRosterPlayer>();
  const globalListone = listoneCandidates(assets);

  function candidatesFor(ownerName: string) {
    const key = normalizeSearchText(ownerName);
    if (!ownerCache.has(key)) ownerCache.set(key, ownerCandidates(ownerName, assets));
    return ownerCache.get(key) ?? [];
  }

  return function resolveRosterPlayer(
    ownerName: string,
    playerName: string,
    roleHint: PlayerRoleHint = null
  ): ResolvedRosterPlayer {
    const originalName = stripEmojiText(playerName);
    const cacheKey = [
      normalizeSearchText(ownerName),
      normalizeSearchText(originalName),
      roleHint ?? ""
    ].join("|");

    const cached = resultCache.get(cacheKey);
    if (cached) return cached;

    if (!originalName) {
      const empty = fallbackResult(originalName);
      resultCache.set(cacheKey, empty);
      return empty;
    }

    const ownerRules = thresholds(originalName, false);
    const ownerWinner = pickUnambiguousCandidate(
      rankCandidates(
        originalName,
        candidatesFor(ownerName),
        ownerRules.minimum,
        roleHint
      ),
      ownerRules.margin
    );

    const globalRules = thresholds(originalName, true);
    const winner = ownerWinner ?? pickUnambiguousCandidate(
      rankCandidates(
        originalName,
        globalListone,
        globalRules.minimum,
        roleHint
      ),
      globalRules.margin
    );

    const result = winner
      ? resolvedResult(originalName, winner)
      : fallbackResult(originalName);

    resultCache.set(cacheKey, result);
    log.debug(result.matched ? "resolved" : "unresolved", {
      ownerName,
      playerName: originalName,
      roleHint,
      result
    });
    return result;
  };
}
