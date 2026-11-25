"use client";

import { useState } from "react";
import type { Vyzkum } from "@/lib/archiv";

/* Překreslený graf z cizího výzkumu: celé měřítko, nebo přiblížení, ve kterém je vidět i necelé procento. */
const cz = (n: number) => n.toLocaleString("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function GrafVyzkum({ v, cislo }: { v: Vyzkum; cislo: number }) {
  const [zoom, setZoom] = useState(false);
  const max = zoom ? 2 : 50;
  const soucet = v.rady.filter((r) => r[2]).reduce((a, r) => a + r[1], 0);
  const tlacitko = (on: boolean, label: string, click: () => void) => (
    <button
      type="button"
      aria-pressed={on}
      onClick={click}
      className={`px-3.5 py-1.5 rounded-full text-[12px] transition-colors ${on ? "bg-[var(--gold)] text-[var(--deep)]" : "border border-[var(--gold-25)] text-[var(--cream-60)] hover:text-[var(--cream)] hover:border-[var(--gold)]"}`}
    >
      {label}
    </button>
  );
  return (
    <figure className="m-0 flex flex-col gap-5 p-6 md:p-7 bg-[var(--wine-bg)] rounded-[4px]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <figcaption className="flex flex-col gap-1.5">
          <span className="font-headline text-[18px] md:text-[20px] leading-[1.3] text-[var(--cream)]">
            Obr. {cislo} · {v.titulek}
          </span>
          <span className="text-[12px] text-[var(--cream-35)]">{v.n}</span>
        </figcaption>
        <div className="flex flex-col items-start md:items-end shrink-0">
          <span className="font-headline text-[44px] md:text-[56px] leading-none text-[#E8B4D8] tabular-nums">{cz(soucet)} %</span>
          <span className="text-[12px] text-[var(--cream-60)]">{v.zvyrazneni}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Měřítko grafu">
        {tlacitko(!zoom, "Celé měřítko 0–50 %", () => setZoom(false))}
        {tlacitko(zoom, "Přiblížit na 0–2 %", () => setZoom(true))}
      </div>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {v.rady.map(([label, hodnota, zvyrazni]) => {
          const pres = hodnota > max;
          const sirka = Math.min(100, (hodnota / max) * 100);
          const barva = zvyrazni ? "#E8B4D8" : "var(--gold)";
          return (
            <li key={label} className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-1.5 md:gap-4 items-center">
              <span className={`text-[13px] leading-[1.35] ${zvyrazni ? "text-[#E8B4D8]" : "text-[var(--cream-60)]"}`}>{label}</span>
              <span className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex-1 h-5 bg-[var(--gold-06)] rounded-[2px] overflow-hidden">
                  <span
                    className="absolute inset-y-0 left-0 rounded-[2px] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${Math.max(sirka, hodnota > 0 ? 0.6 : 0)}%`, background: barva, opacity: zvyrazni ? 0.95 : 0.7 }}
                  />
                  {pres && <span className="absolute inset-y-0 right-1.5 flex items-center text-[10px] text-[var(--deep)]">↦</span>}
                </span>
                <span className={`w-12 text-right text-[13px] tabular-nums ${zvyrazni ? "text-[#E8B4D8]" : "text-[var(--cream)]"}`}>{cz(hodnota)} %</span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-1.5 text-[12px] leading-[1.5]">
        <span className="text-[var(--cream-35)]">{v.vzorek}</span>
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
