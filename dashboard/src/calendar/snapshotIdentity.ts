import type { MatchdayIdentity } from "../matchdayDetails";
import type { ResolvedRosterPlayer } from "../playerResolver/types";

export function preferSnapshotIdentity(
  identity: MatchdayIdentity | undefined,
  originalName: string,
  fallback: ResolvedRosterPlayer
): ResolvedRosterPlayer {
  if (!identity || (!identity.displayName && !identity.role && !identity.realTeam)) return fallback;
  return {
    matched: Boolean(identity.matched || identity.displayName || identity.role),
    originalName,
    displayName: identity.displayName || originalName,
    role: identity.role || fallback.role || "",
    realTeam: identity.realTeam || fallback.realTeam || "",
    assetCode: identity.assetCode || fallback.assetCode || "",
    confidence: identity.confidence ?? 1
  };
}
