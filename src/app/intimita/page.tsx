import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ArchivBar, ForendorsBox } from "./ArchivChrome";
import { IntimitaPrototyp } from "./IntimitaPrototyp";

export const metadata: Metadata = {
  title: "Abeceda intimity: pět let rozhovorů Šimrání po pojmech",
  description: "Všechny díly podcastu Šimrání od roku 2021, rozdělené do pojmů. Vyber pojem, nebo projdi všechno.",
  robots: { index: false, follow: false },
};

export default function IntimitaPage() {
  return (
    <>
      <ArchivBar />
      <IntimitaPrototyp />
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 pb-20">
        <ForendorsBox />
      </div>
      <Footer />
    </>
  );
}
