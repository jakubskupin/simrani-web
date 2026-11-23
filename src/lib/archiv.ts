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
export type Clovek = { jmeno: string; kdo: string; dily: (number | string)[] };
export type Hacek = { slug: string; nazev: string; pocet: number; roky: Record<string, number> };
export type Detail = { pohled: { text: string; opora: string[] }; lide: Clovek[]; citace: Citace[] };
export type Epizoda = { n: number | null; t: string; d: string; r: number; fo: string | null; yt: string | null; h: string[] };

export const ROKY: number[] = data.roky;
export const HACKY: Hacek[] = data.hacky as Hacek[];
export const DETAIL: Record<string, Detail> = data.detail as Record<string, Detail>;
export const EPIZODY: Epizoda[] = data.epizody as Epizoda[];
export const FORENDORS = "https://www.forendors.cz/simrani.cz";

export function hacek(slug: string) {
  return HACKY.find((h) => h.slug === slug);
}

export function dilyHacku(slug: string) {
  return EPIZODY.filter((e) => e.h.includes(slug));
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
export type HostLite = { slug: string; jmeno: string; foto: string | null; dily: number[] };
export const HOSTE_LITE: HostLite[] = ((data as unknown as { hoste?: HostLite[] }).hoste || []).map((h) => ({ slug: h.slug, jmeno: h.jmeno, foto: h.foto, dily: h.dily }));
const ALIAS: Record<string, string> = { "danny worm": "dennyworm" };
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

export function hosteDilu(n: number | null): HostLite[] {
  if (!n) return [];
  return HOSTE_LITE.filter((h) => h.dily.includes(n));
}
