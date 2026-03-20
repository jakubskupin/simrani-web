const CHANNEL_ID = "UCz6s0662MakUS1aJhaADo7w";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const FALLBACK_VIDEOS: YouTubeVideo[] = [
  { id: "hg_FugtcvN4", title: "Infojeskyňka #01" },
  { id: "6LVveqD_1kU", title: "220. díl Šimrání s Karolínou a Christianem o lásce, tranzici a odvaze k otevřenosti" },
  { id: "ShOPcppF-ro", title: "219. díl Šimrání o intimitě, očekáváních a cestě k BDSM očima mladých snoubenců" },
  { id: "HqkQocR8nTM", title: "218. díl Šimrání o play party pro začátečníky" },
  { id: "xcJTeDtoDcI", title: "217. díl — Podruhé s dominou a masérkou Zuzanou" },
];

export interface YouTubeVideo {
  id: string;
  title: string;
}

export async function getLatestVideos(count = 5): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } }); // 1 hour

    if (!res.ok) return FALLBACK_VIDEOS;

    const xml = await res.text();

    // Verify we actually got XML, not an HTML consent/error page
    if (!xml.includes("<feed") && !xml.includes("<entry>")) {
      return FALLBACK_VIDEOS;
    }

    const videos: YouTubeVideo[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null && videos.length < count) {
      const entry = match[1];
      const idMatch = entry.match(/<yt:videoId>([^<]+)/);
      const titleMatch = entry.match(/<title>([^<]+)/);
      const linkMatch = entry.match(/href="([^"]+)"/);

      if (idMatch && titleMatch) {
        const title = titleMatch[1];
        const link = linkMatch ? linkMatch[1] : "";

        // Skip Shorts
        if (link.includes("/shorts/")) continue;

        videos.push({
          id: idMatch[1],
          title,
        });
      }
    }

    // If parsing returned nothing (e.g. YouTube returned garbage), use fallback
    return videos.length > 0 ? videos : FALLBACK_VIDEOS;
  } catch {
    return FALLBACK_VIDEOS;
  }
}
