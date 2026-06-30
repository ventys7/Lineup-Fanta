/* GK MODAL - Choose the real goalkeeper inside one logical block */

let gkModalMode = "desktop";

function showGkChoiceModal(blockName, { mode = "desktop" } = {}) {
  const group = window.GkBlocks?.getGroup(blockName);
  if (!group) return;

  if (window.GkBlocks.isBlockDisabled(blockName)) {
    showToast("Hai già selezionato un altro blocco portieri!", "error");
    return;
  }

  const modal = document.getElementById("gkChoiceModal");
  const choicesDiv = document.getElementById("gkChoices");
  const title = document.getElementById("gkBlockName");

  gkModalMode = mode;
  title.textContent = blockName;
  choicesDiv.innerHTML = "";

  group.players.forEach(({ player, index }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gk-choice-btn";
    button.textContent = player.n;
    button.addEventListener("click", () => {
      if (gkModalMode === "mobile") {
        confirmGkSelectionMobile(index);
      } else {
        confirmGkSelection(index);
      }
    });
    choicesDiv.appendChild(button);
  });

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  setModalOpen(true);
}

function refreshAfterGkChange() {
  renderRoster();
  renderFormation();

  if (isMobile && typeof renderMobileSlots === "function") {
    renderMobileSlots();
  }

  if (typeof updateSwitchUI === "function") updateSwitchUI();
}

function confirmGkSelection(index) {
  if (!window.GkBlocks?.select(index)) return;
  closeGkModal();
  refreshAfterGkChange();
}

function closeGkModal() {
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement) activeElement.blur();

  const modal = document.getElementById("gkChoiceModal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  gkModalMode = "desktop";
  setModalOpen(false);
}
