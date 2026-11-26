import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArchivBar, AbecedaPanel, ForendorsBox } from "../ArchivChrome";
import { HACKY, DETAIL, ROKY, HOSTE_LITE, NAHLED, hacek, dilyHacku, stitekDilu, vazby, hostPodleJmena } from "@/lib/archiv";
import { HostOdkaz } from "@/components/HostAvatar";
import { prolinkuj } from "@/lib/prolinkovani";
import { WEB, ldJson, epizodaLd, seznamLd, drobeckyLd, pocetDilu } from "@/lib/strukturovana";
import { ClanekHlavicka, ClanekTelo, ClanekLideASouvisi, ClanekDily, ClanekKam, mluvci, kratkyNazev } from "./Clanek";

const dilu = (n: number) => (n === 1 ? "díl" : n >= 2 && n <= 4 ? "díly" : "dílů");

export function generateStaticParams() {
  return HACKY.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = hacek(slug);
  return {
    title: h ? `${h.nazev}: co zaznělo v Šimrání` : "Abeceda intimity",
    description: h
      ? DETAIL[slug]
        ? `Jak ${h.nazev} vidí Markéta, kdo o tom v podcastu mluvil a doslovné citace. ${pocetDilu(h.pocet)} podcastu Šimrání.`
        : `Díly podcastu Šimrání na téma ${h.nazev}: kdo o tom mluvil a kde si to poslechnout. ${pocetDilu(h.pocet)}.`
      : undefined,
    alternates: { canonical: `/intimita/${slug}` },
  };
}

