const roleOrder = { P: 0, D: 1, C: 2, A: 3 };

function buildOutputText() {
  try {
    if (!currentManager) return "";

    const module = document.getElementById("moduleSelect").value;
    const formattedModule = [...module].join("-"); // E.g., "433" -> "4-3-3"
    const team = db[currentManager].players;

    const assignedPlayers = {};
    const assignedBenchPlayers = {};

    // 1. Mappatura slot assegnati
    for (const [slotKey, playerIdx] of Object.entries(slotAssignments)) {
      if (selectedPlayers.includes(playerIdx)) {
        const player = team[playerIdx];
        if (slotKey.startsWith('starter-')) assignedPlayers[slotKey] = player;
        else if (slotKey.startsWith('bench-')) assignedBenchPlayers[slotKey] = player;
      }
    }

    const assignedIndices = new Set(Object.values(slotAssignments));
    const unassignedPlayers = selectedPlayers
      .filter(i => !assignedIndices.has(i) && i >= 0 && i < team.length)
      .map(i => team[i]);

    const starters = [];

    // 2. Gestione Titolari (Logica unificata per ruoli)
    const rolesConfig = [
      { key: 'GK', role: 'P', req: 1 },
      { key: 'D', role: 'D', req: parseInt(module[0], 10) },
      { key: 'C', role: 'C', req: parseInt(module[1], 10) },
      { key: 'A', role: 'A', req: parseInt(module[2], 10) }
    ];

    rolesConfig.forEach(({ key, role, req }) => {
      // Aggiungi quelli fissati manualmente negli slot
      for (let i = 1; i <= req; i++) {
        const p = assignedPlayers[`starter-${key}${key === 'GK' ? '1' : i}`];
        if (p) starters.push(p);
      }
      // Riempi i buchi con i non assegnati dello stesso ruolo
      const available = unassignedPlayers.filter(p => p.r === role);
      let currentRoleCount = starters.filter(p => p.r === role).length;
      
      for (let i = 0; currentRoleCount < req && i < available.length; i++) {
        starters.push(available[i]);
        currentRoleCount++;
      }
    });

    // 3. Gestione Panchina
    const bench = Object.values(assignedBenchPlayers);
    const remainingForBench = unassignedPlayers.filter(p => !starters.includes(p));
    bench.push(...remainingForBench);
    bench.sort((a, b) => roleOrder[a.r] - roleOrder[b.r]);

    const getSwitchSuffix = (player) => {
      const idx = team.indexOf(player);
      const isSwitch = (switchStarterIndex === idx && switchBenchIndex !== null) || 
                       (switchBenchIndex === idx && switchStarterIndex !== null);
      return isSwitch ? (switchPlus ? ' (s+)' : ' (s)') : '';
    };

    // 4. Costruzione Stringa
    let text = `⚽ **${currentManager.toUpperCase()}**\nMod: ${formattedModule}\n\nTITOLARI:\n`;
    starters.forEach(p => text += `- ${p.n}${getSwitchSuffix(p)}\n`);

    text += `\nPANCHINA:\n`;
    const gkStarter = starters.find(p => p.r === "P");
    
    if (gkStarter) {
      text += `- ${gkStarter.t || "Portiere"}\n`;
      if (gkStarter.gkBlock) {
        const otherBlock = team.find(p => 
          p.r === "P" && p.isGkBlock && p.gkBlock !== gkStarter.gkBlock && 
          !selectedPlayers.includes(team.indexOf(p))
        );
        if (otherBlock) text += `- ${otherBlock.t || "Portiere"}\n`;
      }
    }

    bench.filter(p => p.r !== "P").forEach(p => {
      text += `- ${p.n}${getSwitchSuffix(p)}\n`;
    });

    return text;
  } catch (e) {
    console.error("buildOutputText error:", e);
    return "Errore nella generazione del testo";
  }
}

// --- Gestione UI e Clipboard ---

const toggleModal = (show) => {
  const modal = document.getElementById("outputModal");
  modal.classList.toggle("show", show);
  modal.setAttribute("aria-hidden", !show);
  setModalOpen(show);
};

const openModal = () => {
  if (!currentManager) return showToast("Seleziona una squadra prima", "error");
  document.getElementById("outputText").value = buildOutputText();
  toggleModal(true);
};

document.getElementById("openModalBtn").addEventListener("click", openModal);
document.getElementById("fabCopy").addEventListener("click", openModal);
document.getElementById("closeModalBtn").addEventListener("click", () => toggleModal(false));

document.getElementById("copyModalBtn").addEventListener("click", async () => {
  const txt = document.getElementById("outputText").value;
  try {
    await navigator.clipboard.writeText(txt);
    showToast("Formazione copiata!", "success");
  } catch (err) {
    fallbackCopy(txt);
  }
});

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  Object.assign(textarea.style, { position: 'fixed', opacity: '0' });
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const success = document.execCommand('copy');
    if(success) window.LineupPersistence?.markCopied(text);
    showToast(success ? "Formazione copiata!" : "Copia fallita", success ? "success" : "error");
  } catch (err) {
    showToast("Errore durante la copia", "error");
  }
  document.body.removeChild(textarea);
}
