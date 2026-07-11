import { useState } from "react";
import { ChevronDownIcon, ShieldIcon } from "../../icons";
import type { DashboardAsset } from "../../types";
import type { RoleKey } from "./types";

type Props = {
  players: DashboardAsset[];
  role: RoleKey;
  label: string;
};

function splitGoalkeepers(name: string) {
  return name.split(/\s+-\s+/).map((part) => part.trim()).filter(Boolean);
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

export function SquadRoleSection({ players, role, label }: Props) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());
  const rolePlayers = players.filter((player) => player.role === role).sort((a, b) => {
    const priceDiff = b.purchasePrice - a.purchasePrice;
    if (priceDiff !== 0) return priceDiff;
    return a.displayName.localeCompare(b.displayName, "it");
  });

  const toggleBlock = (assetCode: string) => {
    setExpandedBlocks((current) => {
      const next = new Set(current);
      if (next.has(assetCode)) next.delete(assetCode);
      else next.add(assetCode);
      return next;
    });
  };

  return (
    <section className="lf-squad-section">
      <div className="lf-squad-section__title">{label}{role === "P" ? " (Blocchi)" : ""}</div>
      {rolePlayers.length === 0 ? (
        <div className="lf-squad-empty">—</div>
      ) : (
        <div className="lf-squad-list">
          {rolePlayers.map((player) => {
            const isBlock = role === "P" && (player.type === "goalkeeper_block" || /\s+-\s+/.test(player.displayName));
            const expanded = expandedBlocks.has(player.assetCode);
            const goalkeepers = isBlock ? splitGoalkeepers(player.displayName) : [];

            const rowContent = (
              <>
                <div className="lf-squad-item__left">
                  <div className={`lf-squad-avatar lf-squad-avatar--${role.toLowerCase()}`} aria-hidden="true">
                    {isBlock ? <ShieldIcon size={17} /> : initials(player.displayName)}
                  </div>
                  <div className="lf-squad-item__copy">
                    <div className="lf-squad-item__name">
                      {isBlock ? `Blocco ${player.realTeam || player.displayName}` : player.displayName}
                      {!player.active && " *"}
                      {isBlock && <ChevronDownIcon size={14} className={expanded ? "lf-chevron-open" : ""} />}
                    </div>
                    <div className="lf-squad-item__team">{isBlock ? `${goalkeepers.length} portieri` : (player.realTeam || "—")}</div>
                  </div>
                </div>
                <div className="lf-squad-values">
                  <span><small>Q</small><strong>{player.quotation || "—"}</strong></span>
                  <span><small>P</small><strong className="lf-squad-price">{player.purchasePrice || "—"}</strong></span>
                </div>
              </>
            );

            return (
              <div key={player.assetCode} className="lf-squad-item-wrap">
                {isBlock ? (
                  <button
                    type="button"
                    className="lf-squad-item lf-squad-item--clickable"
                    onClick={() => toggleBlock(player.assetCode)}
                    aria-expanded={expanded}
                  >
                    {rowContent}
                  </button>
                ) : (
                  <div className="lf-squad-item">{rowContent}</div>
                )}

                {isBlock && expanded && (
                  <div className="lf-squad-goalkeepers">
                    {goalkeepers.map((goalkeeper) => (
                      <div key={goalkeeper} className="lf-squad-goalkeeper">
                        <div className="lf-squad-goalkeeper__avatar">P</div>
                        <span>{goalkeeper}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
