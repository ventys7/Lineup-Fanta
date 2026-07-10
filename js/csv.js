/* STEP 2B - Parser allineato ai CSV reali FP e PD. */

/* CONFIG */
const CSV_BASE_URL = window.LINEUP_FANTA?.league?.csvUrl || "";
const ALLOWED_MODULES = ["343","352","433","442","451","532","541"];
const MAX_SELECTED = 22;

const roleMap = Object.freeze({
  portieri: "P",
  portiere: "P",
  por: "P",
  goalkeeper: "P",
  goalkeepers: "P",
  gk: "P",
  p: "P",

  difensore: "D",
  difensori: "D",
  dif: "D",
  defender: "D",
  defenders: "D",
  def: "D",
  d: "D",

  centrocampista: "C",
  centrocampisti: "C",
  cen: "C",
  midfielder: "C",
  midfielders: "C",
  mid: "C",
  c: "C",

  attaccante: "A",
  attaccanti: "A",
  att: "A",
  forward: "A",
  forwards: "A",
  striker: "A",
  strikers: "A",
  fw: "A",
  a: "A"
});

const CSV_HEADER_ALIASES = Object.freeze({
  assetCode: ["asset_code", "assetcode", "codice_asset", "codice", "code", "id"],
  displayName: ["display_name", "displayname", "nome", "player", "giocatore", "name"],
  docsName: ["docs_name", "docsname", "nome_docs", "nome_documenti"],
  role: ["role", "ruolo", "posizione"],
  realTeam: ["real_team", "realteam", "squadra_reale", "squadra", "club"],
  quotation: ["quotation", "quotazione", "budget", "credito", "crediti", "cr"],
  purchasePrice: ["purchase_price", "purchaseprice", "prezzo_acquisto", "prezzoacquisto", "costo_acquisto", "costo"],
  ownerTag: ["owner_tag", "ownertag", "tag", "manager", "partecipante", "owner", "proprietario", "fantasquadra", "team"],
  type: ["type", "tipo", "asset_type"],
  active: ["active", "attivo", "attiva", "stato"]
});

const FREE_AGENT_LABELS = new Set([
  "",
  "svincolato",
  "svincolati",
  "libero",
  "liberi",
  "free",
  "free_agent",
  "freeagent"
]);

const IGNORED_OWNER_LABELS = new Set(["tag", "ricordi"]);

/* STATE */
let db = {}; // manager -> {players: [{n,r,t, gkBlock, gkPartner, isGkBlock}]}
let leagueAssets = []; // riga canonica unica per Listone e Rose
let leagueCsvState = Object.freeze({ status: "idle", error: null, loadedAt: null });

window.LineupLeagueData = Object.freeze({
  getAssets() {
    return leagueAssets.slice();
  },

  getState() {
    return { ...leagueCsvState };
  },

  refresh() {
    return loadCSV({ silent: true });
  }
});

/* CSV parsing */
function normalizeCsvToken(value) {
  return String(value ?? "")
    .replace(/^\uFEFF/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function countDelimiterOutsideQuotes(line, delimiter) {
  let count = 0;
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (!quoted && char === delimiter) {
      count += 1;
    }
  }

  return count;
}

function detectCsvDelimiter(headerLine) {
  const semicolons = countDelimiterOutsideQuotes(headerLine, ";");
  const commas = countDelimiterOutsideQuotes(headerLine, ",");
  return semicolons > commas ? ";" : ",";
}

function splitCSVLine(line, delimiter = detectCsvDelimiter(line)) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === delimiter && !quoted) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function createHeaderMap(headerColumns) {
  const normalizedHeaders = headerColumns.map(normalizeCsvToken);
  const headerMap = {};

  Object.entries(CSV_HEADER_ALIASES).forEach(([field, aliases]) => {
    const accepted = new Set(aliases.map(normalizeCsvToken));
    const index = normalizedHeaders.findIndex((header) => accepted.has(header));
    if (index !== -1) headerMap[field] = index;
  });

  const recognizedFields = Object.keys(headerMap);
  const hasHeader = recognizedFields.length >= 2 && (
    headerMap.displayName !== undefined ||
    headerMap.role !== undefined ||
    headerMap.ownerTag !== undefined
  );

  return { hasHeader, headerMap };
}

