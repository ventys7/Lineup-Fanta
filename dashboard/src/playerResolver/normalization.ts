import {
  normalizeSearchText,
  splitSearchWords,
  stripEmojiText
} from "../shared/text";
import type { InitialSurnameQuery } from "./types";

export { normalizeSearchText, splitSearchWords, stripEmojiText };

export function makeInitials(parts: string[]): string {
  return parts.map((part) => part[0] ?? "").join("");
}

export function looksLikeAcronym(value: string): boolean {
  const clean = stripEmojiText(value).trim();
  const compact = normalizeSearchText(clean);
  return /^[A-Z0-9.\s-]{2,6}$/.test(clean)
    && compact.length >= 2
    && compact.length <= 6;
}

export function parseInitialSurname(value: string): InitialSurnameQuery | null {
  const parts = splitSearchWords(value);
  if (parts.length < 2 || parts[0].length !== 1) return null;

  const surname = parts.slice(1).join("");
  if (surname.length < 3) return null;

  return { initial: parts[0], surname };
}

export function diceCoefficient(left: string, right: string): number {
  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.length < 2 || right.length < 2) return 0;

  const counts = new Map<string, number>();
  for (let index = 0; index < left.length - 1; index += 1) {
    const pair = left.slice(index, index + 2);
    counts.set(pair, (counts.get(pair) ?? 0) + 1);
  }

  let overlap = 0;
  for (let index = 0; index < right.length - 1; index += 1) {
    const pair = right.slice(index, index + 2);
    const count = counts.get(pair) ?? 0;
    if (count > 0) {
      overlap += 1;
      counts.set(pair, count - 1);
    }
  }

  return (2 * overlap) / (left.length + right.length - 2);
}
