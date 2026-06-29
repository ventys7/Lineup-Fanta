/* OUTPUT - WhatsApp and Docs formats */

const roleOrder = { P: 0, D: 1, C: 2, A: 3 };

function buildLineupModel() {
  if (!currentManager || !db[currentManager]) return null;

  const module = document.getElementById("moduleSelect")?.value || "433";
  const team = db[currentManager].players || [];
  const selectedSet = new Set(selectedPlayers);
  const assignedStarters = {};
  const assignedBench = {};

  Object.entries(slotAssignments).forEach(([slotKey, playerIndex]) => {
    if (!selectedSet.has(playerIndex) || !team[playerIndex]) return;

    const entry = { index: playerIndex, player: team[playerIndex] };
    if (slotKey.startsWith("starter-")) assignedStarters[slotKey] = entry;
    if (slotKey.startsWith("bench-")) assignedBench[slotKey] = entry;
  });

  const assignedIndices = new Set(Object.values(slotAssignments));
  const unassigned = selectedPlayers
    .filter((index) => !assignedIndices.has(index) && Number.isInteger(index) && team[index])
    .map((index) => ({ index, player: team[index] }));

  const starters = [];
  const starterIndices = new Set();

  const rolesConfig = [
    { key: "GK", role: "P", req: 1 },
    { key: "D", role: "D", req: Number.parseInt(module[0], 10) },
    { key: "C", role: "C", req: Number.parseInt(module[1], 10) },
    { key: "A", role: "A", req: Number.parseInt(module[2], 10) }
  ];

  rolesConfig.forEach(({ key, role, req }) => {
    for (let position = 1; position <= req; position += 1) {
      const slotId = `starter-${key}${key === "GK" ? "1" : position}`;
      const entry = assignedStarters[slotId];

      if (entry && !starterIndices.has(entry.index)) {
        starters.push(entry);
        starterIndices.add(entry.index);
      }
    }

    const available = unassigned.filter(
      (entry) => entry.player.r === role && !starterIndices.has(entry.index)
    );

    let currentRoleCount = starters.filter((entry) => entry.player.r === role).length;

    for (const entry of available) {
      if (currentRoleCount >= req) break;
      starters.push(entry);
      starterIndices.add(entry.index);
      currentRoleCount += 1;
    }
  });

  const bench = [];
  const benchIndices = new Set();

  Object.values(assignedBench).forEach((entry) => {
    if (!starterIndices.has(entry.index) && !benchIndices.has(entry.index)) {
      bench.push(entry);
      benchIndices.add(entry.index);
    }
  });

  unassigned.forEach((entry) => {
    if (!starterIndices.has(entry.index) && !benchIndices.has(entry.index)) {
      bench.push(entry);
      benchIndices.add(entry.index);
    }
  });

  bench.sort((left, right) => {
    const roleDifference = roleOrder[left.player.r] - roleOrder[right.player.r];
    return roleDifference || left.player.n.localeCompare(right.player.n, "it");
  });

  const switchIsComplete =
    Number.isInteger(switchStarterIndex) &&
    Number.isInteger(switchBenchIndex) &&
    switchStarterIndex !== switchBenchIndex &&
    team[switchStarterIndex] &&
    team[switchBenchIndex];

  const switchPair = switchIsComplete
    ? {
        starterIndex: switchStarterIndex,
        benchIndex: switchBenchIndex,
        starter: team[switchStarterIndex],
        bench: team[switchBenchIndex],
        type: switchPlus ? "plus" : "base"
      }
    : null;

  return {
    manager: currentManager,
    module: [...module].join("-"),
    team,
    starters,
    bench,
    switchPair
  };
}

function getGoalkeeperBenchLabels(model) {
  const starterGoalkeeper = model.starters.find((entry) => entry.player.r === "P");
  if (!starterGoalkeeper) return [];

  const labels = [starterGoalkeeper.player.t || "Portiere"];

  if (starterGoalkeeper.player.gkBlock) {
    const otherBlock = model.team.find(
      (player, index) =>
        player.r === "P" &&
        player.isGkBlock &&
        player.gkBlock !== starterGoalkeeper.player.gkBlock &&
        !selectedPlayers.includes(index)
    );

    if (otherBlock) labels.push(otherBlock.t || "Portiere");
  }

  return labels;
}

