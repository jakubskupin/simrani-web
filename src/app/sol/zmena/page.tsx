import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAdminKey, readSol } from "@/lib/sol";
import { pickWord } from "@/lib/sol-words";
import { SolAdmin } from "./SolAdmin";
import "../sol.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nový ŠOL",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function SolAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ klic?: string }>;
}) {
  const { klic } = await searchParams;
  if (!klic || !isAdminKey(klic)) notFound();

  const current = await readSol();

  return (
    <div className="sol-page sol-admin">
      <div className="sol-grain" />
      <main className="relative z-[2] max-w-[560px] mx-auto px-5 py-10 md:py-16">
        <SolAdmin
          klic={klic}
          current={current}
          suggestedWord={pickWord(current?.word)}
        />
      </main>
    </div>
  );
}
