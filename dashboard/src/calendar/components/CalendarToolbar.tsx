import type { CalendarMatchday } from "../../calendar";

export function CalendarToolbar({
  competitionLabel,
  matchdays,
  selectedIndex,
  selected,
  onSelect
}: {
  competitionLabel: string;
  matchdays: CalendarMatchday[];
  selectedIndex: number;
  selected: CalendarMatchday;
  onSelect: (realRound: number) => void;
}) {
  return (
    <div className="lf-calendar-toolbar">
      <button
        type="button"
        className="lf-calendar-nav"
        onClick={() => onSelect(matchdays[selectedIndex - 1].realRoundNumber)}
        disabled={selectedIndex <= 0}
        aria-label="Giornata precedente"
      >
        ‹
      </button>

      <label className="lf-calendar-select-wrap">
        <span>Giornata {competitionLabel}</span>
        <select
          value={selected.realRoundNumber}
          onChange={(event) => onSelect(Number(event.target.value))}
        >
          {matchdays.map((matchday) => (
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
        onClick={() => onSelect(matchdays[selectedIndex + 1].realRoundNumber)}
        disabled={selectedIndex >= matchdays.length - 1}
        aria-label="Giornata successiva"
      >
        ›
      </button>
    </div>
  );
}
