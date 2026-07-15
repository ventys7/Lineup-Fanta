"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");
const {
  clearManifestCache,
  databaseConfigured,
  ensureSchema,
  readRuntimeSetting,
  upsertLogoAccess,
  upsertPlayerOverride,
  upsertTeamOverrides,
  writeFantasyTeams,
  writeRuntimeSetting,
  writeTeamLogo
} = require("./neon.cjs");
const { normalizeSettings, teamLogoUrl } = require("./settings.cjs");
const { readBuffer, readJson } = require("./storage.cjs");


async function safeReadJson(key, fallback, warnings) {
  try {
    return await readJson(key, fallback);
  } catch (error) {
    warnings.push(`${key}: ${error.message || "lettura Blob non riuscita"}`);
    return structuredClone(fallback);
  }
}

async function readRepositoryJson(relativePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), relativePath), "utf8"));
  } catch {
    return structuredClone(fallback);
  }
}

function mimeFromPath(value) {
  const pathname = String(value || "").toLowerCase().split("?")[0];
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  return "image/png";
}

async function readLegacyImage(reference) {
  const value = String(reference || "").trim();
  if (!value) return null;
  if (value.startsWith("/.lineup-runtime/")) {
    const bytes = await readBuffer(value.slice("/.lineup-runtime/".length));
    return bytes?.length ? { bytes, mimeType: mimeFromPath(value) } : null;
  }
  if (!/^https?:\/\//i.test(value)) return null;
  const response = await fetch(value, { signal: AbortSignal.timeout(15000), cache: "no-store" });
  if (!response.ok) return null;
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length) return null;
  const mimeType = String(response.headers.get("content-type") || mimeFromPath(value)).split(";")[0];
  if (!["image/png", "image/jpeg", "image/webp"].includes(mimeType)) return null;
  return { bytes, mimeType };
}

async function migrateSettings(warnings) {
  const repository = normalizeSettings(await readRepositoryJson("data/settings.json", {}));
  const legacy = await safeReadJson("settings.json", null, warnings);
  const settings = normalizeSettings(legacy || repository, repository);
  settings.updatedAt = new Date().toISOString();
  await writeRuntimeSetting("settings", settings);
  return Boolean(legacy);
}

async function migrateLeague(league) {
  const warnings = [];
  const fallbackTeams = await readRepositoryJson(`data/${league}/teams.json`, { version: 1, teams: {} });
  const legacyTeams = await safeReadJson(`teams/${league}.json`, null, warnings);
  const teams = structuredClone(legacyTeams?.teams || fallbackTeams?.teams || {});
  const legacyAccess = await safeReadJson(`logo-access/${league}.json`, null, warnings);
  const accessTeams = legacyAccess?.teams || {};
  let logoCodes = 0;
  let logos = 0;

  for (const [teamName, entry] of Object.entries(accessTeams)) {
    if (!entry?.codeHash) continue;
    await upsertLogoAccess(league, teamName, entry.codeHash);
    logoCodes += 1;
  }

  for (const [teamName, profile] of Object.entries(teams)) {
    const logoUrl = String(profile?.logoUrl || "").trim();
    if (!logoUrl) continue;
    try {
      const image = await readLegacyImage(logoUrl);
      if (!image) {
        warnings.push(`${league.toUpperCase()} · ${teamName}: stemma legacy non leggibile`);
        continue;
      }
      if (image.bytes.length > 512 * 1024) {
        warnings.push(`${league.toUpperCase()} · ${teamName}: stemma oltre 512 KB`);
        continue;
      }
      const sha256 = crypto.createHash("sha256").update(image.bytes).digest("hex");
      await writeTeamLogo(league, teamName, image.mimeType, image.bytes, sha256);
      teams[teamName] = { ...(profile || {}), logoUrl: teamLogoUrl(league, teamName, sha256) };
      logos += 1;
    } catch (error) {
      warnings.push(`${league.toUpperCase()} · ${teamName}: ${error.message || "migrazione stemma fallita"}`);
    }
  }

  await writeFantasyTeams(league, teams);

  let playerOverrides = 0;
  const legacyManifest = await safeReadJson(`media/${league}.json`, null, warnings);
  for (const [key, entry] of Object.entries(legacyManifest?.players || {})) {
    const id = String(entry?.externalId || "").trim();
    if (!/^\d+$/.test(id) || entry?.provider !== "bsd") continue;
    if (!String(entry?.matchedBy || "").includes("manual")) continue;
    await upsertPlayerOverride(league, key, id, entry.externalName || entry.listoneName || "");
    playerOverrides += 1;
  }

  const teamRows = [];
  const legacyCatalog = await safeReadJson(`media/bsd/catalog-${league}.json`, null, warnings);
  for (const [teamKey, team] of Object.entries(legacyCatalog?.teams || {})) {
    const id = String(team?.id || "").trim();
    if (!/^\d+$/.test(id)) continue;
    teamRows.push({ teamKey, id, name: team.name || team.listoneName || teamKey });
  }
  await upsertTeamOverrides(league, teamRows);

  return {
    league,
    teams: Object.keys(teams).length,
    logoCodes,
    logos,
    playerOverrides,
    teamOverrides: teamRows.length,
    warnings
  };
}

async function migrateLegacyRuntimeToNeon() {
  if (!databaseConfigured()) throw new Error("DATABASE_URL non configurata");
  await ensureSchema();
  const markerKey = "migration:blob-to-neon:v1";
  const previous = await readRuntimeSetting(markerKey);
  if (previous?.value?.complete) {
    return {
      alreadyMigrated: true,
      migratedAt: previous.value.migratedAt || previous.updatedAt,
      settingsFromBlob: Boolean(previous.value.settingsFromBlob),
      leagues: previous.value.leagues || [],
      warnings: []
    };
  }
  const warnings = [];
  const settingsFromBlob = await migrateSettings(warnings);
  const leagues = [];
  for (const league of ["fp", "pd"]) {
    leagues.push(await migrateLeague(league));
    await clearManifestCache(league);
  }
  const result = {
    alreadyMigrated: false,
    migratedAt: new Date().toISOString(),
    settingsFromBlob,
    leagues,
    warnings: [...warnings, ...leagues.flatMap((item) => item.warnings)]
  };
  if (!result.warnings.length) {
    await writeRuntimeSetting(markerKey, {
      complete: true,
      migratedAt: result.migratedAt,
      settingsFromBlob,
      leagues
    });
  }
  return result;
}

module.exports = { migrateLegacyRuntimeToNeon, readLegacyImage };
