/* LISTONE - Porting della vista originale FantaPL, alimentato dal CSV della lega. */
(function () {
  if (window.LINEUP_FANTA?.route !== "league") return;

  const elements = {
    leagueLabel: document.getElementById("listoneLeagueLabel"),
    totalCount: document.getElementById("listoneTotalCount"),
    search: document.getElementById("listoneSearch"),
    inactiveToggle: document.getElementById("listoneInactiveToggle"),
    freeToggle: document.getElementById("listoneFreeToggle"),
    resetButton: document.getElementById("listoneResetButton"),
    filters: document.getElementById("listoneFilters"),
    rolePills: document.getElementById("listoneRolePills"),
    role: document.getElementById("listoneRoleFilter"),
    team: document.getElementById("listoneTeamFilter"),
    owner: document.getElementById("listoneOwnerFilter"),
    feedback: document.getElementById("listoneFeedback"),
    feedbackText: document.getElementById("listoneFeedbackText"),
    results: document.getElementById("listoneResults"),
    desktopList: document.getElementById("listoneDesktopList"),
    mobileList: document.getElementById("listoneMobileList"),
    empty: document.getElementById("listoneEmpty")
  };

  if (Object.values(elements).some((element) => !element)) return;

  const ROLE_ORDER = Object.freeze({ P: 1, D: 2, C: 3, A: 4, U: 5 });
  const ROLE_LABELS = Object.freeze({
    P: "Portiere",
    D: "Difensore",
    C: "Centrocampista",
    A: "Attaccante",
    U: "Sconosciuto"
  });

  const state = {
    assets: [],
    role: "all",
    team: "all",
    owner: "all",
    search: "",
    freeOnly: false,
    inactiveOnly: false,
    sortKey: "position",
    sortDirection: "asc",
    expandedBlocks: new Set()
  };

  const numberFormatter = new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  let syncTimer = null;
  let syncAttempts = 0;

  function normalizeText(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();
  }

  function getInitials(value, max = 2) {
    const chunks = String(value || "?")
      .split(/[\s-]+/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);
    return chunks.slice(0, max).map((chunk) => chunk[0]).join("").toUpperCase() || "?";
  }

  function makeIcon(path, className = "") {
    const wrapper = document.createElement("span");
    wrapper.className = className;
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.innerHTML = `<svg viewBox="0 0 24 24"><path d="${path}"/></svg>`;
    return wrapper;
  }

  function createOption(value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    return option;
  }

  function setControlsDisabled(disabled) {
    [
      elements.search,
      elements.inactiveToggle,
      elements.freeToggle,
      elements.resetButton,
      elements.role,
      elements.team,
      elements.owner,
      ...elements.rolePills.querySelectorAll("button")
    ].forEach((control) => {
      control.disabled = disabled;
    });
  }

  function populateFilters() {
    const currentTeam = state.team;
    const currentOwner = state.owner;
    const teams = Array.from(new Set(state.assets.map((asset) => asset.realTeam).filter(Boolean)))
      .sort((first, second) => first.localeCompare(second, "it", { sensitivity: "base" }));
    const owners = Array.from(new Set(state.assets.map((asset) => asset.ownerTag).filter(Boolean)))
      .sort((first, second) => first.localeCompare(second, "it", { sensitivity: "base" }));

    elements.team.replaceChildren(createOption("all", "Squadra"));
    teams.forEach((team) => elements.team.appendChild(createOption(team, team)));

    elements.owner.replaceChildren(createOption("all", "Proprietario"));
    owners.forEach((owner) => elements.owner.appendChild(createOption(owner, owner)));

    state.team = teams.includes(currentTeam) ? currentTeam : "all";
    state.owner = owners.includes(currentOwner) ? currentOwner : "all";
  }

  function roleBadge(role) {
    const safeRole = ROLE_ORDER[role] ? role : "U";
    const badge = document.createElement("span");
    badge.className = `fpl-role-badge fpl-role-badge--${safeRole.toLowerCase()}`;
    badge.textContent = safeRole === "U" ? "?" : safeRole;
    badge.title = ROLE_LABELS[safeRole];
    badge.setAttribute("aria-label", ROLE_LABELS[safeRole]);
    return badge;
  }

  function avatar(value, extraClass = "") {
    const node = document.createElement("span");
    node.className = `fpl-player-avatar ${extraClass}`.trim();
    node.textContent = getInitials(value);
    node.setAttribute("aria-hidden", "true");
    return node;
  }

  function teamCrest(asset, extraClass = "") {
    const wrapper = document.createElement("span");
    wrapper.className = `fpl-block-crest ${extraClass}`.trim();

    const crest = document.createElement("span");
    crest.className = "fpl-team-crest";
    crest.textContent = getInitials(asset.realTeam, 3);

    const shield = makeIcon("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "fpl-shield-mark");
    wrapper.append(crest, shield);
    return wrapper;
  }

  function blockPlayerNames(asset) {
    const names = String(asset.displayName || "")
      .split(/\s+-\s+/)
      .map((name) => name.trim())
      .filter(Boolean);
    return names.length > 1 ? names : [];
  }

  function displayValue(value) {
    return Number(value) > 0 ? numberFormatter.format(value) : "—";
  }

  function ownerText(asset) {
    return asset.isFreeAgent ? "Svincolato" : asset.ownerTag;
  }

  function comparePosition(first, second, direction) {
    const multiplier = direction === "asc" ? 1 : -1;
    const roleDifference = ((ROLE_ORDER[first.role] || 9) - (ROLE_ORDER[second.role] || 9)) * multiplier;
    if (roleDifference) return roleDifference;

    const teamDifference = String(first.realTeam || "").localeCompare(
      String(second.realTeam || ""),
      "it",
      { sensitivity: "base" }
    );
    if (teamDifference) return teamDifference;

    const quotationDifference = (Number(second.quotation) || 0) - (Number(first.quotation) || 0);
    if (quotationDifference) return quotationDifference;

    return String(first.displayName || "").localeCompare(
      String(second.displayName || ""),
      "it",
      { sensitivity: "base" }
    );
  }

  function getFilteredAssets() {
    const query = normalizeText(state.search);
    return state.assets.filter((asset) => {
      if (query) {
        const searchable = normalizeText([
          asset.displayName,
          asset.docsName,
          asset.realTeam,
          ownerText(asset)
        ].join(" "));
        if (!searchable.includes(query)) return false;
      }
      if (state.role !== "all" && asset.role !== state.role) return false;
      if (state.team !== "all" && asset.realTeam !== state.team) return false;
      if (state.owner !== "all" && asset.ownerTag !== state.owner) return false;
      if (state.freeOnly && !asset.isFreeAgent) return false;
      if (state.inactiveOnly && asset.active) return false;
      return true;
    });
  }

  function getSortedAssets(filtered) {
    let items = filtered.slice();

    // Il vecchio Listone nascondeva i prezzi pari a zero durante l'ordinamento per prezzo.
    if (state.sortKey === "purchasePrice") {
      items = items.filter((asset) => Number(asset.purchasePrice) > 0);
    }

    if (state.sortKey === "position") {
      return items.sort((first, second) => comparePosition(first, second, state.sortDirection));
    }

    return items.sort((first, second) => {
      const firstValue = Number(first[state.sortKey]) || 0;
      const secondValue = Number(second[state.sortKey]) || 0;
      const difference = state.sortDirection === "asc"
        ? firstValue - secondValue
        : secondValue - firstValue;
      return difference || comparePosition(first, second, "asc");
    });
  }

  function createPlayerIdentity(asset) {
    const identity = document.createElement("div");
    identity.className = "fpl-player-identity";
    identity.appendChild(avatar(asset.displayName));

    const copy = document.createElement("div");
    copy.className = "fpl-player-copy";

    const name = document.createElement("strong");
    name.textContent = `${asset.displayName}${asset.active ? "" : " *"}`;
    if (!asset.active) name.classList.add("is-inactive");

    const team = document.createElement("small");
    team.textContent = asset.realTeam || "Squadra non indicata";

    copy.append(name, team);
    identity.appendChild(copy);
    return identity;
  }

  function createDesktopPlayer(asset) {
    const row = document.createElement("div");
    row.className = "fpl-desktop-row";

    const player = document.createElement("div");
    player.className = "fpl-col-player";
    player.appendChild(createPlayerIdentity(asset));

    const role = document.createElement("div");
    role.className = "fpl-col-role";
    role.appendChild(roleBadge(asset.role));

    const quotation = document.createElement("div");
    quotation.className = "fpl-col-quotation fpl-numeric-primary";
    quotation.textContent = displayValue(asset.quotation);

    const price = document.createElement("div");
    price.className = "fpl-col-price fpl-numeric-accent";
    price.textContent = displayValue(asset.purchasePrice);

    const owner = document.createElement("div");
    owner.className = `fpl-col-owner${asset.isFreeAgent ? " is-free" : ""}`;
    owner.textContent = ownerText(asset);

    row.append(player, role, quotation, price, owner);
    return row;
  }

  function createDesktopBlock(asset) {
    const wrapper = document.createElement("div");
    wrapper.className = "fpl-block-wrapper";

    const names = blockPlayerNames(asset);
    const isExpanded = state.expandedBlocks.has(asset.assetCode);
    const row = document.createElement(names.length ? "button" : "div");
    if (row instanceof HTMLButtonElement) row.type = "button";
    row.className = `fpl-desktop-row fpl-block-row${names.length ? " is-expandable" : ""}`;
    if (names.length) row.setAttribute("aria-expanded", String(isExpanded));

    const player = document.createElement("div");
    player.className = "fpl-col-player";

    const identity = document.createElement("div");
    identity.className = "fpl-player-identity";
    identity.appendChild(teamCrest(asset));

    const copy = document.createElement("div");
    copy.className = "fpl-player-copy";
    const name = document.createElement("strong");
    name.append(document.createTextNode(`Blocco ${asset.realTeam || asset.displayName}`));
    if (names.length) {
      name.appendChild(makeIcon("m6 9 6 6 6-6", `fpl-chevron${isExpanded ? " is-open" : ""}`));
    }
    const team = document.createElement("small");
    team.textContent = "Portieri";
    copy.append(name, team);
    identity.appendChild(copy);
    player.appendChild(identity);

    const role = document.createElement("div");
    role.className = "fpl-col-role";
    role.appendChild(roleBadge("P"));

    const quotation = document.createElement("div");
    quotation.className = "fpl-col-quotation fpl-numeric-primary";
    quotation.textContent = displayValue(asset.quotation);

    const price = document.createElement("div");
    price.className = "fpl-col-price fpl-numeric-accent";
    price.textContent = displayValue(asset.purchasePrice);

    const owner = document.createElement("div");
    owner.className = `fpl-col-owner${asset.isFreeAgent ? " is-free" : ""}`;
    owner.textContent = ownerText(asset);

    row.append(player, role, quotation, price, owner);
    if (names.length) row.addEventListener("click", () => toggleBlock(asset.assetCode));
    wrapper.appendChild(row);

    if (names.length && isExpanded) {
      const expanded = document.createElement("div");
      expanded.className = "fpl-block-expanded fpl-block-expanded--desktop";
      names.forEach((nameText) => {
        const playerRow = document.createElement("div");
        playerRow.className = "fpl-block-player-row";

        const identityWrap = document.createElement("div");
        identityWrap.className = "fpl-col-player fpl-block-player-identity";
        identityWrap.append(avatar(nameText, "fpl-player-avatar--small"));
        const nameNode = document.createElement("span");
        nameNode.textContent = nameText;
        identityWrap.appendChild(nameNode);

        const priceNode = document.createElement("div");
        priceNode.className = "fpl-col-price fpl-block-player-price";
        priceNode.textContent = "—";

        playerRow.append(identityWrap, priceNode);
        expanded.appendChild(playerRow);
      });
      wrapper.appendChild(expanded);
    }

    return wrapper;
  }

  function createMobileStats(asset) {
    const stats = document.createElement("div");
    stats.className = "fpl-mobile-stats";

    const quotation = document.createElement("div");
    const quotationLabel = document.createElement("span");
    quotationLabel.textContent = "Quot:";
    const quotationValue = document.createElement("strong");
    quotationValue.textContent = displayValue(asset.quotation);
    quotation.append(quotationLabel, quotationValue);

    const price = document.createElement("div");
    const priceLabel = document.createElement("span");
    priceLabel.textContent = "Acq:";
    const priceValue = document.createElement("strong");
    priceValue.className = "is-accent";
    priceValue.textContent = displayValue(asset.purchasePrice);
    price.append(priceLabel, priceValue);

    stats.append(quotation, price);

    if (!asset.isFreeAgent) {
      const owner = document.createElement("div");
      owner.className = "fpl-mobile-owner";
      owner.textContent = `👤 ${asset.ownerTag}`;
      stats.appendChild(owner);
    }

    return stats;
  }

  function createMobilePlayer(asset) {
    const card = document.createElement("article");
    card.className = "fpl-mobile-card";

    const body = document.createElement("div");
    body.className = "fpl-mobile-card__body";
    body.appendChild(avatar(asset.displayName, "fpl-player-avatar--mobile"));

    const info = document.createElement("div");
    info.className = "fpl-mobile-card__info";

    const headline = document.createElement("div");
    headline.className = "fpl-mobile-card__headline";
    headline.appendChild(roleBadge(asset.role));
    const name = document.createElement("strong");
    name.textContent = `${asset.displayName}${asset.active ? "" : " *"}`;
    if (!asset.active) name.classList.add("is-inactive");
    headline.appendChild(name);

    const team = document.createElement("small");
    team.textContent = asset.realTeam || "Squadra non indicata";

    info.append(headline, team, createMobileStats(asset));
    body.appendChild(info);
    card.appendChild(body);
    return card;
  }

  function createMobileBlock(asset) {
    const names = blockPlayerNames(asset);
    const isExpanded = state.expandedBlocks.has(asset.assetCode);
    const wrapper = document.createElement("article");
    wrapper.className = "fpl-mobile-block";

    const card = document.createElement(names.length ? "button" : "div");
    if (card instanceof HTMLButtonElement) card.type = "button";
    card.className = `fpl-mobile-card fpl-mobile-block__button${names.length ? " is-expandable" : ""}`;
    if (names.length) card.setAttribute("aria-expanded", String(isExpanded));

    const body = document.createElement("div");
    body.className = "fpl-mobile-card__body";
    body.appendChild(teamCrest(asset, "fpl-block-crest--mobile"));

    const info = document.createElement("div");
    info.className = "fpl-mobile-card__info";

    const headline = document.createElement("div");
    headline.className = "fpl-mobile-card__headline";
    headline.appendChild(roleBadge("P"));
    const name = document.createElement("strong");
    name.append(document.createTextNode(`Blocco ${asset.realTeam || asset.displayName}`));
    if (names.length) {
      name.appendChild(makeIcon("m6 9 6 6 6-6", `fpl-chevron${isExpanded ? " is-open" : ""}`));
    }
    headline.appendChild(name);

    const team = document.createElement("small");
    team.textContent = "Portieri";

    info.append(headline, team, createMobileStats(asset));
    body.appendChild(info);
    card.appendChild(body);
    if (names.length) card.addEventListener("click", () => toggleBlock(asset.assetCode));
    wrapper.appendChild(card);

    if (names.length && isExpanded) {
      const expanded = document.createElement("div");
      expanded.className = "fpl-block-expanded fpl-block-expanded--mobile";
      names.forEach((nameText) => {
        const row = document.createElement("div");
        row.className = "fpl-mobile-block-player";
        row.appendChild(avatar(nameText, "fpl-player-avatar--small"));
        const nameNode = document.createElement("span");
        nameNode.textContent = nameText;
        row.appendChild(nameNode);
        expanded.appendChild(row);
      });
      wrapper.appendChild(expanded);
    }

    return wrapper;
  }

  function toggleBlock(assetCode) {
    if (state.expandedBlocks.has(assetCode)) state.expandedBlocks.delete(assetCode);
    else state.expandedBlocks.add(assetCode);
    render();
  }

  function hasActiveFilters() {
    return Boolean(
      state.search ||
      state.role !== "all" ||
      state.team !== "all" ||
      state.owner !== "all" ||
      state.freeOnly ||
      state.inactiveOnly ||
      state.sortKey !== "position" ||
      state.sortDirection !== "asc"
    );
  }

  function updateControls() {
    elements.role.value = state.role;
    elements.team.value = state.team;
    elements.owner.value = state.owner;
    elements.freeToggle.classList.toggle("is-active", state.freeOnly);
    elements.freeToggle.setAttribute("aria-pressed", String(state.freeOnly));
    elements.inactiveToggle.classList.toggle("is-active", state.inactiveOnly);
    elements.inactiveToggle.setAttribute("aria-pressed", String(state.inactiveOnly));
    elements.resetButton.hidden = !hasActiveFilters();

    elements.rolePills.querySelectorAll("[data-listone-role]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.listoneRole === state.role);
    });

    document.querySelectorAll("[data-listone-sort]").forEach((button) => {
      const key = button.dataset.listoneSort;
      const icon = button.querySelector(`[data-sort-icon="${key}"]`);
      const active = state.sortKey === key;
      button.classList.toggle("is-active", active);
      if (icon) icon.textContent = active ? (state.sortDirection === "asc" ? "↑" : "↓") : "";
    });
  }

  function render() {
    const items = getSortedAssets(getFilteredAssets());
    const desktopFragment = document.createDocumentFragment();
    const mobileFragment = document.createDocumentFragment();

    items.forEach((asset) => {
      const isBlock = asset.type === "goalkeeper_block";
      desktopFragment.appendChild(isBlock ? createDesktopBlock(asset) : createDesktopPlayer(asset));
      mobileFragment.appendChild(isBlock ? createMobileBlock(asset) : createMobilePlayer(asset));
    });

    elements.desktopList.replaceChildren(desktopFragment);
    elements.mobileList.replaceChildren(mobileFragment);
    elements.empty.hidden = items.length !== 0;
    updateControls();
  }

  function setSort(key) {
    if (state.sortKey === key) {
      if (state.sortDirection === "desc") {
        state.sortDirection = "asc";
      } else if (key !== "position") {
        state.sortKey = "position";
        state.sortDirection = "asc";
      } else {
        state.sortDirection = "desc";
      }
    } else {
      state.sortKey = key;
      state.sortDirection = "desc";
    }
    render();
  }

  function resetFilters() {
    state.search = "";
    state.role = "all";
    state.team = "all";
    state.owner = "all";
    state.freeOnly = false;
    state.inactiveOnly = false;
    state.sortKey = "position";
    state.sortDirection = "asc";
    state.expandedBlocks.clear();
    elements.search.value = "";
    render();
  }

  function showState(csvState, assets = []) {
    const status = csvState?.status || "idle";

    if (status === "ready") {
      state.assets = assets.slice();
      elements.totalCount.textContent = String(state.assets.length);
      populateFilters();
      setControlsDisabled(false);
      elements.feedback.hidden = true;
      elements.results.hidden = false;
      render();
      return status;
    }

    state.assets = [];
    elements.totalCount.textContent = "0";
    elements.results.hidden = true;
    elements.feedback.hidden = false;
    elements.feedback.classList.toggle("is-error", status === "error");
    elements.feedbackText.textContent = status === "error"
      ? "Errore nel caricamento giocatori."
      : "Caricamento giocatori...";
    setControlsDisabled(true);
    return status;
  }

  function syncFromLeagueStore() {
    const csvState = window.LineupLeagueData?.getState?.() || { status: "idle" };
    const assets = window.LineupLeagueData?.getAssets?.() || [];
    return showState(csvState, assets);
  }

  function startSyncRecovery() {
    if (syncTimer !== null) window.clearInterval(syncTimer);
    syncAttempts = 0;
    syncTimer = window.setInterval(() => {
      syncAttempts += 1;
      const status = syncFromLeagueStore();
      if (status === "ready" || status === "error" || syncAttempts >= 50) {
        window.clearInterval(syncTimer);
        syncTimer = null;
      }
    }, 100);
  }

  elements.search.addEventListener("input", () => {
    state.search = elements.search.value;
    render();
  });

  elements.rolePills.addEventListener("click", (event) => {
    const button = event.target.closest("[data-listone-role]");
    if (!button) return;
    state.role = button.dataset.listoneRole;
    render();
  });

  elements.role.addEventListener("change", () => {
    state.role = elements.role.value;
    render();
  });

  elements.team.addEventListener("change", () => {
    state.team = elements.team.value;
    render();
  });

  elements.owner.addEventListener("change", () => {
    state.owner = elements.owner.value;
    if (state.owner !== "all") state.freeOnly = false;
    render();
  });

  elements.freeToggle.addEventListener("click", () => {
    state.freeOnly = !state.freeOnly;
    if (state.freeOnly) state.owner = "all";
    render();
  });

  elements.inactiveToggle.addEventListener("click", () => {
    state.inactiveOnly = !state.inactiveOnly;
    render();
  });

  elements.resetButton.addEventListener("click", resetFilters);
  elements.filters.addEventListener("submit", (event) => event.preventDefault());

  document.querySelectorAll("[data-listone-sort]").forEach((button) => {
    button.addEventListener("click", () => setSort(button.dataset.listoneSort));
  });

  document.addEventListener("lineup:league-assets-ready", (event) => {
    if (event.detail?.leagueId !== window.LINEUP_FANTA?.league?.id) return;
    showState(event.detail.state, event.detail.assets || []);
  });

  elements.leagueLabel.textContent = window.LINEUP_FANTA?.league?.label || "questa lega";
  syncFromLeagueStore();
  startSyncRecovery();
  window.addEventListener("pageshow", syncFromLeagueStore);
  window.addEventListener("load", syncFromLeagueStore, { once: true });

  window.LineupListone = Object.freeze({ refresh: syncFromLeagueStore });
})();
