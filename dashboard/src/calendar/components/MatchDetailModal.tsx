import { useEffect, useState } from "react";
import { formatCalendarTotal } from "../../calendar";
import type { MatchdayDetailResponse } from "../../matchdayDetails";
import type { RosterResolver } from "../../playerResolver";
import { useDialogBehavior } from "../hooks/useDialogBehavior";
import { TeamPanel } from "./TeamPanel";

export function MatchDetailModal({
  detail,
  error,
  loading,
  onClose,
  resolvePlayer,
  homeGoals,
  awayGoals
}: {
  detail: MatchdayDetailResponse | null;
  error: string;
  loading: boolean;
  onClose: () => void;
  resolvePlayer: RosterResolver;
  homeGoals: number | null;
  awayGoals: number | null;
}) {
  const [mobileSide, setMobileSide] = useState<"home" | "away">("home");
  const closeButtonRef = useDialogBehavior(onClose);

  useEffect(() => {
    setMobileSide("home");
  }, [detail?.fantasyMatchdayNumber, detail?.matchup.homeTeam, detail?.matchup.awayTeam]);

  const mobileTab = (side: "home" | "away") => {
    if (!detail) return null;
    const team = detail.matchup[side];
    const teamName = side === "home" ? detail.matchup.homeTeam : detail.matchup.awayTeam;

    return (
      <button
        type="button"
        role="tab"
        aria-selected={mobileSide === side}
        className={mobileSide === side ? "is-active" : ""}
        onClick={() => setMobileSide(side)}
      >
        <span className="lf-match-detail-mobile-tabs__coach">{teamName}</span>
        <span className="lf-match-detail-mobile-tabs__summary">
          <strong>{team.total === null ? "–" : formatCalendarTotal(team.total)}</strong>
          {team.playersCount !== null && <small>({team.playersCount})</small>}
        </span>
      </button>
    );
  };

  return (
    <div
      className="lf-match-detail-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="lf-match-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Dettaglio scontro"
      >
        <header className="lf-match-detail-modal__header">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Chiudi confronto"
          >
            ×
          </button>
        </header>

        <div className="lf-match-detail-modal__body">
          <div className={`lf-match-detail-sticky${!loading && detail ? " has-tabs" : ""}`}>
            <div
              className="lf-match-detail-result"
              aria-label={homeGoals !== null && awayGoals !== null
                ? `Risultato ${homeGoals} a ${awayGoals}`
                : "Risultato non disponibile"}
            >
              {homeGoals !== null && awayGoals !== null ? (
                <>
                  <b>{homeGoals}</b><span>–</span><b>{awayGoals}</b>
                </>
              ) : <b>–</b>}
            </div>

            {!loading && detail && (
              <div
                className="lf-match-detail-mobile-tabs"
                role="tablist"
                aria-label="Scegli la formazione"
              >
                {mobileTab("home")}
                {mobileTab("away")}
              </div>
            )}
          </div>

          {loading && (
            <div className="lf-match-detail-state">
              <div className="lf-spinner" />
              <p>Caricamento di formazioni, voti e sostituzioni…</p>
            </div>
          )}

          {!loading && error && (
            <div className="lf-match-detail-state is-error">
              <strong>Confronto non disponibile</strong>
              <p>{error}</p>
            </div>
          )}

          {!loading && detail && (
            <div className={`lf-match-detail-grid is-mobile-${mobileSide}`}>
              <TeamPanel side="home" team={detail.matchup.home} resolvePlayer={resolvePlayer} />
              <TeamPanel side="away" team={detail.matchup.away} resolvePlayer={resolvePlayer} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
