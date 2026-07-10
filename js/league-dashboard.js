/* LEAGUE DASHBOARD - Tab interne condivise, dati sempre legati alla lega corrente. */
(function () {
  if (window.LINEUP_FANTA?.route !== "league") return;

  const tabs = Array.from(document.querySelectorAll("[data-league-tab]"));
  const views = Array.from(document.querySelectorAll("[data-league-view]"));
  const formationControls = document.getElementById("formationControls");
  const formationFab = document.getElementById("fabCopy");
  const validSections = new Set(views.map((view) => view.dataset.leagueView));

  function activateSection(section, options = {}) {
    const nextSection = validSections.has(section) ? section : "formation";
    const isFormation = nextSection === "formation";

    tabs.forEach((tab) => {
      const active = tab.dataset.leagueTab === nextSection;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    views.forEach((view) => {
      view.hidden = view.dataset.leagueView !== nextSection;
    });

    if (formationControls) formationControls.hidden = !isFormation;
    if (formationFab) formationFab.hidden = !isFormation;
    if (!isFormation && typeof setRosterOpen === "function") setRosterOpen(false);

    document.documentElement.dataset.leagueSection = nextSection;

    if (options.keepTabVisible && window.matchMedia("(max-width: 767px)").matches) {
      const activeTab = tabs.find((tab) => tab.dataset.leagueTab === nextSection);
      window.requestAnimationFrame(() => {
        activeTab?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      });
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateSection(tab.dataset.leagueTab, { keepTabVisible: true });
    });

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
      activateSection(tabs[nextIndex].dataset.leagueTab, { keepTabVisible: true });
    });
  });

  activateSection("formation");
})();

/* STEP 1C - Mantiene visibile e centrata la tab attiva su mobile. */
