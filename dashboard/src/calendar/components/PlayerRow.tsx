import type { MatchdayPlayer } from "../../matchdayDetails";
import type { PlayerRoleHint, RosterResolver } from "../../playerResolver";
import { PlayerIdentity } from "./PlayerIdentity";

export function PlayerRow({
  player,
  ownerName,
  resolvePlayer,
  roleHint = null
}: {
  player: MatchdayPlayer;
  ownerName: string;
  resolvePlayer: RosterResolver;
  roleHint?: PlayerRoleHint;
}) {
  const resolved = resolvePlayer(ownerName, player.name || player.raw, roleHint);
  const replacementResolved = player.replacement
    ? resolvePlayer(ownerName, player.replacement.name, roleHint)
    : null;
  const switchClass = player.switchType ? ` is-switch-${player.switchType}` : "";

  return (
    <li className={`lf-match-detail-player${player.replacement ? " has-replacement" : ""}${switchClass}`}>
      <div className="lf-match-detail-player__main">
        <PlayerIdentity
          fallbackName={player.name || player.raw}
          resolved={resolved}
          captain={player.captain}
          switchType={player.switchType}
        />
        <b className={player.vote === null ? "is-missing" : ""}>
          {player.displayVote ?? player.status ?? "–"}
        </b>
      </div>

      {player.replacement && replacementResolved && (
        <div className="lf-match-detail-replacement">
          <span className="lf-match-detail-replacement__label">Entra</span>
          <PlayerIdentity
            fallbackName={player.replacement.name}
            resolved={replacementResolved}
          />
          <b>{player.replacement.displayVote ?? "–"}</b>
        </div>
      )}
    </li>
  );
}
