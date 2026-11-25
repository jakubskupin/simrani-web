import Link from "next/link";
import type { ReactNode } from "react";
import data from "@/data/archiv.json";

const STRANKY = new Set((data.hacky as { slug: string }[]).map((h) => h.slug));
const L = "(?<![\\p{L}\\p{N}])";
/** Pojem → jak ho poznat v českém textu (i skloňovaný). Odkazuje se jen první výskyt v bloku. */
const PRAVIDLA: [string, RegExp][] = (
  [
    ["shibari", "shibari"],
    ["bdsm", "BDSM"],
    ["enm", "(?:ENM|otevřen\\p{L}* (?:vztah|manželst)\\p{L}*)"],
    ["polyamorie", "polyamori\\p{L}*"],
    ["swingers", "swing\\p{L}*"],
    ["trojka", "troj[kc]\\p{L}*"],
    ["zarlivost", "žárliv\\p{L}*"],
    ["nevera", "nevě[rř]\\p{L}*"],
    ["komunikace", "komunikac\\p{L}*"],
    ["rozvod", "rozv(?:od|ed)\\p{L}*|rozchod\\p{L}*"],
    ["randeni", "randě\\p{L}*|seznamov\\p{L}*"],
    ["dominance", "domin(?!ik)\\p{L}*|submis\\p{L}*"],
    ["spanking", "spank\\p{L}*"],
    ["waxplay", "waxplay"],
    ["latex", "latex\\p{L}*"],
    ["clawdering", "clawdering\\p{L}*"],
    ["playparty", "play ?part(?:y|ies)"],
    ["hypnoza", "hypnó\\p{L}*"],
    ["dirtytalk", "dirty ?talk\\p{L}*"],
    ["feminismus", "feminis\\p{L}*"],
    ["dresscode", "dress ?cod\\p{L}*|dress kód\\p{L}*"],
    ["pomucky", "pomůc(?:k|ek)\\p{L}*"],
    ["tantra", "tant[rř]\\p{L}*"],
    ["masaz", "mas(?:áž|ér)\\p{L}*"],
    ["orgasmus", "orgasm\\p{L}*"],
    ["nahota", "nahot\\p{L}*"],
    ["terapie", "psychoterapeut\\p{L}*|terapeut(?!ick)\\p{L}*|terapi\\p{L}*"],
    ["konsent", "konsent\\p{L}*"],
    ["lgbtq", "LGBT\\p{L}*\\+?"],
    ["asexualita", "asexuál\\p{L}*"],
  ] as [string, string][]
).map(([s, r]) => [s, new RegExp(L + r, "iu")]);

export const hrefPojmu = (slug: string) => (STRANKY.has(slug) ? `/intimita/${slug}` : `/intimita?pojem=${slug}`);

/** Vrátí text s odkazy z prvního výskytu každého pojmu; `vynech` = pojem stránky, na které text stojí. */
export function prolinkuj(text: string, vynech?: string): ReactNode {
  const hits: { i: number; len: number; slug: string }[] = [];
  for (const [slug, rx] of PRAVIDLA) {
    if (slug === vynech) continue;
    const m = rx.exec(text);
    if (m && !hits.some((h) => m.index < h.i + h.len && h.i < m.index + m[0].length)) hits.push({ i: m.index, len: m[0].length, slug });
  }
  if (!hits.length) return text;
  hits.sort((a, b) => a.i - b.i);
  const out: ReactNode[] = [];
  let pos = 0;
  for (const h of hits) {
    if (h.i > pos) out.push(text.slice(pos, h.i));
    out.push(
      <Link key={h.slug + h.i} href={hrefPojmu(h.slug)} className="text-[var(--gold)] underline decoration-[var(--gold)] decoration-1 underline-offset-4 hover:text-[var(--cream)]">
        {text.slice(h.i, h.i + h.len)}
      </Link>,
    );
    pos = h.i + h.len;
  }
  if (pos < text.length) out.push(text.slice(pos));
  return out;
}
