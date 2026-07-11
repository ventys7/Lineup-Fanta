(function () {
  "use strict";

  const root = document.documentElement;
  const leagueId = root.dataset.leagueId === "pd" ? "pd" : "fp";
  const competitionLabel = leagueId === "pd" ? "Liga" : "Premier League";

  const elements = {
    title: document.getElementById("adminTitle"),
    back: document.getElementById("adminBack"),
    logout: document.getElementById("adminLogout"),
    login: document.getElementById("adminLogin"),
    loginForm: document.getElementById("adminLoginForm"),
    password: document.getElementById("adminPassword"),
    loginButton: document.getElementById("adminLoginButton"),
    workspace: document.getElementById("adminWorkspace"),
    activeSelect: document.getElementById("activeMatchday"),
    matchdayList: document.getElementById("matchdayList"),
    logoList: document.getElementById("teamLogoList"),
    saveButton: document.getElementById("saveAdminData"),
    savebar: document.getElementById("adminSavebar"),
    dirtyIndicator: document.getElementById("dirtyIndicator"),
    status: document.getElementById("adminStatus"),
    tabs: Array.from(document.querySelectorAll("[data-admin-tab]")),
    panels: Array.from(document.querySelectorAll("[data-admin-panel]"))
  };

  elements.title.textContent = "Amministrazione";
  elements.back.href = `/${leagueId}/`;

  let matchdays = [];
  let registry = { activeFantasyMatchday: null, matchdays: {} };
  let teamsDocument = { version: 1, teams: {} };
  let initialSnapshot = "";
  let authenticated = false;
  let loading = false;
  let resumeAfterLogin = false;
  const pendingUploads = new Map();

  function setStatus(message, type = "") {
    elements.status.textContent = message;
    elements.status.className = `admin-status${type ? ` is-${type}` : ""}`;
  }

  function showLogin(message = "") {
    authenticated = false;
    elements.login.hidden = false;
    elements.workspace.hidden = true;
    elements.logout.hidden = true;
    elements.savebar.hidden = true;
    if (message) setStatus(message, "error");
    window.setTimeout(() => elements.password.focus(), 30);
  }

  function showWorkspace() {
    authenticated = true;
    elements.login.hidden = true;
    elements.workspace.hidden = false;
    elements.logout.hidden = false;
    elements.savebar.hidden = false;
  }

  async function api(body, method = "POST") {
    const response = await fetch("/api/admin-links", {
      method,
      credentials: "same-origin",
      cache: "no-store",
      headers: method === "POST" ? { "Content-Type": "application/json" } : undefined,
      body: method === "POST" ? JSON.stringify(body) : undefined
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(result.error || `HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return result;
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let value = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];
      if (char === '"') {
        if (quoted && next === '"') {
          value += '"';
          index += 1;
        } else quoted = !quoted;
      } else if (char === "," && !quoted) {
        row.push(value);
        value = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(value);
        if (row.some((cell) => cell.trim())) rows.push(row);
        row = [];
        value = "";
      } else value += char;
    }

    if (value || row.length) {
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
    }
    return rows;
  }

  function calendarMatchdays(csvText) {
    const rows = parseCsv(csvText);
    const headerIndex = rows.findIndex((row) => row.includes("fantasy_matchday_number"));
    if (headerIndex < 0) return [];

    const header = rows[headerIndex].map((cell) => cell.trim());
    const fantasyIndex = header.indexOf("fantasy_matchday_number");
    const realIndex = header.indexOf("real_round_number");
    const map = new Map();

    rows.slice(headerIndex + 1).forEach((row) => {
      const fantasy = Number(row[fantasyIndex]);
      const real = Number(row[realIndex]);
      if (Number.isInteger(fantasy) && Number.isInteger(real)) {
        map.set(fantasy, { fantasy, real });
      }
    });

    return Array.from(map.values()).sort((left, right) => left.real - right.real);
  }

  function normalizeRegistry(data) {
    const rawLeague = data && typeof data[leagueId] === "object" ? data[leagueId] : {};
    const isNew = Object.prototype.hasOwnProperty.call(rawLeague, "matchdays")
      || Object.prototype.hasOwnProperty.call(rawLeague, "activeFantasyMatchday");

    return {
      activeFantasyMatchday: Number.isInteger(Number(rawLeague.activeFantasyMatchday))
        && Number(rawLeague.activeFantasyMatchday) > 0
        ? Number(rawLeague.activeFantasyMatchday)
        : null,
      matchdays: isNew && rawLeague.matchdays && typeof rawLeague.matchdays === "object"
        ? rawLeague.matchdays
        : rawLeague
    };
  }

  function normalizeTeams(data) {
    const document = data && typeof data === "object" ? data : {};
    return {
      version: Number.isInteger(document.version) ? document.version : 1,
      teams: document.teams && typeof document.teams === "object" ? document.teams : {}
    };
  }

  function entryUrl(value) {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return String(value.url || "");
    return "";
  }

  async function fetchFresh(url) {
    const separator = url.includes("?") ? "&" : "?";
    const response = await fetch(`${url}${separator}v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  }

  function renderMatchdays() {
    elements.activeSelect.innerHTML = '<option value="">Nessuna giornata attiva</option>';
    matchdays.forEach((matchday) => {
      const option = document.createElement("option");
      option.value = String(matchday.fantasy);
      option.textContent = `${competitionLabel} ${matchday.real} · Fanta ${matchday.fantasy}`;
      elements.activeSelect.append(option);
    });

    elements.activeSelect.value = registry.activeFantasyMatchday === null
      ? ""
      : String(registry.activeFantasyMatchday);
    elements.matchdayList.innerHTML = "";

    if (matchdays.length === 0) {
      elements.matchdayList.innerHTML = '<div class="admin-empty">Calendario non ancora configurato per questa lega.</div>';
      return;
    }

    matchdays.forEach((matchday) => {
      const row = document.createElement("div");
      row.className = "admin-link-row";
      row.innerHTML = `
        <div class="admin-link-row__day">
          <strong>${competitionLabel} ${matchday.real}</strong>
          <span>Fanta ${matchday.fantasy}</span>
        </div>
        <label class="admin-field admin-field--inline">
          <span>Documento Google</span>
          <input
            type="url"
            inputmode="url"
            autocomplete="off"
            data-fantasy-matchday="${matchday.fantasy}"
            placeholder="https://docs.google.com/document/d/e/.../pub"
            aria-label="Link giornata Fanta ${matchday.fantasy}"
          >
        </label>
      `;
      row.querySelector("input").value = entryUrl(
        registry.matchdays[String(matchday.fantasy)]
      ).trim();
      elements.matchdayList.append(row);
    });
  }

  function teamInitials(name) {
    return String(name).split(/\s+-\s+|\s+/).filter(Boolean).slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "").join("");
  }

  function setUploadStatus(row, message = "", type = "") {
    const status = row.querySelector(".admin-logo-row__status");
    status.textContent = message;
    status.className = `admin-logo-row__status${type ? ` is-${type}` : ""}`;
  }

  function updateLogoPreview(row, value) {
    const image = row.querySelector("img");
    const fallback = row.querySelector(".admin-logo-preview__fallback");
    const url = String(value || "").trim();
    image.hidden = !url;
    fallback.hidden = Boolean(url);
    if (url) image.src = url;
    else image.removeAttribute("src");
  }

  function readFileAsDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Impossibile leggere il file selezionato."));
      reader.readAsDataURL(blob);
    });
  }

  function loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Il file selezionato non è un’immagine leggibile."));
      };
      image.src = objectUrl;
    });
  }

  function canvasToPng(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Impossibile preparare il logo."));
      }, "image/png");
    });
  }

  async function prepareLogoUpload(file) {
    if (!file) throw new Error("Nessun file selezionato.");
    if (!String(file.type || "").startsWith("image/")) {
      throw new Error("Seleziona un file immagine.");
    }

    const image = await loadImageFile(file);
    const maxSide = 256;
    const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas non disponibile nel browser.");
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const blob = await canvasToPng(canvas);
    if (blob.size > 600 * 1024) {
      throw new Error("Il logo resta troppo pesante dopo la riduzione. Usa un’immagine più semplice.");
    }

    const dataUrl = await readFileAsDataUrl(blob);
    const separator = dataUrl.indexOf(",");
    if (separator < 0) throw new Error("Formato immagine non valido.");

    return {
      dataBase64: dataUrl.slice(separator + 1),
      previewUrl: dataUrl,
      mimeType: "image/png",
      originalName: file.name || "logo.png",
      sizeBytes: blob.size,
      width,
      height,
      fingerprint: `${file.name}:${file.size}:${file.lastModified}:${blob.size}`
    };
  }

  function clearPendingUpload(teamName, row, message = "") {
    pendingUploads.delete(teamName);
    const fileInput = row.querySelector("input[type=file]");
    if (fileInput) fileInput.value = "";
    setUploadStatus(row, message);
  }

  function renderTeams() {
    elements.logoList.innerHTML = "";
    pendingUploads.clear();
    const entries = Object.entries(teamsDocument.teams);
    if (entries.length === 0) {
      elements.logoList.innerHTML = '<div class="admin-empty">Nessuna fantasquadra configurata.</div>';
      return;
    }

    entries.forEach(([teamName, rawProfile]) => {
      const profile = rawProfile && typeof rawProfile === "object" ? rawProfile : {};
      const row = document.createElement("div");
      row.className = "admin-logo-row";
      row.dataset.teamName = teamName;
      row.innerHTML = `
        <div class="admin-logo-preview" aria-hidden="true">
          <img alt="" hidden>
          <span class="admin-logo-preview__fallback"></span>
        </div>
        <div class="admin-logo-row__identity">
          <strong></strong>
          <span>Logo fantasquadra</span>
        </div>
        <div class="admin-logo-row__editor">
          <label class="admin-field admin-field--inline">
            <span>URL immagine</span>
            <input
              type="url"
              inputmode="url"
              autocomplete="off"
              placeholder="https://.../logo.png"
              aria-label="URL logo fantasquadra"
            >
          </label>
          <div class="admin-logo-row__actions">
            <label class="admin-upload-button">
              <input type="file" accept="image/*" hidden>
              <span>Carica immagine</span>
            </label>
            <button class="admin-remove-button" type="button">Rimuovi</button>
            <small class="admin-logo-row__status" aria-live="polite"></small>
          </div>
        </div>
      `;

      row.querySelector(".admin-logo-preview__fallback").textContent = teamInitials(teamName);
      row.querySelector(".admin-logo-row__identity strong").textContent = teamName;

      const urlInput = row.querySelector('input[type="url"]');
      const fileInput = row.querySelector('input[type="file"]');
      const removeButton = row.querySelector(".admin-remove-button");
      const image = row.querySelector("img");
      urlInput.dataset.teamLogo = teamName;
      urlInput.value = typeof profile.logoUrl === "string" ? profile.logoUrl.trim() : "";

      image.addEventListener("error", () => {
        image.hidden = true;
        row.querySelector(".admin-logo-preview__fallback").hidden = false;
      });

      urlInput.addEventListener("input", () => {
        if (pendingUploads.has(teamName)) {
          clearPendingUpload(teamName, row);
        }
        updateLogoPreview(row, urlInput.value);
      });

      fileInput.addEventListener("change", async () => {
        const file = fileInput.files?.[0];
        if (!file) return;
        setUploadStatus(row, "Preparazione immagine…");
        try {
          const upload = await prepareLogoUpload(file);
          pendingUploads.set(teamName, upload);
          updateLogoPreview(row, upload.previewUrl);
          setUploadStatus(row, `Pronto: ${upload.originalName}`, "success");
          updateDirtyState();
        } catch (error) {
          console.error(error);
          clearPendingUpload(teamName, row, error.message || "Caricamento non riuscito.");
          setUploadStatus(row, error.message || "Caricamento non riuscito.", "error");
          updateLogoPreview(row, urlInput.value);
          updateDirtyState();
        }
      });

      removeButton.addEventListener("click", () => {
        urlInput.value = "";
        clearPendingUpload(teamName, row);
        updateLogoPreview(row, "");
        updateDirtyState();
      });

      updateLogoPreview(row, urlInput.value);
      elements.logoList.append(row);
    });
  }

  function collectState(options = {}) {
    const includeUploadData = options.includeUploadData === true;
    const matchdayEntries = {};
    elements.matchdayList.querySelectorAll("input[data-fantasy-matchday]").forEach((input) => {
      const value = input.value.trim();
      if (value) matchdayEntries[input.dataset.fantasyMatchday] = { url: value };
    });

    const activeValue = Number(elements.activeSelect.value);
    const activeFantasyMatchday = Number.isInteger(activeValue) && activeValue > 0
      ? activeValue
      : null;

    const logos = {};
    elements.logoList.querySelectorAll("input[data-team-logo]").forEach((input) => {
      logos[input.dataset.teamLogo] = input.value.trim();
    });

    const uploadFingerprints = {};
    const logoUploads = {};
    pendingUploads.forEach((upload, teamName) => {
      uploadFingerprints[teamName] = upload.fingerprint;
      if (includeUploadData) {
        logoUploads[teamName] = {
          dataBase64: upload.dataBase64,
          mimeType: upload.mimeType,
          originalName: upload.originalName,
          sizeBytes: upload.sizeBytes,
          width: upload.width,
          height: upload.height
        };
      }
    });

    return {
      registry: { activeFantasyMatchday, matchdays: matchdayEntries },
      logos,
      uploadFingerprints,
      ...(includeUploadData ? { logoUploads } : {})
    };
  }

  function snapshot() {
    return JSON.stringify(collectState());
  }

  function updateDirtyState() {
    const dirty = Boolean(initialSnapshot) && snapshot() !== initialSnapshot;
    elements.dirtyIndicator.textContent = dirty ? "Modifiche non salvate" : "Tutto salvato";
    elements.dirtyIndicator.classList.toggle("is-dirty", dirty);
    elements.saveButton.disabled = loading || !dirty;
    return dirty;
  }

  function bindDirtyListeners() {
    elements.workspace.addEventListener("input", updateDirtyState);
    elements.workspace.addEventListener("change", updateDirtyState);
  }

  function selectTab(name) {
    elements.tabs.forEach((tab) => {
      const active = tab.dataset.adminTab === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    elements.panels.forEach((panel) => {
      panel.hidden = panel.dataset.adminPanel !== name;
    });
  }

  async function loadData() {
    loading = true;
    elements.saveButton.disabled = true;
    setStatus("Caricamento dati…");

    try {
      const [calendarResponse, runtimeResponse] = await Promise.all([
        fetchFresh(`/data/${leagueId}/calendario.csv`),
        fetchFresh(`/api/league-data?league=${encodeURIComponent(leagueId)}`)
      ]);

      const runtimeData = await runtimeResponse.json();
      matchdays = calendarMatchdays(await calendarResponse.text());
      registry = normalizeRegistry({ [leagueId]: runtimeData.registry });
      teamsDocument = normalizeTeams(runtimeData.teams);
      renderMatchdays();
      renderTeams();
      initialSnapshot = snapshot();
      setStatus("");
      showWorkspace();
    } catch (error) {
      console.error(error);
      setStatus("Impossibile caricare i dati del pannello.", "error");
    } finally {
      loading = false;
      updateDirtyState();
    }
  }

  elements.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!elements.password.value) return;
    elements.loginButton.disabled = true;
    setStatus("Accesso…");

    try {
      await api({ action: "login", password: elements.password.value });
      elements.password.value = "";
      if (resumeAfterLogin) {
        resumeAfterLogin = false;
        showWorkspace();
        setStatus("Sessione ripristinata. Puoi salvare le modifiche.", "success");
        updateDirtyState();
      } else {
        await loadData();
      }
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Accesso non riuscito.", "error");
      elements.password.select();
    } finally {
      elements.loginButton.disabled = false;
    }
  });

  elements.logout.addEventListener("click", async () => {
    if (updateDirtyState() && !window.confirm("Ci sono modifiche non salvate. Uscire comunque?")) return;
    try { await api({ action: "logout" }); } catch (error) { console.error(error); }
    initialSnapshot = "";
    showLogin();
  });

  elements.saveButton.addEventListener("click", async () => {
    if (!updateDirtyState()) return;
    loading = true;
    elements.saveButton.disabled = true;
    setStatus("Salvataggio…");

    try {
      const state = collectState({ includeUploadData: true });
      const result = await api({ action: "save", leagueId, ...state });
      if (result.logoUrls && typeof result.logoUrls === "object") {
        Object.entries(result.logoUrls).forEach(([teamName, logoUrl]) => {
          const row = Array.from(elements.logoList.querySelectorAll(".admin-logo-row"))
            .find((candidate) => candidate.dataset.teamName === teamName);
          if (!row) return;
          const input = row.querySelector('input[type="url"]');
          input.value = String(logoUrl || "");
          clearPendingUpload(teamName, row, logoUrl ? "Logo salvato" : "");
          updateLogoPreview(row, input.value);
        });
      }
      initialSnapshot = snapshot();
      updateDirtyState();
      setStatus(result.message || "Configurazione salvata.", "success");
    } catch (error) {
      console.error(error);
      if (error.status === 401) {
        resumeAfterLogin = true;
        showLogin("Sessione scaduta. Accedi di nuovo: le modifiche restano nella pagina.");
      } else {
        setStatus(error.message || "Salvataggio non riuscito.", "error");
      }
    } finally {
      loading = false;
      updateDirtyState();
    }
  });

  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => selectTab(tab.dataset.adminTab));
  });

  window.addEventListener("beforeunload", (event) => {
    if (!authenticated || !updateDirtyState()) return;
    event.preventDefault();
    event.returnValue = "";
  });

  bindDirtyListeners();
  selectTab("links");

  api({}, "GET")
    .then((result) => result.authenticated ? loadData() : showLogin())
    .catch(() => showLogin("Impossibile verificare la sessione."));
})();
