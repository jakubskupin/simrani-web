import type { MetadataRoute } from "next";
import data from "@/data/archiv.json";

const BASE = "https://simrani.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(data.aktualizovano);
  const pojmy = (data.hacky as { slug: string }[]).map((h) => `/intimita/${h.slug}`);
  const hoste = ((data as unknown as { hoste: { slug: string }[] }).hoste || []).map((h) => `/host/${h.slug}`);
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/konzultace`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/pro-firmy`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/intimita`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...pojmy.map((p) => ({ url: BASE + p, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: `${BASE}/host`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...hoste.map((p) => ({ url: BASE + p, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
