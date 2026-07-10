import { ChevronDownIcon, ChevronUpIcon } from "../icons";
import type { SortDirection, SortKey } from "../types";

type Props = {
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
};

function SortArrow({ active, direction }: { active: boolean; direction: SortDirection }) {
  if (!active) return null;
  return direction === "asc" ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />;
}

export function PlayerListHeader({ sortKey, sortDirection, onSort }: Props) {
  return (
    <div className="tw-hidden tw-grid-cols-12 tw-gap-4 tw-border-b tw-border-slate-200 tw-bg-slate-50 tw-px-6 tw-py-4 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-slate-500 md:tw-grid">
      <div className="tw-col-span-4">Giocatore</div>
      <button type="button" className="lf-sort tw-col-span-2" onClick={() => onSort("position")}>
        Ruolo <SortArrow active={sortKey === "position"} direction={sortDirection} />
      </button>
      <button type="button" className="lf-sort tw-col-span-2 tw-justify-center" onClick={() => onSort("quotation")}>
        Quot. <SortArrow active={sortKey === "quotation"} direction={sortDirection} />
      </button>
      <button type="button" className="lf-sort tw-col-span-2 tw-justify-center" onClick={() => onSort("purchasePrice")}>
        Prezzo <SortArrow active={sortKey === "purchasePrice"} direction={sortDirection} />
      </button>
      <div className="tw-col-span-2">Proprietario</div>
    </div>
  );
}
