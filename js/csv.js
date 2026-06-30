/* CONFIG */
const CSV_BASE_URL = window.LINEUP_FANTA?.league?.csvUrl || "";
const ALLOWED_MODULES = ["343","352","433","442","451","532","541"];
const MAX_SELECTED = 22;

const roleMap = {
  "portieri":"P","portiere":"P","portieri":"P",
  "difensore":"D","difensori":"D",
  "centrocampista":"C","centrocampisti":"C",
  "attaccante":"A","attaccanti":"A",
  "p":"P","d":"D","c":"C","a":"A"
};

/* STATE */
let db = {}; // manager -> {players: [{n,r,t, gkBlock, gkPartner, isGkBlock}]}

/* CSV parsing */
function splitCSVLine(line){
  return line.split(/[;,](?=(?:[^"]*"[^"]*")*[^"]*$)/).map(s=>{
    s = s.trim(); if(s.startsWith('"') && s.endsWith('"')) s = s.slice(1,-1);
    return s.trim();
  });
}

function getCsvRequestUrl(){
  if (!CSV_BASE_URL) throw new Error("CSV non configurato");

  const url = new URL(CSV_BASE_URL, window.location.href);
  url.searchParams.set("t", String(Date.now()));
  return url.toString();
}

async function loadCSV(){
  try{
    db = {};
    const res = await fetch(getCsvRequestUrl(), { cache: "no-store" });
    if (!res.ok) throw new Error(`CSV request failed (${res.status})`);

    const txt = await res.text();
    if (/^\s*<!doctype html/i.test(txt)) throw new Error("Risposta CSV non valida");

    const lines = txt.split(/\r?\n/).filter(l=>l.trim().length>0);
    if(lines.length===0) throw new Error("CSV vuoto");

    const headerParts = splitCSVLine(lines[0].toLowerCase());
    let hasHeader=false; const headerMap={};
    const knownHeaders = {
      manager:["tag","manager","partecipante","team","owner","proprietario"],
      ruolo:["ruolo","posizione","role"],
      nome:["nome","player","giocatore","name"],
      squadra:["squadra","team","club"],
      budget:["budget","credito","cr"]
    };
    headerParts.forEach((h,i)=>{
      const hh = h.replace(/"/g,"").trim();
      for(const key in knownHeaders){
        if(knownHeaders[key].some(k=>hh.includes(k))){ headerMap[key]=i; hasHeader=true; break; }
      }
    });

    const dataRows = hasHeader ? lines.slice(1) : lines;
    dataRows.forEach(line=>{
      const cols = splitCSVLine(line);
      const manager = (headerMap.manager!==undefined ? (cols[headerMap.manager]||"").trim() : (cols[0]||"").trim());
      if(!manager) return;
      const managerLower = manager.toLowerCase();
      if(["tag","svincolato","ricordi"].includes(managerLower)) return;

      const ruoloRaw = headerMap.ruolo!==undefined ? (cols[headerMap.ruolo]||"").trim() : (cols[1]||"").trim();
      const nomeRaw  = headerMap.nome!==undefined ? (cols[headerMap.nome]||"").trim()  : (cols[2]||"").trim();
      const squadra  = headerMap.squadra!==undefined ? (cols[headerMap.squadra]||"").trim() : (cols[3]||"").trim();

      if(!nomeRaw) return;
      const rKey = (ruoloRaw||"").toLowerCase();
      const role = roleMap[rKey] || roleMap[ruoloRaw] || (ruoloRaw && ruoloRaw.toUpperCase()) || "U";

      if(!db[manager]) db[manager] = { players: [] };

      // Gestione blocchi portieri (es: "Raya - Kepa")
      if(role === "P" && nomeRaw.includes(" - ")){
        const parts = nomeRaw.split(" - ");
        const gk1 = parts[0].trim();
        const gk2 = parts[1] ? parts[1].trim() : "";
        
        // Prima porta
        db[manager].players.push({ n: gk1, r: role, t: squadra || "", gkBlock: nomeRaw, gkPartner: gk2, isGkBlock: true });
        
        // Seconda porta
        if(gk2){
          db[manager].players.push({ n: gk2, r: role, t: squadra || "", gkBlock: nomeRaw, gkPartner: gk1, isGkBlock: true });
        }
      } else {
        db[manager].players.push({ n: nomeRaw, r: role, t: squadra || "" });
      }
    });

    // sort roles
    const roleOrder = {P:1,D:2,C:3,A:4,U:5};
    Object.keys(db).forEach(m=>{
      db[m].players.sort((a,b)=> (roleOrder[a.r]||9) - (roleOrder[b.r]||9));
    });

    populateManagers();

    const restoredDraft = window.LineupPersistence?.restoreAfterCsv?.();

    if(!restoredDraft){
      renderFormation();
      if(isMobile && typeof renderMobileSlots === 'function'){
        renderMobileSlots();
      }
      if(typeof updateSwitchUI === 'function'){
        setTimeout(() => updateSwitchUI(), 100);
      }
    }
  }catch(err){
    console.error("CSV load error", err);
    document.getElementById("managerSelect").innerHTML = "<option>Errore caricamento</option>";
    showToast("Errore caricamento CSV", "error");
  }
}

function populateManagers(){
  const sel = document.getElementById("managerSelect");
  sel.innerHTML = "<option value=''>Seleziona squadra...</option>";
  const names = Object.keys(db).sort((a,b)=> a.localeCompare(b,'it'));
  names.forEach(n=>{ const o = document.createElement("option"); o.value=n; o.textContent=n; sel.appendChild(o);});
  sel.addEventListener("change", ()=> loadTeam());
}
