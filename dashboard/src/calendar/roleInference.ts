import type { MatchdayTeam } from "../matchdayDetails";
import type { PlayerRoleHint, RosterResolver } from "../playerResolver";

const STARTER_MODULES = ["343", "352", "433", "442", "451", "532", "541"] as const;

function starterRoleSequence(module: string): PlayerRoleHint[] {
  return [
    "P",
    ...Array(Number(module[0])).fill("D"),
    ...Array(Number(module[1])).fill("C"),
    ...Array(Number(module[2])).fill("A")
  ] as PlayerRoleHint[];
}

export function inferStarterRoleHints(
  team: MatchdayTeam,
  resolvePlayer: RosterResolver
): PlayerRoleHint[] {
  const possibleRoles = team.starters.map((player, index) => {
    if (index === 0) return ["P"] as PlayerRoleHint[];

    const role = String(
      player.identity?.role || resolvePlayer(team.team, player.name || player.raw).role || ""
    ).toUpperCase();

    return ["D", "C", "A"].includes(role)
      ? [role as PlayerRoleHint]
      : ["D", "C", "A"] as PlayerRoleHint[];
  });

  const compatible = STARTER_MODULES
    .map(starterRoleSequence)
    .filter((sequence) => sequence.length === team.starters.length)
    .filter((sequence) => sequence.every((role, index) => (
      possibleRoles[index].includes(role as "P" | "D" | "C" | "A")
    )));

  if (compatible.length === 0) {
    return team.starters.map((_, index) => index === 0 ? "P" : null);
  }

  return team.starters.map((_, index) => {
    const roles = new Set(compatible.map((sequence) => sequence[index]));
    return roles.size === 1 ? compatible[0][index] : null;
  });
}
