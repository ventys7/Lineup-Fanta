import { useEffect, useState } from "react";
import { fetchNoStoreText } from "./shared/network";

function currentSection(): string {
  return document.documentElement.dataset.leagueSection ?? "formation";
}

export function useSectionRefresh(section: string, intervalMs = 30_000): number {
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    const refresh = () => setRefreshToken((value) => value + 1);

    const handleSectionChange = (event: Event) => {
      const detail = (event as CustomEvent<{ section?: string }>).detail;
      if (detail?.section === section) refresh();
    };

    const refreshIfVisible = () => {
      if (!document.hidden && currentSection() === section) refresh();
    };

    const interval = window.setInterval(refreshIfVisible, intervalMs);
    window.addEventListener("lineup:league-section-change", handleSectionChange as EventListener);
    window.addEventListener("focus", refreshIfVisible);
    document.addEventListener("visibilitychange", refreshIfVisible);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("lineup:league-section-change", handleSectionChange as EventListener);
      window.removeEventListener("focus", refreshIfVisible);
      document.removeEventListener("visibilitychange", refreshIfVisible);
    };
  }, [intervalMs, section]);

  return refreshToken;
}

export const fetchFreshText = fetchNoStoreText;
