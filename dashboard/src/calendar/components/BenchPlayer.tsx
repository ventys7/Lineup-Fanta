import type { MatchdayPlayer } from "../../matchdayDetails";
import type { PlayerRoleHint, RosterResolver } from "../../playerResolver";
import type { BenchDisplaySlot } from "../benchLayout";
import { PlayerIdentity } from "./PlayerIdentity";

import { preferSnapshotIdentity } from "../snapshotIdentity";
export function BenchPlayer({
  player,
  ownerName,
  resolvePlayer,
  slot
}: {
  player: MatchdayPlayer;
  ownerName: string;
  resolvePlayer: RosterResolver;
  slot: BenchDisplaySlot;
}) {
  const resolved = preferSnapshotIdentity(player.identity, player.name || player.raw, resolvePlayer(
    ownerName,
    player.name || player.raw,
    slot.roleHint
  ));

  return (
    <li
      className={player.switchType ? `is-switch-${player.switchType}` : undefined}
      style={{ gridRow: slot.row, gridColumn: slot.column }}
      data-role-slot={slot.roleHint ?? undefined}
    >
      <PlayerIdentity
        fallbackName={player.name || player.raw}
        resolved={resolved}
        captain={player.captain}
        switchType={player.switchType}
      />
    </li>
  );
}
