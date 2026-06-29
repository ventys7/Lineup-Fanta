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

function getSwitchLineup() {
  if (window.FormationModel?.getSwitchLineup) {
    return window.FormationModel.getSwitchLineup();
  }

  return { team: [], starters: [], bench: [] };
}

function getStarters() {
  return getSwitchLineup().starters.map((entry) => entry.player);
}

function getBench() {
  return getSwitchLineup().bench.map((entry) => entry.player);
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
