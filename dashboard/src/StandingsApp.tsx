import { useEffect, useMemo, useRef, useState } from "react";
import { fetchFreshText, useSectionRefresh } from "./liveRefresh";
import { Standings } from "./pages/Standings";
import { parseStandingsCsv, type StandingsData } from "./standings";

const EMPTY_DATA: StandingsData = { league: [], fantasy: [] };

export default function StandingsApp() {
  const league = window.LINEUP_FANTA?.league;
  const standingsUrl = league?.leagueData?.standingsCsvUrl ?? "";
  const fallbackUrl = league?.leagueData?.standingsFallbackUrl ?? "";

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [data, setData] = useState<StandingsData>(EMPTY_DATA);
  const [error, setError] = useState("");
  const hasLoadedData = useRef(false);
  const refreshToken = useSectionRefresh("classifica");

  useEffect(() => {
    const controller = new AbortController();

    async function loadStandings() {
      if (!standingsUrl) {
        setData(EMPTY_DATA);
        setStatus("ready");
        return;
      }

      const initialLoad = !hasLoadedData.current;
      if (initialLoad) setStatus("loading");
      setError("");

      try {
        let csvText: string;

        try {
          csvText = await fetchFreshText(standingsUrl, controller.signal);
        } catch (primaryError) {
          if (!fallbackUrl || controller.signal.aborted) throw primaryError;
          console.warn("Standings primary source unavailable, using fallback", primaryError);
          csvText = await fetchFreshText(fallbackUrl, controller.signal);
        }

        const parsed = parseStandingsCsv(csvText);
        if (parsed.league.length === 0 && hasLoadedData.current) {
          throw new Error("Aggiornamento vuoto della Classifica");
        }

        setData(parsed);
        hasLoadedData.current = true;
        setStatus("ready");
      } catch (loadError) {
        if (controller.signal.aborted) return;
        console.error("Standings load error", loadError);

        if (hasLoadedData.current) {
          console.warn("Aggiornamento interno della Classifica non riuscito: mantengo gli ultimi dati validi.");
          return;
        }

        setError("La Classifica non è disponibile. Controlla la fonte configurata e riprova.");
        setStatus("error");
      }
    }

    loadStandings();
    return () => controller.abort();
  }, [standingsUrl, fallbackUrl, refreshToken]);

  const leagueName = useMemo(() => league?.label ?? league?.name ?? "Lega", [league]);

  if (status === "loading") {
    return (
      <div className="lf-standings-shell">
        <section className="lf-dashboard-card lf-standings-state">
          <div className="lf-spinner" />
          <p>Caricamento della Classifica…</p>
        </section>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="lf-standings-shell">
        <section className="lf-dashboard-card lf-standings-state lf-standings-state--error">
          <strong>Errore nel caricamento</strong>
          <p>{error}</p>
        </section>
      </div>
    );
  }

  return <Standings data={data} leagueName={leagueName} />;
}
