/* SLOTS RENDER - Rendering functions for slots */

function renderFormation(){
  // Hide slots if no manager selected
  if(!currentManager){
    document.getElementById("startersSlots").style.display = "none";
    document.getElementById("benchSlots").style.display = "none";
    return;
  }

  const module = document.getElementById("moduleSelect").value;
  const defReq = parseInt(module[0],10);
  const cenReq = parseInt(module[1],10);
  const attReq = parseInt(module[2],10);

  const startersContainer = document.getElementById("startersSlots");
  startersContainer.style.display = "flex"; 
  startersContainer.innerHTML = "";
  
  const starterSlots = {};

  // Funzione interna per creare una riga di reparto
  const createRoleRow = (container, role, count, type, slotsObj) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "formation-row";
    
    for(let i=1; i<=count; i++){
      const id = (role === 'P' && count === 1) ? "GK1" : role + i;
      const slot = document.createElement("div");
      slot.className = "slot empty";
      slot.id = type + "-" + id;
      slot.style.cursor = "pointer";
      // Rimosso position relative
      
      slot.onclick = () => openSlotPicker(type, id);
      slot.ondragover = (e) => { e.preventDefault(); slot.classList.add('drag-over'); };
      slot.ondragleave = () => { slot.classList.remove('drag-over'); };
      slot.ondrop = (e) => handleDrop(e, type, id);
      
      slotsObj[id] = slot;
      rowDiv.appendChild(slot);
    }
    container.appendChild(rowDiv);
  };

  // Creazione righe TITOLARI
  createRoleRow(startersContainer, 'P', 1, 'starter', starterSlots);
  createRoleRow(startersContainer, 'D', defReq, 'starter', starterSlots);
  createRoleRow(startersContainer, 'C', cenReq, 'starter', starterSlots);
  createRoleRow(startersContainer, 'A', attReq, 'starter', starterSlots);

  // Inizializzazione grafica slot vuoti titolari
  Object.keys(starterSlots).forEach(id=>{
    const role = getRoleFromSlotId(id);
    const color = roleColors[role] || '#dc3545';
    // Style: white-space normal e word-break per far andare il nome a capo
    starterSlots[id].innerHTML = `<div class="slot-content" style="flex-wrap: wrap;">
      <div class="badge" style="background:${color}; flex-shrink: 0;">${role}</div>
      <div class="player-meta" style="color:var(--muted); white-space: normal; word-break: break-word; line-height: 1.1;">vuoto</div>
    </div>`;
    starterSlots[id].classList.add("empty");
  });

  if(!currentManager || !db[currentManager]) return;

  // --- PANCHINA (Trasformata in Piramidale) ---
  const benchContainer = document.getElementById("benchSlots");
  benchContainer.style.display = "flex";
  benchContainer.style.flexDirection = "column";
  benchContainer.innerHTML = "";
  const benchSlots = {};

  createRoleRow(benchContainer, 'P', 2, 'bench', benchSlots);
  createRoleRow(benchContainer, 'D', 3, 'bench', benchSlots);
  createRoleRow(benchContainer, 'C', 3, 'bench', benchSlots);
  createRoleRow(benchContainer, 'A', 3, 'bench', benchSlots);

  // Inizializzazione grafica slot vuoti panchina
  Object.keys(benchSlots).forEach(id=>{
    const role = getRoleFromSlotId(id);
    const color = roleColors[role] || '#dc3545';
    benchSlots[id].innerHTML = `<div class="slot-content" style="flex-wrap: wrap;">
      <div class="badge" style="background:${color}; flex-shrink: 0;">${role}</div>
      <div class="player-meta" style="color:var(--muted); white-space: normal; word-break: break-word; line-height: 1.1;">vuoto</div>
    </div>`;
    benchSlots[id].classList.add("empty");
  });

  // --- ASSEGNAZIONE GIOCATORI (Logica originale intatta) ---
  const team = db[currentManager].players;
  const assignedPlayers = {};
  const assignedBenchPlayers = {};
  
  for(const slotKey in slotAssignments){
    const playerIdx = slotAssignments[slotKey];
    if(selectedPlayers.includes(playerIdx)){
      if(slotKey.startsWith('starter-')){
        assignedPlayers[slotKey] = team[playerIdx];
      } else if(slotKey.startsWith('bench-')){
        assignedBenchPlayers[slotKey] = team[playerIdx];
      }
    } else {
      delete slotAssignments[slotKey];
    }
  }
  
  const assignedIndices = new Set();
  for(const key in slotAssignments) assignedIndices.add(slotAssignments[key]);
  
  const unassignedPlayers = selectedPlayers.filter(i => !assignedIndices.has(i) && i >= 0 && i < team.length).map(i => team[i]);
  
  let counts = {P:0,D:0,C:0,A:0};
  let starters = [];
  let bench = [];

  const gks = unassignedPlayers.filter(p=>p.r==="P");
  gks.forEach(p=>{ if(counts.P < 1){ starters.push(p); counts.P++; } else bench.push(p); });

  const defs = unassignedPlayers.filter(p=>p.r==="D");
  defs.forEach(p=>{ if(counts.D<defReq){ starters.push(p); counts.D++; } else bench.push(p); });

  const cents = unassignedPlayers.filter(p=>p.r==="C");
  cents.forEach(p=>{ if(counts.C<cenReq){ starters.push(p); counts.C++; } else bench.push(p); });

  const atts = unassignedPlayers.filter(p=>p.r==="A");
  atts.forEach(p=>{ if(counts.A<attReq){ starters.push(p); counts.A++; } else bench.push(p); });

  lastStarters = starters.slice();
  lastBench = bench.slice();

  let starterRoleCounts = {P:0,D:0,C:0,A:0};
  
  // Update UI per starter assegnati
  for(const slotKey in assignedPlayers){
    const slotId = slotKey.replace('starter-', '');
    const p = assignedPlayers[slotKey];
    const playerIdx = team.indexOf(p);
    if(starterSlots[slotId]){
      starterSlots[slotId].innerHTML = `<div class="slot-content" style="flex-wrap: wrap;">
          <div class="badge" style="background:${roleColors[p.r]}">${p.r}</div>
          <div class="player-meta" style="white-space: normal; word-break: break-word;">${p.n}</div></div>`;
      starterSlots[slotId].classList.remove("empty");
      starterSlots[slotId].draggable = true;
      starterSlots[slotId].ondragstart = (e) => { 
        draggedPlayerIndex = playerIdx; 
        draggedPlayerRole = p.r; 
        starterSlots[slotId].classList.add('dragging'); 
      };
      starterSlots[slotId].ondragend = () => { 
        draggedPlayerIndex = null; 
        draggedPlayerRole = null; 
        starterSlots[slotId].classList.remove('dragging'); 
      };
    }
  }
  
  // Update UI per starter automatici
  starters.forEach(p=>{
    const role = p.r;
    let slotId = (role === 'P') ? "GK1" : role + (++starterRoleCounts[role]);
    if(assignedPlayers['starter-' + slotId]) return;
    if(starterSlots[slotId]){
      starterSlots[slotId].innerHTML = `<div class="slot-content" style="flex-wrap: wrap;">
        <div class="badge" style="background:${roleColors[role]}">${role}</div>
        <div class="player-meta" style="white-space: normal; word-break: break-word;">${p.n}</div></div>`;
      starterSlots[slotId].classList.remove("empty");
    }
  });

  // Update UI Panchina
  const benchRoleSlots = { P:["P1","P2"], D:["D1","D2","D3"], C:["C1","C2","C3"], A:["A1","A2","A3"] };
  let benchRoleCounts = {P:0,D:0,C:0,A:0};
  
  for(const slotKey in assignedBenchPlayers){
    const slotId = slotKey.replace('bench-', '');
    const p = assignedBenchPlayers[slotKey];
    const playerIdx = team.indexOf(p);
    if(benchSlots[slotId]){
      benchSlots[slotId].innerHTML = `<div class="slot-content" style="flex-wrap: wrap;">
        <div class="badge" style="background:${roleColors[p.r]}">${p.r}</div>
        <div class="player-meta" style="white-space: normal; word-break: break-word;">${p.n}</div></div>`;
      benchSlots[slotId].classList.remove("empty");
      benchSlots[slotId].draggable = true;
      benchSlots[slotId].ondragstart = (e) => { 
        draggedPlayerIndex = playerIdx; 
        draggedPlayerRole = p.r; 
        benchSlots[slotId].classList.add('dragging'); 
      };
      benchSlots[slotId].ondragend = () => { 
        draggedPlayerIndex = null; 
        draggedPlayerRole = null; 
        benchSlots[slotId].classList.remove('dragging'); 
      };
      benchRoleCounts[p.r]++;
    }
  }
  
  const gkStarter = starters.find(p=>p.r==="P") || assignedPlayers['starter-GK1'];
  if(!assignedBenchPlayers['bench-P1'] && gkStarter && benchSlots["P1"]){
    benchSlots["P1"].innerHTML = `<div class="slot-content" style="flex-wrap: wrap;"><div class="badge P">P</div><div class="player-meta" style="white-space: normal; word-break: break-word;">${gkStarter.t || "Portiere"}</div></div>`;
    benchSlots["P1"].classList.remove("empty");
    benchRoleCounts.P = 1;
  }
  
  const starterGkBlock = gkStarter ? gkStarter.gkBlock : null;
  if(!assignedBenchPlayers['bench-P2'] && gkStarter && starterGkBlock && benchSlots["P2"]){
    const otherBlock = team.find(p => p.r === "P" && p.isGkBlock && p.gkBlock !== starterGkBlock && !selectedPlayers.includes(team.indexOf(p)));
    if(otherBlock){
      benchSlots["P2"].innerHTML = `<div class="slot-content" style="flex-wrap: wrap;"><div class="badge P">P</div><div class="player-meta" style="white-space: normal; word-break: break-word;">${otherBlock.t || "Portiere"}</div></div>`;
      benchSlots["P2"].classList.remove("empty");
      benchRoleCounts.P = 2;
    }
  }
  
  bench.filter(p => p.r !== "P").forEach(p=>{
    const role = p.r;
    const slotId = benchRoleSlots[role][benchRoleCounts[role]];
    if(!slotId || assignedBenchPlayers['bench-' + slotId]) return;
    const playerIdx = team.indexOf(p);
    if(benchSlots[slotId]){
      benchSlots[slotId].innerHTML = `<div class="slot-content" style="flex-wrap: wrap;"><div class="badge ${role}">${role}</div><div class="player-meta" style="white-space: normal; word-break: break-word;">${p.n}</div></div>`;
      benchSlots[slotId].classList.remove("empty");
      benchSlots[slotId].draggable = true;
      benchSlots[slotId].ondragstart = (e) => { 
        draggedPlayerIndex = playerIdx; 
        draggedPlayerRole = p.r; 
        benchSlots[slotId].classList.add('dragging'); 
      };
      benchSlots[slotId].ondragend = () => { 
        draggedPlayerIndex = null; 
        draggedPlayerRole = null; 
        benchSlots[slotId].classList.remove('dragging'); 
      };
      benchRoleCounts[role]++;
    }
  });

  const totalStarters = starters.length + Object.keys(assignedPlayers).filter(k => k.startsWith('starter-')).length;
  const totalBench = bench.length + Object.keys(assignedBenchPlayers).length + (benchRoleCounts.P || 0);
  document.getElementById("starterCount").textContent = `(${totalStarters}/11)`;
  document.getElementById("benchCount").textContent = `(${totalBench}/11)`;
}