export default async function HacekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = hacek(slug);
  if (!h) notFound();
  const d = DETAIL[slug];
  /* článek (POJEM-CLANEK.md): návrh textu jen v lokálním náhledu, schválený i na webu */
  const cl = d?.clanek && (!d.clanek.stav.startsWith("návrh") || NAHLED) ? d.clanek : undefined;
  const dily = dilyHacku(slug);
  const max = Math.max(1, ...Object.values(h.roky));
  const prvni = ROKY.find((y) => h.roky[String(y)] > 0);
  const cesta = `/intimita/${slug}`;
  const hosteK = HOSTE_LITE.filter((x) => x.pojmy.includes(slug));
  const ld = ldJson([
    {
      "@type": "CollectionPage",
      "@id": WEB + cesta,
      url: WEB + cesta,
      name: `${h.nazev}: co zaznělo v Šimrání`,
      inLanguage: "cs",
      isPartOf: { "@type": "WebSite", name: "Šimrání", url: WEB },
      about: { "@type": "DefinedTerm", name: h.nazev, url: WEB + cesta, inDefinedTermSet: { "@type": "DefinedTermSet", name: "Abeceda intimity", url: WEB + "/intimita" } },
      ...(d && d.pohled.text
        ? {
            abstract: d.pohled.text,
            citation: d.citace.map((c) => ({ "@type": "Quotation", text: c.text, creator: { "@type": "Person", name: c.mluvci }, url: c.odkaz })),
          }
        : {}),
      ...(cl
        ? {
            hasPart: {
              "@type": "Article",
              headline: `${h.nazev}: ${cl.perex}`,
              inLanguage: "cs",
              author: { "@type": "Person", name: "Markéta Fáberová" },
              dateModified: cl.aktualizovano,
              articleSection: cl.sekce.map((s) => s.h2),
              citation: [
                ...cl.opory.map((o) => ({ "@type": "Quotation", text: o.text, creator: { "@type": "Person", name: mluvci(o).jmeno }, url: o.odkaz })),
                ...Object.values(cl.vyzkumy || {}).map((v) => ({ "@type": "CreativeWork", name: v.zdroj, url: v.url })),
                ...Object.values(cl.obrazky).filter((o) => o.svoleni).map((o) => ({ "@type": "CreativeWork", name: o.zdroj, url: o.url })),
              ],
            },
          }
        : {}),
      mainEntity: seznamLd(dily.map(epizodaLd)),
    },
    drobeckyLd([["Šimrání", "/"], ["Abeceda intimity", "/intimita"], [h.nazev, cesta]]),
  ]);

  /* díl, kterým začít (clanek.cta.zacni = číslo dílu), vede přímo na Forendors */
  const zacniDil = cl?.cta?.zacni ? dily.find((e) => e.n === cl.cta!.zacni) : undefined;
  const zacni = zacniDil?.fo && cl?.cta ? { popisek: cl.cta.popisek, url: zacniDil.fo } : undefined;
  const kicker = `Pojem · ${h.pocet} ${dilu(h.pocet)}${prvni ? ` od roku ${prvni}` : ""}`;
  const rokyGraf = (
    <div className={`grid grid-cols-6 gap-1.5 ${cl ? "max-w-[440px] pt-2" : "max-w-[520px]"}`} aria-label="Počet dílů po letech">
      {ROKY.map((y) => {
        const n = h.roky[String(y)] || 0;
        return (
          <div key={y} className="flex flex-col gap-1.5">
            <div className="h-10 bg-[var(--gold-06)] rounded-[2px] flex items-end overflow-hidden">
              <div className="w-full bg-[var(--gold)] opacity-80" style={{ height: `${Math.round((n / max) * 100)}%` }} />
            </div>
            <span className="text-[11px] text-[var(--cream-35)] tabular-nums">
              {y} · {n}
            </span>
          </div>
        );
      })}
    </div>
  );

  const rokPoRoku = (
    <section className="flex flex-col gap-6">
      <h2 className="text-[11px] tracking-[3px] uppercase text-[var(--cream-35)] font-normal m-0">
        {cl ? `Všech ${h.pocet} ${dilu(h.pocet)} s #${kratkyNazev(slug, h.nazev)}, rok po roku` : "Co zaznělo, rok po roku"}
      </h2>
      {[...ROKY].reverse().map((y) => {
        const cc = (d?.citace || []).filter((c) => c.rok === y);
        const ee = dily.filter((e) => e.r === y);
        if (!cc.length && !ee.length) return null;
        return (
          <AnimatedSection key={y}>
            <div className="grid md:grid-cols-[110px_minmax(0,1fr)] gap-4 md:gap-8 pt-6 border-t border-[var(--gold-10)]">
              <div className="md:sticky md:top-24 md:self-start">
                <div className="font-headline text-[40px] leading-none text-[var(--cream)]">{y}</div>
                <div className="mt-2 text-[12px] text-[var(--cream-35)]">
                  {cc.length ? `${cc.length} ${cc.length === 1 ? "citace" : cc.length < 5 ? "citace" : "citací"} · ` : ""}
                  {ee.length} {dilu(ee.length)}
                </div>
              </div>
              <div className="flex flex-col gap-6 min-w-0">
                {cc.length > 0 && (
                  <div className={`grid gap-3 ${cl ? "" : "lg:grid-cols-2"}`}>
                    {cc.map((c) => (
                      <figure key={c.odkaz + c.text.slice(0, 12)} className="m-0 p-5 bg-[var(--wine-bg)] rounded-[4px] flex flex-col gap-3 min-w-0">
                        <blockquote className="m-0 font-headline text-[17px] leading-[1.45] text-[var(--cream)]">„{vazby(c.text)}“</blockquote>
                        <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[12px] text-[var(--cream-60)]">
                          {c.stitek && <span className="px-2 py-0.5 rounded-full bg-[var(--gold-06)] text-[var(--cream-60)]">{c.stitek}</span>}
                          {(() => {
                            const hh = hostPodleJmena(c.mluvci, [c.dil]);
                            return hh ? <HostOdkaz h={hh} jmeno={c.mluvci} size={22} /> : <span className="text-[var(--cream)] font-medium">{c.mluvci}</span>;
                          })()}
                          {c.odhad && (
                            <span title="Mluvčí odhadnutý z kontextu, ověřit poslechem" className="text-[var(--gold)]">
                              ?
                            </span>
                          )}
                          <span>{typeof c.dil === "number" ? `${c.dil}. díl` : c.dil}</span>
                          {/youtu/.test(c.odkaz) ? (
                            <a href={c.odkaz} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline tabular-nums">
                              {c.kotva} ▸
                            </a>
                          ) : (
                            <span className="text-[var(--gold)] tabular-nums" title="Čas v celém dílu">
                              {c.kotva}
                            </span>
                          )}
                          {c.fo && (
                            <a href={c.fo} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--gold-25)] underline-offset-4 hover:text-[var(--gold)]">
                              celý díl
                            </a>
                          )}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
                <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                  {[...ee].reverse().map((e) => (
                    <li key={e.t} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 text-[14px] leading-[1.45]">
                      <span className="text-right text-[var(--cream-35)] tabular-nums">{stitekDilu(e)}</span>
                      <span>
                        {e.fo ? (
                          <a href={e.fo} target="_blank" rel="noopener noreferrer" className="text-[var(--cream-60)] hover:text-[var(--gold)]">
                            {e.t}
                          </a>
                        ) : (
                          e.t
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        );
      })}
    </section>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <ArchivBar aktivni={slug} />
      <main className="max-w-[1280px] mx-auto px-5 md:px-12 pt-6 md:pt-12 pb-20 grid grid-cols-[minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] gap-6 md:gap-12">
        <aside className="min-w-0 md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-120px)] md:overflow-y-auto scrollbar-hide">
          <AbecedaPanel aktivni={slug} />
        </aside>

        {cl ? (
          <div className="min-w-0">
            <article className="flex flex-col gap-12 md:gap-14 min-w-0 max-w-[760px]">
              <ClanekHlavicka
                nazev={kratkyNazev(slug, h.nazev)}
                kicker={kicker}
                cl={cl}
                roky={rokyGraf}
                dilu={new Set(cl.opory.map((o) => String(o.dil))).size}
                lidi={new Set(cl.opory.map((o) => mluvci(o).jmeno)).size}
              />
              <ClanekTelo cl={cl} slug={slug} />
              <ClanekKam kam={cl.kam || []} nazev={kratkyNazev(slug, h.nazev)} />
              <ClanekLideASouvisi lide={d?.lide || []} dily={dily} slug={slug} vynech={(cl.kam || []).map((k) => k.slug)} />
              <ClanekDily cl={cl} dily={dily} slug={slug} nazev={kratkyNazev(slug, h.nazev)} />
              <ForendorsBox pojem={kratkyNazev(slug, h.nazev)} pocet={dily.filter((e) => (cl.dily_hlavne || []).includes(e.t)).length || dily.length} hlavne={!!cl.dily_hlavne?.length} zacni={zacni} />
            </article>
          </div>
        ) : (
          <article className="flex flex-col gap-14 md:gap-20 min-w-0">
            <header className="flex flex-col gap-5">
              <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)]">{kicker}</div>
              <h1 className="font-headline font-normal text-[40px] md:text-[76px] leading-[1] text-[var(--cream)]">
                <span className="text-[var(--gold)] font-light">#</span>
                {h.nazev}
              </h1>
              {rokyGraf}
            </header>

            <AnimatedSection>
              <section className="flex flex-col gap-5">
                <h2 className="text-[11px] tracking-[3px] uppercase text-[var(--cream-35)] font-normal m-0">Jak to vidí Markéta</h2>
                {d && d.pohled.text ? (
                  <>
                    <p className="m-0 font-headline text-[22px] md:text-[30px] leading-[1.4] text-[var(--cream)] max-w-[820px]" style={{ fontVariationSettings: "'SOFT' 50, 'opsz' 72" }}>
                      {prolinkuj(vazby(d.pohled.text), slug)}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[var(--cream-60)]">
                      <span className="font-headline italic text-[18px] text-[var(--gold)]">Markéta</span>
                      <span>Opřeno o její slova v dílech:</span>
                      {d.pohled.opora.map((o, i) => (
                        <a key={o} href={o} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline tabular-nums">
                          {i + 1} ▸
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="m-0 text-[16px] text-[var(--cream-60)] max-w-[620px]">Markétin pohled na tenhle pojem připravujeme. Vznikne z jejích vlastních slov v dílech.</p>
                )}
              </section>
            </AnimatedSection>

            {(!d || d.lide.length === 0) && hosteK.length > 0 && (
              <AnimatedSection>
                <section className="flex flex-col gap-6">
                  <h2 className="text-[11px] tracking-[3px] uppercase text-[var(--cream-35)] font-normal m-0">Kdo o tom v podcastu mluvil</h2>
                  <ul className="flex flex-wrap gap-x-7 gap-y-4 list-none p-0 m-0">
                    {hosteK.map((x) => (
                      <li key={x.slug}>
                        <HostOdkaz h={x} size={36} className="font-headline text-[19px]" />
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimatedSection>
            )}

            {d && d.lide.length > 0 && (
              <AnimatedSection>
                <section className="flex flex-col gap-6">
                  <h2 className="text-[11px] tracking-[3px] uppercase text-[var(--cream-35)] font-normal m-0">Kdo o tom v podcastu mluvil</h2>
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 list-none p-0 m-0">
                    {d.lide.map((l) => (
                      <li key={l.jmeno} className="flex flex-col gap-1 border-l border-[var(--gold-25)] pl-4">
                        {(() => {
                          const hh = hostPodleJmena(l.jmeno, l.dily);
                          return hh ? <HostOdkaz h={hh} jmeno={l.jmeno} size={32} className="font-headline text-[19px]" /> : <span className="font-headline text-[19px] text-[var(--cream)]">{l.jmeno}</span>;
                        })()}
                        {l.kdo && <span className="text-[13px] leading-[1.5] text-[var(--cream-60)]">{prolinkuj(vazby(l.kdo), slug)}</span>}
                        {l.odkazy && l.odkazy.length > 0 && (
                          <span className="flex flex-wrap gap-x-3 gap-y-1 text-[12px]">
                            {l.odkazy.map((o) => (
                              <a key={o.url} href={o.url} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] underline decoration-[var(--gold-25)] underline-offset-4 hover:decoration-[var(--gold)]">
                                {o.nazev} ↗
                              </a>
                            ))}
                          </span>
                        )}
                        <span className="text-[12px] text-[var(--cream-35)]">{l.dily.map((x) => (typeof x === "number" ? `${x}. díl` : x)).join(", ")}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimatedSection>
            )}

            {rokPoRoku}

            <ForendorsBox pojem={kratkyNazev(slug, h.nazev)} pocet={dily.length} />
          </article>
        )}
      </main>
      <Footer />
    </>
  );
}
