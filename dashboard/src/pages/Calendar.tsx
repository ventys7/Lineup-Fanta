import { useEffect, useMemo, useRef, useState } from "react";
import { formatCalendarTotal, type CalendarMatchday } from "../calendar";
import type { MatchdayRegistry } from "../matchdayLinks";
import type { DashboardAsset } from "../types";
import {
  createRosterResolver,
  type PlayerRoleHint,
  type ResolvedRosterPlayer
} from "../playerResolver";
import {
  fetchMatchdayDetail,
  type MatchdayDetailResponse,
  type MatchdayPlayer,
  type MatchdayTeam
} from "../matchdayDetails";

interface CalendarProps {
  competitionLabel: string;
  leagueId: "fp" | "pd";
  leagueName: string;
  matchdays: CalendarMatchday[];
  expectedMatches: number;
  registry: MatchdayRegistry;
  assets: DashboardAsset[];
  detailRefreshToken: number;
}

type SelectedMatch = {
  index: number;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number | null;
  awayGoals: number | null;
};

// STEP 6L - Ruoli ricavati dalla posizione in formazione/panchina.
const BENCH_DISPLAY_SLOTS: Array<{
  sourceIndex: number;
  roleHint: PlayerRoleHint;
  row: number;
  column: string;
}> = [
  { sourceIndex: 0, roleHint: "P", row: 1, column: "2 / 4" },
  { sourceIndex: 1, roleHint: "P", row: 1, column: "4 / 6" },
  { sourceIndex: 2, roleHint: "D", row: 2, column: "1 / 3" },
  { sourceIndex: 5, roleHint: "C", row: 2, column: "3 / 5" },
  { sourceIndex: 8, roleHint: "A", row: 2, column: "5 / 7" },
  { sourceIndex: 3, roleHint: "D", row: 3, column: "1 / 3" },
  { sourceIndex: 6, roleHint: "C", row: 3, column: "3 / 5" },
  { sourceIndex: 9, roleHint: "A", row: 3, column: "5 / 7" },
  { sourceIndex: 4, roleHint: "D", row: 4, column: "1 / 3" },
  { sourceIndex: 7, roleHint: "C", row: 4, column: "3 / 5" },
  { sourceIndex: 10, roleHint: "A", row: 4, column: "5 / 7" }
];

const STARTER_MODULES = ["343", "352", "433", "442", "451", "532", "541"] as const;

function starterRoleSequence(module: string): PlayerRoleHint[] {
  return [
    "P",
    ...Array(Number(module[0])).fill("D"),
    ...Array(Number(module[1])).fill("C"),
    ...Array(Number(module[2])).fill("A")
  ] as PlayerRoleHint[];
}

function inferStarterRoleHints(
  team: MatchdayTeam,
  resolvePlayer: ReturnType<typeof createRosterResolver>
): PlayerRoleHint[] {
  const possibleRoles = team.starters.map((player, index) => {
    if (index === 0) return ["P"] as PlayerRoleHint[];

    const resolved = resolvePlayer(team.team, player.name || player.raw);
    const role = String(resolved.role ?? "").toUpperCase();

    if (["D", "C", "A"].includes(role)) {
      return [role as PlayerRoleHint];
    }

    // Un nome ambiguo non deve scatenare quattro ricerche globali.
    // Lo lasciamo compatibile con i ruoli di movimento e il modulo
    // viene dedotto dagli altri calciatori già riconosciuti.
    return ["D", "C", "A"] as PlayerRoleHint[];
  });

  const compatible = STARTER_MODULES
    .map(starterRoleSequence)
    .filter((sequence) => sequence.length === team.starters.length)
    .filter((sequence) => sequence.every((role, index) => (
      possibleRoles[index].length === 0
      || possibleRoles[index].includes(role as "P" | "D" | "C" | "A")
    )));

  if (compatible.length === 0) {
    return team.starters.map((_, index) => index === 0 ? "P" : null);
  }

  return team.starters.map((_, index) => {
    const roles = new Set(compatible.map((sequence) => sequence[index]));
    return roles.size === 1 ? compatible[0][index] : null;
  });
}

function sortByRealRound(matchdays: CalendarMatchday[]): CalendarMatchday[] {
  return [...matchdays].sort((left, right) => (
    left.realRoundNumber - right.realRoundNumber ||
    left.fantasyMatchdayNumber - right.fantasyMatchdayNumber
  ));
}

