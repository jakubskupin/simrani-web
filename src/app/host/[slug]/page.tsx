import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { ForendorsBox } from "../../intimita/ArchivChrome";
import { HOSTE, HostBar, Foto, POJMY_LABEL, STRANKY_POJMU } from "../hoste";
import { prolinkuj, hrefPojmu } from "@/lib/prolinkovani";

export function generateStaticParams() {
  return HOSTE.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = HOSTE.find((x) => x.slug === slug);
  return {
    title: h ? `${h.jmeno} v Šimrání` : "Hosté Šimrání",
    description: h?.kdo,
    alternates: { canonical: `/host/${slug}` },
  };
}

const datum = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
};

export default async function HostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = HOSTE.find((x) => x.slug === slug);
  if (!h) notFound();
  const roky = Array.from(new Set(h.epizody.map((e) => e.r))).sort((a, b) => b - a);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: h.jmeno,
            description: h.kdo,
            url: `https://simrani.cz/host/${h.slug}`,
            image: h.foto ? `https://simrani.cz${h.foto}` : undefined,
            sameAs: [h.web, h.instagram, ...(h.dalsi || []).map((x) => x.url)].filter(Boolean),
            subjectOf: h.epizody.map((e) => ({ "@type": "PodcastEpisode", name: e.t, url: e.fo || undefined, partOfSeries: { "@type": "PodcastSeries", name: "Šimrání", url: "https://simrani.cz" } })),
          }),
        }}
      />
      <HostBar slug={h.slug} />
      <main className="max-w-[1280px] mx-auto px-5 md:px-12 pt-10 md:pt-16 pb-20 flex flex-col gap-14 md:gap-20">
        <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">
          <span className="self-center md:self-auto shrink-0">
            <Foto h={h} size={320} />
          </span>
          <div className="flex flex-col gap-5 min-w-0">
            <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)]">
              Host Šimrání · {h.dily.map((n) => `${n}. díl`).join(", ")} · {roky.join(" a ")}
            </div>
            <h1 className="font-headline font-normal text-[48px] md:text-[88px] leading-[1] text-[var(--cream)]">{h.jmeno}</h1>
            <p className="m-0 text-[17px] md:text-[19px] leading-[1.55] text-[var(--cream)] max-w-[640px]">{prolinkuj(h.kdo)}</p>
            <p className="m-0 text-[15px] md:text-[16px] leading-[1.55] text-[var(--cream-60)] max-w-[640px]">{prolinkuj(h.proc)}</p>
            {(h.web || h.instagram || (h.dalsi && h.dalsi.length > 0)) && (
              <div className="flex flex-wrap gap-2">
                {h.web && (
                  <a href={h.web} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-[var(--gold)] text-[13px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-colors">
                    {h.web.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
                  </a>
                )}
                {h.instagram && (
                  <a href={h.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-[var(--gold)] text-[13px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-colors">
                    Instagram @{h.instagram.replace(/\/$/, "").split("/").pop()} ↗
                  </a>
                )}
                {(h.dalsi || []).map((x) => (
                  <a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-[var(--gold-25)] text-[13px] text-[var(--cream-60)] hover:text-[var(--cream)] hover:border-[var(--gold)] transition-colors">
                    {x.nazev} ↗
                  </a>
                ))}
              </div>
            )}
            {h.pojmy.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] tracking-[2px] uppercase text-[var(--cream-35)] mr-1">Mluví o</span>
                {h.pojmy.map((p) => (
                  <Link
                    key={p}
                    href={STRANKY_POJMU.has(p) ? `/intimita/${p}` : `/intimita?pojem=${p}`}
                    className="px-3.5 py-1.5 rounded-full border border-[var(--gold-25)] bg-[var(--wine-bg)] text-[14px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] hover:border-[var(--gold)] transition-colors"
                  >
                    #{POJMY_LABEL[p]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {h.citace.length > 0 && (
          <section className="flex flex-col gap-5">
            <h2 className="m-0 text-[11px] tracking-[3px] uppercase text-[var(--cream-35)] font-normal">Co v Šimrání zaznělo</h2>
            <div className="grid lg:grid-cols-2 gap-3">
              {h.citace.map((c) => (
                <figure key={c.odkaz + c.text.slice(0, 10)} className="m-0 p-6 bg-[var(--wine-bg)] rounded-[4px] flex flex-col gap-3">
                  <blockquote className="m-0 font-headline text-[18px] md:text-[20px] leading-[1.45] text-[var(--cream)]">„{c.text}“</blockquote>
                  <figcaption className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-[var(--cream-60)]">
                    {c.stitek &&
                      (c.pojem ? (
                        <Link href={hrefPojmu(c.pojem)} className="px-2 py-0.5 rounded-full border border-[var(--gold-25)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-colors">
                          {c.stitek} · #{POJMY_LABEL[c.pojem] ?? c.pojem}
                        </Link>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--gold-10)]">{c.stitek}</span>
                      ))}
                    <span>{typeof c.dil === "number" ? `${c.dil}. díl` : c.dil}</span>
                    <a href={c.odkaz} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline tabular-nums">
                      {/youtu/.test(c.odkaz) ? `poslechni od ${c.kotva} ▸` : `celý díl, čas ${c.kotva} ▸`}
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col gap-3">
          <h2 className="m-0 text-[11px] tracking-[3px] uppercase text-[var(--cream-35)] font-normal">Díly · celé na Forendors</h2>
          <ul className="list-none p-0 m-0 border-t border-[var(--gold-10)]">
            {h.epizody.map((e) => (
              <li key={e.n} className="grid grid-cols-[52px_minmax(0,1fr)] md:grid-cols-[72px_minmax(0,1fr)_120px] gap-x-4 py-4 border-b border-[var(--gold-10)] items-baseline">
                <span className="font-headline text-[22px] text-[var(--gold)] tabular-nums">{e.n}.</span>
                <span className="flex flex-col gap-1 min-w-0">
                  {e.fo ? (
                    <a href={e.fo} target="_blank" rel="noopener noreferrer" className="font-headline text-[18px] md:text-[21px] leading-[1.3] text-[var(--cream)] underline decoration-[var(--gold-25)] underline-offset-4 hover:text-[var(--gold)]">{e.t}</a>
                  ) : (
                    <span className="font-headline text-[18px] md:text-[21px] text-[var(--cream)]">{e.t}</span>
                  )}
                  <span className="text-[13px] text-[var(--cream-35)]">
                    {e.yt && (
                      <a href={`https://youtu.be/${e.yt}`} target="_blank" rel="noopener noreferrer" className="text-[var(--cream-60)] underline decoration-[var(--gold-25)] underline-offset-4 hover:text-[var(--gold)]">část zdarma na YouTube</a>
                    )}
                    <span className="md:hidden">{e.yt ? " · " : ""}{datum(e.d)}</span>
                  </span>
                </span>
                <span className="hidden md:block text-right text-[14px] text-[var(--cream-60)] tabular-nums">{datum(e.d)}</span>
              </li>
            ))}
          </ul>
        </section>

        <ForendorsBox />
        <Link href="/host" className="self-start text-[14px] text-[var(--gold)] hover:underline">← Všichni hosté</Link>
      </main>
      <Footer />
    </>
  );
}
