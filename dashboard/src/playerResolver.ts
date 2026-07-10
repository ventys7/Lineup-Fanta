import type { DashboardAsset } from "./types";

export type ResolvedRosterPlayer = {
  matched: boolean;
  originalName: string;
  displayName: string;
  role: string;
  realTeam: string;
  assetCode: string;
  confidence: number;
};

// STEP 6L - Resolver contestuale per ruolo e cognomi omonimi.
export type PlayerRoleHint = "P" | "D" | "C" | "A" | null | undefined;

type Candidate = {
  asset: DashboardAsset;
  aliases: string[];
  aliasTokens: string[][];
  initials: string[];
  compoundInitials: string[];
  goalkeeperParts: string[];
};

const KNOWN_ACRONYM_ALIASES: Record<string, string[]> = Object.freeze({
  mgw: ["gibbswhite", "morgangibbswhite"],
  dcl: ["calvertlewin", "dominiccalvertlewin"],
  taa: ["alexanderarnold", "trentalexanderarnold"],
  awb: ["wanbissaka", "aaronwanbissaka"],
  jwp: ["wardprowse", "jameswardprowse"],
  cho: ["hudsonodoi", "callumhudsonodoi"],
  esr: ["smithrowe", "emilesmithrowe"],
  kdb: ["debruyne", "kevindebruyne"],
  rlc: ["loftuscheek", "rubenloftuscheek"]
});

