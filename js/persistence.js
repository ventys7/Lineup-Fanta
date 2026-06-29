/* PERSISTENCE - League-scoped drafts and copied formations */

(function () {
  const STORAGE_VERSION = 1;
  const SAVE_DELAY_MS = 80;

  let saveTimer = null;
  let isRestoring = false;
  let initialized = false;

  function getLeagueId() {
    return window.LINEUP_FANTA?.leagueId || null;
  }

  function getStoragePrefix() {
    const leagueId = getLeagueId();
    return leagueId ? `lineup-${leagueId}` : null;
  }

  function getKey(name) {
    const prefix = getStoragePrefix();
    return prefix ? `${prefix}:${name}` : null;
  }

  function safeRead(name) {
    const key = getKey(name);
    if (!key) return null;

    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn("Lineup persistence read failed", error);
      return null;
    }
  }

  function safeWrite(name, value) {
    const key = getKey(name);
    if (!key) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Lineup persistence write failed", error);
    }
  }

  function normalizePart(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLocaleLowerCase("it");
  }

  function getPlayerId(player) {
    if (!player) return null;

    return [
      normalizePart(player.r),
      normalizePart(player.n),
      normalizePart(player.t),
      normalizePart(player.gkBlock)
    ].join("|");
  }

  function getCurrentTeam() {
    return currentManager && db[currentManager]?.players ? db[currentManager].players : [];
  }

  function getSnapshot() {
    const team = getCurrentTeam();
    if (!currentManager || team.length === 0) return null;

    const selectedPlayerIds = selectedPlayers
      .map((index) => getPlayerId(team[index]))
      .filter(Boolean);

    const serializedAssignments = {};
    Object.entries(slotAssignments).forEach(([slotKey, playerIndex]) => {
      const playerId = getPlayerId(team[playerIndex]);
      if (playerId) serializedAssignments[slotKey] = playerId;
    });

    return {
      version: STORAGE_VERSION,
      manager: currentManager,
      module: document.getElementById("moduleSelect")?.value || "433",
      selectedPlayerIds,
      slotAssignments: serializedAssignments,
      switch: {
        starterId: getPlayerId(team[switchStarterIndex]),
        benchId: getPlayerId(team[switchBenchIndex]),
        plus: Boolean(switchPlus)
      },
      updatedAt: new Date().toISOString()
    };
  }

  function saveDraft() {
    saveTimer = null;
    if (isRestoring) return;

    const snapshot = getSnapshot();
    if (!snapshot) return;

    safeWrite("last-manager", { manager: snapshot.manager, updatedAt: snapshot.updatedAt });
    safeWrite("draft", snapshot);
  }

  function queueDraftSave() {
    if (isRestoring || !currentManager) return;

    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveDraft, SAVE_DELAY_MS);
  }

  function rebuildDisabledBlocks(team) {
    disabledBlocks.clear();

    const selectedGoalkeeper = selectedPlayers
      .map((index) => team[index])
      .find((player) => player?.r === "P" && player.gkBlock);

    if (!selectedGoalkeeper?.gkBlock) return;

    const allBlocks = new Set(
      team
        .filter((player) => player?.r === "P" && player.isGkBlock)
        .map((player) => player.gkBlock)
    );

    allBlocks.forEach((block) => {
      if (block !== selectedGoalkeeper.gkBlock) disabledBlocks.add(block);
    });
  }

  function restoreAfterCsv() {
    const draft = safeRead("draft");
    if (!draft || draft.version !== STORAGE_VERSION || !draft.manager || !db[draft.manager]) {
      return false;
    }

    const team = db[draft.manager].players || [];
    if (team.length === 0) return false;

    const indexByPlayerId = new Map(
      team.map((player, index) => [getPlayerId(player), index])
    );

    isRestoring = true;

    try {
      currentManager = draft.manager;

      const managerSelect = document.getElementById("managerSelect");
      if (managerSelect) managerSelect.value = currentManager;

      const moduleSelect = document.getElementById("moduleSelect");
      if (moduleSelect && ALLOWED_MODULES.includes(draft.module)) {
        moduleSelect.value = draft.module;
      }

      const restoredSelection = Array.isArray(draft.selectedPlayerIds)
        ? draft.selectedPlayerIds
            .map((playerId) => indexByPlayerId.get(playerId))
            .filter((index) => Number.isInteger(index))
        : [];

      selectedPlayers = [...new Set(restoredSelection)];
      slotAssignments = {};

      if (draft.slotAssignments && typeof draft.slotAssignments === "object") {
        Object.entries(draft.slotAssignments).forEach(([slotKey, playerId]) => {
          const playerIndex = indexByPlayerId.get(playerId);
          if (Number.isInteger(playerIndex) && selectedPlayers.includes(playerIndex)) {
            slotAssignments[slotKey] = playerIndex;
          }
        });
      }

      switchStarterIndex = indexByPlayerId.get(draft.switch?.starterId);
      switchBenchIndex = indexByPlayerId.get(draft.switch?.benchId);

      if (!Number.isInteger(switchStarterIndex)) switchStarterIndex = null;
      if (!Number.isInteger(switchBenchIndex)) switchBenchIndex = null;

      switchPlus = Boolean(draft.switch?.plus);
      lastStarters = [];
      lastBench = [];

      rebuildDisabledBlocks(team);

      renderRoster();
      renderFormation();

      if (isMobile && typeof renderMobileSlots === "function") {
        renderMobileSlots();
      }

      if (typeof updateSwitchUI === "function") {
        updateSwitchUI();
      }

      return true;
    } catch (error) {
      console.warn("Lineup persistence restore failed", error);
      return false;
    } finally {
      isRestoring = false;
    }
  }

  function markCopied(text, format = "whatsapp") {
    const snapshot = getSnapshot();
    if (!snapshot) return;

    safeWrite("last-copied", {
      ...snapshot,
      outputText: text,
      outputFormat: format,
      copiedAt: new Date().toISOString()
    });
  }

  function setup() {
    if (initialized) return;
    initialized = true;

    document.addEventListener("change", queueDraftSave);
    document.addEventListener("click", () => window.setTimeout(queueDraftSave, 0));
    document.addEventListener("drop", () => window.setTimeout(queueDraftSave, 0));
    window.addEventListener("pagehide", saveDraft);
  }

  window.LineupPersistence = Object.freeze({
    setup,
    restoreAfterCsv,
    queueDraftSave,
    saveDraft,
    markCopied,
    getPlayerId
  });
})();
