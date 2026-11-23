import Link from "next/link";
import data from "@/data/archiv.json";
import { HOSTE_LITE } from "@/lib/archiv";

/* Sekce na homepage pod „Nejnovější epizody“: Druhá kapitola intimity, varianta D2 (Jakub 23. 11. 2026).
   Dvě karty: Chci něco zkusit (pojmy) a Kdo vám poradí (medailonky hostů). */
const EPS = data.epizody as { n: number | null; p: string[] }[];
const DILU = EPS.filter((e) => e.n).length;
const ZKUSIT = [
  { slug: "shibari", href: "/intimita?pojem=shibari" },
  { slug: "bdsm", href: "/intimita/bdsm" },
  { slug: "tantra", href: "/intimita?pojem=tantra" },
  { slug: "enm", href: "/intimita/enm", label: "ENM" },
];
const ZKUSIT_DILU = EPS.filter((e) => e.p.some((p) => ZKUSIT.some((z) => z.slug === p))).length;
const TVARE = ["diana-vera", "jan-komeda", "joan", "josef", "ardent", "kristyna-pracharova"]
  .map((s) => HOSTE_LITE.find((h) => h.slug === s && h.foto))
  .filter((h) => h !== undefined);

const KARTA = "relative flex flex-col gap-4 p-7 md:p-10 rounded-[4px] bg-[var(--wine-bg)] border border-[var(--gold-10)] min-w-0";
const KICKER = "text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)]";
const H3 = "font-headline font-normal text-[30px] md:text-[38px] leading-[1.1] text-[var(--cream)]";

export function ArchivTeaser() {
  return (
    <section id="intimita" className="relative pt-4 pb-16 md:pt-6 md:pb-[110px] px-5 md:px-12 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 w-[620px] h-[620px] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(74,25,66,0.55) 0%, rgba(26,10,20,0) 70%)" }}
      />
      <div className="relative max-w-[1180px] mx-auto flex flex-col gap-10 md:gap-12">
        <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-10">
          <div className="flex flex-col gap-4 min-w-0">
            <div className={KICKER}>Abeceda intimity</div>
            <h2 className="font-headline font-normal text-[40px] md:text-[64px] leading-[1.04] text-[var(--cream)]">Druhá kapitola intimity</h2>
            <p className="m-0 font-headline text-[20px] md:text-[24px] text-[var(--cream-60)]">
              Svět se mezitím změnil. <strong className="font-semibold text-[var(--gold)] whitespace-nowrap">Dá se to naučit.</strong>
            </p>
          </div>
          <Link href="/intimita" className="md:ml-auto shrink-0 text-[14px] font-medium text-[var(--gold)] hover:text-[var(--cream)] transition-colors">
            Celá Abeceda intimity · {DILU} dílů →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className={KARTA}>
            <div className={KICKER}>Když vás něco láká</div>
            <h3 className={H3}>Chci něco zkusit</h3>
            <p className="m-0 text-[15px] md:text-[17px] leading-[1.55] text-[var(--cream-60)]">
              Shibari, BDSM, tantra nebo otevřenej vztah. Je to v&nbsp;pořádku.
            </p>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0 pt-1">
              {ZKUSIT.map((z) => (
                <li key={z.slug}>
                  <Link
                    href={z.href}
                    className="inline-block px-3.5 py-1.5 rounded-full border border-[var(--gold-25)] text-[14px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] hover:border-[var(--gold)] transition-colors"
                  >
                    #{z.label ?? z.slug}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/intimita" className="mt-auto pt-4 text-[14px] font-medium text-[var(--gold)] hover:text-[var(--cream)] transition-colors">
              {ZKUSIT_DILU} dílů →
            </Link>
          </div>

          <Link
            href="/host"
            className={`${KARTA} group hover:border-[var(--gold-25)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(74,25,66,0.55)] transition-all`}
          >
            <div className={KICKER}>Hosté</div>
            <h3 className={`${H3} group-hover:text-[var(--gold)] transition-colors`}>Kdo vám poradí</h3>
            <p className="m-0 text-[15px] md:text-[17px] leading-[1.55] text-[var(--cream-60)]">
              Odbornice, performeři i lidé s vlastním příběhem.
            </p>
            <span className="flex items-center pt-1" aria-hidden>
              {TVARE.map((h, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={h.slug}
                  src={h.foto!}
                  alt=""
                  width={56}
                  height={56}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-[3px] border-[var(--wine-bg)]"
                  style={{ marginLeft: i ? -14 : 0 }}
                />
              ))}
              <span
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[var(--wine)] border-[3px] border-[var(--wine-bg)] font-headline text-[15px] text-[var(--gold)]"
                style={{ marginLeft: -14 }}
              >
                +{HOSTE_LITE.length - TVARE.length}
              </span>
            </span>
            <span className="mt-auto pt-4 text-[14px] font-medium text-[var(--gold)]">{HOSTE_LITE.length} medailonků →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
