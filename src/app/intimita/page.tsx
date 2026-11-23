import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ArchivBar, ForendorsBox } from "./ArchivChrome";
import { IntimitaPrototyp } from "./IntimitaPrototyp";
import data from "@/data/archiv.json";
import { EPIZODY, HACKY } from "@/lib/archiv";
import { WEB, ldJson, epizodaLd, seznamLd, drobeckyLd } from "@/lib/strukturovana";

/* Celý katalog pro vyhledávače a AI agenty: stránka v HTML ukazuje 40 dílů, JSON-LD nese všech 312 a všechny pojmy. */
const STRANKY = new Set(HACKY.map((h) => h.slug));
const POJMY = (data.oblasti as { nazev: string; pojmy: { slug: string; label: string; pocet: number }[] }[]).flatMap((o) => o.pojmy);
const LD = ldJson([
  {
    "@type": "CollectionPage",
    "@id": WEB + "/intimita",
    url: WEB + "/intimita",
    name: "Abeceda intimity",
    description: "Všechny díly podcastu Šimrání od roku 2021, rozdělené do pojmů.",
    inLanguage: "cs",
    isPartOf: { "@type": "WebSite", name: "Šimrání", url: WEB },
    about: {
      "@type": "DefinedTermSet",
      name: "Abeceda intimity",
      hasDefinedTerm: POJMY.map((p) => ({ "@type": "DefinedTerm", name: p.label, url: STRANKY.has(p.slug) ? `${WEB}/intimita/${p.slug}` : `${WEB}/intimita?pojem=${p.slug}` })),
    },
    mainEntity: seznamLd(EPIZODY.map(epizodaLd)),
  },
  drobeckyLd([["Šimrání", "/"], ["Abeceda intimity", "/intimita"]]),
]);

export const metadata: Metadata = {
  title: "Abeceda intimity: pět let rozhovorů Šimrání po pojmech",
  description: "Všechny díly podcastu Šimrání od roku 2021, rozdělené do pojmů. Vyber pojem, nebo projdi všechno.",
  alternates: { canonical: "/intimita" },
};

export default function IntimitaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LD }} />
      <ArchivBar />
      <IntimitaPrototyp />
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 pb-20">
        <ForendorsBox />
      </div>
      <Footer />
    </>
  );
}
