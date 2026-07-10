import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCsv(url: string): Promise<string> {
      const separator = url.includes("?") ? "&" : "?";
      const response = await fetch(
        `${url}${separator}v=${Date.now()}`,
        { cache: "no-store", signal: controller.signal }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    }

    async function loadStandings() {
      if (!standingsUrl) {
        setData(EMPTY_DATA);
        setStatus("ready");
        return;
      }

      setStatus("loading");
      setError("");

      try {
        let csvText: string;

        try {
          csvText = await fetchCsv(standingsUrl);
        } catch (primaryError) {
          if (!fallbackUrl || controller.signal.aborted) throw primaryError;
          console.warn("Standings primary source unavailable, using fallback", primaryError);
          csvText = await fetchCsv(fallbackUrl);
        }

        setData(parseStandingsCsv(csvText));
        setStatus("ready");
      } catch (loadError) {
        if (controller.signal.aborted) return;
        console.error("Standings load error", loadError);
        setError("La Classifica non è disponibile. Controlla la fonte configurata e riprova.");
        setStatus("error");
      }
    }

    loadStandings();
    return () => controller.abort();
  }, [standingsUrl, fallbackUrl]);

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
