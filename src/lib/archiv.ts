import data from "@/data/archiv.json";

export type Citace = {
  text: string;
  mluvci: string;
  odhad: boolean;
  stitek?: string | null;
  dil: number | string;
  kotva: string;
  odkaz: string;
  rok: number | null;
  fo: string | null;
};
export type Clovek = { jmeno: string; kdo: string; dily: (number | string)[]; odkazy?: { nazev: string; url: string }[] };
export type Hacek = { slug: string; nazev: string; pocet: number; roky: Record<string, number>; jemny?: boolean };
/** Stránka pojmu jako zdrojovaný článek (podcast-korpus/POJEM-CLANEK.md). */
export type Opora = Citace & { n: number; kdo: string; tvare?: string[] };
export type ClanekBlok =
  | { typ: "p"; casti: (string | { r: number })[] }
  | ({ typ: "citace"; kontext: string } & Citace)
  | { typ: "obrazek"; id: string }
  | { typ: "graf"; id: string }
  | { typ: "vyzkum"; id: string };
export type Obrazek = { soubor: string; sirka: number; vyska: number; popisek: string; zdroj: string; url: string; pozn?: string; svoleni: boolean };
export type Graf = { titulek: string; pojmy: [string, string][]; popisek: string };
/** Graf z cizího výzkumu, překreslený: řádky [popisek, procenta, zvýraznit 0/1]. */
export type Vyzkum = { titulek: string; otazka?: string; osoba?: string; n: string; rady: [string, number, number][]; zvyrazneni: string; zdroj: string; url: string; vzorek: string };

/** Pojmy se štítkem NOVÉ v levém panelu (Jakub 25. 11. 2026: ENM má nový článek). */
export const NOVE = new Set(["enm"]);
export type Clanek = {
  stav: string;
  aktualizovano: string;
  perex: string;
  sekce: { h2: string; bloky: ClanekBlok[] }[];
  zaver: string;
  opory: Opora[];
  obrazky: Record<string, Obrazek>;
  grafy: Record<string, Graf>;
  vyzkumy?: Record<string, Vyzkum>;
  cta?: { zacni: number; popisek: string };
  /** Kam se obrátit: lidé z podcastu, u kterých jde pojem zkusit (Jakub 26. 11. 2026, schvaluje Markéta). */
  kam?: { slug: string; co: string; dil: number }[];
  dily_hlavne?: string[];
  dily_hlavne_pozn?: string;
};
export type MistoDil = { n: number | null; t: string; fo: string | null };
export type Misto = { id: string; nazev: string; typ?: string; mesto?: string; co?: string; lide?: string[]; web?: string; dily: MistoDil[] };
/** Průvodce místy na /intimita/mista (Jakub 27. 11. 2026). */
export type Pruvodce = { perex: string; mista: Misto[]; dalsi: Misto[] };
export type Detail = { pohled: { text: string; opora: string[] }; lide: Clovek[]; citace: Citace[]; clanek?: Clanek; pruvodce?: Pruvodce };

/** Návrhy textů (stav „návrh…“) a obrázky bez svolení autora jen v lokálním náhledu nebo s NEXT_PUBLIC_NAHLED=1. */
export const NAHLED = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_NAHLED === "1";
export type Epizoda = { n: number | null; t: string; d: string; r: number; fo: string | null; yt: string | null; m?: number | null; h: string[]; p: string[] };

export const ROKY: number[] = data.roky;
export const HACKY: Hacek[] = data.hacky as Hacek[];
export const DETAIL: Record<string, Detail> = data.detail as unknown as Record<string, Detail>;
export const EPIZODY: Epizoda[] = data.epizody as Epizoda[];
export const FORENDORS = "https://www.forendors.cz/simrani.cz";

export function hacek(slug: string) {
  return HACKY.find((h) => h.slug === slug);
}

/** Díly pojmu: široké téma (h) nebo jemný pojem se stránkou (p), např. waxplay, spanking. */
export function dilyHacku(slug: string) {
  const jemny = HACKY.find((h) => h.slug === slug)?.jemny;
  return EPIZODY.filter((e) => (jemny ? e.p.includes(slug) : e.h.includes(slug)));
}

/** Citace na úvod archivu: Markéta, Infojeskyňka /01, o tom, co je v ložnicích běžné. */
export function uvodniCitace(): Citace | undefined {
  return DETAIL.bdsm?.citace.find((c) => c.dil === "Infojeskyňka /01" && c.kotva === "08:43");
}

export function stitekDilu(e: Epizoda) {
  if (e.n) return `${e.n}.`;
  const j = e.t.match(/\/(\d+)/);
  return j ? `J${j[1]}` : "✦";
}

/** Česká typografie: jednopísmenné předložky a spojky nevisí na konci řádku (slova se nemění). */
export function vazby(text: string) {
  return text.replace(/(^|\s)([vkszouaiVKSZOUAI])\s+/g, "$1$2\u00a0");
}

/* ---------- hosté: propojení citací a dílů s medailonky /host/<jmeno> ---------- */
export type HostLite = { slug: string; jmeno: string; foto: string | null; dily: number[]; bezCisla: string[]; pojmy: string[] };
type HostData = Omit<HostLite, "bezCisla" | "pojmy"> & { epizody?: { n: number | null; t: string }[]; pojmy?: string[] };
/** bezCisla = názvy bonusů a speciálů bez čísla, ve kterých host byl (BEZ_CISLA v export_web.py). */
export const HOSTE_LITE: HostLite[] = ((data as unknown as { hoste?: HostData[] }).hoste || []).map((h) => ({
  slug: h.slug,
  jmeno: h.jmeno,
  foto: h.foto,
  dily: h.dily,
  bezCisla: (h.epizody || []).filter((e) => !e.n).map((e) => e.t),
  pojmy: h.pojmy || [],
}));
const ALIAS: Record<string, string> = { "danny worm": "denny-worm" };
const nm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

/** Host podle jména; u samotného křestního jména musí sedět i díl (dvě Elišky, dva Josefové…). */
export function hostPodleJmena(jmeno: string, dily: (number | string)[] = []): HostLite | undefined {
  const k = nm(jmeno);
  const cisla = dily.filter((d): d is number => typeof d === "number");
  const alias = ALIAS[k];
  if (alias) return HOSTE_LITE.find((h) => h.slug === alias);
  const presne = HOSTE_LITE.find((h) => nm(h.jmeno) === k);
  const sedi = (h: HostLite) => !cisla.length || cisla.some((n) => h.dily.includes(n));
  if (presne && sedi(presne)) return presne;
  const krestni = k.split(/\s+/)[0];
  const podleDilu = cisla.length ? HOSTE_LITE.find((h) => nm(h.jmeno).split(/\s+/)[0] === krestni && cisla.some((n) => h.dily.includes(n))) : undefined;
  if (podleDilu) return podleDilu;
  return presne && k.includes(" ") ? presne : undefined;
}

export function hosteDilu(n: number | null, titul?: string): HostLite[] {
  if (n) return HOSTE_LITE.filter((h) => h.dily.includes(n));
  return titul ? HOSTE_LITE.filter((h) => h.bezCisla.includes(titul)) : [];
}
