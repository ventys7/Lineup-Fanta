/* MOBILE SLOTS - Rendering functions for mobile view */



function getMobileSlotContainer(slotId, isStarter){

  return isStarter ? document.getElementById('mobileStartersSlots') : document.getElementById('mobileBenchSlots');

}



function renderMobileSlots(){

  if(!currentManager || !db[currentManager]) return;

  

  const module = document.getElementById("moduleSelect").value;

  const defReq = parseInt(module[0],10);

  const cenReq = parseInt(module[1],10);

  const attReq = parseInt(module[2],10);

  const team = db[currentManager].players;

  

  const assignedPlayers = {};

  const assignedIndices = new Set();

  

  for(const slotKey in slotAssignments){

    const playerIdx = slotAssignments[slotKey];

    if(selectedPlayers.includes(playerIdx)){

      assignedPlayers[slotKey] = team[playerIdx];

      assignedIndices.add(playerIdx);

    } else {

      delete slotAssignments[slotKey];

    }

  }

  

  const unassignedPlayers = selectedPlayers.filter(i => !assignedIndices.has(i)).map(i => team[i]);

  let counts = {P:0,D:0,C:0,A:0};

  let starters = [];

  let bench = [];



  unassignedPlayers.filter(p=>p.r==="P").forEach(p=>{ if(counts.P < 1){ starters.push(p); counts.P++; } else bench.push(p); });

  unassignedPlayers.filter(p=>p.r==="D").forEach(p=>{ if(counts.D < defReq){ starters.push(p); counts.D++; } else bench.push(p); });

  unassignedPlayers.filter(p=>p.r==="C").forEach(p=>{ if(counts.C < cenReq){ starters.push(p); counts.C++; } else bench.push(p); });

  unassignedPlayers.filter(p=>p.r==="A").forEach(p=>{ if(counts.A < attReq){ starters.push(p); counts.A++; } else bench.push(p); });



  // --- TITOLARI MOBILE ---

  const startersContainer = document.getElementById('mobileStartersSlots');

  if(startersContainer) {

    startersContainer.innerHTML = '';

    startersContainer.style.display = "flex";

    startersContainer.style.flexDirection = "column";



    const createMobileRow = (container, role, count, isStarter) => {

      const row = document.createElement('div');

      row.className = "formation-row";

      for(let i=1; i<=count; i++){

        const slotId = (role === 'P' && count === 1) ? 'GK1' : role + i;

        const slotKey = (isStarter ? 'starter-' : 'bench-') + slotId;

        

        let p = assignedPlayers[slotKey];

        if(!p){

          const pool = isStarter ? starters : bench;

          p = pool.find(s => s.r === role && pool.filter(x => x.r === role).indexOf(s) === (role === 'P' && isStarter ? 0 : i-1));

        }

        row.appendChild(createMobileSlot(slotId, p, isStarter));

      }

      container.appendChild(row);

    };



    createMobileRow(startersContainer, 'P', 1, true);

    createMobileRow(startersContainer, 'D', defReq, true);

    createMobileRow(startersContainer, 'C', cenReq, true);

    createMobileRow(startersContainer, 'A', attReq, true);



    // --- PANCHINA MOBILE ---

    const benchContainer = document.getElementById('mobileBenchSlots');

    if(benchContainer) {

      benchContainer.innerHTML = '';

      benchContainer.style.display = "flex";

      benchContainer.style.flexDirection = "column";



      const rowGk = document.createElement('div');

      rowGk.className = "formation-row";

      

      const gkAssigned = assignedPlayers['starter-GK1'];

      const gkStarter = gkAssigned || starters.find(p=>p.r==="P");

      

      const p1 = assignedPlayers['bench-P1'] || (gkStarter ? {n:gkStarter.t, r:'P', isTeamName:true} : null);

      rowGk.appendChild(createMobileSlot('P1', p1, false));

      

      const starterGkBlock = gkStarter ? gkStarter.gkBlock : null;

      const otherBlock = (gkStarter && starterGkBlock) ? team.find(p => p.r === "P" && p.isGkBlock && p.gkBlock !== starterGkBlock && !selectedPlayers.includes(team.indexOf(p))) : null;

      const p2 = assignedPlayers['bench-P2'] || (otherBlock ? {n:otherBlock.t, r:'P', isTeamName:true} : null);

      rowGk.appendChild(createMobileSlot('P2', p2, false));

      

      benchContainer.appendChild(rowGk);



      createMobileRow(benchContainer, 'D', 3, false);

      createMobileRow(benchContainer, 'C', 3, false);

      createMobileRow(benchContainer, 'A', 3, false);

    }

  }

}



function createMobileSlot(slotId, player, isStarter){

  const div = document.createElement('div');

  div.className = 'slot mobile-slot ' + (player ? '' : 'empty');

  div.id = 'mobile-' + (isStarter ? 'starter-' : 'bench-') + slotId;

  

  const role = (slotId.startsWith('P') || slotId.startsWith('GK')) ? 'P' : slotId[0];

  const color = roleColors[role];

  

  if(player){

    div.innerHTML = `<div class="slot-content" style="flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 2px; padding: 2px;">

      <div class="badge" style="background:${color}; flex-shrink: 0; margin: 0; width: 16px; height: 16px; line-height: 16px; font-size: 10px; min-width: 16px;">${role}</div>

      <div class="player-meta" style="white-space: normal; word-break: break-word; font-size: 0.75rem; line-height: 1; width: 100%; font-weight: 500;">${player.n}</div>

    </div>`;

  } else {

    div.innerHTML = `<div class="slot-content" style="flex-direction: column; align-items: center; justify-content: center;">

      <div class="badge" style="background:${color}; flex-shrink: 0; margin: 0; width: 16px; height: 16px; line-height: 16px; font-size: 10px; min-width: 16px;">${role}</div>

      <div class="player-meta" style="color:var(--muted); font-size: 0.75rem;">+</div>

    </div>`;

  }

  

  div.onclick = () => handleMobileSlotClick(slotId, role, isStarter, player);

  return div;

}



function handleMobileSlotClick(slotId, role, isStarter, currentPlayer){

  if(!currentManager) return;

  if(role === 'P'){

    currentPickerSlot = {slotId, role, isStarter, currentPlayer};

    showGkChoiceModalForMobile(slotId, isStarter, currentPlayer);

    return;

  }

  if(currentPlayer && currentPlayer.isTeamName){

    showSlotPicker(role, null);

    return;

  }

  currentPickerSlot = {slotId, role, isStarter, currentPlayer};

  showSlotPicker(role, currentPlayer);

}

