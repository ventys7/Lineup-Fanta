export function stripEmojiText(value: string): string {
  return String(value ?? "")
    .replace(/[\u200d\ufe0e\ufe0f\u20e3]/g, "")
    .replace(/[\u{1f1e6}-\u{1f1ff}]/gu, "")
    .replace(/[\u{1f3fb}-\u{1f3ff}]/gu, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeSearchText(value: string): string {
  return stripEmojiText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

export function splitSearchWords(value: string): string[] {
  return stripEmojiText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

export function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}