function getInitialRealRound(
  matchdays: CalendarMatchday[],
  activeFantasyMatchday: number | null
): number {
  const ordered = sortByRealRound(matchdays);
  const active = activeFantasyMatchday === null
    ? undefined
    : ordered.find(
      (matchday) => matchday.fantasyMatchdayNumber === activeFantasyMatchday
    );

  if (active) return active.realRoundNumber;

  const firstIncomplete = ordered.find(
    (matchday) => matchday.status === "da_calcolare"
  );

  return firstIncomplete?.realRoundNumber
    ?? ordered[ordered.length - 1]?.realRoundNumber
    ?? 0;
}

function PlayerIdentity({
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
    : switchType === "base"
      ? "Switch"
      : "";

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
          <small className={`is-switch is-${switchType}`}>
            {switchLabel}
          </small>
        )}
      </span>

      {resolved.matched && resolved.realTeam && (
        <span className="lf-match-detail-player__team">{resolved.realTeam}</span>
      )}
    </div>
  );
}

function PlayerRow({
  player,
  ownerName,
  resolvePlayer,
  roleHint = null
}: {
  player: MatchdayPlayer;
  ownerName: string;
  resolvePlayer: ReturnType<typeof createRosterResolver>;
  roleHint?: PlayerRoleHint;
}) {
  const resolved = resolvePlayer(ownerName, player.name || player.raw, roleHint);
  const replacementResolved = player.replacement
    ? resolvePlayer(ownerName, player.replacement.name, roleHint)
    : null;
  const switchClass = player.switchType ? ` is-switch-${player.switchType}` : "";

  return (
    <li className={`lf-match-detail-player${player.replacement ? " has-replacement" : ""}${switchClass}`}>
      <div className="lf-match-detail-player__main">
        <PlayerIdentity
          fallbackName={player.name || player.raw}
          resolved={resolved}
          captain={player.captain}
          switchType={player.switchType}
        />
        <b className={player.vote === null ? "is-missing" : ""}>
          {player.displayVote ?? player.status ?? "–"}
        </b>
      </div>

      {player.replacement && replacementResolved && (
        <div className="lf-match-detail-replacement">
          <span className="lf-match-detail-replacement__label">Entra</span>
          <PlayerIdentity
            fallbackName={player.replacement.name}
            resolved={replacementResolved}
          />
          <b>{player.replacement.displayVote ?? "–"}</b>
        </div>
      )}
    </li>
  );
}

function BenchPlayer({
  player,
  ownerName,
  resolvePlayer,
  roleHint = null,
  row,
  column
}: {
  player: MatchdayPlayer;
  ownerName: string;
  resolvePlayer: ReturnType<typeof createRosterResolver>;
  roleHint?: PlayerRoleHint;
  row: number;
  column: string;
}) {
  const resolved = resolvePlayer(ownerName, player.name || player.raw, roleHint);

  return (
    <li
      className={player.switchType ? `is-switch-${player.switchType}` : undefined}
      style={{ gridRow: row, gridColumn: column }}
      data-role-slot={roleHint ?? undefined}
    >
      <PlayerIdentity
        fallbackName={player.name || player.raw}
        resolved={resolved}
        captain={player.captain}
        switchType={player.switchType}
      />
    </li>
  );
}

function TeamPanel({
  side,
  team,
  resolvePlayer
}: {
  side: "home" | "away";
  team: MatchdayTeam;
  resolvePlayer: ReturnType<typeof createRosterResolver>;
}) {
  const starterRoleHints = useMemo(
    () => inferStarterRoleHints(team, resolvePlayer),
    [resolvePlayer, team]
  );

  return (
    <section className={`lf-match-detail-team is-${side}`}>
      <header>
        <div>
          <h3>{team.team}</h3>
          {team.alias && team.alias !== team.team && <small>Nel documento: {team.alias}</small>}
        </div>

        <div className="lf-match-detail-total">
          <span>Totale</span>
          <strong>{team.total === null ? "–" : formatCalendarTotal(team.total)}</strong>
          {team.playersCount !== null && <small>{team.playersCount} giocatori</small>}
        </div>
      </header>

      <div className="lf-match-detail-section">
        <h4>Titolari</h4>
        {team.starters.length > 0 ? (
          <ol className="lf-match-detail-players">
            {team.starters.map((player, index) => (
              <PlayerRow
                key={`${player.raw}-${index}`}
                player={player}
                ownerName={team.team}
                resolvePlayer={resolvePlayer}
                roleHint={starterRoleHints[index]}
              />
            ))}
          </ol>
        ) : (
          <p className="lf-match-detail-empty">Formazione non ancora inserita.</p>
        )}
      </div>

      <div className="lf-match-detail-section lf-match-detail-section--bench">
        <h4>A disposizione</h4>
        {team.bench.length > 0 ? (
          <ul className="lf-match-detail-bench">
            {BENCH_DISPLAY_SLOTS.map((slot) => {
              const player = team.bench[slot.sourceIndex];
              if (!player) return null;

              return (
                <BenchPlayer
                  key={`${player.raw}-${slot.sourceIndex}`}
                  player={player}
                  ownerName={team.team}
                  resolvePlayer={resolvePlayer}
                  roleHint={slot.roleHint}
                  row={slot.row}
                  column={slot.column}
                />
              );
            })}
          </ul>
        ) : (
          <p className="lf-match-detail-empty">Panchina non ancora inserita.</p>
        )}
      </div>
    </section>
  );
}

