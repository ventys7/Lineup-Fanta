import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RoseApp from "./RoseApp";
import CalendarApp from "./CalendarApp";
import StandingsApp from "./StandingsApp";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { createLogger } from "./debug/logger";
import "./styles/runtime.css";
import "./styles/listone.css";
import "./styles/teams.css";
import "./styles/calendar.css";
import "./styles/standings.css";
import "./styles/match-detail/01-core.css";
import "./styles/match-detail/02-calendar-mobile.css";
import "./styles/match-detail/03-modal.css";
import "./styles/match-detail/04-player-identity.css";
import "./styles/match-detail/05-layout.css";
import "./styles/match-detail/06-sizing.css";
import "./styles/match-detail/07-sticky-symmetry.css";
import "./styles/match-detail/08-mobile-bench.css";

const log = createLogger("bootstrap");

function mount(rootId: string, name: string, app: React.ReactNode): void {
  const root = document.getElementById(rootId);
  if (!root) {
    log.debug("root not present", { rootId, name });
    return;
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary name={name}>{app}</ErrorBoundary>
    </React.StrictMode>
  );
  log.debug("mounted", { rootId, name });
}

window.addEventListener("error", (event) => {
  log.error("unhandled window error", event.error ?? event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  log.error("unhandled promise rejection", event.reason);
});

mount("league-dashboard-root", "Listone", <App />);
mount("league-rose-root", "Rose", <RoseApp />);
mount("league-calendar-root", "Calendario", <CalendarApp />);
mount("league-standings-root", "Classifica", <StandingsApp />);
