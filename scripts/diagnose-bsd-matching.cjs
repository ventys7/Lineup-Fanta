#!/usr/bin/env node
"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const { diagnoseFreshMatching } = require("../lib/player-media.cjs");

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function main() {
  const leagueId = String(process.argv[2] || "fp").trim().toLowerCase();
  if (!["fp", "pd"].includes(leagueId)) throw new Error("Usa: node scripts/diagnose-bsd-matching.cjs fp|pd");
  if (!String(process.env.BSD_API_KEY || "").trim()) throw new Error("BSD_API_KEY non configurata nel Terminale");

  console.log(`Analisi reale matching ${leagueId.toUpperCase()} (nessun download immagini, nessuna scrittura Blob)...`);
  const report = await diagnoseFreshMatching(leagueId);
  const outputDir = path.resolve(`bsd-matching-${leagueId}`);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

  const lines = [[
    "status", "listone_name", "docs_name", "real_team", "bsd_id", "bsd_name", "candidate_count", "top_candidates", "reason"
  ].join(",")];
  for (const row of report.rows) {
    const top = (row.candidates || []).map((candidate) => `${candidate.name} [${candidate.id}] score=${candidate.score}`).join(" | ");
    lines.push([
      row.status, row.listoneName, row.docsName, row.realTeam, row.selected?.id || "", row.selected?.name || "",
      row.clubCandidateCount, top, row.reason
    ].map(csvCell).join(","));
  }
  await fs.writeFile(path.join(outputDir, "report.csv"), `${lines.join("\n")}\n`);

  console.log(`\nListone: ${report.totalPlayers} giocatori · ${report.totalClubs} club`);
  console.log(`Rose BSD: ${report.teamsOk}/${report.totalClubs}`);
  console.log(`Automatici: ${report.counts.automatic}`);
  console.log(`Ambigui: ${report.counts.ambiguous}`);
  console.log(`Nessun nome compatibile: ${report.counts.noNameMatch}`);
  console.log(`Rosa club vuota: ${report.counts.noRoster}`);
  console.log(`Club falliti: ${report.counts.teamError}`);
  console.log(`\nReport JSON: ${path.join(outputDir, "report.json")}`);
  console.log(`Report CSV:  ${path.join(outputDir, "report.csv")}`);

  const autoRate = report.totalPlayers ? report.counts.automatic / report.totalPlayers : 0;
  if (report.teamsFailed) process.exitCode = 2;
  else if (autoRate < 0.5) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`\nERRORE: ${error.message || error}`);
  process.exitCode = 2;
});
