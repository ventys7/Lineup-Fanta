/* SWITCH MODALS - Candidate selection for the one optional Switch */

function getSwitchPickerTitle(kind) {
  const isPlus = window.LineupSwitch?.getState().plus;
  const side = kind === "starter" ? "titolare" : "panchina";
  return `Seleziona ${side} per Switch${isPlus ? " Plus" : " Base"}`;
}

function renderSwitchPicker(listEl, entries, selectedIndex, onSelect) {
  listEl.replaceChildren();

  if (entries.length === 0) {
    const empty = document.createElement("div");
    empty.style.cssText = "padding:20px;text-align:center;color:var(--muted)";
    empty.textContent = "Nessun calciatore disponibile";
    listEl.appendChild(empty);
    return;
  }

  entries.forEach(({ index, player }) => {
    const row = document.createElement("div");
    row.className = "picker-player" + (selectedIndex === index ? " selected" : "");

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.style.background = roleColors[player.r] || "#dc3545";
    badge.textContent = player.r;

    const info = document.createElement("div");
    info.className = "player-info";

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = player.n;

    const team = document.createElement("span");
    team.className = "team";
    team.textContent = player.t || "";

    info.append(name, team);
    row.append(badge, info);

    if (selectedIndex === index) {
      const check = document.createElement("span");
      check.style.color = "var(--accent)";
      check.textContent = "✓";
      row.appendChild(check);
    }

    row.onclick = () => onSelect(index);
    listEl.appendChild(row);
  });
}

function openSwitchStarterModal() {
  if (!currentManager || !db[currentManager]) return;

  const state = window.LineupSwitch?.getState();
  const candidates = window.LineupSwitch?.getCandidates().starters || [];
  const team = db[currentManager].players;

  const filtered = candidates.filter(({ index, player }) => {
    if (index === state?.benchIndex) return false;
    if (!state?.plus && Number.isInteger(state?.benchIndex)) {
      return player.r === team[state.benchIndex]?.r;
    }
    if (state?.plus) {
      if (player.r === "P") return false;
      if (Number.isInteger(state.benchIndex)) return player.r !== team[state.benchIndex]?.r;
    }
    return true;
  });

  const modal = document.getElementById("switchStarterModal");
  modal.querySelector("h3").textContent = getSwitchPickerTitle("starter");

  renderSwitchPicker(
    document.getElementById("switchStarterList"),
    filtered,
    state?.starterIndex ?? null,
    (index) => {
      if (window.LineupSwitch?.setStarter(index)) closeSwitchStarterModal();
    }
  );

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  setModalOpen(true);
}

function closeSwitchStarterModal() {
  const modal = document.getElementById("switchStarterModal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  setModalOpen(false);
}

function openSwitchBenchModal() {
  if (!currentManager || !db[currentManager]) return;

  const state = window.LineupSwitch?.getState();
  const candidates = window.LineupSwitch?.getCandidates().bench || [];
  const team = db[currentManager].players;

  const filtered = candidates.filter(({ index, player }) => {
    if (index === state?.starterIndex) return false;
    if (!state?.plus && Number.isInteger(state?.starterIndex)) {
      return player.r === team[state.starterIndex]?.r;
    }
    if (state?.plus) {
      if (player.r === "P") return false;
      if (Number.isInteger(state.starterIndex)) return player.r !== team[state.starterIndex]?.r;
    }
    return true;
  });

  const modal = document.getElementById("switchBenchModal");
  modal.querySelector("h3").textContent = getSwitchPickerTitle("bench");

  renderSwitchPicker(
    document.getElementById("switchBenchList"),
    filtered,
    state?.benchIndex ?? null,
    (index) => {
      if (window.LineupSwitch?.setBench(index)) closeSwitchBenchModal();
    }
  );

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  setModalOpen(true);
}

function closeSwitchBenchModal() {
  const modal = document.getElementById("switchBenchModal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  setModalOpen(false);
}
