import data from "@/data/archiv.json";

export const dynamic = "force-static";

/** Mapa obsahu pro AI agenty (llms.txt): Abeceda intimity a hosté podcastu Šimrání. */
export function GET() {
  const B = "https://simrani.cz";
  const hacky = data.hacky as { slug: string; nazev: string; pocet: number }[];
  const detail = data.detail as Record<string, { pohled: { text: string } }>;
  const hoste = (data as unknown as { hoste: { slug: string; jmeno: string; kdo: string }[] }).hoste || [];
  const lines = [
    "# Šimrání",
    "",
    "> Český podcast Markéty Fáberové o intimitě, sexu a vztazích. Od roku 2021 přes 250 dílů. Abeceda intimity je rozcestník po pojmech s doslovnými citacemi z dílů a odkazem na moment v dílu.",
    "",
    "## Abeceda intimity",
    "",
    `- [Abeceda intimity: všechny díly a pojmy](${B}/intimita): seznam všech příspěvků od roku 2021 s pojmy a odkazem na celý díl`,
    ...hacky.map((h) => `- [${h.nazev}](${B}/intimita/${h.slug}): ${h.pocet} dílů${detail[h.slug] ? `; jak to vidí Markéta: ${detail[h.slug].pohled.text.slice(0, 180)}…` : ""}`),
    "",
    "## Hosté",
    "",
    `- [Hosté Šimrání](${B}/host): přehled hostů s medailonky`,
    ...hoste.map((h) => `- [${h.jmeno}](${B}/host/${h.slug}): ${h.kdo}`),
    "",
    "## Další",
    "",
    `- [Šimrání na Forendors](https://www.forendors.cz/simrani.cz): celé díly a archiv pro předplatitele`,
    `- [Konzultace](${B}/konzultace)`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
