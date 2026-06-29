/* LINEUP STORY — 9:16 canvas preview, share, copy image and save */

window.LineupStory = (function () {
  const WIDTH = 1080;
  const HEIGHT = 1920;
  const PITCH = { x: 70, y: 318, width: 940, height: 1020 };
  const ROLE_COLORS = Object.freeze({
    P: { fill: "#f6c84c", ink: "#604800" },
    D: { fill: "#5b8ff9", ink: "#ffffff" },
    C: { fill: "#45be72", ink: "#ffffff" },
    A: { fill: "#ee5a63", ink: "#ffffff" }
  });

  let currentBlob = null;
  let currentUrl = null;
  let currentFileName = "formazione-lineup.png";

  function leagueConfig() {
    return window.LINEUP_FANTA?.league || {
      name: "Lineup Fanta",
      label: "Lineup Fanta",
      flag: "⚽",
      theme: { primary: "#7c3aed", primaryLight: "#a855f7" }
    };
  }

  function storyModel() {
    const model = window.FormationModel?.build?.();
    if (!model) return null;

    model.switchPair = window.LineupSwitch?.getPairForModel?.({
      team: model.team,
      starters: model.starters,
      bench: model.bench
    }) || null;

    return model;
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function fillRounded(ctx, x, y, width, height, radius, fill, stroke = null, lineWidth = 1) {
    roundRect(ctx, x, y, width, height, radius);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  }

  function font(ctx, weight, size, family = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif") {
    ctx.font = `${weight} ${size}px ${family}`;
  }

  function textWidth(ctx, text) {
    return ctx.measureText(String(text || "")).width;
  }

  function fitFont(ctx, text, maxWidth, start, min, weight = 800) {
    let size = start;
    while (size > min) {
      font(ctx, weight, size);
      if (textWidth(ctx, text) <= maxWidth) break;
      size -= 1;
    }
    return size;
  }

  function wrapWords(ctx, text, maxWidth, maxLines = 2) {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];

    const lines = [];
    let line = "";

    words.forEach((word) => {
      const next = line ? `${line} ${word}` : word;
      if (textWidth(ctx, next) <= maxWidth || !line) {
        line = next;
        return;
      }
      if (lines.length < maxLines - 1) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    });

    if (line) lines.push(line);
    return lines.slice(0, maxLines);
  }

  function centeredText(ctx, text, x, y, options = {}) {
    const { size = 28, weight = 700, color = "#fff", maxWidth = null } = options;
    const usedSize = maxWidth ? fitFont(ctx, text, maxWidth, size, Math.max(12, size - 12), weight) : size;
    font(ctx, weight, usedSize);
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    return usedSize;
  }

  function drawPitch(ctx) {
    const gradient = ctx.createLinearGradient(PITCH.x, PITCH.y, PITCH.x, PITCH.y + PITCH.height);
    gradient.addColorStop(0, "#397a65");
    gradient.addColorStop(.52, "#28604f");
    gradient.addColorStop(1, "#174437");

    fillRounded(ctx, PITCH.x, PITCH.y, PITCH.width, PITCH.height, 38, gradient, "rgba(255,255,255,.26)", 3);

    ctx.save();
    roundRect(ctx, PITCH.x, PITCH.y, PITCH.width, PITCH.height, 38);
    ctx.clip();

    ctx.fillStyle = "rgba(255,255,255,.035)";
    for (let row = 0; row < 12; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        if ((row + col) % 2 === 0) ctx.fillRect(PITCH.x + col * 94, PITCH.y + row * 85, 94, 85);
      }
    }

    ctx.strokeStyle = "rgba(241,255,249,.44)";
    ctx.lineWidth = 3;
    ctx.strokeRect(PITCH.x + 28, PITCH.y + 28, PITCH.width - 56, PITCH.height - 56);

    ctx.beginPath();
    ctx.moveTo(PITCH.x + 28, PITCH.y + PITCH.height / 2);
    ctx.lineTo(PITCH.x + PITCH.width - 28, PITCH.y + PITCH.height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(PITCH.x + PITCH.width / 2, PITCH.y + PITCH.height / 2, 92, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeRect(PITCH.x + 235, PITCH.y + 28, 470, 132);
    ctx.strokeRect(PITCH.x + 235, PITCH.y + PITCH.height - 160, 470, 132);
    ctx.restore();
  }

  function drawShirt(ctx, { x, y, width, height, player, role }) {
    const selected = Boolean(player && !player.isTeamLabel);
    const roleStyle = ROLE_COLORS[role] || ROLE_COLORS.C;

    ctx.save();
    const kitGradient = ctx.createLinearGradient(x, y, x + width, y + height);
    kitGradient.addColorStop(0, "rgba(151, 92, 246, .96)");
    kitGradient.addColorStop(1, "rgba(92, 45, 167, .96)");

    fillRounded(
      ctx,
      x,
      y,
      width,
      height,
      22,
      selected ? kitGradient : "rgba(9,57,43,.37)",
      selected ? "rgba(255,255,255,.72)" : "rgba(242,255,248,.52)",
      2
    );

    ctx.fillStyle = selected ? kitGradient : "rgba(9,57,43,.37)";
    fillRounded(ctx, x - 12, y + 20, 24, 45, 11, ctx.fillStyle);
    fillRounded(ctx, x + width - 12, y + 20, 24, 45, 11, ctx.fillStyle);

    fillRounded(ctx, x + width / 2 - 19, y + 14, 38, 32, 16, roleStyle.fill);
    centeredText(ctx, role, x + width / 2, y + 30, { size: 18, weight: 900, color: roleStyle.ink });

    const name = selected ? player.n || "Giocatore" : "Scegli";
    const team = selected ? player.t || "" : "";
    const nameSize = fitFont(ctx, name, width - 22, 23, 15, 850);
    font(ctx, 850, nameSize);
    const nameLines = wrapWords(ctx, name, width - 20, 2);
    const lineHeight = nameSize * 1.08;
    const nameStart = y + 69 - ((nameLines.length - 1) * lineHeight) / 2;

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    nameLines.forEach((line, index) => ctx.fillText(line, x + width / 2, nameStart + index * lineHeight));

    if (team) {
      const teamSize = fitFont(ctx, team, width - 20, 15, 11, 650);
      font(ctx, 650, teamSize);
      ctx.fillStyle = "rgba(255,255,255,.78)";

      // Keep the team close to the final line of the player's name,
      // whether the name uses one or two rows.
      const lastNameLineY = nameStart + (nameLines.length - 1) * lineHeight;
      const teamY = lastNameLineY + 27;
      ctx.fillText(team, x + width / 2, teamY);
    }
    ctx.restore();
  }

  function drawStarterRows(ctx, model) {
    const byRole = { P: [], D: [], C: [], A: [] };
    model.definitions.starter.forEach((definition) => {
      byRole[definition.role].push({
        role: definition.role,
        player: model.slots.starter[definition.id]?.player || null
      });
    });

    const rows = [
      { role: "A", y: PITCH.y + 132 },
      { role: "C", y: PITCH.y + 357 },
      { role: "D", y: PITCH.y + 590 },
      { role: "P", y: PITCH.y + 810 }
    ];

    rows.forEach(({ role, y }) => {
      const entries = byRole[role];
      if (!entries.length) return;

      const gap = 22;
      const maxWidth = 164;
      const available = PITCH.width - 122;
      const width = Math.min(maxWidth, Math.floor((available - gap * (entries.length - 1)) / entries.length));
      const height = role === "P" ? 136 : 142;
      const rowWidth = entries.length * width + (entries.length - 1) * gap;
      let x = PITCH.x + (PITCH.width - rowWidth) / 2;

      entries.forEach((entry) => {
        drawShirt(ctx, { x, y, width, height, player: entry.player, role });
        x += width + gap;
      });
    });
  }

  function drawBenchCard(ctx, { x, y, width, height, role, player }) {
    const active = Boolean(player && !player.isTeamLabel);
    fillRounded(ctx, x, y, width, height, 13, active ? "rgba(255,255,255,.95)" : "rgba(209,225,218,.28)", "rgba(255,255,255,.22)", 1);
    fillRounded(ctx, x + 11, y + 11, 30, height - 22, 9, ROLE_COLORS[role]?.fill || "#b4c9c0");
    centeredText(ctx, role, x + 26, y + height / 2, { size: 15, weight: 900, color: ROLE_COLORS[role]?.ink || "#173d32" });

    const name = player?.n || "—";
    const max = width - 62;
    const size = fitFont(ctx, name, max, 18, 12, 800);
    font(ctx, 800, size);
    ctx.fillStyle = active ? "#173d32" : "rgba(23,61,50,.55)";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(name, x + 52, y + height / 2 - (player?.t ? 8 : 0));

    if (player?.t && !player.isTeamLabel) {
      const teamSize = fitFont(ctx, player.t, max, 12, 9, 650);
      font(ctx, 650, teamSize);
      ctx.fillStyle = "#71877e";
      ctx.fillText(player.t, x + 52, y + height / 2 + 12);
    }
  }

  function drawBench(ctx, model) {
    const titleY = 1462;
    centeredText(ctx, "PANCHINA", WIDTH / 2, titleY, { size: 20, weight: 900, color: "rgba(237,255,246,.76)" });

    const keeperDefs = model.definitions.bench.filter((definition) => definition.role === "P");
    const keepers = keeperDefs.map((definition) => window.FormationModel.getBenchDisplayEntry(model, definition)?.player || null);
    const keeperWidth = 310;
    const keeperHeight = 58;
    const keeperGap = 18;
    const keeperX = (WIDTH - (keeperWidth * 2 + keeperGap)) / 2;
    keepers.forEach((player, index) => {
      drawBenchCard(ctx, { x: keeperX + index * (keeperWidth + keeperGap), y: 1494, width: keeperWidth, height: keeperHeight, role: "P", player });
    });

    const columns = ["D", "C", "A"];
    const cardWidth = 265;
    const cardHeight = 54;
    const colGap = 24;
    const startX = (WIDTH - (cardWidth * 3 + colGap * 2)) / 2;

    columns.forEach((role, columnIndex) => {
      const definitions = model.definitions.bench.filter((definition) => definition.role === role);
      definitions.forEach((definition, rowIndex) => {
        const player = window.FormationModel.getBenchDisplayEntry(model, definition)?.player || null;
        drawBenchCard(ctx, {
          x: startX + columnIndex * (cardWidth + colGap),
          y: 1572 + rowIndex * 63,
          width: cardWidth,
          height: cardHeight,
          role,
          player
        });
      });
    });
  }

  function drawSwitch(ctx, pair) {
    if (!pair) return;
    const y = 1370;
    fillRounded(ctx, 130, y, 820, 66, 26, "rgba(255,255,255,.09)", "rgba(255,255,255,.16)", 1);
    const type = pair.type === "plus" ? "SWITCH PLUS" : "SWITCH BASE";
    centeredText(ctx, type, WIDTH / 2, y + 17, { size: 15, weight: 900, color: "rgba(223,255,237,.76)" });
    centeredText(ctx, `${pair.starter.n}  ↔  ${pair.bench.n}`, WIDTH / 2, y + 44, { size: 19, weight: 850, color: "#ffffff", maxWidth: 760 });
  }

  function drawHeader(ctx, model) {
    const league = leagueConfig();
    const accent = league.theme?.primaryLight || "#a855f7";
    const headingGradient = ctx.createLinearGradient(0, 0, WIDTH, 220);
    headingGradient.addColorStop(0, "#121d19");
    headingGradient.addColorStop(1, "#1a2521");
    fillRounded(ctx, 40, 38, WIDTH - 80, 230, 38, headingGradient, "rgba(255,255,255,.10)", 1);

    font(ctx, 850, 19);
    ctx.fillStyle = accent;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("LINEUP FANTA", WIDTH / 2, 86);

    centeredText(ctx, league.name || league.label || "Lineup Fanta", WIDTH / 2, 132, {
      size: 44,
      weight: 900,
      color: "#ffffff",
      maxWidth: 880
    });

    centeredText(ctx, "FORMAZIONE", WIDTH / 2, 177, {
      size: 20,
      weight: 850,
      color: "rgba(232,255,242,.70)"
    });

    fillRounded(ctx, 82, 210, 916, 58, 24, "rgba(255,255,255,.08)");
    centeredText(ctx, `${model.manager.toUpperCase()}  ·  ${model.module}`, WIDTH / 2, 239, {
      size: 23,
      weight: 850,
      color: "#ffffff",
      maxWidth: 840
    });
  }

  function drawFooter(ctx) {
    const now = new Intl.DateTimeFormat("it-IT", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());

    centeredText(ctx, "GENERATA CON LINEUP FANTA", WIDTH / 2, 1824, {
      size: 16,
      weight: 900,
      color: "rgba(229,255,240,.54)"
    });
    centeredText(ctx, now, WIDTH / 2, 1854, {
      size: 14,
      weight: 700,
      color: "rgba(229,255,240,.36)"
    });
  }

  function renderCanvas(model) {
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext("2d");

    const background = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    background.addColorStop(0, "#101714");
    background.addColorStop(.48, "#182622");
    background.addColorStop(1, "#0d1412");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "rgba(103, 194, 151, .08)";
    ctx.beginPath();
    ctx.arc(90, 120, 280, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1000, 1730, 330, 0, Math.PI * 2);
    ctx.fill();

    drawHeader(ctx, model);
    drawPitch(ctx);
    drawStarterRows(ctx, model);
    drawSwitch(ctx, model.switchPair);
    drawBench(ctx, model);
    drawFooter(ctx);

    return canvas;
  }

  function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Impossibile generare l'immagine"));
      }, "image/png");
    });
  }

  function safeFileName(model) {
    const league = String(leagueConfig().id || "lineup").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const manager = String(model.manager || "formazione").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    return `${league}-${manager}-formazione.png`;
  }

  function setStoryModal(show) {
    const modal = document.getElementById("storyModal");
    if (!modal) return;
    modal.classList.toggle("show", show);
    modal.setAttribute("aria-hidden", String(!show));
    setModalOpen(show);
  }

  function updateStoryActions(ready) {
    ["shareStoryBtn", "copyStoryBtn", "saveStoryBtn"].forEach((id) => {
      const button = document.getElementById(id);
      if (button) button.disabled = !ready;
    });
  }

  async function open() {
    const model = storyModel();
    if (!model || !model.manager) {
      showToast("Seleziona una squadra prima", "error");
      return;
    }

    const outputModal = document.getElementById("outputModal");
    outputModal?.classList.remove("show");
    outputModal?.setAttribute("aria-hidden", "true");

    const preview = document.getElementById("storyPreviewImage");
    const status = document.getElementById("storyStatus");
    if (preview) preview.removeAttribute("src");
    if (status) status.textContent = "Creo la tua grafica…";
    updateStoryActions(false);
    setStoryModal(true);

    try {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const canvas = renderCanvas(model);
      const blob = await canvasToBlob(canvas);

      if (currentUrl) URL.revokeObjectURL(currentUrl);
      currentBlob = blob;
      currentUrl = URL.createObjectURL(blob);
      currentFileName = safeFileName(model);

      if (preview) preview.src = currentUrl;
      if (status) status.textContent = "Anteprima pronta";
      updateStoryActions(true);
    } catch (error) {
      console.error("Story generation error:", error);
      if (status) status.textContent = "Non sono riuscito a generare la grafica";
      showToast("Errore nella generazione della grafica", "error");
    }
  }

  function close() {
    setStoryModal(false);
  }

  function storyFile() {
    return currentBlob ? new File([currentBlob], currentFileName, { type: "image/png" }) : null;
  }

  function download() {
    if (!currentBlob) return;
    const link = document.createElement("a");
    link.href = currentUrl || URL.createObjectURL(currentBlob);
    link.download = currentFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("Immagine pronta per il salvataggio", "success");
  }

  async function share() {
    const file = storyFile();
    if (!file) return;

    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({
          title: "Formazione Lineup Fanta",
          text: "Formazione creata con Lineup Fanta",
          files: [file]
        });
        return;
      }
      download();
    } catch (error) {
      if (error?.name !== "AbortError") showToast("Condivisione non disponibile", "error");
    }
  }

  async function copyImage() {
    if (!currentBlob) return;

    if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
      showToast("Copia immagine non supportata qui: usa Condividi o Salva", "error");
      return;
    }

    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": currentBlob })
      ]);
      showToast("Immagine copiata", "success");
    } catch (error) {
      showToast("Copia immagine non disponibile: usa Condividi o Salva", "error");
    }
  }

  function bind() {
    document.getElementById("openStoryBtn")?.addEventListener("click", open);
    document.getElementById("closeStoryBtn")?.addEventListener("click", close);
    document.getElementById("shareStoryBtn")?.addEventListener("click", share);
    document.getElementById("copyStoryBtn")?.addEventListener("click", copyImage);
    document.getElementById("saveStoryBtn")?.addEventListener("click", download);

    document.getElementById("storyModal")?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) close();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  bind();

  return Object.freeze({ open, close });
})();
