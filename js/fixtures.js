/* KICK-OFF FIXTURES — one cache-only request per league visit */
window.LineupFixtures = (function () {
  const KICKOFF_ORIGIN = "https://kick-off-tau.vercel.app";
  const API_BASE = `${KICKOFF_ORIGIN}/api/lineup`;
  const CARD_ID = "kickoffFixturesCard";
  const MOBILE_QUERY = window.matchMedia("(max-width: 767px)");

  let refreshTimer = null;
  let activePayload = null;
  let isOpen = false;

  function getLeague() {
    return window.LINEUP_FANTA?.league || null;
  }

  function getEndpoint() {
    const league = getLeague();
    if (!league?.id) return null;
    return `${API_BASE}?league=${encodeURIComponent(league.id)}&fresh=1`;
  }

  function crestUrl(teamId) {
    const normalizedId = String(teamId || "").trim();
    return /^\d+$/.test(normalizedId)
      ? `${KICKOFF_ORIGIN}/api/crest/${normalizedId}?fresh=1`
      : null;
  }

  function formatDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "Data da definire";

    return new Intl.DateTimeFormat("it-IT", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  function formatTime(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(date);
  }

  function countdownText(iso) {
    const target = new Date(iso).getTime();
    const remaining = target - Date.now();

    if (!Number.isFinite(target)) return "—";
    if (remaining <= 0) return "Scadenza in corso";

    const minutes = Math.floor(remaining / 60000);
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;

    if (days > 0) return `${days}g ${hours}h ${String(mins).padStart(2, "0")}m`;
    if (hours > 0) return `${hours}h ${String(mins).padStart(2, "0")}m`;
    return `${mins}m`;
  }

  function fixtureState(fixture) {
    const explicitState = String(fixture?.displayState || "").toLowerCase();
    if (["played", "live", "postponed", "upcoming"].includes(explicitState)) return explicitState;

    const status = String(fixture?.status || "notstarted").toLowerCase();
    if (status === "finished") return "played";
    if (["inprogress", "paused", "suspended"].includes(status)) return "live";
    if (status === "postponed") return "postponed";
    return "upcoming";
  }

  function fixtureStateLabel(state) {
    return ({
      played: "Giocata",
      live: "In corso",
      postponed: "Rinviata",
    })[state] || "";
  }

  function removeCard() {
    document.getElementById(CARD_ID)?.remove();

    if (refreshTimer) {
      window.clearInterval(refreshTimer);
      refreshTimer = null;
    }

    activePayload = null;
    isOpen = false;
  }

  function makeElement(tag, className, text = null) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== null) element.textContent = text;
    return element;
  }

  function makeCrest(teamName, teamId) {
    const crest = makeElement("img", "kickoff-fixtures-card__crest");
    const source = crestUrl(teamId);

    crest.alt = teamName ? `Stemma ${teamName}` : "Stemma squadra";
    crest.loading = "lazy";
    crest.decoding = "async";

    if (!source) {
      crest.classList.add("is-missing");
      return crest;
    }

    crest.src = source;
    crest.addEventListener("error", () => crest.classList.add("is-missing"), { once: true });
    return crest;
  }

  function makeFixtureIdentity(fixture, classPrefix) {
    const teams = makeElement("div", `${classPrefix}__teams`);
    const homeCrest = makeCrest(fixture.home, fixture.homeTeamId);
    const label = makeElement("p", `${classPrefix}__teams-label`, `${fixture.home} - ${fixture.away}`);
    const awayCrest = makeCrest(fixture.away, fixture.awayTeamId);

    teams.append(homeCrest, label, awayCrest);
    return teams;
  }

  function renderFixtures(content, fixtures, matchday) {
    content.replaceChildren();

    const panelTitle = makeElement(
      "p",
      "kickoff-fixtures-card__panel-title",
      `Tutte le partite • G${matchday || "—"}`,
    );
    content.append(panelTitle);

    fixtures.forEach((fixture) => {
      const state = fixtureState(fixture);
      const row = makeElement("article", `kickoff-fixtures-card__match is-${state}`);
      const date = makeElement("p", "kickoff-fixtures-card__match-date", formatDate(fixture.kickoffAt));
      const teams = makeFixtureIdentity(fixture, "kickoff-fixtures-card__match");
      const footer = makeElement("div", "kickoff-fixtures-card__match-footer");
      const time = makeElement("p", "kickoff-fixtures-card__match-time", formatTime(fixture.kickoffAt));
      const label = fixtureStateLabel(state);

      footer.append(time);
      if (label) footer.append(makeElement("span", `kickoff-fixtures-card__state is-${state}`, label));

      row.append(date, teams, footer);
      content.append(row);
    });
  }

  function updateCountdown() {
    const card = document.getElementById(CARD_ID);
    const deadline = activePayload?.deadline?.kickoffAt;
    const value = card?.querySelector("[data-kickoff-countdown]");

    if (value && deadline) value.textContent = countdownText(deadline);
  }

  function moveCardToCurrentLayout() {
    const card = document.getElementById(CARD_ID);
    if (!card) return;

    const host = MOBILE_QUERY.matches
      ? document.getElementById("mobileLayout")
      : document.querySelector(".desktop-formation-main");

    if (!host || card.parentElement === host) return;
    host.prepend(card);
  }

  function closeFromOutside(event) {
    if (!MOBILE_QUERY.matches || !isOpen) return;

    const card = document.getElementById(CARD_ID);
    if (card && !card.contains(event.target)) toggleFixtures(false);
  }

  function toggleFixtures(force) {
    const card = document.getElementById(CARD_ID);
    if (!card) return;

    const panel = card.querySelector("[data-kickoff-panel]");
    const content = card.querySelector("[data-kickoff-panel-content]");
    const button = card.querySelector("[data-kickoff-toggle]");
    if (!panel || !content || !button) return;

    isOpen = typeof force === "boolean" ? force : !isOpen;

    if (isOpen && panel.dataset.rendered !== "true") {
      renderFixtures(
        content,
        Array.isArray(activePayload?.fixtures) ? activePayload.fixtures : [],
        activePayload?.matchday,
      );
      panel.dataset.rendered = "true";
    }

    panel.classList.toggle("is-open", isOpen);
    panel.setAttribute("aria-hidden", String(!isOpen));
    button.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    button.textContent = isOpen ? "Chiudi partite" : "Tutte le partite della giornata";
  }

  function render(payload) {
    removeCard();

    if (payload?.state !== "ready" || !payload?.deadline?.kickoffAt) return;

    activePayload = payload;

    const firstMatch = payload.deadline.matches?.[0];
    if (!firstMatch) return;

    const card = makeElement("section", "kickoff-fixtures-card");
    card.id = CARD_ID;
    card.setAttribute("aria-label", "Calendario della giornata");

    const header = makeElement("div", "kickoff-fixtures-card__header");
    const competition = makeElement(
      "p",
      "kickoff-fixtures-card__competition",
      `${payload.league?.name || "Campionato"} • G${payload.matchday || "—"}`,
    );
    const countdown = makeElement("p", "kickoff-fixtures-card__countdown", countdownText(payload.deadline.kickoffAt));
    countdown.dataset.kickoffCountdown = "";
    header.append(competition, countdown);

    if (payload.roundState === "open") {
      const played = Number(payload.roundSummary?.playedFixtures || 0);
      const roundState = makeElement(
        "p",
        "kickoff-fixtures-card__round-state",
        played > 0 ? `Turno aperto • ${played} già giocate` : "Turno aperto",
      );
      header.append(roundState);
    }

    const primary = makeElement("div", "kickoff-fixtures-card__primary");
    const primaryTeams = makeFixtureIdentity(firstMatch, "kickoff-fixtures-card__primary");

    if ((payload.deadline.additionalSimultaneousMatches || 0) > 0) {
      const additional = makeElement(
        "span",
        "kickoff-fixtures-card__additional",
        `+${payload.deadline.additionalSimultaneousMatches}`,
      );
      primaryTeams.querySelector(".kickoff-fixtures-card__primary__teams-label")?.append(" ", additional);
    }

    const kickoff = makeElement(
      "p",
      "kickoff-fixtures-card__kickoff",
      `${formatDate(payload.deadline.kickoffAt)} • ${formatTime(payload.deadline.kickoffAt)}`,
    );

    const toggle = makeElement("button", "kickoff-fixtures-card__toggle", "Tutte le partite della giornata");
    toggle.type = "button";
    toggle.dataset.kickoffToggle = "";
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => toggleFixtures());

    primary.append(primaryTeams, kickoff, toggle);

    const panel = makeElement("div", "kickoff-fixtures-card__panel");
    panel.dataset.kickoffPanel = "";
    panel.setAttribute("aria-hidden", "true");
    const panelContent = makeElement("div", "kickoff-fixtures-card__panel-content");
    panelContent.dataset.kickoffPanelContent = "";
    panel.append(panelContent);

    card.append(header, primary, panel);

    const host = MOBILE_QUERY.matches
      ? document.getElementById("mobileLayout")
      : document.querySelector(".desktop-formation-main");
    if (!host) return;
    host.prepend(card);

    refreshTimer = window.setInterval(updateCountdown, 30000);
  }

  async function setup() {
    if (window.LINEUP_FANTA?.route !== "league") return;

    const endpoint = getEndpoint();
    if (!endpoint) return;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) return;
      render(await response.json());
    } catch (error) {
      // Contextual only: formation building must keep working if Kick-off is unavailable.
      console.info("Kick-off fixtures unavailable", error?.message || error);
      removeCard();
    }
  }

  MOBILE_QUERY.addEventListener?.("change", moveCardToCurrentLayout);
  document.addEventListener("click", closeFromOutside);

  return Object.freeze({ setup, refresh: setup });
})();
