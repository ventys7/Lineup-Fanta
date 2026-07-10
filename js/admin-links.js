(function () {
  "use strict";

  const root = document.documentElement;
  const leagueId = root.dataset.leagueId === "pd" ? "pd" : "fp";
  const competitionLabel = leagueId === "pd" ? "Liga" : "Premier League";
  const leagueLabel = leagueId === "pd" ? "LaLigaCUP" : "PianginaCUP";

  const title = document.getElementById("adminTitle");
  const subtitle = document.getElementById("adminSubtitle");
  const back = document.getElementById("adminBack");
  const activeSelect = document.getElementById("activeMatchday");
  const list = document.getElementById("matchdayList");
  const password = document.getElementById("adminPassword");
  const saveButton = document.getElementById("saveAdminLinks");
  const status = document.getElementById("adminStatus");

  title.textContent = `Admin link · ${leagueLabel}`;
  subtitle.textContent = `Giornata attiva e documenti delle singole giornate ${competitionLabel}.`;
  back.href = `/${leagueId}/`;

  let matchdays = [];

  function setStatus(message, type = "") {
    status.textContent = message;
    status.className = `admin-status${type ? ` is-${type}` : ""}`;
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let value = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];

      if (char === '"') {
        if (quoted && next === '"') {
          value += '"';
          index += 1;
        } else quoted = !quoted;
      } else if (char === "," && !quoted) {
        row.push(value);
        value = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(value);
        if (row.some((cell) => cell.trim())) rows.push(row);
        row = [];
        value = "";
      } else value += char;
    }

    if (value || row.length) {
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
    }

    return rows;
  }

  function calendarMatchdays(csvText) {
    const rows = parseCsv(csvText);
    const headerIndex = rows.findIndex((row) => row.includes("fantasy_matchday_number"));
    if (headerIndex < 0) return [];

    const header = rows[headerIndex].map((cell) => cell.trim());
    const fantasyIndex = header.indexOf("fantasy_matchday_number");
    const realIndex = header.indexOf("real_round_number");
    const map = new Map();

    rows.slice(headerIndex + 1).forEach((row) => {
      const fantasy = Number(row[fantasyIndex]);
      const real = Number(row[realIndex]);
      if (!Number.isInteger(fantasy) || !Number.isInteger(real)) return;
      map.set(fantasy, { fantasy, real });
    });

    return Array.from(map.values()).sort((left, right) => left.real - right.real);
  }

  function normalizeRegistry(data) {
    const rawLeague = data && typeof data[leagueId] === "object" ? data[leagueId] : {};
    const isNew = Object.prototype.hasOwnProperty.call(rawLeague, "matchdays")
      || Object.prototype.hasOwnProperty.call(rawLeague, "activeFantasyMatchday");

    return {
      activeFantasyMatchday: Number.isInteger(Number(rawLeague.activeFantasyMatchday))
        && Number(rawLeague.activeFantasyMatchday) > 0
        ? Number(rawLeague.activeFantasyMatchday)
        : null,
      matchdays: isNew && rawLeague.matchdays && typeof rawLeague.matchdays === "object"
        ? rawLeague.matchdays
        : rawLeague
    };
  }

  function entryUrl(value) {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return String(value.url || "");
    return "";
  }

  function render(registry) {
    activeSelect.innerHTML = '<option value="">Nessuna giornata attiva</option>';

    matchdays.forEach((matchday) => {
      const option = document.createElement("option");
      option.value = String(matchday.fantasy);
      option.textContent = `${competitionLabel} ${matchday.real} · Fanta ${matchday.fantasy}`;
      activeSelect.append(option);
    });

    activeSelect.value = registry.activeFantasyMatchday === null
      ? ""
      : String(registry.activeFantasyMatchday);

    list.innerHTML = "";

    if (matchdays.length === 0) {
      list.innerHTML = '<div class="admin-empty">Calendario non ancora configurato per questa lega.</div>';
      saveButton.disabled = true;
      return;
    }

    matchdays.forEach((matchday) => {
      const row = document.createElement("div");
      row.className = "admin-row";
      row.innerHTML = `
        <div class="admin-row__day">
          <strong>${competitionLabel} ${matchday.real}</strong>
          <span>Giornata Fanta ${matchday.fantasy}</span>
        </div>
        <input
          type="url"
          inputmode="url"
          autocomplete="off"
          data-fantasy-matchday="${matchday.fantasy}"
          placeholder="https://docs.google.com/document/d/e/.../pub"
          aria-label="Link giornata Fanta ${matchday.fantasy}"
        >
      `;

      const input = row.querySelector("input");
      input.value = entryUrl(registry.matchdays[String(matchday.fantasy)]).trim();
      list.append(row);
    });
  }

  async function fetchFresh(url) {
    const separator = url.includes("?") ? "&" : "?";
    const response = await fetch(`${url}${separator}v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  }

  async function load() {
    setStatus("Caricamento…");

    try {
      const [calendarResponse, registryResponse] = await Promise.all([
        fetchFresh(`/data/${leagueId}/calendario.csv`),
        fetchFresh("/data/matchday-links.json")
      ]);

      matchdays = calendarMatchdays(await calendarResponse.text());
      const registry = normalizeRegistry(await registryResponse.json());
      render(registry);
      setStatus("");
    } catch (error) {
      console.error(error);
      list.innerHTML = '<div class="admin-empty">Impossibile caricare calendario o registro link.</div>';
      setStatus("Caricamento non riuscito.", "error");
      saveButton.disabled = true;
    }
  }

  saveButton.addEventListener("click", async () => {
    if (!password.value) {
      setStatus("Inserisci la password admin.", "error");
      password.focus();
      return;
    }

    const matchdayEntries = {};
    list.querySelectorAll("input[data-fantasy-matchday]").forEach((input) => {
      const value = input.value.trim();
      if (!value) return;
      matchdayEntries[input.dataset.fantasyMatchday] = { url: value };
    });

    const activeValue = Number(activeSelect.value);
    const activeFantasyMatchday = Number.isInteger(activeValue) && activeValue > 0
      ? activeValue
      : null;

    saveButton.disabled = true;
    setStatus("Salvataggio su GitHub…");

    try {
      const response = await fetch("/api/admin-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leagueId,
          password: password.value,
          registry: {
            activeFantasyMatchday,
            matchdays: matchdayEntries
          }
        })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);

      password.value = "";
      setStatus(result.message || "Configurazione salvata.", "success");
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Salvataggio non riuscito.", "error");
    } finally {
      saveButton.disabled = false;
    }
  });

  load();
})();
