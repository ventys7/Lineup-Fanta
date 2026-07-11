import type { DashboardAsset } from "../types";
import { uniqueStrings } from "../shared/text";
import {
  makeInitials,
  normalizeSearchText,
  splitSearchWords,
  stripEmojiText
} from "./normalization";
import type { ResolverCandidate } from "./types";

export function candidateFromAsset(asset: DashboardAsset): ResolverCandidate {
  const aliases = uniqueStrings([
    stripEmojiText(asset.displayName),
    stripEmojiText(asset.docsName),
    stripEmojiText(asset.assetCode)
  ]);

  const goalkeeperParts = asset.type === "goalkeeper_block"
    ? asset.displayName.split(/\s+-\s+/).map(stripEmojiText).filter(Boolean)
    : [];

  const allAliases = uniqueStrings([...aliases, ...goalkeeperParts]);
  const aliasTokens = allAliases.map(splitSearchWords).filter((parts) => parts.length > 0);
  const initials = uniqueStrings(aliasTokens.flatMap((parts) => {
    const values = [makeInitials(parts)];
    for (let length = 2; length <= Math.min(4, parts.length); length += 1) {
      values.push(makeInitials(parts.slice(-length)));
    }
    return values;
  }));
  const compoundInitials = uniqueStrings(aliasTokens.flatMap((parts) => (
    parts.length >= 2
      ? [makeInitials(parts.slice(-2)), makeInitials(parts)]
      : []
  )));

  return {
    asset,
    aliases: allAliases,
    aliasTokens,
    initials,
    compoundInitials,
    goalkeeperParts
  };
}

export function ownerCandidates(
  ownerName: string,
  assets: DashboardAsset[]
): ResolverCandidate[] {
  const owner = normalizeSearchText(ownerName);
  if (!owner) return [];

  return assets
    .filter((asset) => (
      asset.active
      && !asset.isFreeAgent
      && normalizeSearchText(asset.ownerTag) === owner
    ))
    .map(candidateFromAsset);
}

export function listoneCandidates(assets: DashboardAsset[]): ResolverCandidate[] {
  const seen = new Set<string>();

  return assets
    .filter((asset) => {
      const identity = [
        normalizeSearchText(asset.assetCode),
        normalizeSearchText(asset.displayName),
        normalizeSearchText(asset.docsName),
        normalizeSearchText(asset.role),
        normalizeSearchText(asset.realTeam)
      ].join("|");

      if (!identity.replace(/\|/g, "") || seen.has(identity)) return false;
      seen.add(identity);
      return true;
    })
    .map(candidateFromAsset);
}
