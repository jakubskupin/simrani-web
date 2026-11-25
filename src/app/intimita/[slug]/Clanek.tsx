import Link from "next/link";
import type { ReactNode } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HostOdkaz } from "@/components/HostAvatar";
import { hacek, hostPodleJmena, vazby, stitekDilu, NAHLED, HOSTE_LITE, type Clanek, type Clovek, type Epizoda, type Opora, type Citace, type HostLite } from "@/lib/archiv";
import { prolinkuj } from "@/lib/prolinkovani";
import archivData from "@/data/archiv.json";
import { GrafVyzkum } from "./GrafVyzkum";

/* Stránka pojmu jako zdrojovaný článek (podcast-korpus/POJEM-CLANEK.md, návrh pen.dev rám 11). */

const LABEL: Record<string, string> = Object.fromEntries(
  (archivData.oblasti as { pojmy: { slug: string; label: string }[] }[]).flatMap((o) => o.pojmy.map((p) => [p.slug, p.label])),
);
/** Krátký název pojmu z panelu (ENM), ne dlouhý název tématu (ENM a otevřené vztahy). */
export const kratkyNazev = (slug: string, fallback: string) => LABEL[slug] ?? fallback;
const dilText = (d: number | string) => (typeof d === "number" ? `${d}. díl` : d);
const MARKETA_FOTO = "/market-foto/market-velkyusmev-square.png";

/** Kdo mluví: Markéta je autorka (ne host), ostatní se párují na medailonek podle jména a dílu. */
export function mluvci(c: Pick<Citace, "mluvci" | "dil"> & { kdo?: string }) {
  if (c.mluvci === "Markéta") return { host: undefined, jmeno: "Markéta", marketa: true };
  const host = hostPodleJmena(c.mluvci, [c.dil]);
  return { host, jmeno: host?.jmeno ?? c.kdo ?? c.mluvci, marketa: false };
}

function Monogram({ jmeno, size = 24 }: { jmeno: string; size?: number }) {
  return (
    <span
      aria-hidden
      className="rounded-full bg-[var(--wine)] flex items-center justify-center font-headline text-[var(--cream)] shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.46 }}
    >
      {jmeno[0]}
    </span>
  );
}

const odkazCls = "text-[var(--gold)] hover:underline underline-offset-4";

export function ClanekHlavicka({ nazev, kicker, cl, roky, lidi, dilu }: { nazev: string; kicker: string; cl: Clanek; roky: ReactNode; lidi: number; dilu: number }) {
  const slov = cl.sekce.flatMap((s) => s.bloky).reduce((a, b) => a + (b.typ === "p" ? b.casti.filter((x) => typeof x === "string").join(" ").split(/\s+/).length : 0), 0);
  const [y, m, d] = cl.aktualizovano.split("-").map(Number);
  return (
    <header className="flex flex-col gap-5">
      <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)]">{kicker}</div>
      <h1 className="font-headline font-normal text-[56px] md:text-[96px] leading-[1] text-[var(--cream)] m-0">
        <span className="text-[var(--gold)] font-light">#</span>
        {nazev}
      </h1>
      <p className="m-0 font-headline text-[21px] md:text-[26px] leading-[1.35] text-[var(--cream)] max-w-[720px]">{vazby(cl.perex)}</p>
      <div className="flex items-center gap-3.5 pt-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MARKETA_FOTO} alt="" width={44} height={44} className="rounded-full object-cover shrink-0" style={{ width: 44, height: 44 }} />
        <div className="flex flex-col gap-0.5">
          <span className="font-headline italic text-[18px] text-[var(--gold)]">Markéta Fáberová</span>
          <span className="text-[13px] text-[var(--cream-35)]">
            Opřeno o {cl.opory.length} citací z {dilu} dílů od {lidi} lidí · aktualizováno {d}. {m}. {y} · {Math.max(1, Math.round(slov / 200))} min čtení
          </span>
        </div>
      </div>
      {roky}
    </header>
  );
}

