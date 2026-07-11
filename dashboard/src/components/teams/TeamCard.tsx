import { useState } from "react";
import { AlertCircleIcon, CoinsIcon, ShieldIcon } from "../../icons";
import { SquadRoleSection } from "./SquadRoleSection";
import type { RoleKey, TeamSquad } from "./types";

const ROLE_TARGETS: Record<RoleKey, number> = { P: 2, D: 8, C: 8, A: 6 };
const numberFormatter = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 });

export function TeamCard({ team }: { team: TeamSquad }) {
  const [activeFilter, setActiveFilter] = useState<"ALL" | RoleKey>("ALL");
  const [logoFailed, setLogoFailed] = useState(false);

  const toggleFilter = (role: RoleKey) => {
    setActiveFilter((current) => current === role ? "ALL" : role);
  };

  const showLogo = Boolean(team.logoUrl && !logoFailed);
  const creditsLabel = team.credits === null ? "—" : numberFormatter.format(team.credits);

  return (
    <article className="lf-team-card">
      <header className="lf-team-card__header">
        <div className="lf-team-card__identity">
          <div className={`lf-team-card__avatar ${showLogo ? "has-logo" : ""}`}>
            {showLogo ? (
              <img
                src={team.logoUrl}
                alt={`Logo di ${team.managerName}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setLogoFailed(true)}
              />
            ) : team.managerName.charAt(0).toUpperCase()}
          </div>
          <div className="lf-team-card__copy">
            <span className="lf-team-card__eyebrow">Allenatore</span>
            <h2 title={team.managerName}>{team.managerName}</h2>
          </div>
        </div>

        <div className="lf-team-card__meta">
          <div className="lf-team-card__credits">
            <span>Crediti</span>
            <strong><CoinsIcon size={16} /> {creditsLabel}</strong>
          </div>
          <div className={`lf-team-status ${team.isComplete ? "lf-team-status--complete" : "lf-team-status--incomplete"}`}>
            {team.isComplete ? <ShieldIcon size={13} /> : <AlertCircleIcon size={13} />}
            {team.isComplete ? "ROSA COMPLETA" : "INCOMPLETA"}
          </div>
        </div>
      </header>

      <div className="lf-team-role-filters" aria-label={`Filtra la rosa di ${team.managerName} per ruolo`}>
        {(Object.keys(ROLE_TARGETS) as RoleKey[]).map((role) => {
          const complete = team.roleCounts[role] === ROLE_TARGETS[role];
          return (
            <button
              key={role}
              type="button"
              onClick={() => toggleFilter(role)}
              className={`${activeFilter === role ? "is-active" : ""} ${complete ? "is-complete" : ""}`}
            >
              {role}: {team.roleCounts[role]}/{ROLE_TARGETS[role]}
            </button>
          );
        })}
      </div>

      <div className="lf-team-roster-frame">
        <div className="lf-team-roster">
          {(activeFilter === "ALL" || activeFilter === "P") && <SquadRoleSection players={team.players} role="P" label="Portieri" />}
          {(activeFilter === "ALL" || activeFilter === "D") && <SquadRoleSection players={team.players} role="D" label="Difensori" />}
          {(activeFilter === "ALL" || activeFilter === "C") && <SquadRoleSection players={team.players} role="C" label="Centrocampisti" />}
          {(activeFilter === "ALL" || activeFilter === "A") && <SquadRoleSection players={team.players} role="A" label="Attaccanti" />}
        </div>
      </div>
    </article>
  );
}