function readCsvColumn(columns, headerMap, field, fallbackIndex) {
  const index = headerMap[field] ?? fallbackIndex;
  return index === undefined ? "" : String(columns[index] ?? "").trim();
}

function normalizeRole(value) {
  const key = normalizeCsvToken(value);
  if (!key) return "U";
  if (roleMap[key]) return roleMap[key];

  const upper = String(value).trim().toUpperCase();
  return ["P", "D", "C", "A"].includes(upper) ? upper : "U";
}

function parseNumericCell(value) {
  const raw = String(value ?? "").trim();

  if (!raw) return 0;

  // Le colonne economiche sono numeriche: se contengono note o lettere valgono 0.
  if (!/^[+-]?\d+(?:[.,]\d+)?$/.test(raw)) return 0;

  const number = Number(raw.replace(",", "."));
  return Number.isFinite(number) ? number : 0;
}

function parseOptionalNumericCell(value) {
  const raw = String(value ?? "").trim();
  if (!raw || !/^[+-]?\d+(?:[.,]\d+)?$/.test(raw)) return null;

  const number = Number(raw.replace(",", "."));
  return Number.isFinite(number) ? number : null;
}

function parseActive(value) {
  const normalized = normalizeCsvToken(value);
  if (!normalized) return true;
  return !new Set(["false", "0", "no", "n", "inactive", "inattivo", "inattiva", "disattivato", "disattivata"]).has(normalized);
}

function normalizeAssetType(value, role, displayName) {
  const normalized = normalizeCsvToken(value);
  const isGoalkeeperBlock = (
    normalized === "goalkeeper_block" ||
    normalized === "goalkeeperblock" ||
    normalized === "blocco_portieri" ||
    normalized === "blocco_portiere" ||
    (role === "P" && /\s+-\s+/.test(displayName))
  );

  return isGoalkeeperBlock ? "goalkeeper_block" : (normalized || "player");
}

function createFallbackAssetCode(role, displayName, sourceIndex) {
  const slug = normalizeCsvToken(displayName).replace(/_/g, "-") || "asset";
  return `${role || "U"}-${slug}-${sourceIndex}`.toUpperCase();
}

function normalizeLeagueAsset(columns, headerMap, sourceIndex) {
  const ownerRaw = readCsvColumn(columns, headerMap, "ownerTag", 0);
  const ownerKey = normalizeCsvToken(ownerRaw);

  if (IGNORED_OWNER_LABELS.has(ownerKey)) return null;

  const roleRaw = readCsvColumn(columns, headerMap, "role", 1);
  const displayName = readCsvColumn(columns, headerMap, "displayName", 2);
  const realTeam = readCsvColumn(columns, headerMap, "realTeam", 3);
  const quotationRaw = readCsvColumn(columns, headerMap, "quotation", 4);
  const purchasePriceRaw = readCsvColumn(columns, headerMap, "purchasePrice", 5);

  if (!displayName) return null;

  const role = normalizeRole(roleRaw);
  const isFreeAgent = FREE_AGENT_LABELS.has(ownerKey);
  const ownerTag = isFreeAgent ? "" : ownerRaw;
  const docsName = readCsvColumn(columns, headerMap, "docsName") || displayName;
  const assetCodeRaw = readCsvColumn(columns, headerMap, "assetCode");
  const active = parseActive(readCsvColumn(columns, headerMap, "active"));
  const type = normalizeAssetType(
    readCsvColumn(columns, headerMap, "type"),
    role,
    displayName
  );

  return Object.freeze({
    assetCode: assetCodeRaw || createFallbackAssetCode(role, displayName, sourceIndex),
    displayName,
    docsName,
    role,
    realTeam,
    quotation: parseNumericCell(quotationRaw),
    purchasePrice: parseNumericCell(purchasePriceRaw),
    ownerTag,
    managerCredits: null,
    type,
    active,
    isFreeAgent,
    sourceIndex
  });
}