/** Čip za citovanou větou (pen.dev 11b): tvář, jméno a čas, vede na minutu na YouTube. U Markéty jen čas, článek píše ona. */
function Cip({ o }: { o: Opora }) {
  const k = mluvci(o);
  const tvare: HostLite[] = o.tvare?.length
    ? o.tvare.map((s) => HOSTE_LITE.find((h) => h.slug === s)).filter((h): h is HostLite => !!h)
    : k.host
      ? [k.host]
      : [];
  return (
    <a
      href={o.odkaz}
      target="_blank"
      rel="noopener noreferrer"
      title={`${k.jmeno} · ${dilText(o.dil)} · ${o.kotva} · pustit na YouTube`}
      className={`inline-flex items-center gap-1.5 align-[0.1em] mx-1 ${k.marketa ? "px-2" : "pl-[3px] pr-2"} py-[3px] rounded-full bg-[var(--wine-bg)] border border-[var(--gold-10)] font-sans not-italic text-[12px] leading-none text-[var(--cream-60)] whitespace-nowrap hover:border-[var(--gold)] hover:text-[var(--cream)] transition-colors`}
    >
      {!k.marketa &&
        (tvare.length ? (
          <span className="flex -space-x-1.5">
            {tvare.map((h) =>
              h.foto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={h.slug} src={h.foto} alt="" width={18} height={18} className="rounded-full object-cover border border-[var(--wine-bg)]" style={{ width: 18, height: 18 }} />
              ) : (
                <Monogram key={h.slug} jmeno={h.jmeno} size={18} />
              ),
            )}
          </span>
        ) : (
          <Monogram jmeno={k.jmeno} size={18} />
        ))}
      {!k.marketa && <span>{k.jmeno}</span>}
      <span className="text-[var(--gold)] tabular-nums">{o.kotva} ▸</span>
    </a>
  );
}

/** Text odstavce: [text](url) jako odkaz (interní přes Link), zbytek s prolinkováním pojmů. */
function sOdkazy(t: string, slug: string) {
  const casti = t.split(/\[([^\]]+)\]\(([^)]+)\)/);
  return casti.map((x, i) => {
    if (i % 3 === 0) return x ? <span key={i}>{prolinkuj(vazby(x), slug)}</span> : null;
    if (i % 3 === 2) return null;
    const url = casti[i + 1];
    const host = url.startsWith("/host/") ? HOSTE_LITE.find((h) => `/host/${h.slug}` === url) : undefined;
    if (host)
      return (
        <Link key={i} href={url} title={`Medailonek: ${host.jmeno}`} className="inline-flex items-center gap-1.5 align-[0.1em] mx-0.5 pl-[3px] pr-2 py-[3px] rounded-full bg-[var(--wine-bg)] border border-[var(--gold-10)] font-sans text-[13px] leading-none text-[var(--cream)] whitespace-nowrap hover:border-[var(--gold)] transition-colors">
          {host.foto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={host.foto} alt="" width={18} height={18} className="rounded-full object-cover" style={{ width: 18, height: 18 }} />
          ) : (
            <Monogram jmeno={host.jmeno} size={18} />
          )}
          {vazby(x)}
        </Link>
      );
    const cls = "text-[var(--gold)] underline decoration-[var(--gold-25)] underline-offset-4 hover:decoration-[var(--gold)]";
    return url.startsWith("/") ? (
      <Link key={i} href={url} className={cls}>{vazby(x)}</Link>
    ) : (
      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={cls}>{vazby(x)}</a>
    );
  });
}

function Odstavec({ casti, opory, slug }: { casti: (string | { r: number })[]; opory: Opora[]; slug: string }) {
  return (
    <p className="m-0 font-headline text-[18px] md:text-[20px] leading-[1.7] text-[rgba(245,230,208,0.9)]">
      {casti.map((c, i) => (typeof c === "string" ? <span key={i}>{sOdkazy(c, slug)}</span> : <Cip key={i} o={opory[c.r - 1]} />))}
    </p>
  );
}

function CitaceVKontextu({ c }: { c: Citace & { kontext: string } }) {
  const k = mluvci(c);
  return (
    <figure className="m-0 flex flex-col gap-3.5 px-6 md:px-7 py-6 bg-[var(--wine-bg)] border-l-2 border-[var(--gold)] rounded-r-[4px]">
      <blockquote className="m-0 font-headline text-[19px] md:text-[23px] leading-[1.4] text-[var(--cream)]">„{vazby(c.text)}“</blockquote>
      {c.kontext && <p className="m-0 text-[14px] leading-[1.5] text-[var(--cream-60)]">{vazby(c.kontext)}</p>}
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-[var(--cream-60)]">
        {k.host ? <HostOdkaz h={k.host} size={26} /> : (<span className="inline-flex items-center gap-2"><Monogram jmeno={k.jmeno} size={26} /><span className="text-[var(--cream)]">{k.jmeno}</span></span>)}
        <span>{dilText(c.dil)}</span>
        <a href={c.odkaz} target="_blank" rel="noopener noreferrer" className={`${odkazCls} tabular-nums`}>{c.kotva} ▸ YouTube</a>
        {c.fo && (<a href={c.fo} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--gold-25)] underline-offset-4 hover:text-[var(--gold)]">celý díl na Forendors</a>)}
      </figcaption>
    </figure>
  );
}

