import Link from "next/link";
import { HOSTE_LITE, type Vyzkum } from "@/lib/archiv";

/* Překreslený graf z cizího výzkumu: nadpis a čísla ze zdroje, zvýrazněné řádky pudrovou. */
const cz = (n: number) => n.toLocaleString("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function GrafVyzkum({ v }: { v: Vyzkum }) {
  const max = 50;
  const osoba = v.osoba ? HOSTE_LITE.find((h) => h.slug === v.osoba) : undefined;
  return (
    <figure className="m-0 flex flex-col gap-5 p-6 md:p-7 bg-[var(--wine-bg)] rounded-[4px]">
      <figcaption className="flex flex-col gap-1.5">
        <span className="font-headline text-[20px] md:text-[24px] leading-[1.25] text-[var(--cream)]">
          {v.titulek}
        </span>
        {v.otazka && <span className="text-[13px] text-[var(--cream-60)]">Otázka: {v.otazka}</span>}
        <span className="text-[12px] text-[var(--cream-35)]">{v.n}</span>
      </figcaption>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {v.rady.map(([label, hodnota, zvyrazni]) => {
          const barva = zvyrazni ? "#E8B4D8" : "var(--gold)";
          return (
            <li key={label} className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-1.5 md:gap-4 items-center">
              <span className={`text-[13px] leading-[1.35] ${zvyrazni ? "text-[#E8B4D8]" : "text-[var(--cream-60)]"}`}>{label}</span>
              <span className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex-1 h-5">
                  <span className="absolute inset-y-0 left-0 rounded-[2px]" style={{ width: `${Math.max((hodnota / max) * 100, 0.8)}%`, background: barva, opacity: zvyrazni ? 0.95 : 0.7 }} />
                </span>
                <span className={`w-12 text-right text-[13px] tabular-nums ${zvyrazni ? "text-[#E8B4D8]" : "text-[var(--cream)]"}`}>{cz(hodnota)} %</span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-2 text-[12px] leading-[1.5]">
        <span className="text-[var(--cream-35)]">{v.vzorek}</span>
        {osoba && (
          <span className="flex flex-wrap items-center gap-2 text-[var(--cream-60)]">
            Metodiku výzkumu vedla
            <Link href={`/host/${osoba.slug}`} className="inline-flex items-center gap-1.5 pl-[3px] pr-2 py-[3px] rounded-full bg-[var(--deep)] border border-[var(--gold-10)] text-[12px] text-[var(--cream)] hover:border-[var(--gold)] transition-colors">
              {osoba.foto && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={osoba.foto} alt="" width={18} height={18} className="rounded-full object-cover" style={{ width: 18, height: 18 }} />
              )}
              {osoba.jmeno}
            </Link>
          </span>
        )}
        <span className="text-[var(--gold)]">
          Zdroj:{" "}
          <a href={v.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-[var(--gold-25)] hover:decoration-[var(--gold)]">
            {v.zdroj}
          </a>
        </span>
      </div>
    </figure>
  );
}
