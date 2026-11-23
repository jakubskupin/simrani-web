import Link from "next/link";
import data from "@/data/archiv.json";

export type Host = {
  slug: string;
  jmeno: string;
  kdo: string;
  proc: string;
  web: string | null;
  instagram?: string | null;
  dalsi?: { nazev: string; url: string }[];
  foto: string | null;
  dily: number[];
  citace: { text: string; kotva: string; odkaz: string; dil: number | string; stitek?: string | null }[];
  pojmy: string[];
  epizody: { n: number; t: string; d: string; r: number; fo: string | null; yt: string | null }[];
};

export const HOSTE = (data as unknown as { hoste: Host[] }).hoste;
export const POJMY_LABEL: Record<string, string> = Object.fromEntries(
  (data.oblasti as { pojmy: { slug: string; label: string }[] }[]).flatMap((o) => o.pojmy.map((p) => [p.slug, p.label])),
);
export const STRANKY_POJMU = new Set(Object.keys(data.detail));

export function HostBar({ slug }: { slug?: string }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--deep)]/90 backdrop-blur-lg border-b border-[var(--gold-06)]">
      <div className="max-w-[1280px] mx-auto flex items-center gap-3 md:gap-4 px-5 md:px-12 py-4">
        <Link href="/" className="font-headline text-[20px] md:text-[22px] text-[var(--cream)]" style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}>
          Šimrání
        </Link>
        <span className="text-[var(--cream-35)]">/</span>
        <Link href="/host" className={`text-[13px] tracking-[1px] ${slug ? "text-[var(--cream-60)] hover:text-[var(--gold)]" : "text-[var(--gold)]"}`}>
          host
        </Link>
        {slug && (
          <>
            <span className="text-[var(--cream-35)]">/</span>
            <span className="font-mono text-[13px] text-[var(--gold)] truncate">{slug}</span>
          </>
        )}
        <a
          href="https://www.forendors.cz/simrani.cz"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 px-4 md:px-5 py-2 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[12px] md:text-[13px] font-medium tracking-[1px] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all"
        >
          Forendors
        </a>
      </div>
    </header>
  );
}

export function Foto({ h, size }: { h: Host; size: number }) {
  const ini = h.jmeno.split(/\s+/).map((s) => s[0]).join("").slice(0, 2);
  return h.foto ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={h.foto} alt={`${h.jmeno} v Šimrání`} width={size} height={size} className="rounded-full object-cover border-2 border-[var(--gold)] shrink-0" style={{ width: size, height: size }} />
  ) : (
    <span className="rounded-full bg-[var(--wine-bg)] border-2 border-[var(--gold-25)] flex items-center justify-center font-headline text-[var(--gold)] shrink-0" style={{ width: size, height: size, fontSize: size * 0.34 }}>
      {ini}
    </span>
  );
}