function GrafPodoby({ g, cislo }: { g: Clanek["grafy"][string]; cislo: number }) {
  const sl = g.pojmy.map(([slug, pozn]) => ({ slug, pozn, n: hacek(slug)?.pocet ?? 0 }));
  const max = Math.max(1, ...sl.map((s) => s.n));
  return (
    <figure className="m-0 flex flex-col gap-5 p-6 md:p-7 bg-[var(--wine-bg)] rounded-[4px]">
      <figcaption className="font-headline text-[18px] md:text-[20px] text-[var(--cream)]">Obr. {cislo} · {g.titulek}</figcaption>
      <div className="grid gap-2 md:gap-3.5 items-end h-[230px]" style={{ gridTemplateColumns: `repeat(${sl.length}, minmax(0, 1fr))` }}>
        {sl.map((s, i) => {
          const bezDohody = i === sl.length - 1 && s.pozn === "bez dohody";
          const barva = bezDohody ? "#E8B4D8" : "var(--gold)";
          return (
            <Link key={s.slug} href={`/intimita/${s.slug}`} className="group flex flex-col justify-end gap-2 h-full min-w-0">
              <span className="text-[11px] md:text-[13px] text-[var(--cream)] tabular-nums">{s.n}<span className="hidden md:inline"> dílů</span></span>
              <span className="block rounded-t-[2px] transition-opacity group-hover:opacity-100" style={{ height: Math.round((s.n / max) * 150), background: barva, opacity: bezDohody ? 0.55 : 0.85 }} />
              <span className="text-[10px] md:text-[14px] truncate group-hover:underline" style={{ color: barva }}>#{LABEL[s.slug] ?? s.slug}</span>
              <span className="hidden md:block text-[11px] text-[var(--cream-35)] truncate">{s.pozn || " "}</span>
            </Link>
          );
        })}
      </div>
      <p className="m-0 text-[12px] leading-[1.5] text-[var(--cream-35)]">{g.popisek} Sloupce vedou na své pojmy.</p>
    </figure>
  );
}

