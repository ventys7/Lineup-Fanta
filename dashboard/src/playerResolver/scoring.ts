import { KNOWN_ACRONYM_ALIASES } from "./aliases";
import {
  diceCoefficient,
  looksLikeAcronym,
  normalizeSearchText,
  parseInitialSurname,
  splitSearchWords
} from "./normalization";
import type {
  PlayerRoleHint,
  ResolverCandidate,
  ScoredCandidate
} from "./types";

export function scoreCandidate(
  queryValue: string,
  candidate: ResolverCandidate,
  roleHint: PlayerRoleHint = null
): number {
  const query = normalizeSearchText(queryValue);
  const queryWords = splitSearchWords(queryValue);
  if (!query) return 0;

  const queryIsAcronym = looksLikeAcronym(queryValue);
  const initialSurname = parseInitialSurname(queryValue);
  let best = 0;

  candidate.aliases.forEach((alias, aliasIndex) => {
    const compact = normalizeSearchText(alias);
    const parts = candidate.aliasTokens[aliasIndex] ?? splitSearchWords(alias);
    if (!compact) return;

    if (initialSurname) {
      const candidateInitial = parts[0]?.[0] ?? "";
      const candidateSurname = parts.slice(1).join("");
      const candidateLastName = parts[parts.length - 1] ?? "";
      const candidateRole = String(candidate.asset.role ?? "").toUpperCase();
      const roleMatches = !roleHint || candidateRole === roleHint;

      if (
        parts.length >= 2
        && candidateInitial === initialSurname.initial
        && (candidateSurname === initialSurname.surname || candidateLastName === initialSurname.surname)
      ) {
        best = Math.max(best, 99);
      }

      if (
        parts.length === 1
        && parts[0] === initialSurname.surname
        && roleHint
        && roleMatches
      ) {
        best = Math.max(best, 99);
      }
    }

    if (query === compact) best = Math.max(best, 100);

    if (query.length >= 4 && compact.startsWith(query)) {
      best = Math.max(best, 92 - Math.min(8, compact.length - query.length));
    }

    if (compact.length >= 4 && query.startsWith(compact)) {
      best = Math.max(best, 88 - Math.min(8, query.length - compact.length));
    }

    if (parts.some((part) => part === query)) best = Math.max(best, 89);

    const lastPart = parts[parts.length - 1] ?? "";
    if (query.length >= 3 && lastPart.startsWith(query)) {
      best = Math.max(best, 88 - Math.min(8, lastPart.length - query.length));
    }

    const queryLast = queryWords[queryWords.length - 1] ?? "";
    if (queryLast.length >= 3 && parts.includes(queryLast)) best = Math.max(best, 87);

    const similarity = diceCoefficient(query, compact);
    if (similarity >= 0.72) best = Math.max(best, 68 + Math.round(similarity * 20));
  });

  if (queryIsAcronym) {
    const knownAliases = KNOWN_ACRONYM_ALIASES[query] ?? [];
    if (knownAliases.some((known) => candidate.aliases.some((alias) => {
      const compact = normalizeSearchText(alias);
      return compact === known || compact.endsWith(known) || known.endsWith(compact);
    }))) {
      best = Math.max(best, 100);
    }

    if (candidate.initials.includes(query)) best = Math.max(best, 99);

    candidate.compoundInitials.forEach((initials) => {
      if (initials.length >= 2 && query.length > initials.length && query.endsWith(initials)) {
        best = Math.max(best, 98);
      }
    });
  }

  return best;
}

export function rankCandidates(
  queryValue: string,
  candidates: ResolverCandidate[],
  minimumScore: number,
  roleHint: PlayerRoleHint = null
): ScoredCandidate[] {
  const normalizedRoleHint = roleHint ? String(roleHint).toUpperCase() : "";

  return candidates
    .filter((candidate) => (
      !normalizedRoleHint
      || String(candidate.asset.role ?? "").toUpperCase() === normalizedRoleHint
    ))
    .map((candidate) => ({
      candidate,
      score: scoreCandidate(queryValue, candidate, roleHint)
    }))
    .filter(({ score }) => score >= minimumScore)
    .sort((left, right) => right.score - left.score);
}

export function pickUnambiguousCandidate(
  scored: ScoredCandidate[],
  ambiguityMargin: number
): ScoredCandidate | null {
  const winner = scored[0];
  const runnerUp = scored[1];
  if (!winner) return null;
  if (runnerUp && winner.score - runnerUp.score < ambiguityMargin) return null;
  return winner;
}