function MatchDetailModal({
  detail,
  error,
  loading,
  onClose,
  resolvePlayer,
  homeGoals,
  awayGoals
}: {
  detail: MatchdayDetailResponse | null;
  error: string;
  loading: boolean;
  onClose: () => void;
  resolvePlayer: ReturnType<typeof createRosterResolver>;
  homeGoals: number | null;
  awayGoals: number | null;
}) {
  const [mobileSide, setMobileSide] = useState<"home" | "away">("home");

  useEffect(() => {
    setMobileSide("home");
  }, [detail?.fantasyMatchdayNumber, detail?.matchup.homeTeam, detail?.matchup.awayTeam]);

  useEffect(() => {
    const scrollY = window.scrollY;
    const mobileLock = window.matchMedia("(max-width: 767px)").matches;
    const previous = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };

    document.body.style.overflow = "hidden";

    // Il body fixed serve solo su mobile per preservare lo scroll.
    // Su desktop causava un costoso relayout dell'intera pagina.
    if (mobileLock) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previous.overflow;
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      if (mobileLock) window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  return (
    <div
      className="lf-match-detail-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="lf-match-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Dettaglio scontro"
      >
        <header className="lf-match-detail-modal__header">
          <button type="button" onClick={onClose} aria-label="Chiudi confronto">×</button>
        </header>

        <div className="lf-match-detail-modal__body">
          <div className={`lf-match-detail-sticky${!loading && detail ? " has-tabs" : ""}`}>
            <div
              className="lf-match-detail-result"
              aria-label={homeGoals !== null && awayGoals !== null
                ? `Risultato ${homeGoals} a ${awayGoals}`
                : "Risultato non disponibile"}
            >
              {homeGoals !== null && awayGoals !== null ? (
                <>
                  <b>{homeGoals}</b>
                  <span>–</span>
                  <b>{awayGoals}</b>
                </>
              ) : (
                <b>–</b>
              )}
            </div>

            {!loading && detail && (
              <div className="lf-match-detail-mobile-tabs" role="tablist" aria-label="Scegli la formazione">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileSide === "home"}
                  className={mobileSide === "home" ? "is-active" : ""}
                  onClick={() => setMobileSide("home")}
                >
                  <span className="lf-match-detail-mobile-tabs__coach">
                    {detail.matchup.homeTeam}
                  </span>
                  <span className="lf-match-detail-mobile-tabs__summary">
                    <strong>
                      {detail.matchup.home.total === null
                        ? "–"
                        : formatCalendarTotal(detail.matchup.home.total)}
                    </strong>
                    {detail.matchup.home.playersCount !== null && (
                      <small>({detail.matchup.home.playersCount})</small>
                    )}
                  </span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileSide === "away"}
                  className={mobileSide === "away" ? "is-active" : ""}
                  onClick={() => setMobileSide("away")}
                >
                  <span className="lf-match-detail-mobile-tabs__coach">
                    {detail.matchup.awayTeam}
                  </span>
                  <span className="lf-match-detail-mobile-tabs__summary">
                    <strong>
                      {detail.matchup.away.total === null
                        ? "–"
                        : formatCalendarTotal(detail.matchup.away.total)}
                    </strong>
                    {detail.matchup.away.playersCount !== null && (
                      <small>({detail.matchup.away.playersCount})</small>
                    )}
                  </span>
                </button>
              </div>
            )}
          </div>

          {loading && (
            <div className="lf-match-detail-state">
              <div className="lf-spinner" />
              <p>Caricamento di formazioni, voti e sostituzioni…</p>
            </div>
          )}

          {!loading && error && (
            <div className="lf-match-detail-state is-error">
              <strong>Confronto non disponibile</strong>
              <p>{error}</p>
            </div>
          )}

          {!loading && detail && (
            <div className={`lf-match-detail-grid is-mobile-${mobileSide}`}>
              <TeamPanel side="home" team={detail.matchup.home} resolvePlayer={resolvePlayer} />
              <TeamPanel side="away" team={detail.matchup.away} resolvePlayer={resolvePlayer} />
            </div>
          )}
        </div>
</section>
    </div>
  );
}

