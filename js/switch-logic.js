/* SWITCH LOGIC - Formation adapters and legacy helpers */

function clearSwitch() {
  if (window.LineupSwitch) {
    window.LineupSwitch.clear("all", { resetMode: true });
    return;
  }

  switchStarterIndex = null;
  switchBenchIndex = null;
  switchPlus = false;
  if (typeof updateSwitchUI === "function") updateSwitchUI();
}

function getStarters() {
  const module = document.getElementById("moduleSelect").value;
  const defReq = parseInt(module[0], 10);
  const cenReq = parseInt(module[1], 10);
  const attReq = parseInt(module[2], 10);

  const team = db[currentManager]?.players || [];
  const assignedPlayers = {};
  const assignedIndices = new Set();

  for (const slotKey in slotAssignments) {
    const playerIdx = slotAssignments[slotKey];
    if (selectedPlayers.includes(playerIdx) && slotKey.startsWith("starter-")) {
      assignedPlayers[slotKey] = team[playerIdx];
      assignedIndices.add(playerIdx);
    }
  }

  const unassignedPlayers = selectedPlayers
    .filter((index) => !assignedIndices.has(index) && index >= 0 && index < team.length)
    .map((index) => team[index]);

  const counts = { P: 0, D: 0, C: 0, A: 0 };
  const starters = [];

  unassignedPlayers.filter((player) => player.r === "P").forEach((player) => {
    if (counts.P < 1) {
      starters.push(player);
      counts.P += 1;
    }
  });

  unassignedPlayers.filter((player) => player.r === "D").forEach((player) => {
    if (counts.D < defReq) {
      starters.push(player);
      counts.D += 1;
    }
  });

  unassignedPlayers.filter((player) => player.r === "C").forEach((player) => {
    if (counts.C < cenReq) {
      starters.push(player);
      counts.C += 1;
    }
  });

  unassignedPlayers.filter((player) => player.r === "A").forEach((player) => {
    if (counts.A < attReq) {
      starters.push(player);
      counts.A += 1;
    }
  });

  Object.values(assignedPlayers).forEach((player) => {
    if (!starters.includes(player)) starters.push(player);
  });

  return starters;
}

function getBench() {
  const team = db[currentManager]?.players || [];
  const assignedBenchPlayers = {};
  const assignedIndices = new Set();

  for (const slotKey in slotAssignments) {
    const playerIdx = slotAssignments[slotKey];
    if (selectedPlayers.includes(playerIdx) && slotKey.startsWith("bench-")) {
      assignedBenchPlayers[slotKey] = team[playerIdx];
      assignedIndices.add(playerIdx);
    }
  }

  const unassignedPlayers = selectedPlayers
    .filter((index) => !assignedIndices.has(index) && index >= 0 && index < team.length)
    .map((index) => team[index]);

  const counts = { P: 0, D: 0, C: 0, A: 0 };
  const bench = [];

  unassignedPlayers.filter((player) => player.r === "P").forEach((player) => bench.push(player));
  unassignedPlayers.filter((player) => player.r === "D").forEach((player) => {
    if (counts.D < 3) {
      bench.push(player);
      counts.D += 1;
    }
  });
  unassignedPlayers.filter((player) => player.r === "C").forEach((player) => {
    if (counts.C < 3) {
      bench.push(player);
      counts.C += 1;
    }
  });
  unassignedPlayers.filter((player) => player.r === "A").forEach((player) => {
    if (counts.A < 3) {
      bench.push(player);
      counts.A += 1;
    }
  });

  Object.values(assignedBenchPlayers).forEach((player) => {
    if (!bench.includes(player)) bench.push(player);
  });

  return bench;
}

function getSwitchLineup() {
  const team = db[currentManager]?.players || [];

  if (typeof buildLineupModel === "function") {
    const model = buildLineupModel();
    if (model) {
      return {
        team: model.team,
        starters: model.starters,
        bench: model.bench
      };
    }
  }

  return {
    team,
    starters: getStarters()
      .map((player) => ({ index: team.indexOf(player), player }))
      .filter((entry) => entry.index >= 0),
    bench: getBench()
      .map((player) => ({ index: team.indexOf(player), player }))
      .filter((entry) => entry.index >= 0)
  };
}

function getSwitchStarters() {
  return (window.LineupSwitch?.getCandidates().starters || []).map((entry) => entry.player);
}

function getSwitchBench() {
  return (window.LineupSwitch?.getCandidates().bench || []).map((entry) => entry.player);
}

function getStarterIndexFromSwitch() {
  return window.LineupSwitch?.getState().starterIndex ?? switchStarterIndex;
}

function getBenchIndexFromSwitch() {
  return window.LineupSwitch?.getState().benchIndex ?? switchBenchIndex;
}