function findCsvHeader(lines) {
  const maxRowsToInspect = Math.min(lines.length, 30);

  for (let index = 0; index < maxRowsToInspect; index += 1) {
    const line = lines[index];

    for (const delimiter of [",", ";"]) {
      const columns = splitCSVLine(line, delimiter);
      const { hasHeader, headerMap } = createHeaderMap(columns);

      const hasRequiredColumns = (
        headerMap.ownerTag !== undefined &&
        headerMap.role !== undefined &&
        headerMap.displayName !== undefined &&
        headerMap.realTeam !== undefined
      );

      if (hasHeader && hasRequiredColumns) {
        return { index, delimiter, headerMap };
      }
    }
  }

  return null;
}

function parseManagerCredits(lines, delimiter) {
  const creditsByManager = new Map();

  // Il foglio Listone espone nome e crediti nelle colonne O/P, da riga 8 in poi.
  for (let rowIndex = 7; rowIndex < lines.length; rowIndex += 1) {
    const columns = splitCSVLine(lines[rowIndex], delimiter);
    const managerName = String(columns[14] ?? "").trim();
    const credits = parseOptionalNumericCell(columns[15]);
    const managerKey = normalizeCsvToken(managerName);

    if (!managerKey || credits === null) continue;
    creditsByManager.set(managerKey, credits);
  }

  return creditsByManager;
}

function parseLeagueCsv(csvText) {
  const lines = String(csvText ?? "").split(/\r?\n/);

  if (!lines.some((line) => line.trim().length > 0)) {
    throw new Error("CSV vuoto");
  }

  const detectedHeader = findCsvHeader(lines);

  let delimiter;
  let headerMap;
  let dataRows;
  let sourceOffset;

  if (detectedHeader) {
    delimiter = detectedHeader.delimiter;
    headerMap = detectedHeader.headerMap;
    dataRows = lines.slice(detectedHeader.index + 1);
    sourceOffset = detectedHeader.index + 2;
  } else {
    const firstMeaningfulIndex = lines.findIndex((line) => line.trim().length > 0);
    delimiter = detectCsvDelimiter(lines[firstMeaningfulIndex]);
    headerMap = {};
    dataRows = lines.slice(firstMeaningfulIndex);
    sourceOffset = firstMeaningfulIndex + 1;
  }

  const creditsByManager = parseManagerCredits(lines, delimiter);
  const assets = dataRows
    .map((line, index) => normalizeLeagueAsset(
      splitCSVLine(line, delimiter),
      headerMap,
      index + sourceOffset
    ))
    .filter(Boolean)
    .map((asset) => Object.freeze({
      ...asset,
      managerCredits: asset.ownerTag
        ? creditsByManager.get(normalizeCsvToken(asset.ownerTag)) ?? null
        : null
    }));

  return { assets, creditsByManager };
}

function buildFormationDb(assets) {
  const nextDb = {};

  assets.forEach((asset) => {
    if (!asset.active || asset.isFreeAgent || !asset.ownerTag) return;

    if (!nextDb[asset.ownerTag]) nextDb[asset.ownerTag] = { players: [] };

    if (asset.type === "goalkeeper_block") {
      const parts = asset.displayName.split(/\s+-\s+/).map((part) => part.trim()).filter(Boolean);
      const goalkeeperOne = parts[0] || asset.displayName;
      const goalkeeperTwo = parts[1] || "";

      nextDb[asset.ownerTag].players.push({
        n: goalkeeperOne,
        r: asset.role,
        t: asset.realTeam || "",
        gkBlock: asset.displayName,
        gkPartner: goalkeeperTwo,
        isGkBlock: true
      });

      if (goalkeeperTwo) {
        nextDb[asset.ownerTag].players.push({
          n: goalkeeperTwo,
          r: asset.role,
          t: asset.realTeam || "",
          gkBlock: asset.displayName,
          gkPartner: goalkeeperOne,
          isGkBlock: true
        });
      }

      return;
    }

    nextDb[asset.ownerTag].players.push({
      n: asset.displayName,
      r: asset.role,
      t: asset.realTeam || ""
    });
  });

  const roleOrder = { P: 1, D: 2, C: 3, A: 4, U: 5 };
  Object.keys(nextDb).forEach((manager) => {
    nextDb[manager].players.sort((a, b) => (
      (roleOrder[a.r] || 9) - (roleOrder[b.r] || 9)
    ));
  });

  return nextDb;
}

