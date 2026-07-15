import type { DisciplineData } from "../discipline";

function Empty({ text }: { text: string }) {
  return <p className="lf-discipline-empty">{text}</p>;
}

function formatDate(value?: string) {
  const match = String(value || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if (!match) return value || "";
  const year = match[3].length === 2 ? 2000 + Number(match[3]) : Number(match[3]);
  const date = new Date(Date.UTC(year, Number(match[2]) - 1, Number(match[1])));
  if (Number.isNaN(date.getTime())) return value || "";
  return new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

function fallbackReason(note: string | undefined, type: "recall" | "penalty") {
  const clean = String(note || "")
    .replace(/^\d{1,2}\/\d{1,2}\/\d{2,4}\s*[-–—]?\s*/i, "")
    .replace(/^.*?\s+(?:riceve|ha ricevuto)\s*/i, "")
    .replace(/^un\s+richiamo\s+per\s+/i, "")
    .replace(/^una?\s+penalizzazione(?:\s+di\s+-?\d+\s+punt[io])?\s*(?:per)?\s*/i, "")
    .replace(/\(\s*\d+\s+richiam[oi]\s*\)\s*$/i, "")
    .trim();
  return clean || (type === "penalty" ? "Penalizzazione prevista dal regolamento" : "Richiamo disciplinare");
}

function ItemCopy({ name, date, reason, note, type }: {
  name: string;
  date?: string;
  reason?: string;
  note?: string;
  type: "recall" | "penalty";
}) {
  return (
    <div className="lf-discipline-item-copy">
      <strong>{name}</strong>
      <span>{reason || fallbackReason(note, type)}</span>
      {date && <time>{formatDate(date)}</time>}
    </div>
  );
}

export function DisciplineBoard({ data, loading, error }: { data: DisciplineData; loading: boolean; error: string }) {
  return (
    <section className="lf-dashboard-card lf-discipline-card" aria-label="Richiami e penalizzazioni">
      <div className="lf-discipline-column">
        <header><span>!</span><h3>Richiami</h3></header>
        {loading ? <Empty text="Caricamento…" /> : error ? <Empty text={error} /> : !data.configured ? <Empty text="Documento non configurato." /> : data.recalls.length ? (
          <div className="lf-discipline-list">
            {data.recalls.map((item, index) => (
              <article key={`${item.name}-${item.date || index}-${index}`}>
                <ItemCopy name={item.name} date={item.date} reason={item.reason} note={item.note} type="recall" />
                <b title={`${item.count}° richiamo`}>{item.count}° richiamo</b>
              </article>
            ))}
          </div>
        ) : <Empty text="Nessun richiamo." />}
      </div>
      <div className="lf-discipline-column lf-discipline-column--penalties">
        <header><span>−</span><h3>Penalizzazioni</h3></header>
        {loading ? <Empty text="Caricamento…" /> : error ? <Empty text={error} /> : !data.configured ? <Empty text="Documento non configurato." /> : data.penalties.length ? (
          <div className="lf-discipline-list">
            {data.penalties.map((item, index) => {
              const points = typeof item.points === "number" ? Math.abs(item.points) : null;
              const label = points === null ? "Penalità" : `−${points} ${points === 1 ? "punto" : "punti"}`;
              return (
                <article key={`${item.name}-${item.date || index}-${index}`}>
                  <ItemCopy name={item.name} date={item.date} reason={item.reason} note={item.note} type="penalty" />
                  <b title={points === null ? "Penalizzazione" : `${points} ${points === 1 ? "punto" : "punti"} di penalizzazione`}>{label}</b>
                </article>
              );
            })}
          </div>
        ) : <Empty text="Nessuna penalizzazione." />}
      </div>
    </section>
  );
}
