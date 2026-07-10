import { useEffect, useMemo, useState } from "react";
import { formatCalendarTotal, type CalendarMatchday } from "../calendar";

interface CalendarProps {
  competitionLabel: string;
  leagueName: string;
  matchdays: CalendarMatchday[];
  expectedMatches: number;
}

function sortByRealRound(matchdays: CalendarMatchday[]): CalendarMatchday[] {
  return [...matchdays].sort((left, right) => (
    left.realRoundNumber - right.realRoundNumber ||
    left.fantasyMatchdayNumber - right.fantasyMatchdayNumber
  ));
}

function getInitialRealRound(matchdays: CalendarMatchday[]): number {
  const ordered = sortByRealRound(matchdays);
  const firstIncomplete = ordered.find((matchday) => matchday.status === "da_calcolare");

  return firstIncomplete?.realRoundNumber
    ?? ordered[ordered.length - 1]?.realRoundNumber
    ?? 0;
}

export function Calendar({
  competitionLabel,
  leagueName,
  matchdays,
  expectedMatches
}: CalendarProps) {
  const orderedMatchdays = useMemo(() => sortByRealRound(matchdays), [matchdays]);
  const [selectedRealRound, setSelectedRealRound] = useState(
    () => getInitialRealRound(orderedMatchdays)
  );

  useEffect(() => {
    if (!orderedMatchdays.some(
      (matchday) => matchday.realRoundNumber === selectedRealRound
    )) {
      setSelectedRealRound(getInitialRealRound(orderedMatchdays));
    }
  }, [orderedMatchdays, selectedRealRound]);

  const selectedIndex = useMemo(
    () => orderedMatchdays.findIndex(
      (matchday) => matchday.realRoundNumber === selectedRealRound
    ),
    [orderedMatchdays, selectedRealRound]
  );
  const selected = selectedIndex >= 0 ? orderedMatchdays[selectedIndex] : undefined;

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

  const completedMatches = selected.matches.filter(
    (match) => match.homeGoals !== null && match.awayGoals !== null
  ).length;

  return (
    <div className="lf-calendar-shell">
      <section className="lf-dashboard-card lf-calendar-card">
        <div className="lf-calendar-toolbar">
          <button
            type="button"
            className="lf-calendar-nav"
            onClick={() => setSelectedRealRound(
              orderedMatchdays[selectedIndex - 1].realRoundNumber
            )}
            disabled={selectedIndex <= 0}
            aria-label="Giornata precedente"
          >
            ‹
          </button>

          <label className="lf-calendar-select-wrap">
            <span>Giornata {competitionLabel}</span>
            <select
              value={selected.realRoundNumber}
              onChange={(event) => setSelectedRealRound(Number(event.target.value))}
            >
              {orderedMatchdays.map((matchday) => (
                <option
                  key={`${matchday.realRoundNumber}-${matchday.fantasyMatchdayNumber}`}
                  value={matchday.realRoundNumber}
                >
                  {matchday.realRoundNumber}
                </option>
              ))}
            </select>
            <small>Giornata Fanta {selected.fantasyMatchdayNumber}</small>
          </label>

          <button
            type="button"
            className="lf-calendar-nav"
            onClick={() => setSelectedRealRound(
              orderedMatchdays[selectedIndex + 1].realRoundNumber
            )}
            disabled={selectedIndex >= orderedMatchdays.length - 1}
            aria-label="Giornata successiva"
          >
            ›
          </button>
        </div>

        <div className="lf-calendar-summary">
          <div className="lf-calendar-status-wrap">
            <span className={`lf-calendar-status lf-calendar-status--${selected.status}`}>
              {selected.status === "calcolata" ? "Calcolata" : "Da calcolare"}
            </span>
            <small>{completedMatches}/{expectedMatches} risultati</small>
          </div>
        </div>

        <div className="lf-calendar-matches">
          {selected.matches.map((match, index) => {
            const calculated = match.homeGoals !== null && match.awayGoals !== null;

            return (
              <article
                className={`lf-calendar-match${calculated ? "" : " is-pending"}`}
                key={`${selected.fantasyMatchdayNumber}-${match.homeTeam}-${match.awayTeam}-${index}`}
              >
                <div className="lf-calendar-team lf-calendar-team--home">
                  <strong>{match.homeTeam}</strong>
                  {match.homeTotal !== null && <span>{formatCalendarTotal(match.homeTotal)}</span>}
                </div>

                <div className="lf-calendar-score" aria-label={calculated
                  ? `${match.homeGoals} a ${match.awayGoals}`
                  : "Risultato non disponibile"}
                >
                  {calculated ? (
                    <>
                      <b>{match.homeGoals}</b>
                      <i>–</i>
                      <b>{match.awayGoals}</b>
                    </>
                  ) : (
                    <em>–</em>
                  )}
                </div>

                <div className="lf-calendar-team lf-calendar-team--away">
                  <strong>{match.awayTeam}</strong>
                  {match.awayTotal !== null && <span>{formatCalendarTotal(match.awayTotal)}</span>}
                </div>

                {match.note && <p className="lf-calendar-note">{match.note}</p>}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
