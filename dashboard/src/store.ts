import type { DashboardAsset } from "./types";

export type DashboardStoreState = {
  status: "idle" | "loading" | "ready" | "error";
  error?: unknown;
};

export type StoreSnapshot = {
  state: DashboardStoreState;
  assets: DashboardAsset[];
};

type RawLeagueAsset = Omit<DashboardAsset, "purchasePrice" | "managerCredits"> & {
  purchasePrice?: number;
  managerCredits?: number | null;
};

function normalizeAssets(assets: RawLeagueAsset[]): DashboardAsset[] {
  return assets.map((asset) => ({
    ...asset,
    purchasePrice: asset.purchasePrice ?? 0,
    managerCredits: asset.managerCredits ?? null
  }));
}

export function readLeagueStore(): StoreSnapshot {
  return {
    state: (window.LineupLeagueData?.getState?.() ?? { status: "idle" }) as DashboardStoreState,
    assets: normalizeAssets((window.LineupLeagueData?.getAssets?.() ?? []) as RawLeagueAsset[])
  };
}
