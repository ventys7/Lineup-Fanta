import { useEffect, useMemo, useState } from "react";
import { UsersIcon } from "../icons";
import { TeamCard } from "../components/teams/TeamCard";
import type { TeamSquad, RoleKey } from "../components/teams/types";
import type { DashboardAsset } from "../types";
import { loadTeamProfiles, type TeamProfiles } from "../teamProfiles";

const ROLE_TARGETS: Record<RoleKey, number> = { P: 2, D: 8, C: 8, A: 6 };

type TeamsListProps = {
  assets: DashboardAsset[];
  leagueId: string;
  profilesUrl?: string;
};

export function TeamsList({ assets, leagueId, profilesUrl }: TeamsListProps) {
  const [profiles, setProfiles] = useState<TeamProfiles>({});

  useEffect(() => {
    let cancelled = false;

    loadTeamProfiles(leagueId, profilesUrl)
      .then((loadedProfiles) => {
        if (!cancelled) setProfiles(loadedProfiles);
      })
      .catch((error) => {
        console.warn("Team profiles load error", error);
        if (!cancelled) setProfiles({});
      });

    return () => {
      cancelled = true;
    };
  }, [leagueId, profilesUrl]);

  const teams = useMemo<TeamSquad[]>(() => {
    const grouped = new Map<string, DashboardAsset[]>();

    assets.forEach((asset) => {
      if (asset.isFreeAgent || !asset.ownerTag) return;
      const owner = asset.ownerTag.trim();
      if (!owner) return;
      const current = grouped.get(owner) ?? [];
      current.push(asset);
      grouped.set(owner, current);
    });

    const result = [...grouped.entries()].map(([managerName, players]) => {
      const roleCounts: Record<RoleKey, number> = { P: 0, D: 0, C: 0, A: 0 };
      players.forEach((player) => {
        if (player.role in roleCounts) roleCounts[player.role as RoleKey] += 1;
      });
      const isComplete = (Object.keys(ROLE_TARGETS) as RoleKey[]).every((role) => roleCounts[role] === ROLE_TARGETS[role]);
      const profile = profiles[managerName];

      return {
        managerName,
        credits: profile?.credits ?? null,
        logoUrl: profile?.logoUrl ?? "",
        players,
        isComplete,
        roleCounts,
        totalPlayers: players.length
      };
    });

    return result.sort((a, b) => {
      const aCompound = a.managerName.includes("-");
      const bCompound = b.managerName.includes("-");
      if (aCompound !== bCompound) return aCompound ? 1 : -1;
      return a.managerName.localeCompare(b.managerName, "it");
    });
  }, [assets, profiles]);

  return (
    <div className="tw-px-2 tw-py-3 sm:tw-px-5 sm:tw-py-7 lg:tw-px-7">
      <section className="lf-dashboard-card tw-mx-auto tw-max-w-7xl">
        {teams.length > 0 ? (
          <div className="lf-teams-grid">
            {teams.map((team) => <TeamCard key={team.managerName} team={team} />)}
          </div>
        ) : (
          <div className="lf-teams-empty">
            <UsersIcon size={34} />
            <h2>Nessuna rosa disponibile</h2>
            <p>Nel CSV non risultano asset assegnati a un proprietario.</p>
          </div>
        )}
      </section>
    </div>
  );
}
