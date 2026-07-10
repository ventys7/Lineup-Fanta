import { useEffect, useRef, useState } from "react";
import { createLogger } from "../../debug/logger";
import {
  fetchMatchdayDetail,
  type MatchdayDetailResponse
} from "../../matchdayDetails";
import type { CalendarMatchday } from "../../calendar";
import type { MatchdayLinkEntry } from "../../matchdayLinks";
import type { SelectedMatch } from "../types";

const log = createLogger("matchday-detail");

type DetailStatus = "idle" | "loading" | "ready" | "error";

export function useMatchdayDetail(options: {
  leagueId: "fp" | "pd";
  selectedMatch: SelectedMatch | null;
  selectedMatchday: CalendarMatchday | undefined;
  selectedLink: MatchdayLinkEntry | undefined;
  refreshToken: number;
}) {
  const [status, setStatus] = useState<DetailStatus>("idle");
  const [detail, setDetail] = useState<MatchdayDetailResponse | null>(null);
  const [error, setError] = useState("");
  const loadedKey = useRef<string | null>(null);
  const signature = useRef("");

  useEffect(() => {
    const { selectedMatch, selectedMatchday, selectedLink } = options;
    if (!selectedMatch || !selectedMatchday || !selectedLink) return;

    const key = [
      options.leagueId,
      selectedMatchday.fantasyMatchdayNumber,
      selectedMatch.index,
      selectedMatch.homeTeam,
      selectedMatch.awayTeam,
      selectedLink.url
    ].join(":");
    const firstLoad = loadedKey.current !== key;
    const controller = new AbortController();

    if (firstLoad) {
      setStatus("loading");
      setDetail(null);
      setError("");
    }

    fetchMatchdayDetail({
      leagueId: options.leagueId,
      fantasyMatchdayNumber: selectedMatchday.fantasyMatchdayNumber,
      matchIndex: selectedMatch.index,
      homeTeam: selectedMatch.homeTeam,
      awayTeam: selectedMatch.awayTeam,
      signal: controller.signal
    })
      .then((response) => {
        if (controller.signal.aborted) return;
        loadedKey.current = key;
        const nextSignature = JSON.stringify(response);
        const changed = signature.current !== nextSignature;
        if (changed) {
          signature.current = nextSignature;
          setDetail(response);
        }
        setError("");
        setStatus("ready");
        log.debug("loaded", { key, changed });
      })
      .catch((loadError) => {
        if (controller.signal.aborted) return;
        log.error("load failed", loadError);

        if (!firstLoad) {
          log.warn("refresh failed; keeping last valid detail");
          return;
        }

        setError(
          "Il documento esiste, ma il dettaglio non è stato letto correttamente."
        );
        setStatus("error");
      });

    return () => controller.abort();
  }, [
    options.leagueId,
    options.refreshToken,
    options.selectedLink,
    options.selectedMatch,
    options.selectedMatchday
  ]);

  function reset() {
    loadedKey.current = null;
    signature.current = "";
    setStatus("idle");
    setDetail(null);
    setError("");
  }

  return { status, detail, error, reset };
}
