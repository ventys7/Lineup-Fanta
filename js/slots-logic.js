/* SLOTS LOGIC - Business logic for slots */

function openSlotPicker(slotType, slotId) {
  if (!currentManager) return;

  const role = slotId.startsWith("GK") ? "P" : slotId[0];

  if (role === "P") {
    let currentPlayer = null;
    const starterGkIndex = slotAssignments["starter-GK1"];

    if (starterGkIndex !== undefined) {
      currentPlayer = db[currentManager].players[starterGkIndex];
    } else {
      const starters = getStarters();
      currentPlayer = starters.find((player) => player.r === "P") || null;
    }

    showGkChoiceModalForMobile(slotId, slotType === "starter", currentPlayer);
    return;
  }

  const slotKey = slotType + "-" + slotId;
  const assignedIndex = slotAssignments[slotKey];
  const team = db[currentManager].players;
  const currentPlayer = assignedIndex !== undefined ? team[assignedIndex] : null;

  currentPickerSlot = {
    slotId,
    role,
    isStarter: slotType === "starter",
    currentPlayer
  };
  showSlotPicker(role, currentPlayer);
}
