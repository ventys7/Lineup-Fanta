import type { CalendarMatchday } from "../calendar";
import type { MatchdayRegistry } from "../matchdayLinks";
import type { DashboardAsset } from "../types";

export interface CalendarProps {
  competitionLabel: string;
  leagueId: "fp" | "pd";
  leagueName: string;
  matchdays: CalendarMatchday[];
  registry: MatchdayRegistry;
  assets: DashboardAsset[];
  detailRefreshToken: number;
}

export type SelectedMatch = {
  index: number;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number | null;
  awayGoals: number | null;
};
