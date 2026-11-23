import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HOSTE, HostBar, Foto } from "./hoste";

export const metadata: Metadata = {
  title: "Hosté Šimrání",
  description: "Lidé, kteří si v podcastu Šimrání sedli k mikrofonu: kdo jsou, o čem mluvili a ve kterých dílech je najdeš.",
  robots: { index: false, follow: false },
};

export default function HostePage() {
  return (
    <>
      <HostBar />
      <main className="max-w-[1280px] mx-auto px-5 md:px-12 pt-10 md:pt-16 pb-20 flex flex-col gap-10 md:gap-14">
        <header className="flex flex-col gap-4 max-w-[760px]">
          <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)]">Hosté Šimrání · 2026</div>
          <h1 className="font-headline font-normal text-[44px] md:text-[80px] leading-[1] text-[var(--cream)]" style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}>
            Hosté
          </h1>
          <p className="m-0 text-[16px] md:text-[20px] text-[var(--cream-60)]">
            Odborníci, performeři i lidé s vlastním příběhem. <strong className="font-medium text-[var(--cream)]">Každý tu má svou stránku.</strong>
          </p>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 list-none p-0 m-0">
          {HOSTE.map((h) => (
            <li key={h.slug}>
              <Link href={`/host/${h.slug}`} className="group flex gap-5 items-start">
                <Foto h={h} size={96} />
                <span className="flex flex-col gap-1.5 min-w-0 pt-1">
                  <span className="font-headline text-[22px] leading-[1.15] text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">{h.jmeno}</span>
                  <span className="text-[14px] leading-[1.5] text-[var(--cream-60)] line-clamp-3">{h.kdo}</span>
                  <span className="text-[12px] text-[var(--cream-35)]">{h.dily.map((n) => `${n}. díl`).join(", ")}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
