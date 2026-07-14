export type RecallItem = { name: string; count: number; date?: string; reason?: string; note?: string };
export type PenaltyItem = { name: string; points: number | null; date?: string; reason?: string; note?: string };
export type DisciplineData = { recalls: RecallItem[]; penalties: PenaltyItem[]; configured: boolean };

type CachedDiscipline = { savedAt: number; data: DisciplineData };
const CACHE_TTL = 5 * 60_000;

function cacheKey(leagueId: string) {
  return `lineup-fanta-discipline-v4:${leagueId}`;
}

export function getCachedDiscipline(leagueId: string, allowStale = true): CachedDiscipline | null {
  try {
    const value = JSON.parse(localStorage.getItem(cacheKey(leagueId)) || "null") as CachedDiscipline | null;
    if (!value?.data || !Number.isFinite(value.savedAt)) return null;
    if (!allowStale && Date.now() - value.savedAt >= CACHE_TTL) return null;
    return value;
  } catch { return null; }
}

function writeCache(leagueId: string, data: DisciplineData) {
  try { localStorage.setItem(cacheKey(leagueId), JSON.stringify({ savedAt: Date.now(), data })); } catch {}
}

export async function loadDiscipline(leagueId: string, signal?: AbortSignal): Promise<DisciplineData> {
  const cached = getCachedDiscipline(leagueId, false);
  if (cached) return cached.data;

  const response = await fetch(`/api/discipline?league=${encodeURIComponent(leagueId)}`, {
    cache: "default",
    signal,
    headers: { Accept: "application/json" }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json() as DisciplineData;
  writeCache(leagueId, data);
  return data;
}
