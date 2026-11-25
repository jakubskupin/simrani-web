import Link from "next/link";
import { HACKY, FORENDORS } from "@/lib/archiv";
import archivData from "@/data/archiv.json";

export function ArchivBar({ aktivni }: { aktivni?: string }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--deep)]/90 backdrop-blur-lg border-b border-[var(--gold-06)]">
      <div className="max-w-[1280px] mx-auto flex items-center gap-4 px-5 md:px-12 py-4">
        <Link
          href="/"
          className="font-headline text-[20px] md:text-[22px] text-[var(--cream)]"
          style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}
        >
          Šimrání
        </Link>
        <span className="text-[var(--cream-35)]">/</span>
        <Link href="/intimita" className={`text-[13px] tracking-[1px] ${aktivni ? "text-[var(--cream-60)] hover:text-[var(--gold)]" : "text-[var(--gold)]"}`}>
          intimita
        </Link>
        <a
          href={FORENDORS}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto px-4 md:px-5 py-2 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[12px] md:text-[13px] font-medium tracking-[1px] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all"
        >
          Forendors
        </a>
      </div>
    </header>
  );
}

/* Jeden levý panel pro celou Abecedu (stejný jako na /intimita): Všechny díly, Hosté, pojmy po oblastech.
   Klik vždy vede na stránku, nikdy nefiltruje. Na mobilu vodorovný pás. */
type PanelPojem = { slug: string; label: string; pocet: number };
const OBLASTI_PANEL = archivData.oblasti as { nazev: string; pojmy: PanelPojem[] }[];
const POCET_DILU = (archivData.epizody as unknown[]).length;
const POCET_HOSTU = ((archivData as unknown as { hoste?: unknown[] }).hoste || []).length;

/** aktivni = slug pojmu, nebo „vse“ (katalog) a „hoste“ (/host). */
export function AbecedaPanel({ aktivni }: { aktivni?: string }) {
  const polozka = (href: string, label: string, n: number, on: boolean, key: string) => (
    <li key={key} className="shrink-0">
      <Link
        href={href}
        aria-current={on ? "page" : undefined}
        className={`flex items-baseline justify-between gap-3 whitespace-nowrap px-3.5 md:px-2.5 py-1.5 md:py-[5px] rounded-full md:rounded-[4px] text-[13px] md:text-[14px] transition-colors ${
          on ? "bg-[var(--gold)] text-[var(--deep)]" : "border border-[var(--gold-10)] md:border-0 text-[var(--cream-60)] hover:text-[var(--cream)] hover:bg-[var(--gold-06)]"
        }`}
      >
        <span>{label}</span>
        <span className={`text-[11px] tabular-nums ${on ? "" : "text-[var(--cream-35)]"}`}>{n}</span>
      </Link>
    </li>
  );
  const pojmy = OBLASTI_PANEL.flatMap((o) => o.pojmy);
  return (
    <nav aria-label="Abeceda intimity" className="min-w-0">
      <ul className="md:hidden flex gap-2 overflow-x-auto scrollbar-hide list-none p-0 m-0 -mx-5 px-5">
        {polozka("/intimita", "Všechny díly", POCET_DILU, aktivni === "vse", "vse")}
        {polozka("/host", "Hosté", POCET_HOSTU, aktivni === "hoste", "hoste")}
        {[...pojmy.filter((p) => p.slug === aktivni), ...pojmy.filter((p) => p.slug !== aktivni)].map((p) =>
          polozka(`/intimita/${p.slug}`, `#${p.label}`, p.pocet, p.slug === aktivni, p.slug),
        )}
      </ul>
      <div className="hidden md:flex flex-col gap-5">
        <ul className="flex flex-col gap-0.5 list-none p-0 m-0">
          {polozka("/intimita", "Všechny díly", POCET_DILU, aktivni === "vse", "vse")}
          {polozka("/host", "Hosté", POCET_HOSTU, aktivni === "hoste", "hoste")}
        </ul>
        {OBLASTI_PANEL.map((o) => (
          <div key={o.nazev} className="flex flex-col gap-1">
            <div className="text-[10px] tracking-[3px] uppercase text-[var(--cream-35)] mb-1 px-2.5">{o.nazev}</div>
            <ul className="flex flex-col gap-0.5 list-none p-0 m-0">
              {o.pojmy.map((p) => polozka(`/intimita/${p.slug}`, `#${p.label}`, p.pocet, p.slug === aktivni, p.slug))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

/* Seznam pojmů jako levý panel v Roamu (na mobilu vodorovný pás) */
export function HackyPanel({ aktivni }: { aktivni?: string }) {
  return (
    <nav aria-label="Pojmy" className="min-w-0">
      <div className="hidden md:block text-[10px] tracking-[3px] uppercase text-[var(--cream-35)] mb-3">Pojmy</div>
      <ul className="flex md:flex-col gap-2 md:gap-0.5 overflow-x-auto scrollbar-hide list-none p-0 m-0 -mx-5 px-5 md:mx-0 md:px-0">
        {HACKY.map((h) => {
          const on = h.slug === aktivni;
          return (
            <li key={h.slug} className="shrink-0">
              <Link
                href={`/intimita/${h.slug}`}
                aria-current={on ? "page" : undefined}
                className={`flex items-baseline justify-between gap-3 whitespace-nowrap md:whitespace-normal px-3.5 md:px-2.5 py-1.5 md:py-1 rounded-full md:rounded-[3px] text-[13px] transition-colors ${
                  on
                    ? "bg-[var(--gold)] text-[var(--deep)]"
                    : "border border-[var(--gold-10)] md:border-0 text-[var(--cream-60)] hover:text-[var(--cream)] hover:bg-[var(--gold-06)]"
                }`}
              >
                <span>
                  <span className={on ? "" : "text-[var(--gold)]"}>#</span>
                  {h.nazev}
                </span>
                <span className={`text-[11px] tabular-nums ${on ? "" : "text-[var(--cream-35)]"}`}>{h.pocet}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ForendorsBox() {
  return (
    <aside className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-7 md:p-9 bg-[var(--wine-bg)] border border-[var(--gold-10)] rounded-[4px]">
      <div className="flex flex-col gap-2 max-w-[560px]">
        <div className="font-headline text-[22px] md:text-[26px] text-[var(--cream)]">Celé díly jsou na Forendors</div>
        <p className="m-0 text-[14px] leading-[1.6] text-[var(--cream-60)]">
          Na YouTube a Spotify je u novějších dílů jen první část. Předplatné za 248 Kč měsíčně ti otevře celý archiv, většinu dílů
          koupíš i jednotlivě za 249 Kč.
        </p>
      </div>
      <a
        href={FORENDORS}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start md:self-auto shrink-0 px-6 py-3 rounded-full bg-[var(--gold)] text-[var(--deep)] text-[14px] font-medium hover:shadow-[0_8px_30px_rgba(197,155,104,0.3)] transition-all"
      >
        Poslouchat na Forendors
      </a>
    </aside>
  );
}
