import { useEffect, useMemo, useState } from "react";
import { Calendar } from "./pages/Calendar";
import { parseCalendarCsv, type CalendarMatchday } from "./calendar";

export default function CalendarApp() {
  const league = window.LINEUP_FANTA?.league;
  const calendarUrl = league?.leagueData?.calendarCsvUrl ?? "";
  const expectedMatches = league?.leagueData?.calendarExpectedMatches ?? 4;
  const competitionLabel = league?.leagueData?.calendarCompetitionLabel
    ?? (league?.id === "pd" ? "Liga" : "Premier League");

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [matchdays, setMatchdays] = useState<CalendarMatchday[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCalendar() {
      if (!calendarUrl) {
        setMatchdays([]);
        setStatus("ready");
        return;
      }

      setStatus("loading");
      setError("");

      try {
        const separator = calendarUrl.includes("?") ? "&" : "?";
        const response = await fetch(
          `${calendarUrl}${separator}v=${Date.now()}`,
          { cache: "no-store", signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const csvText = await response.text();
        const parsed = parseCalendarCsv(csvText, expectedMatches);
        setMatchdays(parsed);
        setStatus("ready");
      } catch (loadError) {
        if (controller.signal.aborted) return;
        console.error("Calendar load error", loadError);
        setError("Il Calendario non è disponibile. Controlla la fonte configurata e riprova.");
        setStatus("error");
      }
    }

    loadCalendar();
    return () => controller.abort();
  }, [calendarUrl, expectedMatches]);

  const leagueName = useMemo(() => league?.label ?? league?.name ?? "Lega", [league]);

  if (status === "loading") {
    return (
      <div className="lf-calendar-shell">
        <section className="lf-dashboard-card lf-calendar-state">
          <div className="lf-spinner" />
          <p>Caricamento del Calendario…</p>
        </section>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="lf-calendar-shell">
        <section className="lf-dashboard-card lf-calendar-state lf-calendar-state--error">
          <strong>Errore nel caricamento</strong>
          <p>{error}</p>
        </section>
      </div>
    );
  }

  return (
    <Calendar
      competitionLabel={competitionLabel}
      leagueName={leagueName}
      matchdays={matchdays}
      expectedMatches={expectedMatches}
    />
  );
}
