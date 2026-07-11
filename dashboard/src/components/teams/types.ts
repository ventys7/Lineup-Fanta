import type { DashboardAsset } from "../../types";

export type RoleKey = "P" | "D" | "C" | "A";

export type TeamSquad = {
  managerName: string;
  credits: number | null;
  logoUrl: string;
  players: DashboardAsset[];
  isComplete: boolean;
  roleCounts: Record<RoleKey, number>;
  totalPlayers: number;
};
