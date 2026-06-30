/* OUTPUT - preview first; desktop copies explicitly, iOS selects text safely */

const OUTPUT_PROMPT = "Seleziona un’anteprima per copiare";

function buildLineupModel() {
  const model = window.FormationModel?.build();
  if (!model) return null;

  model.switchPair = window.LineupSwitch?.getPairForModel?.({
    team: model.team,
    starters: model.starters,
    bench: model.bench
  }) || null;

  return model;
}

function getGoalkeeperBenchLabels(model) {
  return Array.isArray(model?.goalkeeperBenchLabels) ? model.goalkeeperBenchLabels : [];
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
  const lines = [model.manager, `Modulo: ${model.module}`, "", "TITOLARI"];

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
    return format === "docs" ? buildDocsOutput(model) : buildWhatsAppOutput(model);
  } catch (error) {
    console.error("buildOutputText error:", error);
    return "Errore nella generazione del testo";
  }
}

let currentOutputFormat = null;
let outputPreviewChosen = false;

function isMobileOutput() {
  return window.matchMedia?.("(max-width: 767px)").matches ?? false;
}

function getFormatLabel(format) {
  return format === "docs" ? "Docs" : "WhatsApp";
}

function updateOutputActionState() {
  const selectButton = document.getElementById("selectAllOutputBtn");
  const copyButton = document.getElementById("copyPreviewBtn");
  const modal = document.getElementById("outputModal");

  [["copyWhatsAppBtn", "whatsapp"], ["copyDocsBtn", "docs"]].forEach(([id, format]) => {
    const button = document.getElementById(id);
    if (!button) return;
    const selected = currentOutputFormat === format && outputPreviewChosen;
    button.classList.toggle("is-preview-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  if (selectButton) selectButton.disabled = !outputPreviewChosen;
  if (copyButton) copyButton.disabled = !outputPreviewChosen;
  if (modal) modal.dataset.previewReady = outputPreviewChosen ? "true" : "false";
}

function showOutputPrompt() {
  const textarea = document.getElementById("outputText");
  if (textarea) {
    textarea.value = OUTPUT_PROMPT;
    textarea.classList.add("output-text--prompt");
  }
}

function updateOutputPreview(format) {
  currentOutputFormat = format;
  outputPreviewChosen = true;

  const textarea = document.getElementById("outputText");
  if (textarea) {
    textarea.value = buildOutputText(format);
    textarea.classList.remove("output-text--prompt");
  }
  updateOutputActionState();
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

  currentOutputFormat = null;
  outputPreviewChosen = false;
  showOutputPrompt();
  updateOutputActionState();
  toggleModal(true);
}

async function copyText(text, format) {
  if (!text) return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else if (!fallbackCopy(text)) {
      return;
    }

    window.LineupPersistence?.markCopied(text, format);
    showToast(`Formato ${getFormatLabel(format)} copiato!`, "success");
  } catch (error) {
    const copied = fallbackCopy(text);
    if (copied) window.LineupPersistence?.markCopied(text, format);
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
    showToast(copied ? "Formazione copiata!" : "Copia fallita", copied ? "success" : "error");
  } catch (error) {
    showToast("Errore durante la copia", "error");
  }

  document.body.removeChild(textarea);
  return copied;
}

function blurAction(button) {
  window.setTimeout(() => button?.blur(), 0);
}

function handleOutputAction(format, button) {
  // Preview never copies. Only the dedicated Copy / Seleziona tutto controls do that.
  updateOutputPreview(format);
  blurAction(button);
  return false;
}

function copyOutputPreview() {
  if (!outputPreviewChosen || !currentOutputFormat) {
    showToast(OUTPUT_PROMPT, "error");
    return;
  }
  copyText(buildOutputText(currentOutputFormat), currentOutputFormat);
}

function selectAllOutput() {
  if (!outputPreviewChosen || !currentOutputFormat) {
    showToast(OUTPUT_PROMPT, "error");
    return;
  }

  const textarea = document.getElementById("outputText");
  if (!textarea || !textarea.value) return;

  textarea.focus({ preventScroll: true });
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  showToast("Testo selezionato", "success");
}

function replaceAndBindOutputButton(id, handler) {
  const original = document.getElementById(id);
  if (!original) return null;

  const button = original.cloneNode(true);
  original.replaceWith(button);
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    handler(event, button);
  });
  return button;
}

document.getElementById("openModalBtn")?.addEventListener("click", openModal);
document.getElementById("fabCopy")?.addEventListener("click", openModal);
document.getElementById("closeModalBtn")?.addEventListener("click", closeModal);
replaceAndBindOutputButton("copyWhatsAppBtn", (event, button) => handleOutputAction("whatsapp", button));
replaceAndBindOutputButton("copyDocsBtn", (event, button) => handleOutputAction("docs", button));
replaceAndBindOutputButton("copyPreviewBtn", () => copyOutputPreview());
replaceAndBindOutputButton("selectAllOutputBtn", () => selectAllOutput());
