import type { CalendarMatchday } from "../calendar";

export function sortByRealRound(matchdays: CalendarMatchday[]): CalendarMatchday[] {
  return [...matchdays].sort((left, right) => (
    left.realRoundNumber - right.realRoundNumber
    || left.fantasyMatchdayNumber - right.fantasyMatchdayNumber
  ));
}

export function getInitialRealRound(
  matchdays: CalendarMatchday[],
  activeFantasyMatchday: number | null
): number {
  const ordered = sortByRealRound(matchdays);
  const active = activeFantasyMatchday === null
    ? undefined
    : ordered.find((matchday) => (
      matchday.fantasyMatchdayNumber === activeFantasyMatchday
    ));

  if (active) return active.realRoundNumber;

  return ordered.find((matchday) => matchday.status === "da_calcolare")?.realRoundNumber
    ?? ordered[ordered.length - 1]?.realRoundNumber
    ?? 0;
}
