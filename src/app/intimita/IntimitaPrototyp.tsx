"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import data from "@/data/archiv.json";
import { hosteDilu, HOSTE_LITE, NOVE } from "@/lib/archiv";
import { HostOdkaz } from "@/components/HostAvatar";

type Pojem = { slug: string; label: string; pocet: number };
type Oblast = { nazev: string; pojmy: Pojem[] };
type Ep = { n: number | null; t: string; d: string; r: number; fo: string | null; yt: string | null; m: number | null; f: string; p: string[] };

const OBLASTI = data.oblasti as Oblast[];
const EPS = data.epizody as Ep[];
const ROKY = [...(data.roky as number[])].reverse();
const STRANKY = new Set((data.hacky as { slug: string }[]).map((h) => h.slug));
const S_POHLEDEM = new Set(Object.keys(data.detail));
const LABEL: Record<string, string> = Object.fromEntries(OBLASTI.flatMap((o) => o.pojmy.map((p) => [p.slug, p.label])));
/** Host je pod písmenem každého svého jména (Diana Vera pod D i V); malé částice jako „van“ se nepočítají. */
const INICIALY = (jmeno: string) => Array.from(new Set(jmeno.split(/\s+/).filter((w) => /^\p{Lu}/u.test(w)).map((w) => w[0].toUpperCase())));
const PISMENA = Array.from(
  new Set(OBLASTI.flatMap((o) => o.pojmy.map((p) => p.label[0].toUpperCase())).concat(HOSTE_LITE.flatMap((h) => INICIALY(h.jmeno)), "Š")),
).sort((a, b) => a.localeCompare(b, "cs"));
const HOSTE_ABC = [...HOSTE_LITE].sort((a, b) => a.jmeno.localeCompare(b.jmeno, "cs"));
const VSECHNY_POJMY = OBLASTI.flatMap((o) => o.pojmy);
/** Pojmy na písmeno (M → místa, masáž); písmeno filtruje seznam dílů jejich sjednocením. */
const pojmyNa = (l: string | null) => (l ? VSECHNY_POJMY.filter((p) => p.label[0].toUpperCase() === l) : []);

