import { ROLE_BADGE_CLASSES } from "../constants";
import type { DashboardAsset } from "../types";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

export function PlayerMobileCard({ player }: { player: DashboardAsset }) {
  return (
    <article className="tw-p-3 tw-transition hover:tw-bg-slate-50">
      <div className="tw-flex tw-items-start tw-gap-3">
        <div className="lf-player-avatar lf-player-avatar--mobile" aria-hidden="true">{initials(player.displayName)}</div>
        <div className="tw-min-w-0 tw-flex-1">
          <div className="tw-mb-1 tw-flex tw-items-center tw-gap-2">
            <span className={ROLE_BADGE_CLASSES[player.role] ?? ROLE_BADGE_CLASSES.U}>{player.role || "?"}</span>
            <span className={`tw-truncate tw-font-semibold ${player.active ? "tw-text-slate-900" : "tw-italic tw-text-slate-400"}`}>
              {player.displayName}{!player.active && " *"}
            </span>
          </div>
          <div className="tw-mb-2 tw-truncate tw-text-xs tw-text-slate-500">{player.realTeam || "—"}</div>
          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-gap-y-1 tw-text-xs">
            <span><span className="tw-text-slate-400">Quot:</span> <strong className="tw-text-slate-900">{player.quotation || "—"}</strong></span>
            <span><span className="tw-text-slate-400">Acq:</span> <strong className="tw-text-[var(--primary)]">{player.purchasePrice || "—"}</strong></span>
            <span className={`tw-max-w-full tw-truncate ${player.ownerTag ? "tw-text-slate-500" : "tw-italic tw-text-slate-400"}`}>
              👤 {player.ownerTag || "Svincolato"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
