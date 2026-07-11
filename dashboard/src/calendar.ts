export type CalendarMatch = {
  realRoundNumber: number;
  fantasyMatchdayNumber: number;
  status: "calcolata" | "da_calcolare";
  homeTeam: string;
  awayTeam: string;
  homeTotal: number | null;
  awayTotal: number | null;
  homeGoals: number | null;
  awayGoals: number | null;
  note: string;
};

export type CalendarMatchday = {
  realRoundNumber: number;
  fantasyMatchdayNumber: number;
  status: "calcolata" | "da_calcolare";
  matches: CalendarMatch[];
};

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell);
  return cells.map((value) => value.trim());
}

function parseNullableNumber(value: string | undefined): number | null {
  const normalized = String(value ?? "").trim().replace(",", ".");
  if (!normalized) return null;

  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function parseNullableInteger(value: string | undefined): number | null {
  const number = parseNullableNumber(value);
  return number === null ? null : Math.trunc(number);
}

export function parseCalendarCsv(csvText: string, expectedMatches: number): CalendarMatchday[] {
  const lines = String(csvText ?? "")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (lines.length === 0) return [];

  const headers = splitCsvLine(lines[0]).map((header) => header.toLowerCase());
  const indexOf = (name: string) => headers.indexOf(name);

  const required = [
    "real_round_number",
    "fantasy_matchday_number",
    "home_team",
    "away_team"
  ];

  if (required.some((name) => indexOf(name) < 0)) {
    throw new Error("Il CSV Calendario non contiene tutte le colonne richieste.");
  }

  const groups = new Map<number, CalendarMatch[]>();

  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const fantasyMatchdayNumber = parseNullableInteger(cells[indexOf("fantasy_matchday_number")]);
    const realRoundNumber = parseNullableInteger(cells[indexOf("real_round_number")]);
    const homeTeam = String(cells[indexOf("home_team")] ?? "").trim();
    const awayTeam = String(cells[indexOf("away_team")] ?? "").trim();

    if (fantasyMatchdayNumber === null || realRoundNumber === null || !homeTeam || !awayTeam) {
      continue;
    }

    const match: CalendarMatch = {
      realRoundNumber,
      fantasyMatchdayNumber,
      status: "da_calcolare",
      homeTeam,
      awayTeam,
      homeTotal: parseNullableNumber(cells[indexOf("home_total")]),
      awayTotal: parseNullableNumber(cells[indexOf("away_total")]),
      homeGoals: parseNullableInteger(cells[indexOf("home_goals")]),
      awayGoals: parseNullableInteger(cells[indexOf("away_goals")]),
      note: String(cells[indexOf("note")] ?? "").trim()
    };

    const matches = groups.get(fantasyMatchdayNumber) ?? [];
    matches.push(match);
    groups.set(fantasyMatchdayNumber, matches);
  }

  return Array.from(groups.entries())
    .map(([fantasyMatchdayNumber, matches]) => {
      const complete = (
        matches.length === expectedMatches &&
        matches.every((match) => match.homeGoals !== null && match.awayGoals !== null)
      );
      const status: CalendarMatchday["status"] = complete ? "calcolata" : "da_calcolare";

      return {
        fantasyMatchdayNumber,
        realRoundNumber: matches[0]?.realRoundNumber ?? fantasyMatchdayNumber,
        status,
        matches: matches.map((match) => ({ ...match, status }))
      };
    })
    .sort((left, right) => (
      left.realRoundNumber - right.realRoundNumber ||
      left.fantasyMatchdayNumber - right.fantasyMatchdayNumber
    ));
}

export function formatCalendarTotal(value: number | null): string {
  if (value === null) return "";

  return new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1
  }).format(value);
}
