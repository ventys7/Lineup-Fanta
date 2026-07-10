import { useEffect, useMemo, useRef, useState } from "react";
import { fetchFreshText, useSectionRefresh } from "./liveRefresh";
import { useLeagueAssets } from "./hooks";
import { Calendar } from "./pages/Calendar";
import { parseCalendarCsv, type CalendarMatchday } from "./calendar";
import {
  parseMatchdayRegistryJson,
  type MatchdayRegistry
} from "./matchdayLinks";

function isLocalPreviewHostname(hostname: string): boolean {
  const host = String(hostname ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\[|\]$/g, "");

  if (
    host === "localhost"
    || host === "127.0.0.1"
    || host === "0.0.0.0"
    || host === "::1"
    || host.endsWith(".local")
  ) {
    return true;
  }

  return (
    /^10\./.test(host)
    || /^192\.168\./.test(host)
    || /^172\.(1[6-9]|2\d|3[01])\./.test(host)
    || /^169\.254\./.test(host)
  );
}

const EMPTY_REGISTRY: MatchdayRegistry = {
  activeFantasyMatchday: null,
  matchdays: new Map()
};

export default function CalendarApp() {
  const { assets } = useLeagueAssets();
  const league = window.LINEUP_FANTA?.league;
  const leagueId = league?.id ?? "fp";
  const calendarUrl = league?.leagueData?.calendarCsvUrl ?? "";
  const calendarDocUrl = league?.leagueData?.calendarDocUrl ?? "";
  const expectedMatches = league?.leagueData?.calendarExpectedMatches ?? 4;
  const linksUrl = league?.leagueData?.matchdayLinksUrl ?? "/data/matchday-links.json";
  const competitionLabel = league?.leagueData?.calendarCompetitionLabel
    ?? (leagueId === "pd" ? "Liga" : "Premier League");

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [matchdays, setMatchdays] = useState<CalendarMatchday[]>([]);
  const [registry, setRegistry] = useState<MatchdayRegistry>(EMPTY_REGISTRY);
  const [error, setError] = useState("");
  const hasLoadedData = useRef(false);
  const lastCalendarText = useRef("");
  const lastLinksText = useRef("");
  const refreshToken = useSectionRefresh("calendario");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCalendar() {
      if (!calendarDocUrl && !calendarUrl) {
        setMatchdays([]);
        setRegistry(EMPTY_REGISTRY);
        setStatus("ready");
        return;
      }

      const initialLoad = !hasLoadedData.current;
      if (initialLoad) setStatus("loading");
      setError("");

      try {
        let csvText: string;
        const liveUrl = `/api/calendar?league=${encodeURIComponent(leagueId)}`;

        try {
          csvText = await fetchFreshText(liveUrl, controller.signal);
        } catch (liveError) {
          const localPreview = isLocalPreviewHostname(window.location.hostname);
          if (!localPreview || !calendarUrl || controller.signal.aborted) throw liveError;
          console.warn("Calendar live API unavailable in local preview, using local snapshot", liveError);
          csvText = await fetchFreshText(calendarUrl, controller.signal);
        }

        if (csvText !== lastCalendarText.current) {
          const parsed = parseCalendarCsv(csvText, expectedMatches);

          if (parsed.length === 0 && hasLoadedData.current) {
            throw new Error("Aggiornamento vuoto del Calendario");
          }

          lastCalendarText.current = csvText;
          setMatchdays(parsed);
        }

        try {
          const linksText = await fetchFreshText(linksUrl, controller.signal);
          if (linksText !== lastLinksText.current) {
            lastLinksText.current = linksText;
            setRegistry(parseMatchdayRegistryJson(linksText, leagueId));
          }
        } catch (linksError) {
          if (controller.signal.aborted) return;
          console.warn("Matchday registry unavailable in Calendar", linksError);
        }
        hasLoadedData.current = true;
        setStatus("ready");
      } catch (loadError) {
        if (controller.signal.aborted) return;
        console.error("Calendar load error", loadError);

        if (hasLoadedData.current) {
          console.warn("Aggiornamento interno del Calendario non riuscito: mantengo gli ultimi dati validi.");
          return;
        }

        setError("Il Calendario non è disponibile. Controlla la fonte configurata e riprova.");
        setStatus("error");
      }
    }

    loadCalendar();
    return () => controller.abort();
  }, [calendarDocUrl, calendarUrl, expectedMatches, leagueId, linksUrl, refreshToken]);

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
      leagueId={leagueId}
      leagueName={leagueName}
      matchdays={matchdays}
      expectedMatches={expectedMatches}
      registry={registry}
      assets={assets}
      detailRefreshToken={refreshToken}
    />
  );
}
