(function () {
  "use strict";

  const leagueId = document.documentElement.dataset.league;
  if (!leagueId) return;

  const loginView = document.getElementById("loginView");
  const adminView = document.getElementById("adminView");
  const loginForm = document.getElementById("loginForm");
  const password = document.getElementById("adminPassword");
  const leagueSettings = document.getElementById("leagueSettings");
  const logoCodes = document.getElementById("logoCodes");
  const feedback = document.getElementById("adminFeedback");
  const saveButton = document.getElementById("saveSettings");
  const logoutButton = document.getElementById("logoutButton");
  const mediaRefresh = document.getElementById("mediaRefresh");
  const mediaRefreshAll = document.getElementById("mediaRefreshAll");
  const mediaStatus = document.getElementById("mediaStatus");
  const unresolvedTeams = document.getElementById("unresolvedTeams");
  const unresolvedPlayers = document.getElementById("unresolvedPlayers");
  let state = null;
  let mediaManifest = null;

  function message(text, error = false) {
    feedback.textContent = text || "";
    feedback.classList.toggle("is-error", error);
  }

  async function adminApi(body) {
    const response = await fetch("/api/admin", {
      method: "POST",
      cache: "no-store",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, leagueId })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || `HTTP ${response.status}`);
    return payload;
  }

  async function mediaApi(body) {
    const response = await fetch("/api/player-media", {
      method: "POST",
      cache: "no-store",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, leagueId })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || `HTTP ${response.status}`);
    return payload;
  }

  function field(label, value, name) {
    const wrapper = document.createElement("label");
    wrapper.textContent = label;
    const input = document.createElement("input");
    input.type = "url";
    input.value = value || "";
    input.dataset.field = name;
    input.placeholder = "https://…";
    wrapper.appendChild(input);
    return wrapper;
  }

  function renderSettings() {
    leagueSettings.replaceChildren();
    const title = document.createElement("h2");
    title.textContent = leagueId === "fp" ? "Collegamenti Fanta Premier" : "Collegamenti Fanta Liga";
    const fields = document.createElement("div");
    fields.className = "admin-league-fields";
    fields.append(
      field("CSV Listone e Rose", state.settings.listoneCsvUrl, "listoneCsvUrl"),
      field("CSV Classifica", state.settings.standingsCsvUrl, "standingsCsvUrl"),
      field("Docs Richiami e Penalizzazioni", state.settings.disciplineDocUrl, "disciplineDocUrl")
    );
    leagueSettings.append(title, fields);
  }

  function renderLogoCodes() {
    logoCodes.replaceChildren();
    (state.teams || []).forEach((teamName) => {
      const row = document.createElement("div");
      row.className = "code-row";
      const copy = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = teamName;
      copy.appendChild(title);
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Genera / resetta";
      button.addEventListener("click", async () => {
        button.disabled = true;
        message("");
        try {
          const result = await adminApi({ action: "reset-logo-code", teamName });
          let resultNode = copy.querySelector(".code-result");
          if (!resultNode) {
            resultNode = document.createElement("span");
            resultNode.className = "code-result";
            copy.appendChild(resultNode);
          }
          resultNode.textContent = `Codice: ${result.code}`;
          message(`Nuovo codice creato per ${teamName}.`);
        } catch (error) { message(error.message, true); }
        finally { button.disabled = false; }
      });
      row.append(copy, button);
      logoCodes.appendChild(row);
    });
  }

  function mediaSummaryText(manifest) {
    const summary = manifest?.summary || {};
    const bsd = Number(summary.bsdResolved || 0);
    const legacy = Number(summary.legacyResolved || 0);
    const unresolved = Number(summary.unresolved || 0);
    const parts = [`BSD ${bsd}`];
    if (legacy > 0) parts.push(`${legacy} vecchie da sostituire`);
    parts.push(`${unresolved} senza foto BSD`);
    return parts.join(" · ");
  }

  function candidateButton(entry, candidate, card) {
    const choice = document.createElement("button");
    choice.type = "button";
    const identity = document.createElement("span");
    identity.className = "candidate-list__identity";
    const copy = document.createElement("span");
    const name = document.createElement("b");
    name.textContent = candidate.name;
    const team = document.createElement("span");
    team.textContent = `${candidate.teamName || "Squadra non indicata"} · ID ${candidate.id}`;
    copy.append(name, document.createElement("br"), team);
    identity.append(copy);
    const action = document.createElement("span");
    action.textContent = "Collega";
    choice.append(identity, action);

    choice.addEventListener("click", async () => {
      choice.disabled = true;
      try {
        const result = await mediaApi({ action: "link", key: entry.key, candidate });
        mediaManifest.players[entry.key] = result.entry;
        mediaManifest.summary.resolved = Number(mediaManifest.summary.resolved || 0) + 1;
        mediaManifest.summary.unresolved = Math.max(0, Number(mediaManifest.summary.unresolved || 0) - 1);
        mediaStatus.textContent = mediaSummaryText(mediaManifest);
        card.classList.add("is-resolved");
        window.setTimeout(() => card.remove(), 180);
        message(`${entry.listoneName} collegato.`);
      } catch (error) {
        message(error.message, true);
        choice.disabled = false;
      }
    });
    return choice;
  }

  function teamCandidateButton(issue, candidate, card) {
    const choice = document.createElement("button");
    choice.type = "button";
    const identity = document.createElement("span");
    identity.className = "candidate-list__identity";
    const copy = document.createElement("span");
    const name = document.createElement("b");
    name.textContent = candidate.name;
    const details = document.createElement("span");
    const coverage = `${Math.round(Number(candidate.coverage || 0) * 100)}%`;
    details.textContent = `ID ${candidate.id} · ${candidate.automatic}/${Number(candidate.automatic || 0) + Number(candidate.ambiguous || 0) + Number(candidate.noNameMatch || 0)} nomi · ${coverage}`;
    copy.append(name, document.createElement("br"), details);
    identity.append(copy);
    const action = document.createElement("span");
    action.textContent = "Usa rosa";
    choice.append(identity, action);

    choice.addEventListener("click", async () => {
      choice.disabled = true;
      try {
        await mediaApi({ action: "link-team", teamName: issue.teamName, externalId: candidate.id });
        card.classList.add("is-resolved");
        window.setTimeout(() => card.remove(), 180);
        message(`${issue.teamName} collegata a BSD. Premi “Sincronizza nuove” per completare le facce.`);
      } catch (error) {
        message(error.message, true);
        choice.disabled = false;
      }
    });
    return choice;
  }

  function unresolvedTeamCard(issue) {
    const card = document.createElement("article");
    card.className = "unresolved-card team-issue-card";
    card.dataset.teamKey = issue.key;

    const head = document.createElement("div");
    head.className = "unresolved-card__head";
    const name = document.createElement("strong");
    name.textContent = issue.teamName;
    const error = document.createElement("span");
    error.textContent = issue.error || "Squadra BSD da confermare";
    head.append(name, error);

    const search = document.createElement("div");
    search.className = "unresolved-search";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Confronta rose BSD";
    const candidates = document.createElement("div");
    candidates.className = "candidate-list";

    button.addEventListener("click", async () => {
      button.disabled = true;
      candidates.textContent = "Confronto rose…";
      try {
        const result = await mediaApi({ action: "search-team", teamName: issue.teamName });
        candidates.replaceChildren();
        (result.candidates || []).forEach((candidate) => candidates.appendChild(teamCandidateButton(issue, candidate, card)));
        if (!candidates.childElementCount) candidates.textContent = "Nessuna squadra BSD compatibile.";
      } catch (searchError) { candidates.textContent = searchError.message; }
      finally { button.disabled = false; }
    });
    search.append(button);

    const direct = document.createElement("div");
    direct.className = "unresolved-direct";
    const directInput = document.createElement("input");
    directInput.placeholder = "ID squadra BSD";
    const directButton = document.createElement("button");
    directButton.type = "button";
    directButton.textContent = "Usa ID";
    directButton.addEventListener("click", async () => {
      directButton.disabled = true;
      try {
        await mediaApi({ action: "link-team", teamName: issue.teamName, externalId: directInput.value });
        card.classList.add("is-resolved");
        window.setTimeout(() => card.remove(), 180);
        message(`${issue.teamName} collegata a BSD. Premi “Sincronizza nuove” per completare le facce.`);
      } catch (linkError) { message(linkError.message, true); }
      finally { directButton.disabled = false; }
    });
    direct.append(directInput, directButton);

    card.append(head, search, direct, candidates);
    return card;
  }

  function renderTeamIssues(manifest) {
    if (!unresolvedTeams) return;
    unresolvedTeams.replaceChildren();
    const issues = Array.isArray(manifest?.teamIssues) ? manifest.teamIssues : [];
    issues.forEach((issue) => unresolvedTeams.appendChild(unresolvedTeamCard(issue)));
  }

  function unresolvedCard(entry) {
    const card = document.createElement("article");
    card.className = "unresolved-card";
    card.dataset.key = entry.key;

    const head = document.createElement("div");
    head.className = "unresolved-card__head";
    const name = document.createElement("strong");
    name.textContent = entry.listoneName;
    const team = document.createElement("span");
    team.textContent = entry.realTeam || "";
    head.append(name, team);

    const search = document.createElement("div");
    search.className = "unresolved-search";
    const input = document.createElement("input");
    input.value = `${entry.listoneName} ${entry.realTeam || ""}`.trim();
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Cerca";
    const candidates = document.createElement("div");
    candidates.className = "candidate-list";

    button.addEventListener("click", async () => {
      button.disabled = true;
      candidates.textContent = "Ricerca…";
      try {
        const result = await mediaApi({ action: "search", query: input.value, teamName: entry.realTeam });
        candidates.replaceChildren();
        (result.candidates || []).forEach((candidate) => candidates.appendChild(candidateButton(entry, candidate, card)));
        if (!candidates.childElementCount) candidates.textContent = "Nessun risultato.";
      } catch (error) { candidates.textContent = error.message; }
      finally { button.disabled = false; }
    });

    search.append(input, button);

    const direct = document.createElement("div");
    direct.className = "unresolved-direct";
    const directInput = document.createElement("input");
    directInput.placeholder = "ID giocatore BSD";
    const directButton = document.createElement("button");
    directButton.type = "button";
    directButton.textContent = "Collega ID";
    directButton.addEventListener("click", async () => {
      directButton.disabled = true;
      try {
        const result = await mediaApi({ action: "link-id", key: entry.key, externalId: directInput.value });
        mediaManifest.players[entry.key] = result.entry;
        mediaManifest.summary.resolved = Number(mediaManifest.summary.resolved || 0) + 1;
        mediaManifest.summary.unresolved = Math.max(0, Number(mediaManifest.summary.unresolved || 0) - 1);
        mediaStatus.textContent = mediaSummaryText(mediaManifest);
        card.classList.add("is-resolved");
        window.setTimeout(() => card.remove(), 180);
        message(`${entry.listoneName} collegato.`);
      } catch (error) { message(error.message, true); }
      finally { directButton.disabled = false; }
    });
    direct.append(directInput, directButton);

    card.append(head, search, direct, candidates);
    return card;
  }

  function renderUnresolved(manifest, { preserveExisting = false } = {}) {
    mediaManifest = manifest;
    mediaStatus.textContent = mediaSummaryText(manifest);
    renderTeamIssues(manifest);
    const entries = Object.values(manifest?.players || {}).filter((entry) => entry.status !== "resolved" || !entry.photoUrl);
    const incomingKeys = new Set(entries.map((entry) => entry.key));

    if (!preserveExisting) unresolvedPlayers.replaceChildren();
    else {
      unresolvedPlayers.querySelectorAll("[data-key]").forEach((node) => {
        if (!incomingKeys.has(node.dataset.key)) node.remove();
      });
    }

    const existing = new Set([...unresolvedPlayers.querySelectorAll("[data-key]")].map((node) => node.dataset.key));
    entries.forEach((entry) => {
      if (!existing.has(entry.key)) unresolvedPlayers.appendChild(unresolvedCard(entry));
    });
  }

  async function loadMediaStatus({ preserveExisting = false } = {}) {
    try {
      const response = await fetch(`/api/player-media?league=${encodeURIComponent(leagueId)}&fresh=1`, { cache: "no-store", credentials: "same-origin" });
      if (!response.ok) throw new Error("Stato non disponibile");
      renderUnresolved(await response.json(), { preserveExisting });
    } catch {
      mediaStatus.textContent = "Lo stato immagini non è disponibile.";
    }
  }

  function refreshProgressText(manifest) {
    const refresh = manifest?.refresh || {};
    if (!refresh.pending) {
      const warnings = Array.isArray(refresh.warnings) && refresh.warnings.length ? ` · ${refresh.warnings.length} avvisi` : "";
      return `${mediaSummaryText(manifest)}${warnings}`;
    }
    if (refresh.phase === "teams") {
      return `${mediaSummaryText(manifest)} · rose BSD ${Number(refresh.teamSuccesses || 0)} riuscite · ${Number(refresh.teamCursor || 0)}/${Number(refresh.teamTotal || 0) || "…"} controllate`;
    }
    if (refresh.phase === "players") {
      return `${mediaSummaryText(manifest)} · facce ${Number(refresh.playerCursor || 0)}/${Number(refresh.playerTotal || 0) || "…"}`;
    }
    return `${mediaSummaryText(manifest)} · sincronizzazione in corso`;
  }

  function setMediaButtonsDisabled(disabled) {
    mediaRefresh.disabled = disabled;
    if (mediaRefreshAll) mediaRefreshAll.disabled = disabled;
  }

  async function syncMediaLoop(mode = "missing") {
    const alreadyPending = Boolean(mediaManifest?.refresh?.pending);
    if (mode === "full" && !alreadyPending) {
      const confirmed = window.confirm("Aggiornare tutte le foto? Le facce attuali resteranno online finché il nuovo manifest non sarà completo.");
      if (!confirmed) return;
    }

    setMediaButtonsDisabled(true);
    message(alreadyPending
      ? "Riprendo la sincronizzazione BSD…"
      : mode === "full"
        ? "Aggiorno tutte le rose BSD e preparo un manifest temporaneo…"
        : "Cerco soltanto i nuovi giocatori del Listone…");
    try {
      let result = alreadyPending
        ? await mediaApi({ action: "continue-sync" })
        : await mediaApi({ action: mode === "full" ? "full-sync" : "sync-missing" });
      let loops = 0;
      renderUnresolved(result, { preserveExisting: true });
      mediaStatus.textContent = refreshProgressText(result);

      while (result?.refresh?.pending && !result?.refresh?.error && loops < 180) {
        await new Promise((resolve) => setTimeout(resolve, 140));
        result = await mediaApi({ action: "continue-sync" });
        renderUnresolved(result, { preserveExisting: true });
        mediaStatus.textContent = refreshProgressText(result);
        loops += 1;
      }

      const syncError = String(result?.refresh?.error || "");
      const incomplete = Boolean(result?.refresh?.pending);
      const warnings = Array.isArray(result?.refresh?.warnings) ? result.refresh.warnings.length : 0;
      message(
        syncError || (incomplete
          ? "Sincronizzazione interrotta prima della fine: premi di nuovo per riprenderla."
          : warnings
            ? `Manifest pubblicato senza perdere le foto precedenti. Restano ${warnings} avvisi da controllare.`
            : "Foto giocatori sincronizzate e manifest pubblicato."),
        Boolean(syncError || incomplete)
      );
    } catch (error) { message(error.message, true); }
    finally {
      setMediaButtonsDisabled(false);
      loadMediaStatus({ preserveExisting: true });
    }
  }

  function render(nextState) {
    state = nextState;
    const authenticated = Boolean(state?.authenticated);
    loginView.hidden = authenticated;
    adminView.hidden = !authenticated;
    if (!authenticated) return;
    renderSettings();
    renderLogoCodes();
    loadMediaStatus();
  }

  async function loadState() {
    try {
      const response = await fetch(`/api/admin?league=${encodeURIComponent(leagueId)}&_lf=${Date.now()}`, { cache: "no-store", credentials: "same-origin" });
      render(await response.json());
    } catch (error) { message(error.message, true); }
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    message("");
    try {
      render(await adminApi({ action: "login", password: password.value }));
      password.value = "";
    } catch (error) { message(error.message, true); }
  });

  saveButton.addEventListener("click", async () => {
    const settings = structuredClone(state.settings);
    document.querySelectorAll("[data-field]").forEach((input) => { settings[input.dataset.field] = input.value.trim(); });
    saveButton.disabled = true;
    message("");
    try {
      render(await adminApi({ action: "save-settings", settings }));
      message("Collegamenti salvati.");
    } catch (error) { message(error.message, true); }
    finally { saveButton.disabled = false; }
  });

  logoutButton.addEventListener("click", async () => render(await adminApi({ action: "logout" })));
  mediaRefresh.addEventListener("click", () => syncMediaLoop("missing"));
  if (mediaRefreshAll) mediaRefreshAll.addEventListener("click", () => syncMediaLoop("full"));
  loadState();
})();
