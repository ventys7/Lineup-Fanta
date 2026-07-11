import { formatCalendarTotal, type CalendarMatch } from "../../calendar";
import type { SelectedMatch } from "../types";

export function CalendarMatchCard({
  match,
  index,
  fantasyMatchdayNumber,
  interactive,
  onSelect
}: {
  match: CalendarMatch;
  index: number;
  fantasyMatchdayNumber: number;
  interactive: boolean;
  onSelect: (match: SelectedMatch) => void;
}) {
  const calculated = match.homeGoals !== null && match.awayGoals !== null;

  const select = () => onSelect({
    index,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    homeGoals: match.homeGoals,
    awayGoals: match.awayGoals
  });

  return (
    <article
      className={`lf-calendar-match${calculated ? "" : " is-pending"}${interactive ? " is-clickable" : ""}`}
      key={`${fantasyMatchdayNumber}-${match.homeTeam}-${match.awayTeam}-${index}`}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive
        ? `Apri formazioni di ${match.homeTeam} contro ${match.awayTeam}`
        : undefined}
      onClick={interactive ? select : undefined}
      onKeyDown={interactive ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          select();
        }
      } : undefined}
    >
      <div className="lf-calendar-team lf-calendar-team--home">
        <strong>{match.homeTeam}</strong>
        {match.homeTotal !== null && <span>{formatCalendarTotal(match.homeTotal)}</span>}
      </div>

      <div
        className="lf-calendar-score"
        aria-label={calculated
          ? `${match.homeGoals} a ${match.awayGoals}`
          : "Risultato non disponibile"}
      >
        {calculated ? (
          <><b>{match.homeGoals}</b><i>–</i><b>{match.awayGoals}</b></>
        ) : <em>–</em>}
      </div>

      <div className="lf-calendar-team lf-calendar-team--away">
        <strong>{match.awayTeam}</strong>
        {match.awayTotal !== null && <span>{formatCalendarTotal(match.awayTotal)}</span>}
      </div>

      {match.note && <p className="lf-calendar-note">{match.note}</p>}
    </article>
  );
}
