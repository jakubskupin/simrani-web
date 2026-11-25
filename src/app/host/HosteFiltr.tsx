"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Host } from "./hoste";

/* Hosté s filtrem podle role (pen.dev rám 12). Role žije v adrese (?role=) jen pro sdílení, kanonická adresa je /host. */
export const ROLE: [string, string, string][] = [
  ["terapie", "Terapie a poradenství", "psychoterapeuti a psychoterapeutky, párové koučky, psycholožky a sexuoložka"],
  ["masaze", "Masáže a tantra", "masérky, maséři a lektoři tantry"],
  ["shibari", "Shibari a provazy", "riggeři a riggerky"],
  ["bdsm", "BDSM a dominance", "dominy, lektoři a pořadatelé"],
  ["performance", "Performance a akce", "performeři, tvůrkyně a pořadatelé akcí"],
  ["remeslo", "Řemeslo a móda", "výrobci pomůcek, prádla, masek a módy"],
  ["osveta", "Osvěta, zdraví a právo", "novinářky, lékařka, advokátka, fotografka a další"],
];
const lidi = (n: number) => (n === 1 ? "člověk" : n >= 2 && n <= 4 ? "lidé" : "lidí");

function Foto({ h, size }: { h: Host; size: number }) {
  const ini = h.jmeno.split(/\s+/).map((s) => s[0]).join("").slice(0, 2);
  return h.foto ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={h.foto} alt={`${h.jmeno} v Šimrání`} width={size} height={size} className="rounded-full object-cover border-2 border-[var(--gold)] shrink-0" style={{ width: size, height: size }} />
  ) : (
    <span className="rounded-full bg-[var(--wine-bg)] border-2 border-[var(--gold-25)] flex items-center justify-center font-headline text-[var(--gold)] shrink-0" style={{ width: size, height: size, fontSize: size * 0.34 }}>
      {ini}
    </span>
  );
}

export function HosteFiltr({ hoste, label }: { hoste: (Host & { role?: string[]; karta?: string[] })[]; label: Record<string, string> }) {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("role");
    if (r && ROLE.some(([k]) => k === r)) setRole(r); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);
  useEffect(() => {
    const u = new URL(window.location.href);
    if (role) u.searchParams.set("role", role);
    else u.searchParams.delete("role");
    window.history.replaceState(null, "", u.pathname + u.search);
  }, [role]);

  const vyber = role ? hoste.filter((h) => h.role?.includes(role)) : hoste;
  const r = ROLE.find(([k]) => k === role);
  const chip = (k: string | null, nazev: string, n: number) => {
    const on = role === k;
    return (
      <button
        key={k ?? "vse"}
        type="button"
        aria-pressed={on}
        onClick={() => setRole(k)}
        className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] transition-colors ${
          on ? "bg-[var(--gold)] text-[var(--deep)]" : "border border-[var(--gold-25)] text-[var(--cream-60)] hover:text-[var(--cream)] hover:border-[var(--gold)]"
        }`}
      >
        {on && k ? "✓ " : ""}
        {nazev}
        <span className={`text-[12px] tabular-nums ${on ? "" : "text-[var(--cream-35)]"}`}>{n}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2.5">
        <div className="text-[10px] tracking-[3px] uppercase text-[var(--cream-35)]">Co dělají</div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
          {chip(null, "Vše", hoste.length)}
          {ROLE.map(([k, nazev]) => chip(k, nazev, hoste.filter((h) => h.role?.includes(k)).length))}
        </div>
      </div>
      {r && (
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-3.5 rounded-[4px] bg-[var(--wine-bg)] text-[15px] text-[var(--cream)]">
          <span>
            {vyber.length} {lidi(vyber.length)} v roli {r[1]}
          </span>
          <span className="text-[14px] text-[var(--cream-35)]">{r[2]}</span>
        </div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 list-none p-0 m-0">
        {vyber.map((h) => (
          <li key={h.slug} className="flex flex-col gap-3 p-6 rounded-[4px] border border-[var(--gold-10)] hover:border-[var(--gold-25)] transition-colors">
            <Link href={`/host/${h.slug}`} className="group flex flex-col gap-3">
              <Foto h={h} size={72} />
              <span className="font-headline text-[24px] leading-[1.15] text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">{h.jmeno}</span>
              <span className="text-[14px] leading-[1.5] text-[var(--cream-60)] line-clamp-3">{h.kdo}</span>
            </Link>
            <span className="flex flex-wrap items-center gap-1.5 mt-auto">
              {h.karta?.map((k) => (
                <span key={k} className="px-2.5 py-0.5 rounded-full bg-[var(--gold)] text-[11px] font-medium tracking-[1px] text-[var(--deep)]">
                  {k}
                </span>
              ))}
              {!h.karta && h.pojmy.slice(0, 2).map((p) => (
                <Link key={p} href={`/intimita/${p}`} className="px-2.5 py-0.5 rounded-full border border-[var(--gold-25)] text-[11px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-colors">
                  #{label[p] ?? p}
                </Link>
              ))}
              {h.dily.length > 0 && <span className="text-[11px] text-[var(--cream-35)]">{h.dily.length === 1 ? `${h.dily[0]}. díl` : `${h.dily.length} ${h.dily.length <= 4 ? "díly" : "dílů"}`}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