function updateLeagueCsvState(status, error = null) {
  leagueCsvState = Object.freeze({
    status,
    error: error ? String(error.message || error) : null,
    loadedAt: status === "ready" ? new Date().toISOString() : leagueCsvState.loadedAt
  });
}

function dispatchLeagueAssetsReady() {
  document.dispatchEvent(new CustomEvent("lineup:league-assets-ready", {
    detail: {
      leagueId: window.LINEUP_FANTA?.league?.id || null,
      assets: leagueAssets.slice(),
      state: { ...leagueCsvState }
    }
  }));
}

function getCsvRequestUrl() {
  if (!CSV_BASE_URL) throw new Error("CSV non configurato");

  const url = new URL(CSV_BASE_URL, window.location.href);
  url.searchParams.set("t", String(Date.now()));
  return url.toString();
}

let leagueCsvRequest = null;

async function loadCSV(options = {}) {
  const silent = Boolean(options.silent);

  if (leagueCsvRequest) return leagueCsvRequest;

  leagueCsvRequest = (async () => {
    try {
      const keepReadyState = silent && leagueCsvState.status === "ready";
      if (!keepReadyState) updateLeagueCsvState("loading");

      const res = await fetch(getCsvRequestUrl(), {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0",
          "Pragma": "no-cache"
        }
      });
      if (!res.ok) throw new Error(`CSV request failed (${res.status})`);

      const txt = await res.text();
      if (/^\s*<!doctype html/i.test(txt)) throw new Error("Risposta CSV non valida");

      const { assets: nextAssets } = parseLeagueCsv(txt);
      const nextDb = buildFormationDb(nextAssets);

      leagueAssets = nextAssets;
      db = nextDb;
      updateLeagueCsvState("ready");
      dispatchLeagueAssetsReady();

      populateManagers();

      const restoredDraft = window.LineupPersistence?.restoreAfterCsv?.();

      if (!restoredDraft) {
        renderFormation();
        if (isMobile && typeof renderMobileSlots === "function") {
          renderMobileSlots();
        }
        if (typeof updateSwitchUI === "function") {
          setTimeout(() => updateSwitchUI(), 100);
        }
      }
    } catch (err) {
      console.error("CSV load error", err);

      if (silent && leagueAssets.length > 0) {
        console.warn("Aggiornamento live non riuscito: mantengo gli ultimi dati validi.");
        return;
      }

      updateLeagueCsvState("error", err);
      dispatchLeagueAssetsReady();
      document.getElementById("managerSelect").innerHTML = "<option>Errore caricamento</option>";
      if (!silent) showToast("Errore caricamento CSV", "error");
      throw err;
    } finally {
      leagueCsvRequest = null;
    }
  })();

  return leagueCsvRequest;
}

function populateManagers() {
  const sel = document.getElementById("managerSelect");
  const previousValue = sel.value;
  sel.innerHTML = "<option value=''>Seleziona squadra...</option>";
  const names = Object.keys(db).sort((a, b) => a.localeCompare(b, "it"));
  names.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    sel.appendChild(option);
  });

  if (previousValue && names.includes(previousValue)) {
    sel.value = previousValue;
  }

  sel.onchange = () => loadTeam();
}

(function setupLiveCsvRefresh() {
  const watchedSections = new Set(["formation", "listone", "rose"]);
  let lastRefreshAt = 0;

  function currentSection() {
    return document.documentElement.dataset.leagueSection || "formation";
  }

  function refreshIfNeeded(force = false) {
    if (!watchedSections.has(currentSection())) return;

    const now = Date.now();
    if (!force && now - lastRefreshAt < 15_000) return;
    lastRefreshAt = now;

    loadCSV({ silent: true }).catch((error) => {
      console.warn("Aggiornamento live CSV non riuscito", error);
    });
  }

  window.addEventListener("lineup:league-section-change", (event) => {
    if (watchedSections.has(event.detail?.section)) refreshIfNeeded(true);
  });

  window.addEventListener("focus", () => refreshIfNeeded());
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshIfNeeded();
  });

  window.setInterval(() => {
    if (!document.hidden) refreshIfNeeded(true);
  }, 30_000);
})();