export function stripEmojiText(value: string): string {
  return String(value ?? "")
    .replace(/[\u200d\ufe0e\ufe0f\u20e3]/g, "")
    .replace(/[\u{1f1e6}-\u{1f1ff}]/gu, "")
    .replace(/[\u{1f3fb}-\u{1f3ff}]/gu, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value: string): string {
  return stripEmojiText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function words(value: string): string[] {
  return stripEmojiText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function makeInitials(parts: string[]): string {
  return parts.map((part) => part[0] ?? "").join("");
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function looksLikeAcronym(value: string): boolean {
  const clean = stripEmojiText(value).trim();
  const compact = normalize(clean);
  return /^[A-Z0-9.\s-]{2,6}$/.test(clean) && compact.length >= 2 && compact.length <= 6;
}

type InitialSurnameQuery = {
  initial: string;
  surname: string;
};

function parseInitialSurname(value: string): InitialSurnameQuery | null {
  const parts = words(value);
  if (parts.length < 2 || parts[0].length !== 1) return null;

  const surname = parts.slice(1).join("");
  if (surname.length < 3) return null;

  return {
    initial: parts[0],
    surname
  };
}

function diceCoefficient(left: string, right: string): number {
  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.length < 2 || right.length < 2) return 0;

  const counts = new Map<string, number>();
  for (let index = 0; index < left.length - 1; index += 1) {
    const pair = left.slice(index, index + 2);
    counts.set(pair, (counts.get(pair) ?? 0) + 1);
  }

  let overlap = 0;
  for (let index = 0; index < right.length - 1; index += 1) {
    const pair = right.slice(index, index + 2);
    const count = counts.get(pair) ?? 0;
    if (count > 0) {
      overlap += 1;
      counts.set(pair, count - 1);
    }
  }

  return (2 * overlap) / (left.length + right.length - 2);
}

function candidateFromAsset(asset: DashboardAsset): Candidate {
  const aliases = unique([
    stripEmojiText(asset.displayName),
    stripEmojiText(asset.docsName),
    stripEmojiText(asset.assetCode)
  ]);

  const goalkeeperParts = asset.type === "goalkeeper_block"
    ? asset.displayName
      .split(/\s+-\s+/)
      .map(stripEmojiText)
      .filter(Boolean)
    : [];

  const allAliases = unique([...aliases, ...goalkeeperParts]);
  const aliasTokens = allAliases.map(words).filter((parts) => parts.length > 0);
  const initials = unique(aliasTokens.flatMap((parts) => {
    const values = [makeInitials(parts)];
    for (let length = 2; length <= Math.min(4, parts.length); length += 1) {
      values.push(makeInitials(parts.slice(-length)));
    }
    return values;
  }));
  const compoundInitials = unique(aliasTokens.flatMap((parts) => (
    parts.length >= 2
      ? [makeInitials(parts.slice(-2)), makeInitials(parts)]
      : []
  )));

  return {
    asset,
    aliases: allAliases,
    aliasTokens,
    initials,
    compoundInitials,
    goalkeeperParts
  };
}

function scoreCandidate(
  queryValue: string,
  candidate: Candidate,
  roleHint: PlayerRoleHint = null
): number {
  const query = normalize(queryValue);
  const queryWords = words(queryValue);
  if (!query) return 0;

  const queryIsAcronym = looksLikeAcronym(queryValue);
  const initialSurname = parseInitialSurname(queryValue);
  let best = 0;

  candidate.aliases.forEach((alias, aliasIndex) => {
    const compact = normalize(alias);
    const parts = candidate.aliasTokens[aliasIndex] ?? words(alias);
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
        && (
          candidateSurname === initialSurname.surname
          || candidateLastName === initialSurname.surname
        )
      ) {
        best = Math.max(best, 99);
      }

      // Il Listone può contenere solo il cognome (es. "Jimenez") mentre
      // il documento usa iniziale+cognome ("R. Jimenez"). In quel caso
      // il ruolo della posizione è il discriminante affidabile.
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

    if (parts.some((part) => part === query)) {
      best = Math.max(best, 89);
    }

    const lastPart = parts.length ? parts[parts.length - 1] : "";
    if (query.length >= 3 && lastPart.startsWith(query)) {
      best = Math.max(best, 88 - Math.min(8, lastPart.length - query.length));
    }

    if (queryWords.length > 0) {
      const queryLast = queryWords[queryWords.length - 1] ?? "";
      if (queryLast.length >= 3 && parts.includes(queryLast)) {
        best = Math.max(best, 87);
      }
    }

    const similarity = diceCoefficient(query, compact);
    if (similarity >= 0.72) {
      best = Math.max(best, 68 + Math.round(similarity * 20));
    }
  });

  if (queryIsAcronym) {
    const knownAliases = KNOWN_ACRONYM_ALIASES[query] ?? [];
    if (knownAliases.some((known) => candidate.aliases.some((alias) => {
      const compact = normalize(alias);
      return compact === known || compact.endsWith(known) || known.endsWith(compact);
    }))) {
      best = Math.max(best, 100);
    }

    candidate.initials.forEach((initials) => {
      if (!initials) return;
      if (query === initials) best = Math.max(best, 99);
    });

    // MGW -> Gibbs-White, DCL -> Calvert-Lewin. Richiediamo almeno
    // due iniziali del cognome composto per evitare falsi match su una sola lettera.
    candidate.compoundInitials.forEach((initials) => {
      if (initials.length < 2) return;
      if (query.length > initials.length && query.endsWith(initials)) {
        best = Math.max(best, 98);
      }
    });
  }

  return best;
}

function ownerCandidates(ownerName: string, assets: DashboardAsset[]): Candidate[] {
  const owner = normalize(ownerName);
  if (!owner) return [];

  return assets
    .filter((asset) => (
      asset.active
      && !asset.isFreeAgent
      && normalize(asset.ownerTag) === owner
    ))
    .map(candidateFromAsset);
}

function listoneCandidates(assets: DashboardAsset[]): Candidate[] {
  const seen = new Set<string>();

  return assets
    .filter((asset) => {
      const identity = [
        normalize(asset.assetCode),
        normalize(asset.displayName),
        normalize(asset.docsName),
        normalize(asset.role),
        normalize(asset.realTeam)
      ].join("|");

      if (!identity.replace(/\|/g, "") || seen.has(identity)) return false;
      seen.add(identity);
      return true;
    })
    .map(candidateFromAsset);
}

type ScoredCandidate = {
  candidate: Candidate;
  score: number;
};

function rankCandidates(
  queryValue: string,
  candidates: Candidate[],
  minimumScore: number,
  roleHint: PlayerRoleHint = null
): ScoredCandidate[] {
  const normalizedRoleHint = roleHint
    ? String(roleHint).toUpperCase()
    : "";

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

function pickUnambiguousCandidate(
  scored: ScoredCandidate[],
  ambiguityMargin: number
): ScoredCandidate | null {
  const winner = scored[0];
  const runnerUp = scored[1];

  if (!winner) return null;
  if (runnerUp && winner.score - runnerUp.score < ambiguityMargin) return null;

  return winner;
}

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
    && goalkeeperParts.some((part) => normalize(part) === normalize(originalName));

  const initialSurname = parseInitialSurname(originalName);
  const assetWords = words(asset.displayName);
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

export function createRosterResolver(assets: DashboardAsset[]) {
  const ownerCache = new Map<string, Candidate[]>();
  const resultCache = new Map<string, ResolvedRosterPlayer>();
  const globalListone = listoneCandidates(assets);

  function candidatesFor(ownerName: string): Candidate[] {
    const key = normalize(ownerName);
    if (!ownerCache.has(key)) {
      ownerCache.set(key, ownerCandidates(ownerName, assets));
    }
    return ownerCache.get(key) ?? [];
  }

  function remember(
    cacheKey: string,
    result: ResolvedRosterPlayer
  ): ResolvedRosterPlayer {
    resultCache.set(cacheKey, result);
    return result;
  }

  return function resolveRosterPlayer(
    ownerName: string,
    playerName: string,
    roleHint: PlayerRoleHint = null
  ): ResolvedRosterPlayer {
    const originalName = stripEmojiText(playerName);
    const cacheKey = [
      normalize(ownerName),
      normalize(originalName),
      roleHint ?? ""
    ].join("|");
    const cached = resultCache.get(cacheKey);
    if (cached) return cached;
    if (!originalName) return remember(cacheKey, fallbackResult(originalName));

    const acronymQuery = looksLikeAcronym(originalName);
    const initialSurnameQuery = parseInitialSurname(originalName);

    // Prima prova nella rosa corrente. Per iniziale+cognome e acronimi
    // usiamo una soglia più alta per non prendere omonimi o giocatori simili.
    const ownerMinimum = initialSurnameQuery
      ? 95
      : acronymQuery
        ? 96
        : 84;
    const ownerMargin = initialSurnameQuery
      ? 3
      : acronymQuery
        ? 2
        : 4;

    const ownerWinner = pickUnambiguousCandidate(
      rankCandidates(originalName, candidatesFor(ownerName), ownerMinimum, roleHint),
      ownerMargin
    );

    if (ownerWinner) {
      return remember(cacheKey, resolvedResult(originalName, ownerWinner));
    }

    // Se la rosa attuale non contiene più il giocatore, prova il Listone
    // completo. La soglia globale è volutamente severa: accettiamo
    // corrispondenze esatte, acronimi forti e iniziale+cognome.
    const globalMinimum = initialSurnameQuery
      ? 98
      : acronymQuery
        ? 97
        : 96;
    const globalMargin = initialSurnameQuery ? 3 : 2;

    const globalWinner = pickUnambiguousCandidate(
      rankCandidates(originalName, globalListone, globalMinimum, roleHint),
      globalMargin
    );

    return remember(
      cacheKey,
      globalWinner
        ? resolvedResult(originalName, globalWinner)
        : fallbackResult(originalName)
    );
  };
}
