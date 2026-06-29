/* SWITCH UI - Shared desktop/mobile rendering */

function updateSwitchUI() {
  const switchSection = document.getElementById("switchSection");
  const switchSectionMobile = document.getElementById("mobileSwitchSection");
  const isVisible = Boolean(currentManager);

  if (switchSection) switchSection.style.display = isVisible ? "block" : "none";
  if (switchSectionMobile) switchSectionMobile.style.display = isVisible ? "block" : "none";
  if (!isVisible) return;

  const starterSlot = document.getElementById("switchStarterSlot");
  const benchSlot = document.getElementById("switchBenchSlot");
  const starterSlotMobile = document.getElementById("switchStarterSlotMobile");
  const benchSlotMobile = document.getElementById("switchBenchSlotMobile");
  const clearStarterBtn = document.getElementById("clearStarterSwitch");
  const clearBenchBtn = document.getElementById("clearBenchSwitch");
  const clearStarterBtnMobile = document.getElementById("clearStarterSwitchMobile");
  const clearBenchBtnMobile = document.getElementById("clearBenchSwitchMobile");
  const plusBtn = document.getElementById("switchPlusBtn");
  const plusBtnMobile = document.getElementById("switchPlusBtnMobile");

  if (!db || !currentManager || !db[currentManager]) return;

  const team = db[currentManager].players || [];
  const state = window.LineupSwitch?.getState() || {
    starterIndex: switchStarterIndex,
    benchIndex: switchBenchIndex,
    plus: switchPlus
  };

  function renderSwitchSlot(slotEl, playerIndex) {
    if (!slotEl) return;

    const player = Number.isInteger(playerIndex) ? team[playerIndex] : null;
    slotEl.replaceChildren();

    const content = document.createElement("div");
    content.className = "switch-slot-content";

    if (!player) {
      const placeholder = document.createElement("span");
      placeholder.className = "switch-slot-placeholder";
      placeholder.textContent = "+";
      content.appendChild(placeholder);
      slotEl.classList.remove("has-player");
    } else {
      const badge = document.createElement("div");
      badge.className = "badge";
      badge.style.background = roleColors[player.r] || "#dc3545";
      badge.textContent = player.r;

      const name = document.createElement("span");
      name.className = "player-name";
      name.textContent = player.n;

      content.append(badge, name);
      slotEl.classList.add("has-player");
    }

    slotEl.appendChild(content);
  }

  renderSwitchSlot(starterSlot, state.starterIndex);
  renderSwitchSlot(benchSlot, state.benchIndex);
  renderSwitchSlot(starterSlotMobile, state.starterIndex);
  renderSwitchSlot(benchSlotMobile, state.benchIndex);

  function setClearVisibility(button, value) {
    if (button) button.style.display = value !== null ? "inline-block" : "none";
  }

  setClearVisibility(clearStarterBtn, state.starterIndex);
  setClearVisibility(clearBenchBtn, state.benchIndex);
  setClearVisibility(clearStarterBtnMobile, state.starterIndex);
  setClearVisibility(clearBenchBtnMobile, state.benchIndex);

  [plusBtn, plusBtnMobile].forEach((button) => {
    if (!button) return;
    button.classList.toggle("active", state.plus);
    button.setAttribute("aria-pressed", String(state.plus));
    button.title = state.plus ? "Switch Plus attivo" : "Passa allo Switch Plus";
  });
}
