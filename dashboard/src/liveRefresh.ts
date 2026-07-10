import { useEffect, useState } from "react";

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

    const handleFocus = () => {
      if (currentSection() === section) refresh();
    };

    const handleVisibility = () => {
      if (!document.hidden && currentSection() === section) refresh();
    };

    const interval = window.setInterval(() => {
      if (!document.hidden && currentSection() === section) refresh();
    }, intervalMs);

    window.addEventListener("lineup:league-section-change", handleSectionChange as EventListener);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("lineup:league-section-change", handleSectionChange as EventListener);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [intervalMs, section]);

  return refreshToken;
}

export async function fetchFreshText(url: string, signal: AbortSignal): Promise<string> {
  const separator = url.includes("?") ? "&" : "?";
  const response = await fetch(`${url}${separator}_lf=${Date.now()}`, {
    cache: "no-store",
    signal,
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      "Pragma": "no-cache"
    }
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}
