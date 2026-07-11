// Lineup Fanta matchday snapshot controls for /fp/admin-links and /pd/admin-links.
(() => {
  "use strict";

  const leagueId = location.pathname.startsWith("/pd/") ? "pd" : "fp";
  const list = document.getElementById("matchdayList");
  if (!list) return;

  const state = { statuses: new Map(), observer: null };

  function post(payload) {
    return fetch("/api/admin-links", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leagueId, ...payload })
    }).then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
      return data;
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("it-IT");
  }

  function dayFromRow(row) {
    return Number(row.querySelector("input[data-fantasy-matchday]")?.dataset.fantasyMatchday);
  }

  function sourceUrlFromRow(row) {
    return String(row.querySelector("input[data-fantasy-matchday]")?.value || "").trim();
  }

  function setBusy(panel, busy) {
    panel.querySelectorAll("button").forEach((button) => { button.disabled = busy; });
    panel.classList.toggle("is-busy", busy);
  }

  function renderStatus(panel, status) {
    const node = panel.querySelector("[data-snapshot-status]");
    if (!status?.exists) {
      node.textContent = "Nessuna fotografia salvata.";
      return;
    }
    const stats = status.stats || {};
    node.innerHTML = `
      <strong>${escapeHtml(status.season || "Stagione sconosciuta")}</strong>
      · aggiornata ${escapeHtml(formatDate(status.syncedAt))}
      · ${Number(stats.matches || 0)} partite
      · ${Number(stats.resolved || 0)}/${Number(stats.players || 0)} ruoli riconosciuti
      ${Number(stats.unresolved || 0) ? `<span class="snapshot-warning">· ${Number(stats.unresolved)} da controllare</span>` : ""}
    `;
  }

  async function refreshStatus(row, panel) {
    const day = dayFromRow(row);
    if (!day) return null;
    const data = await post({ action: "snapshot-status", day });
    state.statuses.set(day, data.status);
    renderStatus(panel, data.status);
    return data.status;
  }

  async function sync(row, panel) {
    const day = dayFromRow(row);
    const sourceUrl = sourceUrlFromRow(row);
    if (!/^https?:\/\//i.test(sourceUrl)) throw new Error("Inserisci prima un URL valido del Google Docs");
    if (document.getElementById("dirtyIndicator")?.classList.contains("is-dirty")) {
      throw new Error("Salva prima le modifiche ai link, poi sincronizza la giornata");
    }
    const data = await post({
      action: "snapshot-sync",
      day,
      sourceUrl
    });
    state.statuses.set(day, data.status);
    renderStatus(panel, data.status);
  }

  function flattenPlayers(status) {
    const rows = [];
    const baseMatches = status?.snapshot?.parsed?.matches || [];
    const effectiveMatches = status?.effective?.matches || [];
    effectiveMatches.forEach((match, matchIndex) => {
      ["home", "away"].forEach((side) => {
        const team = match?.[side];
        const baseTeam = baseMatches?.[matchIndex]?.[side];
        ["starters", "bench"].forEach((section) => {
          (team?.[section] || []).forEach((player, playerIndex) => {
            const basePlayer = baseTeam?.[section]?.[playerIndex] || {};
            rows.push({
              key: player.identityKey || player.snapshotKey,
              team: team.team,
              section,
              rawName: player.name || player.raw,
              identity: player.identity || {},
              baseIdentity: basePlayer.identity || {}
            });
          });
        });
      });
    });
    return rows.filter((row) => row.key);
  }

  function createDialog() {
    let dialog = document.getElementById("snapshotEditorDialog");
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.id = "snapshotEditorDialog";
    dialog.className = "snapshot-editor";
    dialog.innerHTML = `
      <form method="dialog" class="snapshot-editor__shell">
        <header class="snapshot-editor__header">
          <div>
            <p class="eyebrow">Fotografia storica</p>
            <h2 data-editor-title>Modifica identità</h2>
          </div>
          <button type="button" class="snapshot-editor__close" data-editor-close aria-label="Chiudi">×</button>
        </header>
        <p class="snapshot-editor__help">Qui correggi solo nome, ruolo e squadra reale. Voti, titolari e panchina continuano ad aggiornarsi dal Google Docs.</p>
        <div class="snapshot-editor__table-wrap">
          <table class="snapshot-editor__table">
            <thead><tr><th>Fantasquadra</th><th>Pos.</th><th>Dal Docs</th><th>Nome</th><th>Ruolo</th><th>Squadra reale</th></tr></thead>
            <tbody data-editor-body></tbody>
          </table>
        </div>
        <footer class="snapshot-editor__footer">
          <span data-editor-message></span>
          <button type="button" class="secondary" data-editor-cancel>Annulla</button>
          <button type="button" class="primary" data-editor-save>Salva correzioni</button>
        </footer>
      </form>`;
    document.body.appendChild(dialog);
    dialog.querySelector("[data-editor-close]").addEventListener("click", () => dialog.close());
    dialog.querySelector("[data-editor-cancel]").addEventListener("click", () => dialog.close());
    return dialog;
  }

  function openEditor(row, panel) {
    const day = dayFromRow(row);
    const status = state.statuses.get(day);
    if (!status?.exists) return;
    const dialog = createDialog();
    const players = flattenPlayers(status);
    dialog.dataset.day = String(day);
    dialog.querySelector("[data-editor-title]").textContent = `Giornata ${day} · ${status.season}`;
    dialog.querySelector("[data-editor-message]").textContent = `${players.length} calciatori`;
    const body = dialog.querySelector("[data-editor-body]");
    body.innerHTML = players.map((player) => {
      const identity = player.identity || {};
      const base = player.baseIdentity || {};
      return `<tr data-snapshot-key="${escapeHtml(player.key)}"
        data-base-name="${escapeHtml(base.displayName || "")}"
        data-base-role="${escapeHtml(base.role || "")}"
        data-base-team="${escapeHtml(base.realTeam || "")}">
        <td>${escapeHtml(player.team)}</td>
        <td>${player.section === "starters" ? "T" : "P"}</td>
        <td>${escapeHtml(player.rawName)}</td>
        <td><input data-field="displayName" value="${escapeHtml(identity.displayName || player.rawName)}"></td>
        <td><select data-field="role">
          ${["", "P", "D", "C", "A"].map((role) => `<option value="${role}" ${String(identity.role || "").toUpperCase() === role ? "selected" : ""}>${role || "—"}</option>`).join("")}
        </select></td>
        <td><input data-field="realTeam" value="${escapeHtml(identity.realTeam || "")}"></td>
      </tr>`;
    }).join("");

    dialog.querySelector("[data-editor-save]").onclick = async () => {
      const saveButton = dialog.querySelector("[data-editor-save]");
      const message = dialog.querySelector("[data-editor-message]");
      saveButton.disabled = true;
      try {
        const overrides = {};
        body.querySelectorAll("tr[data-snapshot-key]").forEach((tableRow) => {
          const displayName = tableRow.querySelector('[data-field="displayName"]').value.trim();
          const role = tableRow.querySelector('[data-field="role"]').value.trim();
          const realTeam = tableRow.querySelector('[data-field="realTeam"]').value.trim();
          const override = {};
          if (displayName !== tableRow.dataset.baseName) override.displayName = displayName;
          if (role !== tableRow.dataset.baseRole) override.role = role;
          if (realTeam !== tableRow.dataset.baseTeam) override.realTeam = realTeam;
          if (Object.keys(override).length) overrides[tableRow.dataset.snapshotKey] = override;
        });
        const data = await post({ action: "snapshot-overrides", day, overrides });
        state.statuses.set(day, data.status);
        renderStatus(panel, data.status);
        message.textContent = "Correzioni salvate.";
        dialog.close();
      } catch (error) {
        message.textContent = error.message;
      } finally {
        saveButton.disabled = false;
      }
    };

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function decorateRow(row) {
    if (row.dataset.snapshotDecorated === "1") return;
    const input = row.querySelector("input[data-fantasy-matchday]");
    if (!input) return;
    row.dataset.snapshotDecorated = "1";
    const panel = document.createElement("div");
    panel.className = "matchday-snapshot-controls";
    panel.innerHTML = `
      <div class="matchday-snapshot-status" data-snapshot-status>Fotografia non caricata.</div>
      <div class="matchday-snapshot-actions">
        <button type="button" class="secondary" data-sync-snapshot>Sincronizza dal Docs</button>
        <button type="button" class="secondary" data-edit-snapshot>Modifica identità</button>
      </div>`;
    row.appendChild(panel);
    panel.querySelector("[data-sync-snapshot]").addEventListener("click", async () => {
      setBusy(panel, true);
      try { await sync(row, panel); }
      catch (error) { panel.querySelector("[data-snapshot-status]").textContent = error.message; }
      finally { setBusy(panel, false); }
    });
    panel.querySelector("[data-edit-snapshot]").addEventListener("click", async () => {
      setBusy(panel, true);
      try {
        const day = dayFromRow(row);
        const status = state.statuses.get(day) || await refreshStatus(row, panel);
        if (!status?.exists) throw new Error("Prima sincronizza questa giornata dal Docs");
        openEditor(row, panel);
      } catch (error) {
        panel.querySelector("[data-snapshot-status]").textContent = error.message;
      } finally {
        setBusy(panel, false);
      }
    });
  }

  function decorateAll() {
    list.querySelectorAll(".admin-link-row").forEach(decorateRow);
  }

  state.observer = new MutationObserver(decorateAll);
  state.observer.observe(list, { childList: true, subtree: true });
  decorateAll();
})();
