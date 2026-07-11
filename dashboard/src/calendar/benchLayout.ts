import type { PlayerRoleHint } from "../playerResolver";

export type BenchDisplaySlot = {
  sourceIndex: number;
  roleHint: PlayerRoleHint;
  row: number;
  column: string;
};

export const BENCH_DISPLAY_SLOTS: readonly BenchDisplaySlot[] = Object.freeze([
  { sourceIndex: 0, roleHint: "P", row: 1, column: "2 / 4" },
  { sourceIndex: 1, roleHint: "P", row: 1, column: "4 / 6" },
  { sourceIndex: 2, roleHint: "D", row: 2, column: "1 / 3" },
  { sourceIndex: 5, roleHint: "C", row: 2, column: "3 / 5" },
  { sourceIndex: 8, roleHint: "A", row: 2, column: "5 / 7" },
  { sourceIndex: 3, roleHint: "D", row: 3, column: "1 / 3" },
  { sourceIndex: 6, roleHint: "C", row: 3, column: "3 / 5" },
  { sourceIndex: 9, roleHint: "A", row: 3, column: "5 / 7" },
  { sourceIndex: 4, roleHint: "D", row: 4, column: "1 / 3" },
  { sourceIndex: 7, roleHint: "C", row: 4, column: "3 / 5" },
  { sourceIndex: 10, roleHint: "A", row: 4, column: "5 / 7" }
]);
