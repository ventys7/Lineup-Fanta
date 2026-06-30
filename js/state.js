/* SHARED STATE - Used across multiple modules */
let currentManager = "";
let selectedPlayers = [];
let slotAssignments = {};
let draggedPlayerIndex = null;
let draggedPlayerRole = null;
let isModalOpen = false;
let isMobile = window.matchMedia("(max-width: 767px)").matches;

/* Modal state management */
function setModalOpen(open){
  isModalOpen = open;
  if(open){
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
}

/* Blocked GK blocks */
let disabledBlocks = new Set();
