import type { MatchdayPlayer } from "../../matchdayDetails";
import type { ResolvedRosterPlayer } from "../../playerResolver";

export function PlayerIdentity({
  fallbackName,
  resolved,
  captain = false,
  switchType = null
}: {
  fallbackName: string;
  resolved: ResolvedRosterPlayer;
  captain?: boolean;
  switchType?: MatchdayPlayer["switchType"];
}) {
  const displayName = resolved.displayName || fallbackName;
  const switchLabel = switchType === "plus"
    ? "Switch+"
    : switchType === "base" ? "Switch" : "";

  return (
    <div className={`lf-match-detail-player__identity${resolved.matched && resolved.role ? " has-role" : ""}`}>
      <span className="lf-match-detail-player__headline">
        {resolved.matched && resolved.role && (
          <em className="lf-match-detail-role" data-role={resolved.role.toLowerCase()}>
            {resolved.role}
          </em>
        )}
        <span
          className="lf-match-detail-player__name"
          title={resolved.matched && resolved.originalName !== displayName
            ? `Nel documento: ${resolved.originalName}`
            : undefined}
        >
          {displayName}
        </span>
        {captain && <small className="is-captain">C</small>}
        {switchLabel && (
          <small className={`is-switch is-${switchType}`}>{switchLabel}</small>
        )}
      </span>

      {resolved.matched && resolved.realTeam && (
        <span className="lf-match-detail-player__team">{resolved.realTeam}</span>
      )}
    </div>
  );
}
