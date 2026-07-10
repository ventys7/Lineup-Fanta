import { useEffect, useMemo, useRef, useState } from "react";
import { createRosterResolver } from "../playerResolver";
import { CalendarMatchCard } from "../calendar/components/CalendarMatchCard";
import { CalendarToolbar } from "../calendar/components/CalendarToolbar";
import { MatchDetailModal } from "../calendar/components/MatchDetailModal";
import { useMatchdayDetail } from "../calendar/hooks/useMatchdayDetail";
import { getInitialRealRound, sortByRealRound } from "../calendar/selection";
import type { CalendarProps, SelectedMatch } from "../calendar/types";

export function Calendar({
  competitionLabel,
  leagueId,
  leagueName,
  matchdays,
  registry,
  assets,
  detailRefreshToken
}: CalendarProps) {
  const resolvePlayer = useMemo(() => createRosterResolver(assets), [assets]);
  const orderedMatchdays = useMemo(() => sortByRealRound(matchdays), [matchdays]);
  const [selectedRealRound, setSelectedRealRound] = useState(
    () => getInitialRealRound(orderedMatchdays, registry.activeFantasyMatchday)
  );
  const [selectedMatch, setSelectedMatch] = useState<SelectedMatch | null>(null);
  const previousActiveMatchday = useRef<number | null | undefined>(undefined);

  useEffect(() => {
    const activeChanged = previousActiveMatchday.current !== registry.activeFantasyMatchday;
    previousActiveMatchday.current = registry.activeFantasyMatchday;

    const active = registry.activeFantasyMatchday === null
      ? undefined
      : orderedMatchdays.find((matchday) => (
        matchday.fantasyMatchdayNumber === registry.activeFantasyMatchday
      ));

    if (activeChanged && active) {
      setSelectedRealRound(active.realRoundNumber);
      return;
    }

    setSelectedRealRound((current) => (
      orderedMatchdays.some((matchday) => matchday.realRoundNumber === current)
        ? current
        : getInitialRealRound(orderedMatchdays, registry.activeFantasyMatchday)
    ));
  }, [orderedMatchdays, registry.activeFantasyMatchday]);

  const selectedIndex = useMemo(
    () => orderedMatchdays.findIndex((matchday) => (
      matchday.realRoundNumber === selectedRealRound
    )),
    [orderedMatchdays, selectedRealRound]
  );
  const selected = selectedIndex >= 0 ? orderedMatchdays[selectedIndex] : undefined;
  const selectedLink = selected
    ? registry.matchdays.get(selected.fantasyMatchdayNumber)
    : undefined;

  const detailState = useMatchdayDetail({
    leagueId,
    selectedMatch,
    selectedMatchday: selected,
    selectedLink,
    refreshToken: detailRefreshToken
  });

  function closeDetail() {
    setSelectedMatch(null);
    detailState.reset();
  }

  if (orderedMatchdays.length === 0) {
    return (
      <div className="lf-calendar-shell">
        <section className="lf-dashboard-card lf-calendar-state">
          <strong>Calendario non ancora disponibile</strong>
          <p>La fonte di {leagueName} non è stata ancora configurata.</p>
        </section>
      </div>
    );
  }

  if (!selected) return null;

  return (
    <div className="lf-calendar-shell">
      <section className="lf-dashboard-card lf-calendar-card">
        <CalendarToolbar
          competitionLabel={competitionLabel}
          matchdays={orderedMatchdays}
          selectedIndex={selectedIndex}
          selected={selected}
          onSelect={setSelectedRealRound}
        />

        <div className="lf-calendar-summary">
          <div className="lf-calendar-status-wrap">
            <span className={`lf-calendar-status lf-calendar-status--${selected.status}`}>
              {selected.status === "calcolata" ? "Calcolata" : "Da calcolare"}
            </span>
          </div>
        </div>

        <div className="lf-calendar-matches">
          {selected.matches.map((match, index) => (
            <CalendarMatchCard
              key={`${selected.fantasyMatchdayNumber}-${match.homeTeam}-${match.awayTeam}-${index}`}
              match={match}
              index={index}
              fantasyMatchdayNumber={selected.fantasyMatchdayNumber}
              interactive={Boolean(selectedLink)}
              onSelect={setSelectedMatch}
            />
          ))}
        </div>

        {selectedLink && (
          <div className="lf-calendar-source-link-wrap">
            <span>Clicca uno scontro per vedere formazioni, voti e sostituzioni.</span>
            <a href={selectedLink.url} target="_blank" rel="noopener noreferrer">
              Documento completo
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </section>

      {selectedMatch && selectedLink && (
        <MatchDetailModal
          detail={detailState.detail}
          error={detailState.error}
          loading={detailState.status === "loading"}
          resolvePlayer={resolvePlayer}
          homeGoals={selectedMatch.homeGoals}
          awayGoals={selectedMatch.awayGoals}
          onClose={closeDetail}
        />
      )}
    </div>
  );
}
