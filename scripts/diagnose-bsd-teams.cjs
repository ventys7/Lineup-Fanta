#!/usr/bin/env node
"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const { diagnoseProviderTeamSelection } = require("../lib/player-media.cjs");

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function percent(value) {
  return `${(Number(value || 0) * 100).toFixed(1)}%`;
}

async function main() {
  const leagueId = String(process.argv[2] || "pd").trim().toLowerCase();
  if (!["fp", "pd"].includes(leagueId)) throw new Error("Usa: node scripts/diagnose-bsd-teams.cjs fp|pd");
  if (!String(process.env.BSD_API_KEY || "").trim()) throw new Error("BSD_API_KEY non configurata nel Terminale");

  console.log(`Analisi candidati squadra BSD ${leagueId.toUpperCase()} (nessun download immagini, nessuna scrittura Blob)...`);
  const report = await diagnoseProviderTeamSelection(leagueId);
  const outputDir = path.resolve(`bsd-team-selection-${leagueId}`);
  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(path.join(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, "proposed-team-map.json"), `${JSON.stringify(report.recommendedTeamMap, null, 2)}\n`);

  const lines = [[
    "club", "listone_players", "status", "recommended_id", "recommended_name", "reason",
    "candidate_id", "candidate_name", "name_score", "roster_size", "automatic", "ambiguous", "no_match", "coverage", "error"
  ].join(",")];

  report.rows.forEach((row) => {
    if (!row.candidates.length) {
      lines.push([
        row.club, row.listonePlayers, row.status, row.recommendedTeamId, row.recommendedTeamName, row.reason,
        "", "", "", "", "", "", "", "", "nessun candidato squadra"
      ].map(csvCell).join(","));
      return;
    }
    row.candidates.forEach((candidate) => {
      lines.push([
        row.club, row.listonePlayers, row.status, row.recommendedTeamId, row.recommendedTeamName, row.reason,
        candidate.id, candidate.name, candidate.nameScore, candidate.rosterSize, candidate.automatic,
        candidate.ambiguous, candidate.noNameMatch, percent(candidate.coverage), candidate.error || ""
      ].map(csvCell).join(","));
    });
  });
  await fs.writeFile(path.join(outputDir, "report.csv"), `${lines.join("\n")}\n`);

  console.log(`\nClub reali analizzati: ${report.totalClubs}`);
  console.log(`ID consigliati automaticamente: ${report.counts.recommended}`);
  console.log(`Da controllare: ${report.counts.review}`);
  console.log(`Senza candidato: ${report.counts.unresolved}`);
  console.log(`Annotazioni escluse come club: ${report.annotatedPlayers.length}`);

  for (const row of report.rows) {
    const marker = row.status === "recommended" ? "OK" : row.status === "review" ? "REVIEW" : "NO";
    console.log(`\n[${marker}] ${row.club} · ${row.listonePlayers} giocatori`);
    row.candidates.slice(0, 5).forEach((candidate) => {
      console.log(
        `  ID ${String(candidate.id).padEnd(6)} ${String(candidate.name).padEnd(34)} `
        + `rosa=${String(candidate.rosterSize).padStart(3)} `
        + `match=${String(candidate.automatic).padStart(2)}/${row.listonePlayers} `
        + `copertura=${percent(candidate.coverage)}`
        + `${candidate.error ? ` · ERRORE: ${candidate.error}` : ""}`
      );
    });
    console.log(`  Scelta: ${row.recommendedTeamId || "nessuna"} ${row.recommendedTeamName || ""} · ${row.reason}`);
  }

  if (report.annotatedPlayers.length) {
    console.log("\nAnnotazioni non trattate come club:");
    report.annotatedPlayers.forEach((row) => {
      console.log(`  ${row.listoneName} · ${row.realTeam}`);
    });
  }

  console.log(`\nReport JSON: ${path.join(outputDir, "report.json")}`);
  console.log(`Report CSV:  ${path.join(outputDir, "report.csv")}`);
  console.log(`Mappa proposta: ${path.join(outputDir, "proposed-team-map.json")}`);

  if (report.counts.unresolved) process.exitCode = 2;
  else if (report.counts.review) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`\nERRORE: ${error.message || error}`);
  process.exitCode = 2;
});
