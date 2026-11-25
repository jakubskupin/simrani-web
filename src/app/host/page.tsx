import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HOSTE, HostBar, POJMY_LABEL } from "./hoste";
import { HosteFiltr } from "./HosteFiltr";
import { AbecedaPanel } from "../intimita/ArchivChrome";
import { WEB, ldJson, seznamLd, drobeckyLd } from "@/lib/strukturovana";

const LD = ldJson([
  {
    "@type": "CollectionPage",
    "@id": WEB + "/host",
    url: WEB + "/host",
    name: "Hosté Šimrání",
    inLanguage: "cs",
    isPartOf: { "@type": "WebSite", name: "Šimrání", url: WEB },
    mainEntity: seznamLd(HOSTE.map((h) => ({ "@type": "Person", name: h.jmeno, url: `${WEB}/host/${h.slug}`, description: h.kdo, ...(h.foto ? { image: WEB + h.foto } : {}) }))),
  },
  drobeckyLd([["Šimrání", "/"], ["Hosté", "/host"]]),
]);

export const metadata: Metadata = {
  title: "Hosté Šimrání",
  description: "Lidé, kteří si v podcastu Šimrání sedli k mikrofonu: kdo jsou, o čem mluvili a ve kterých dílech je najdeš.",
  alternates: { canonical: "/host" },
};

export default function HostePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LD }} />
      <HostBar />
      <main className="max-w-[1280px] mx-auto px-5 md:px-12 pt-6 md:pt-12 pb-20 grid grid-cols-[minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] gap-6 md:gap-12">
        <aside className="min-w-0 md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-120px)] md:overflow-y-auto scrollbar-hide">
          <AbecedaPanel aktivni="hoste" />
        </aside>
        <div className="flex flex-col gap-10 min-w-0">
          <header className="flex flex-col gap-4 max-w-[760px]">
            <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)]">Hosté Šimrání · {HOSTE.length} lidí</div>
            <h1 className="font-headline font-normal text-[44px] md:text-[80px] leading-[1] text-[var(--cream)] m-0" style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}>
              Hosté
            </h1>
            <p className="m-0 text-[16px] md:text-[20px] text-[var(--cream-60)]">
              Odborníci, performeři i lidé s vlastním příběhem. <strong className="font-medium text-[var(--cream)]">Každý tu má svou stránku.</strong>
            </p>
          </header>
          <HosteFiltr hoste={HOSTE} label={POJMY_LABEL} />
        </div>
      </main>
      <Footer />
    </>
  );
}
