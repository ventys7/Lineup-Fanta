import type { DashboardAsset } from "../types";

export type ResolvedRosterPlayer = {
  matched: boolean;
  originalName: string;
  displayName: string;
  role: string;
  realTeam: string;
  assetCode: string;
  confidence: number;
};

export type PlayerRoleHint = "P" | "D" | "C" | "A" | null | undefined;

export type ResolverCandidate = {
  asset: DashboardAsset;
  aliases: string[];
  aliasTokens: string[][];
  initials: string[];
  compoundInitials: string[];
  goalkeeperParts: string[];
};

export type ScoredCandidate = {
  candidate: ResolverCandidate;
  score: number;
};

export type InitialSurnameQuery = {
  initial: string;
  surname: string;
};

export type RosterResolver = (
  ownerName: string,
  playerName: string,
  roleHint?: PlayerRoleHint
) => ResolvedRosterPlayer;