function ObrazekFig({ o, cislo }: { o: Clanek["obrazky"][string]; cislo: number }) {
  if (!o.svoleni && !NAHLED) return null;
  return (
    <figure className="m-0 flex flex-col gap-3">
      <a href={o.soubor} target="_blank" rel="noopener noreferrer" title="Otevřít v plné velikosti">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={o.soubor} alt={o.popisek} width={o.sirka} height={o.vyska} loading="lazy" className="w-full h-auto rounded-[4px]" />
      </a>
      <figcaption className="flex flex-col gap-1.5 text-[13px] leading-[1.5] text-[var(--cream-60)]">
        <span>Obr. {cislo} · {vazby(o.popisek)}</span>
        <span className="text-[12px] text-[var(--gold)]">
          Zdroj:{" "}
          <a href={o.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-[var(--gold-25)]">
            {o.zdroj}
          </a>
          {o.pozn ? ` · ${o.pozn}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}

export function ClanekTelo({ cl, slug }: { cl: Clanek; slug: string }) {
  let obr = 0;
  return (
    <>
      {cl.sekce.map((s, i) => (
        <AnimatedSection key={s.h2}>
          <section id={`sekce-${i + 1}`} className="flex flex-col gap-5 scroll-mt-28">
            <h2 className="m-0 font-headline font-normal text-[28px] md:text-[36px] leading-[1.15] text-[var(--cream)]">{s.h2}</h2>
            {s.bloky.map((b, j) => {
              if (b.typ === "p") return <Odstavec key={j} casti={b.casti} opory={cl.opory} slug={slug} />;
              if (b.typ === "citace") return <CitaceVKontextu key={j} c={b} />;
              if (b.typ === "graf" && cl.grafy[b.id]) return <GrafPodoby key={j} g={cl.grafy[b.id]} cislo={++obr} />;
              if (b.typ === "vyzkum" && cl.vyzkumy?.[b.id]) return <GrafVyzkum key={j} v={cl.vyzkumy[b.id]} cislo={++obr} />;
              if (b.typ === "obrazek" && cl.obrazky[b.id] && (cl.obrazky[b.id].svoleni || NAHLED)) return <ObrazekFig key={j} o={cl.obrazky[b.id]} cislo={++obr} />;
              return null;
            })}
          </section>
        </AnimatedSection>
      ))}
      {cl.zaver && (
        <AnimatedSection>
          <div className="flex flex-col gap-4 items-start">
            <p className="m-0 font-headline italic text-[22px] md:text-[26px] text-[var(--gold)]">{cl.zaver}</p>
            <a href="https://www.instagram.com/simrani_podcast" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[14px] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-colors">
              Napsat Markétě
            </a>
          </div>
        </AnimatedSection>
      )}
    </>
  );
}

/** Pod článkem: kdo o tom v podcastu mluvil (cesta na medailonky) a související pojmy (zpětné odkazy jako v Roamu). */
export function ClanekLideASouvisi({ lide, dily, slug }: { lide: Clovek[]; dily: Epizoda[]; slug: string }) {
  const spolu = new Map<string, number>();
  for (const e of dily) for (const p of e.p) if (p !== slug) spolu.set(p, (spolu.get(p) || 0) + 1);
  const souvisi = [...spolu.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  const nadpis = "text-[10px] tracking-[3px] uppercase text-[var(--cream-35)] m-0 font-normal";
  return (
    <div className="flex flex-col gap-8 pt-8 border-t border-[var(--gold-10)]">
      {lide.length > 0 && (
        <section className="flex flex-col gap-3.5">
          <h2 className={nadpis}>Kdo o tom v podcastu mluvil · {lide.length}</h2>
          <ul className="list-none p-0 m-0 flex flex-wrap gap-x-5 gap-y-3">
            {lide.map((l) => {
              const h = hostPodleJmena(l.jmeno, l.dily);
              return (
                <li key={l.jmeno} className="text-[14px]">
                  {h ? <HostOdkaz h={h} jmeno={l.jmeno} size={30} /> : (<span className="inline-flex items-center gap-2 text-[var(--cream-60)]"><Monogram jmeno={l.jmeno} size={30} />{l.jmeno}</span>)}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {souvisi.length > 0 && (
        <section className="flex flex-col gap-3.5">
          <h2 className={nadpis}>Souvisí</h2>
          <div className="flex flex-wrap gap-2">
            {souvisi.map(([p, n]) => (
              <Link key={p} href={`/intimita/${p}`} title={`${n} společných dílů`} className="px-3 py-1 rounded-full border border-[var(--gold-25)] text-[13px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-colors">
                #{LABEL[p] ?? p} <span className="opacity-60 tabular-nums">{n}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

const delka = (m?: number | null) => (m == null ? "" : m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`);
const dilu = (n: number) => (n === 1 ? "díl" : n >= 2 && n <= 4 ? "díly" : "dílů");

/** Díly, které jsou hlavně o pojmu (název dílu a Jakubovy ruční výjimky), nejnovější nahoře. Ostatní vedou do katalogu. */
export function ClanekDily({ cl, dily, slug, nazev }: { cl: Clanek; dily: Epizoda[]; slug: string; nazev: string }) {
  const set = new Set(cl.dily_hlavne || []);
  const hl = dily.filter((e) => set.has(e.t)).sort((a, b) => b.d.localeCompare(a.d));
  const roky = [...new Set(hl.map((e) => e.r))];
  const zbytek = dily.length - hl.length;
  return (
    <section id="dily" className="flex flex-col gap-6 scroll-mt-28">
      <div className="flex flex-col gap-2">
        <h2 className="m-0 font-headline font-normal text-[28px] md:text-[36px] leading-[1.15] text-[var(--cream)]">
          Díly, které jsou hlavně o #{nazev}
        </h2>
        <p className="m-0 text-[13px] text-[var(--cream-35)]">
          {hl.length} {dilu(hl.length)} od nejnovějšího · celé díly na Forendors, ▶ část zdarma na YouTube
        </p>
      </div>
      <div className="flex flex-col">
        {roky.map((y) => (
          <div key={y} className="grid grid-cols-[56px_minmax(0,1fr)] md:grid-cols-[88px_minmax(0,1fr)] gap-3 md:gap-6 py-5 border-t border-[var(--gold-10)]">
            <div className="font-headline text-[24px] md:text-[32px] leading-none text-[var(--cream)] md:sticky md:top-24 md:self-start">{y}</div>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {hl.filter((e) => e.r === y).map((e) => (
                <li key={e.t} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 text-[14px] md:text-[15px] leading-[1.45]">
                  <span className="text-right font-headline text-[var(--gold)] tabular-nums">{stitekDilu(e)}</span>
                  <span className="flex flex-col gap-0.5">
                    <span>
                      {e.fo ? (
                        <a href={e.fo} target="_blank" rel="noopener noreferrer" className="text-[var(--cream)] hover:text-[var(--gold)]">
                          {e.t}
                        </a>
                      ) : (
                        e.t
                      )}
                      {e.yt && (
                        <a href={`https://youtu.be/${e.yt}`} target="_blank" rel="noopener noreferrer" aria-label="Část zdarma na YouTube" title="Část zdarma na YouTube" className="ml-2 text-[11px] text-[var(--gold)]">
                          ▶
                        </a>
                      )}
                    </span>
                    {e.m ? <span className="text-[12px] text-[var(--cream-35)]">{delka(e.m)}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {zbytek > 0 && (
        <Link href={`/intimita?pojem=${slug}`} className="self-start text-[14px] text-[var(--gold)] underline decoration-[var(--gold-25)] underline-offset-4 hover:decoration-[var(--gold)]">
          #{nazev} zazní i v {zbytek === 1 ? "dalším 1 dílu" : `dalších ${zbytek} dílech`} → katalog
        </Link>
      )}
    </section>
  );
}