function buildWhatsAppOutput(model) {
  const lines = [
    `⚽ *${model.manager.toUpperCase()}*`,
    `Modulo: ${model.module}`,
    "",
    "*TITOLARI*"
  ];

  model.starters.forEach((entry) => lines.push(`- ${entry.player.n}`));

  lines.push("", "*PANCHINA*");
  getGoalkeeperBenchLabels(model).forEach((label) => lines.push(`- ${label}`));
  model.bench
    .filter((entry) => entry.player.r !== "P")
    .forEach((entry) => lines.push(`- ${entry.player.n}`));

  if (model.switchPair) {
    const switchLabel = model.switchPair.type === "plus" ? "SWITCH PLUS" : "SWITCH BASE";
    lines.push("", `*${switchLabel}*`);
    lines.push(`${model.switchPair.starter.n} ↔ ${model.switchPair.bench.n}`);
  }

  return lines.join("\n");
}

function getDocsSwitchSuffix(model, playerIndex) {
  if (!model.switchPair) return "";

  const isSelectedForSwitch =
    playerIndex === model.switchPair.starterIndex ||
    playerIndex === model.switchPair.benchIndex;

  if (!isSelectedForSwitch) return "";
  return model.switchPair.type === "plus" ? " (s+)" : " (s)";
}

function buildDocsOutput(model) {
  const lines = [
    model.manager,
    `Modulo: ${model.module}`,
    "",
    "TITOLARI"
  ];

  model.starters.forEach((entry) => {
    lines.push(`- ${entry.player.n}${getDocsSwitchSuffix(model, entry.index)}`);
  });

  lines.push("", "PANCHINA");
  getGoalkeeperBenchLabels(model).forEach((label) => lines.push(`- ${label}`));
  model.bench
    .filter((entry) => entry.player.r !== "P")
    .forEach((entry) => {
      lines.push(`- ${entry.player.n}${getDocsSwitchSuffix(model, entry.index)}`);
    });

  return lines.join("\n");
}

function buildOutputText(format = "whatsapp") {
  try {
    const model = buildLineupModel();
    if (!model) return "";

    return format === "docs"
      ? buildDocsOutput(model)
      : buildWhatsAppOutput(model);
  } catch (error) {
    console.error("buildOutputText error:", error);
    return "Errore nella generazione del testo";
  }
}

let currentOutputFormat = "whatsapp";

function getFormatLabel(format) {
  return format === "docs" ? "Docs" : "WhatsApp";
}

function updateOutputPreview(format = currentOutputFormat) {
  currentOutputFormat = format;

  const textarea = document.getElementById("outputText");
  const formatLabel = document.getElementById("outputFormatLabel");

  if (textarea) textarea.value = buildOutputText(format);
  if (formatLabel) formatLabel.textContent = `Anteprima ${getFormatLabel(format)}`;
}

function toggleModal(show) {
  const modal = document.getElementById("outputModal");
  if (!modal) return;

  modal.classList.toggle("show", show);
  modal.setAttribute("aria-hidden", String(!show));
  setModalOpen(show);
}

function closeModal() {
  toggleModal(false);
}

function openModal() {
  if (!currentManager) {
    showToast("Seleziona una squadra prima", "error");
    return;
  }

  updateOutputPreview("whatsapp");
  toggleModal(true);
}

async function copyText(text, format) {
  if (!text) return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const copied = fallbackCopy(text);
      if (!copied) return;
    }

    window.LineupPersistence?.markCopied(text, format);
    showToast(`Formato ${getFormatLabel(format)} copiato!`, "success");
  } catch (error) {
    const copied = fallbackCopy(text);
    if (copied) {
      window.LineupPersistence?.markCopied(text, format);
    }
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  Object.assign(textarea.style, {
    position: "fixed",
    opacity: "0",
    pointerEvents: "none"
  });

  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
    showToast(
      copied ? "Formazione copiata!" : "Copia fallita",
      copied ? "success" : "error"
    );
  } catch (error) {
    showToast("Errore durante la copia", "error");
  }

  document.body.removeChild(textarea);
  return copied;
}

document.getElementById("openModalBtn")?.addEventListener("click", openModal);
document.getElementById("fabCopy")?.addEventListener("click", openModal);
document.getElementById("closeModalBtn")?.addEventListener("click", closeModal);

document.getElementById("copyWhatsAppBtn")?.addEventListener("click", () => {
  const text = buildOutputText("whatsapp");
  updateOutputPreview("whatsapp");
  copyText(text, "whatsapp");
});

document.getElementById("copyDocsBtn")?.addEventListener("click", () => {
  const text = buildOutputText("docs");
  updateOutputPreview("docs");
  copyText(text, "docs");
});