const SEL = "w-full px-4 py-3 rounded-[4px] border border-[var(--gold-25)] bg-[var(--deep)] text-[15px] text-[var(--cream)] outline-none focus:border-[var(--gold)]";
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const delka = (m: number | null) => (m == null ? "" : m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`);
const typ = (e: Ep) => (e.n ? "řádný díl" : /jeskyňk/i.test(e.t) ? "Jeskyňka" : e.f.startsWith("bonus") ? "bonus" : "speciál");
const FORMATY = ["řádný díl", "bonus", "Jeskyňka", "speciál"];
const datumPlne = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
};
const oznaceni = (e: Ep) => {
  if (e.n) return `${e.n}.`;
  if (/jeskyňk/i.test(e.t)) return "jeskyňka";
  return e.f.startsWith("bonus") ? "bonus" : "speciál";
};

export function IntimitaPrototyp() {
  const [sel, setSel] = useState<string | null>(null);
  const [rok, setRok] = useState<string>("");
  const [format, setFormat] = useState<string>("");
  const [jenYt, setJenYt] = useState(false);
  const [q, setQ] = useState("");
  const [pismeno, setPismeno] = useState<string | null>(null);
  const [limit, setLimit] = useState(40);
  const [rozsirene, setRozsirene] = useState(false);

  // pojem z adresy (/intimita?pojem=shibari), aby šlo prokliknout z medailonku hosta
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("pojem");
    if (p && LABEL[p]) setSel(p); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);
  useEffect(() => {
    const u = new URL(window.location.href);
    if (sel) u.searchParams.set("pojem", sel);
    else u.searchParams.delete("pojem");
    window.history.replaceState(null, "", u.pathname + u.search);
  }, [sel]);

  const rozsirenyFiltr = rok !== "" || format !== "" || jenYt || q.trim() !== "";
  const filtr = sel !== null || pismeno !== null || rozsirenyFiltr;
  const naPismeno = useMemo(() => pojmyNa(pismeno).map((p) => p.slug), [pismeno]);
  // zvýrazněné štítky u dílů: vybraný pojem, jinak všechny pojmy na zvolené písmeno
  const aktivni = sel ? [sel] : naPismeno;
  const list = useMemo(() => {
    const nq = norm(q.trim());
    return EPS.filter(
      (e) =>
        (sel ? e.p.includes(sel) : !naPismeno.length || e.p.some((p) => naPismeno.includes(p))) &&
        (!rok || e.r === Number(rok)) &&
        (!format || typ(e) === format) &&
        (!jenYt || !!e.yt) &&
        (!nq || norm(e.t).includes(nq)),
    );
  }, [sel, naPismeno, rok, format, jenYt, q]);

  const vyber = (s: string | null) => {
    setSel((cur) => (cur === s ? null : s));
    setPismeno(null);
    setLimit(40);
  };
  const pismenoKlik = (l: string) => {
    setPismeno((cur) => (cur === l ? null : l));
    setSel(null);
    setLimit(40);
  };
  const zrusit = () => {
    setSel(null); setPismeno(null); setRok(""); setFormat(""); setJenYt(false); setQ(""); setLimit(40);
  };

  const panel = (
        <nav aria-label="Pojmy" className="flex md:flex-col gap-2 md:gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
          <button
            type="button"
            onClick={() => vyber(null)}
            className={`shrink-0 text-left px-3.5 md:px-3 py-1.5 md:py-2 rounded-full md:rounded-[4px] text-[14px] md:text-[15px] transition-colors ${
              sel === null && !pismeno ? "bg-[var(--gold)] text-[var(--deep)]" : "border border-[var(--gold-10)] md:border-0 text-[var(--cream-60)] hover:bg-[var(--gold-06)]"
            }`}
          >
            Všechny díly <span className="text-[12px] opacity-70 tabular-nums">{EPS.length}</span>
          </button>
          {OBLASTI.map((o) => (
            <div key={o.nazev} className="flex md:flex-col items-center md:items-stretch gap-2 md:gap-0.5 shrink-0">
              <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--cream-35)] md:mb-1.5 whitespace-nowrap">{o.nazev}</div>
              {o.pojmy.map((p) => {
                const on = sel === p.slug;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => vyber(p.slug)}
                    aria-pressed={on}
                    className={`shrink-0 flex items-baseline justify-between gap-3 text-left px-3.5 md:px-3 py-1.5 md:py-[7px] rounded-full md:rounded-[4px] text-[14px] md:text-[15px] whitespace-nowrap transition-colors ${
                      on
                        ? "bg-[var(--gold)] text-[var(--deep)]"
                        : pismeno && p.label[0].toUpperCase() === pismeno
                          ? "bg-[var(--gold-10)] text-[var(--cream)]"
                          : "border border-[var(--gold-10)] md:border-0 text-[var(--cream-60)] hover:text-[var(--cream)] hover:bg-[var(--gold-06)]"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      #{p.label}
                      {NOVE.has(p.slug) && <span className={`text-[9px] tracking-[1px] ${on ? "text-[var(--deep)]" : "text-[#E8B4D8]"}`}>NOVÉ</span>}
                    </span>
                    <span className={`text-[11px] tabular-nums ${on ? "" : "text-[var(--cream-35)]"}`}>{p.pocet}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
  );

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-12 pt-8 md:pt-12 pb-20 grid grid-cols-[minmax(0,1fr)] md:grid-cols-[230px_minmax(0,1fr)] gap-8 md:gap-14">
      {/* Panel pojmů po oblastech (na mobilu vodorovný pás) */}
      <aside className="hidden md:block min-w-0 md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-120px)] md:overflow-y-auto scrollbar-hide">
        {panel}
      </aside>

      <main className="flex flex-col gap-8 min-w-0">
        <header className="flex flex-col gap-4">
          <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)]">Abeceda intimity · 252 dílů · 2021 až 2026</div>
          <h1 className="font-headline font-normal text-[44px] md:text-[80px] leading-[1] text-[var(--cream)]" style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}>
            Abeceda intimity
          </h1>
          <p className="m-0 text-[16px] md:text-[20px] text-[var(--cream-60)]">
            Vztahy se dají naučit. <strong className="font-medium text-[var(--cream)]">Vyber písmeno nebo pojem.</strong>
          </p>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap pt-1" aria-label="Abeceda">
            {PISMENA.map((l) => {
              const s = l === "Š" && !HOSTE_LITE.some((h) => INICIALY(h.jmeno).includes("Š")) && !OBLASTI.some((o) => o.pojmy.some((p) => p.label[0].toUpperCase() === "Š"));
              const sZnak = l === "Š";
              const on = pismeno === l;
              return (
                <button
                  key={l}
                  type="button"
                  title={sZnak ? "Š jako Šimrání" : `Pojmy a hosté na ${l}`}
                  onClick={() => (s ? undefined : pismenoKlik(l))}
                  aria-pressed={on}
                  className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-[4px] font-headline text-[19px] md:text-[22px] transition-colors ${
                    s ? "bg-[var(--gold)] text-[var(--deep)] cursor-default" : on ? "bg-[var(--cream)] text-[var(--deep)]" : sZnak ? "bg-[var(--gold)] text-[var(--deep)] hover:opacity-85" : "bg-[var(--wine-bg)] text-[var(--cream)] hover:bg-[var(--wine)]"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
          {pismeno && (
            <div className="flex flex-col gap-3 pt-1">
              {OBLASTI.some((o) => o.pojmy.some((p) => p.label[0].toUpperCase() === pismeno)) && (
                <div className="flex flex-wrap gap-2 items-center text-[13px] text-[var(--cream-60)]">
                  <span className="w-16 shrink-0">Pojmy</span>
                  {pojmyNa(pismeno).map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      aria-pressed={sel === p.slug}
                      onClick={() => { setSel((cur) => (cur === p.slug ? null : p.slug)); setLimit(40); }}
                      className={`px-3 py-1 rounded-full border transition-colors ${sel === p.slug ? "bg-[var(--gold)] border-[var(--gold)] text-[var(--deep)]" : "border-[var(--gold-25)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)]"}`}
                    >
                      #{p.label} <span className="opacity-60">{p.pocet}</span>
                    </button>
                  ))}
                </div>
              )}
              {HOSTE_ABC.some((h) => INICIALY(h.jmeno).includes(pismeno)) && (
                <div className="flex flex-wrap gap-x-5 gap-y-2 items-center text-[13px] text-[var(--cream-60)]">
                  <span className="w-16 shrink-0">Hosté</span>
                  {HOSTE_ABC.filter((h) => INICIALY(h.jmeno).includes(pismeno)).map((h) => (
                    <HostOdkaz key={h.slug} h={h} size={30} />
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="md:hidden pt-2">{panel}</div>
        </header>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setRozsirene(!rozsirene)}
            aria-expanded={rozsirene || rozsirenyFiltr}
            className="self-start inline-flex items-center gap-2 text-[14px] text-[var(--gold)] hover:text-[var(--cream)] transition-colors"
          >
            Rozšířené hledání
            <span aria-hidden className={`transition-transform ${rozsirene || rozsirenyFiltr ? "rotate-180" : ""}`}>▾</span>
          </button>
          {(rozsirene || rozsirenyFiltr) && (
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-2.5">
            <input
              id="hledat"
              value={q}
              onChange={(e) => { setQ(e.target.value); setLimit(40); }}
              placeholder="Hledej v názvech, třeba shibari, Neya, porod"
              className="col-span-2 md:col-span-1 px-4 py-3 rounded-[4px] border border-[var(--gold-25)] bg-[var(--deep)] text-[15px] text-[var(--cream)] placeholder:text-[var(--cream-35)] outline-none focus:border-[var(--gold)]"
            />
            <select id="f-rok" value={rok} onChange={(e) => { setRok(e.target.value); setLimit(40); }} className={SEL}>
              <option value="">Všechny roky</option>
              {ROKY.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <select id="f-pojem" value={sel ?? ""} onChange={(e) => { setSel(e.target.value || null); setLimit(40); }} className={SEL}>
              <option value="">Všechny pojmy</option>
              {OBLASTI.map((o) => (
                <optgroup key={o.nazev} label={o.nazev}>
                  {o.pojmy.map((p) => <option key={p.slug} value={p.slug}>#{p.label} ({p.pocet})</option>)}
                </optgroup>
              ))}
            </select>
            <select id="f-format" value={format} onChange={(e) => { setFormat(e.target.value); setLimit(40); }} className={SEL}>
              <option value="">Všechny formáty</option>
              {FORMATY.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <label className="col-span-1 md:col-span-2 flex items-center gap-2 px-1 text-[14px] text-[var(--cream-60)]">
              <input id="f-yt" type="checkbox" checked={jenYt} onChange={(e) => setJenYt(e.target.checked)} className="accent-[var(--gold)] w-4 h-4" />
              jen díly s částí zdarma na YouTube
            </label>
          </div>
          )}
        </div>

        {sel && STRANKY.has(sel) && (
          <Link
            href={`/intimita/${sel}`}
            className="group flex flex-col md:flex-row md:items-center justify-between gap-3 p-5 md:p-6 rounded-[4px] bg-[var(--wine-bg)] border border-[var(--gold-25)] hover:border-[var(--gold)] transition-colors"
          >
            <span className="flex flex-col gap-1">
              <span className="font-headline text-[22px] text-[var(--cream)]">Stránka pojmu #{LABEL[sel]}</span>
              <span className="text-[14px] text-[var(--cream-60)]">{S_POHLEDEM.has(sel) ? "Jak to vidí Markéta, kdo o tom v podcastu mluvil a doslovné citace z dílů." : "Všechny díly k pojmu a kdo o něm v podcastu mluvil."}</span>
            </span>
            <span className="text-[var(--gold)] text-[14px] group-hover:translate-x-1 transition-transform">simrani.cz/intimita/{sel} →</span>
          </Link>
        )}

        {pismeno && !sel && (
          <p className="m-0 text-[15px] text-[var(--cream-60)]">
            {naPismeno.length ? (
              <>
                Písmeno <strong className="font-medium text-[var(--cream)]">{pismeno}</strong>: díly s pojmem{" "}
                {naPismeno.map((sl, i) => (
                  <span key={sl}>
                    {i > 0 && (i === naPismeno.length - 1 ? " nebo " : ", ")}
                    <span className="text-[var(--gold)]">#{LABEL[sl]}</span>
                  </span>
                ))}
                . Klik na pojem výše výběr zúží.
              </>
            ) : (
              <>Na písmeno {pismeno} zatím nemáme pojem, jen hosty výše.</>
            )}
          </p>
        )}

        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[14px]">
          <span className="text-[var(--cream)]">{list.length} z {EPS.length} příspěvků</span>
          <span className="text-[var(--cream-35)]">Klik na název otevře celý díl na Forendors.</span>
          {filtr && <button type="button" onClick={zrusit} className="ml-auto text-[var(--gold)] text-[13px]">Zrušit filtry ×</button>}
        </div>

        <ul className="list-none p-0 m-0 border-t border-[var(--gold-10)]">
          {list.slice(0, limit).map((e) => (
            <li key={e.t + e.d} className="grid grid-cols-[52px_minmax(0,1fr)] md:grid-cols-[72px_minmax(0,1fr)_120px] gap-x-4 gap-y-1 py-4 border-b border-[var(--gold-10)]">
              <span className={e.n ? "font-headline text-[22px] md:text-[26px] leading-[1.1] text-[var(--gold)] tabular-nums" : "pt-1.5 text-[10px] tracking-[1px] uppercase text-[var(--cream-35)]"}>{e.n ?? oznaceni(e)}</span>
              <div className="flex flex-col gap-1.5 min-w-0">
                {e.fo ? (
                  <a href={e.fo} target="_blank" rel="noopener noreferrer" className="font-headline text-[17px] md:text-[20px] leading-[1.3] text-[var(--cream)] underline decoration-[var(--gold-25)] underline-offset-4 hover:text-[var(--gold)] hover:decoration-[var(--gold)]">
                    {e.t}
                  </a>
                ) : (
                  <span className="font-headline text-[17px] md:text-[20px] text-[var(--cream)]">{e.t}</span>
                )}
                <span className="text-[13px] text-[var(--cream-35)]">
                  {typ(e)}
                  {e.yt && (
                    <>
                      {" · "}
                      <a href={`https://youtu.be/${e.yt}`} target="_blank" rel="noopener noreferrer" className="text-[var(--cream-60)] underline decoration-[var(--gold-25)] underline-offset-4 hover:text-[var(--gold)]">část zdarma na YouTube</a>
                    </>
                  )}
                  <span className="md:hidden"> · {datumPlne(e.d)} · {delka(e.m)}</span>
                </span>
                {hosteDilu(e.n, e.t).length > 0 && (
                  <span className="flex flex-wrap gap-x-4 gap-y-1.5 pt-0.5 text-[13px]">
                    {hosteDilu(e.n, e.t).map((h) => <HostOdkaz key={h.slug} h={h} size={24} />)}
                  </span>
                )}
                {e.p.length > 0 && (
                  <span className="flex flex-wrap gap-1.5 pt-0.5">
                    {e.p.map((p) => (
                      <button key={p} type="button" onClick={() => vyber(p)} className={`px-3 py-0.5 rounded-full text-[13px] transition-colors ${aktivni.includes(p) ? "bg-[var(--gold)] text-[var(--deep)]" : "bg-[var(--wine-bg)] text-[var(--cream-60)] hover:text-[var(--cream)] hover:bg-[var(--wine)]"}`}>
                        #{LABEL[p]}
                      </button>
                    ))}
                  </span>
                )}
              </div>
              <span className="hidden md:flex flex-col items-end gap-1 text-[14px] text-[var(--cream-60)] tabular-nums">
                <span>{datumPlne(e.d)}</span>
                <span>{delka(e.m)}</span>
              </span>
            </li>
          ))}
        </ul>
        {list.length > limit && (
          <button type="button" onClick={() => setLimit(limit + 60)} className="self-start px-5 py-2.5 rounded-full border border-[var(--cream-35)] text-[14px] text-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--deep)] transition-colors">
            Ukázat dalších {Math.min(60, list.length - limit)}
          </button>
        )}
        {list.length === 0 && <p className="py-10 text-[var(--cream-60)]">Nic jsme nenašli. Zkus jiné slovo nebo zruš filtry.</p>}
      </main>
    </div>
  );
}
