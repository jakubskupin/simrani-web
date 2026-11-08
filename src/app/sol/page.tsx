import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  SOL_COOKIE,
  readSol,
  solLabels,
  solPhase,
  unlockToken,
} from "@/lib/sol";
import { SolDoor } from "./SolDoor";
import { SolMark } from "./SolMark";
import "./sol.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ŠOL | Šimrání",
  description: "Živé setkání Šimračů s Markétou.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "ŠOL | Šimrání",
    description: "Živé setkání Šimračů s Markétou.",
    type: "website",
    locale: "cs_CZ",
    siteName: "Šimrání",
    images: [{ url: "/og-simrani.png", width: 1200, height: 630, alt: "Šimrání" }],
  },
};

export default async function SolPage() {
  const sol = await readSol();
  const phase = sol ? solPhase(sol) : "over";

  if (!sol || phase === "over") return <SolEmpty />;

  const jar = await cookies();
  const inside = !sol.word || jar.get(SOL_COOKIE)?.value === unlockToken(sol);

  return (
    <SolDoor
      title={sol.title}
      {...solLabels(sol)}
      live={phase === "live"}
      meetUrl={inside ? sol.meetUrl : null}
    />
  );
}

function SolEmpty() {
  return (
    <div className="sol-page">
      <SolMark />
      <div className="sol-grain" />
      <main className="relative z-[2] min-h-[100svh] flex flex-col px-5 md:px-16 lg:px-[120px] pt-6 md:pt-9 pb-7 md:pb-10">
        <Link
          href="/"
          className="sol-rise self-start font-headline text-[20px] md:text-[22px] text-[var(--cream)]"
          style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}
        >
          Šimrání
        </Link>
        <div className="flex-1 flex flex-col justify-center max-w-[680px] py-10">
          <div
            className="sol-rise text-[11px] tracking-[3px] uppercase text-[var(--gold)]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Šimrání online live
          </div>
          <h1
            className="sol-rise font-headline font-normal leading-[0.98] text-[var(--cream)] mt-4 text-[clamp(54px,14.6vw,112px)]"
            style={
              {
                "--i": 2,
                fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144",
              } as React.CSSProperties
            }
          >
            Další ŠOL chystám
          </h1>
          <p
            className="sol-rise mt-5 max-w-[440px] text-[16px] md:text-[18px] leading-[1.5] text-[var(--cream-60)] font-light"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            Termín sem dám, jakmile ho budu mít. Zatím můžeš povykládat se
            Šimrači na Forendors.
          </p>
          <a
            href="https://www.forendors.cz/simrani.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="sol-rise sol-cta mt-9 inline-flex self-stretch md:self-start items-center justify-center px-11 py-4 bg-[var(--gold)] rounded-full text-[15px] font-semibold text-[var(--deep)] hover:bg-[var(--cream)]"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            Zkus to na měsíc
          </a>
        </div>
      </main>
    </div>
  );
}
