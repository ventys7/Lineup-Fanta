import { useMemo } from "react";
import { formatCalendarTotal } from "../../calendar";
import type { MatchdayTeam } from "../../matchdayDetails";
import type { RosterResolver } from "../../playerResolver";
import { BENCH_DISPLAY_SLOTS } from "../benchLayout";
import { inferStarterRoleHints } from "../roleInference";
import { BenchPlayer } from "./BenchPlayer";
import { PlayerRow } from "./PlayerRow";

export function TeamPanel({
  side,
  team,
  resolvePlayer
}: {
  side: "home" | "away";
  team: MatchdayTeam;
  resolvePlayer: RosterResolver;
}) {
  const starterRoleHints = useMemo(
    () => inferStarterRoleHints(team, resolvePlayer),
    [resolvePlayer, team]
  );

  return (
    <section className={`lf-match-detail-team is-${side}`}>
      <header>
        <div>
          <h3>{team.team}</h3>
          {team.alias && team.alias !== team.team && (
            <small>Nel documento: {team.alias}</small>
          )}
        </div>

        <div className="lf-match-detail-total">
          <span>Totale</span>
          <strong>{team.total === null ? "–" : formatCalendarTotal(team.total)}</strong>
          {team.playersCount !== null && <small>{team.playersCount} giocatori</small>}
        </div>
      </header>

      <div className="lf-match-detail-section">
        <h4>Titolari</h4>
        {team.starters.length > 0 ? (
          <ol className="lf-match-detail-players">
            {team.starters.map((player, index) => (
              <PlayerRow
                key={`${player.raw}-${index}`}
                player={player}
                ownerName={team.team}
                resolvePlayer={resolvePlayer}
                roleHint={starterRoleHints[index]}
              />
            ))}
          </ol>
        ) : (
          <p className="lf-match-detail-empty">Formazione non ancora inserita.</p>
        )}
      </div>

      <div className="lf-match-detail-section lf-match-detail-section--bench">
        <h4>A disposizione</h4>
        {team.bench.length > 0 ? (
          <ul className="lf-match-detail-bench">
            {BENCH_DISPLAY_SLOTS.map((slot) => {
              const player = team.bench[slot.sourceIndex];
              return player ? (
                <BenchPlayer
                  key={`${player.raw}-${slot.sourceIndex}`}
                  player={player}
                  ownerName={team.team}
                  resolvePlayer={resolvePlayer}
                  slot={slot}
                />
              ) : null;
            })}
          </ul>
        ) : (
          <p className="lf-match-detail-empty">Panchina non ancora inserita.</p>
        )}
      </div>
    </section>
  );
}
