/// <reference types="vite/client" />

type LeagueAsset = {
  assetCode: string;
  displayName: string;
  docsName: string;
  role: "P" | "D" | "C" | "A" | string;
  realTeam: string;
  quotation: number;
  purchasePrice?: number;
  ownerTag: string;
  managerCredits?: number | null;
  type: string;
  active: boolean;
  isFreeAgent: boolean;
};

type LeagueDataState = {
  status: "idle" | "loading" | "ready" | "error";
  error?: unknown;
};

type LineupLeague = {
  id: "fp" | "pd";
  name: string;
  label: string;
  csvUrl: string;
  leagueData?: {
    teamProfilesUrl?: string;
    calendarCsvUrl?: string;
    calendarDocUrl?: string;
    calendarExpectedMatches?: number;
    calendarCompetitionLabel?: string;
    standingsCsvUrl?: string;
    standingsFallbackUrl?: string;
    matchdayLinksUrl?: string;
  };
};

declare global {
  interface Window {
    LINEUP_FANTA?: {
      league?: LineupLeague;
    };
    LineupLeagueData?: {
      getState?: () => LeagueDataState;
      getAssets?: () => LeagueAsset[];
    };
  }

  interface DocumentEventMap {
    "lineup:league-assets-ready": CustomEvent<{
      leagueId: string;
      assets: LeagueAsset[];
      state: LeagueDataState;
    }>;
  }
}

export {};