export function Calendar({
  competitionLabel,
  leagueId,
  leagueName,
  matchdays,
  expectedMatches,
  registry,
  assets,
  detailRefreshToken
}: CalendarProps) {
  const resolvePlayer = useMemo(() => createRosterResolver(assets), [assets]);
  const orderedMatchdays = useMemo(() => sortByRealRound(matchdays), [matchdays]);
  const [selectedRealRound, setSelectedRealRound] = useState(
    () => getInitialRealRound(orderedMatchdays, registry.activeFantasyMatchday)
  );
  const [selectedMatch, setSelectedMatch] = useState<SelectedMatch | null>(null);
  const [detailStatus, setDetailStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [detail, setDetail] = useState<MatchdayDetailResponse | null>(null);
  const [detailError, setDetailError] = useState("");
  const previousActiveMatchday = useRef<number | null | undefined>(undefined);
  const loadedDetailKey = useRef<string | null>(null);
  const detailSignature = useRef<string>("");

  useEffect(() => {
    const activeChanged = previousActiveMatchday.current !== registry.activeFantasyMatchday;
    previousActiveMatchday.current = registry.activeFantasyMatchday;

    const active = registry.activeFantasyMatchday === null
      ? undefined
      : orderedMatchdays.find(
        (matchday) => matchday.fantasyMatchdayNumber === registry.activeFantasyMatchday
      );

    if (activeChanged && active) {
      setSelectedRealRound(active.realRoundNumber);
      return;
    }

    setSelectedRealRound((currentRealRound) => (
      orderedMatchdays.some(
        (matchday) => matchday.realRoundNumber === currentRealRound
      )
        ? currentRealRound
        : getInitialRealRound(orderedMatchdays, registry.activeFantasyMatchday)
    ));
  }, [orderedMatchdays, registry.activeFantasyMatchday]);

  const selectedIndex = useMemo(
    () => orderedMatchdays.findIndex(
      (matchday) => matchday.realRoundNumber === selectedRealRound
    ),
    [orderedMatchdays, selectedRealRound]
  );
  const selected = selectedIndex >= 0 ? orderedMatchdays[selectedIndex] : undefined;
  const selectedLink = selected
    ? registry.matchdays.get(selected.fantasyMatchdayNumber)
    : undefined;

  useEffect(() => {
    if (!selectedMatch || !selected || !selectedLink) return;

    const detailKey = [
      leagueId,
      selected.fantasyMatchdayNumber,
      selectedMatch.index,
      selectedMatch.homeTeam,
      selectedMatch.awayTeam
    ].join(":");
    const firstLoadForMatch = loadedDetailKey.current !== detailKey;
    const controller = new AbortController();

    if (firstLoadForMatch) {
      setDetailStatus("loading");
      setDetail(null);
      setDetailError("");
    }

    fetchMatchdayDetail({
      leagueId,
      fantasyMatchdayNumber: selected.fantasyMatchdayNumber,
      matchIndex: selectedMatch.index,
      homeTeam: selectedMatch.homeTeam,
      awayTeam: selectedMatch.awayTeam,
      signal: controller.signal
    })
      .then((response) => {
        if (controller.signal.aborted) return;
        loadedDetailKey.current = detailKey;
        const nextSignature = JSON.stringify(response);
        if (detailSignature.current !== nextSignature) {
          detailSignature.current = nextSignature;
          setDetail(response);
        }
        setDetailError("");
        setDetailStatus("ready");
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Matchday detail load error", error);

        if (!firstLoadForMatch) {
          console.warn("Aggiornamento interno dello scontro non riuscito: mantengo gli ultimi dati validi.");
          return;
        }

        setDetailError(
          "Il documento esiste, ma il dettaglio non è stato letto correttamente. Puoi comunque aprire l’originale."
        );
        setDetailStatus("error");
      });

    return () => controller.abort();
  }, [detailRefreshToken, leagueId, selected, selectedLink, selectedMatch]);

  if (orderedMatchdays.length === 0) {
    return (
      <div className="lf-calendar-shell">
        <section className="lf-dashboard-card lf-calendar-state">
          <strong>Calendario non ancora disponibile</strong>
          <p>La fonte di {leagueName} non è stata ancora configurata.</p>
        </section>
      </div>
    );
  }

  if (!selected) return null;


  return (
    <div className="lf-calendar-shell">
      <section className="lf-dashboard-card lf-calendar-card">
        <div className="lf-calendar-toolbar">
          <button
            type="button"
            className="lf-calendar-nav"
            onClick={() => setSelectedRealRound(
              orderedMatchdays[selectedIndex - 1].realRoundNumber
            )}
            disabled={selectedIndex <= 0}
            aria-label="Giornata precedente"
          >
            ‹
          </button>

          <label className="lf-calendar-select-wrap">
            <span>Giornata {competitionLabel}</span>
            <select
              value={selected.realRoundNumber}
              onChange={(event) => setSelectedRealRound(Number(event.target.value))}
            >
              {orderedMatchdays.map((matchday) => (
                <option
                  key={`${matchday.realRoundNumber}-${matchday.fantasyMatchdayNumber}`}
                  value={matchday.realRoundNumber}
                >
                  {matchday.realRoundNumber}
                </option>
              ))}
            </select>
            <small>Giornata Fanta {selected.fantasyMatchdayNumber}</small>
          </label>

          <button
            type="button"
            className="lf-calendar-nav"
            onClick={() => setSelectedRealRound(
              orderedMatchdays[selectedIndex + 1].realRoundNumber
            )}
            disabled={selectedIndex >= orderedMatchdays.length - 1}
            aria-label="Giornata successiva"
          >
            ›
          </button>
        </div>

        <div className="lf-calendar-summary">
          <div className="lf-calendar-status-wrap">
            <span className={`lf-calendar-status lf-calendar-status--${selected.status}`}>
              {selected.status === "calcolata" ? "Calcolata" : "Da calcolare"}
            </span>
          </div>
        </div>

        <div className="lf-calendar-matches">
          {selected.matches.map((match, index) => {
            const calculated = match.homeGoals !== null && match.awayGoals !== null;
            const interactive = Boolean(selectedLink);

            return (
              <article
                className={`lf-calendar-match${calculated ? "" : " is-pending"}${interactive ? " is-clickable" : ""}`}
                key={`${selected.fantasyMatchdayNumber}-${match.homeTeam}-${match.awayTeam}-${index}`}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={interactive
                  ? `Apri formazioni di ${match.homeTeam} contro ${match.awayTeam}`
                  : undefined}
                onClick={interactive ? () => setSelectedMatch({
                  index,
                  homeTeam: match.homeTeam,
                  awayTeam: match.awayTeam,
                  homeGoals: match.homeGoals,
                  awayGoals: match.awayGoals
                }) : undefined}
                onKeyDown={interactive ? (event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedMatch({
                      index,
                      homeTeam: match.homeTeam,
                      awayTeam: match.awayTeam,
                      homeGoals: match.homeGoals,
                      awayGoals: match.awayGoals
                    });
                  }
                } : undefined}
              >
                <div className="lf-calendar-team lf-calendar-team--home">
                  <strong>{match.homeTeam}</strong>
                  {match.homeTotal !== null && <span>{formatCalendarTotal(match.homeTotal)}</span>}
                </div>

                <div className="lf-calendar-score" aria-label={calculated
                  ? `${match.homeGoals} a ${match.awayGoals}`
                  : "Risultato non disponibile"}
                >
                  {calculated ? (
                    <>
                      <b>{match.homeGoals}</b>
                      <i>–</i>
                      <b>{match.awayGoals}</b>
                    </>
                  ) : (
                    <em>–</em>
                  )}
                </div>

                <div className="lf-calendar-team lf-calendar-team--away">
                  <strong>{match.awayTeam}</strong>
                  {match.awayTotal !== null && <span>{formatCalendarTotal(match.awayTotal)}</span>}
                </div>

                {match.note && <p className="lf-calendar-note">{match.note}</p>}
              </article>
            );
          })}
        </div>

        {selectedLink && (
          <div className="lf-calendar-source-link-wrap">
            <span>Clicca uno scontro per vedere formazioni, voti e sostituzioni.</span>
            <a href={selectedLink.url} target="_blank" rel="noopener noreferrer">
              Documento completo
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </section>

      {selectedMatch && selectedLink && (
        <MatchDetailModal
          detail={detail}
          error={detailError}
          loading={detailStatus === "loading"}
          resolvePlayer={resolvePlayer}
          homeGoals={selectedMatch.homeGoals}
          awayGoals={selectedMatch.awayGoals}
          onClose={() => {
            loadedDetailKey.current = null;
            detailSignature.current = "";
            setSelectedMatch(null);
            setDetail(null);
            setDetailStatus("idle");
            setDetailError("");
          }}
        />
      )}
    </div>
  );
}
