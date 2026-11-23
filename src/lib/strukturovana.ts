/** Strukturovaná data (schema.org JSON-LD) pro Abecedu intimity a hosty: vyhledávače a AI agenti z nich čtou celý obsah, i ten, který stránka ukazuje až po kliknutí. */
export const WEB = "https://simrani.cz";
export const SERIE = { "@type": "PodcastSeries", name: "Šimrání", url: WEB, author: { "@type": "Person", name: "Markéta Fáberová" } };

/** Počet dílů v 1. pádě: 1 díl, 2 díly, 5 dílů. */
export const pocetDilu = (n: number) => `${n} ${n === 1 ? "díl" : n >= 2 && n <= 4 ? "díly" : "dílů"}`;

type Ep = { n: number | null; t: string; d: string; fo: string | null; yt: string | null };
export const epizodaLd = (e: Ep) => ({
  "@type": "PodcastEpisode",
  name: e.t,
  ...(e.n ? { episodeNumber: e.n } : {}),
  datePublished: e.d,
  url: e.fo || (e.yt ? `https://youtu.be/${e.yt}` : undefined),
  inLanguage: "cs",
  partOfSeries: SERIE,
});

export const seznamLd = (polozky: object[]) => ({
  "@type": "ItemList",
  numberOfItems: polozky.length,
  itemListElement: polozky.map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
});

export const drobeckyLd = (kroky: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: kroky.map(([name, cesta], i) => ({ "@type": "ListItem", position: i + 1, name, item: WEB + cesta })),
});

/** JSON do <script>: escapovat „<“, aby text citací nemohl ukončit značku. */
export const ldJson = (graf: object[]) => JSON.stringify({ "@context": "https://schema.org", "@graph": graf }).replace(/</g, "\\u003c");
