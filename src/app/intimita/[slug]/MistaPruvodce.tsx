"use client";

import Link from "next/link";
import { useState } from "react";

/* Průvodce místy na /intimita/mista (Jakub 27. 11. 2026, pen.dev rám 15). Každé místo má kotvu #id,
   na kterou se prolinkují názvy míst v celém webu. Díly vedou vždy na Forendors. */
type Clovek = { slug: string; jmeno: string; foto: string | null };
type Dil = { n: number | null; t: string; fo: string | null };
export type MistoView = { id: string; nazev: string; typ?: string; mesto?: string; co?: string; web?: string; lide: Clovek[]; dily: Dil[] };

const TYPY: [string, string][] = [["", "Všechno"], ["festival", "Festivaly"], ["party", "Párty"], ["klub", "Kluby"], ["studio", "Studia a workshopy"]];
const NAZEV_TYPU: Record<string, string> = { festival: "Festival", party: "Párty", klub: "Klub", studio: "Studio" };
const domena = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const dilKratce = (d: Dil) => (d.n ? `${d.n}. díl` : /^bonus/i.test(d.t) ? "bonus" : "speciál");
const odkaz = "text-[var(--gold)] underline decoration-[var(--gold-25)] underline-offset-4 hover:decoration-[var(--gold)]";

function Tvar({ h }: { h: Clovek }) {
  return (
    <Link href={`/host/${h.slug}`} className="inline-flex items-center gap-2 text-[13px] text-[var(--cream)] hover:text-[var(--gold)]" title={`Medailonek: ${h.jmeno}`}>
      {h.foto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={h.foto} alt="" width={26} height={26} className="rounded-full object-cover border border-[var(--gold)]" style={{ width: 26, height: 26 }} />
      ) : (
        <span aria-hidden className="rounded-full bg-[var(--wine)] flex items-center justify-center font-headline text-[11px] text-[var(--cream)]" style={{ width: 26, height: 26 }}>
          {h.jmeno.split(/\s+/).map((s) => s[0]).join("").slice(0, 2)}
        </span>
      )}
      {h.jmeno}
    </Link>
  );
}

export function MistaPruvodce({ mista, dalsi }: { mista: MistoView[]; dalsi: MistoView[] }) {
  const [typ, setTyp] = useState("");
  const vidim = mista.filter((m) => !typ || m.typ === typ);
  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Typ místa" className="flex flex-wrap gap-2">
        {TYPY.map(([k, l]) => (
          <button
            key={k || "vse"}
            type="button"
            aria-pressed={typ === k}
            onClick={() => setTyp(k)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] transition-colors ${typ === k ? "bg-[var(--gold)] text-[var(--deep)]" : "border border-[var(--gold-25)] text-[var(--cream)] hover:bg-[var(--gold-06)]"}`}
          >
            {l}
          </button>
        ))}
      </div>
      <ul className="list-none p-0 m-0 grid md:grid-cols-2 gap-3.5">
        {vidim.map((m) => (
          <li key={m.id} id={m.id} className="scroll-mt-28 flex flex-col gap-2.5 px-5 md:px-6 py-5 bg-[var(--wine-bg)] rounded-[4px] target:outline target:outline-1 target:outline-[var(--gold)]">
            <span className="text-[10px] tracking-[2px] uppercase text-[var(--gold)]">{[NAZEV_TYPU[m.typ || ""], m.mesto].filter(Boolean).join(" · ")}</span>
            <h2 className="m-0 font-headline font-normal text-[24px] md:text-[26px] leading-[1.15] text-[var(--cream)]">{m.nazev}</h2>
            {m.co && <p className="m-0 text-[14px] leading-[1.55] text-[var(--cream-60)]">{m.co}</p>}
            {m.lide.length > 0 && <div className="flex flex-wrap gap-x-4 gap-y-2 pt-0.5">{m.lide.map((h) => <Tvar key={h.slug} h={h} />)}</div>}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1 text-[13px]">
              <span className="text-[var(--cream-35)]">Na Forendors:</span>
              {m.dily.map((d) => (d.fo ? (<a key={d.t} href={d.fo} target="_blank" rel="noopener noreferrer" title={d.t} className={odkaz}>{dilKratce(d)} ▸</a>) : null))}
            </div>
            {m.web && (<a href={m.web} target="_blank" rel="noopener noreferrer" className={`${odkaz} text-[13px] self-start`}>{domena(m.web)} ↗</a>)}
          </li>
        ))}
      </ul>
      {dalsi.length > 0 && (
        <section className="flex flex-col gap-3 px-5 md:px-6 py-5 bg-[var(--wine-bg)] rounded-[4px]">
          <h2 className="m-0 text-[10px] tracking-[3px] uppercase text-[var(--gold)] font-normal">Další místa z podcastu</h2>
          <ul className="list-none p-0 m-0 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            {dalsi.map((m) => (
              <li key={m.id} id={m.id} className="scroll-mt-28 text-[var(--cream)]">
                {m.nazev}{" "}
                {m.dily.map((d) => (d.fo ? (<a key={d.t} href={d.fo} target="_blank" rel="noopener noreferrer" title={d.t} className={`${odkaz} text-[13px] mr-2`}>{dilKratce(d)} ▸</a>) : null))}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
