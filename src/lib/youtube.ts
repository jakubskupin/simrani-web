const CHANNEL_ID = "UCz6s0662MakUS1aJhaADo7w";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export interface YouTubeVideo {
  id: string;
  title: string;
}

export async function getLatestVideos(count = 5): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 21600 } }); // 6 hours
    const xml = await res.text();

    const videos: YouTubeVideo[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null && videos.length < count) {
      const entry = match[1];
      const idMatch = entry.match(/<yt:videoId>([^<]+)/);
      const titleMatch = entry.match(/<title>([^<]+)/);

      if (idMatch && titleMatch) {
        const title = titleMatch[1];
        // Only include full episodes (title contains "díl" or "Díl"), skip Shorts/Stories
        if (!/d[íi]l/i.test(title)) continue;

        videos.push({
          id: idMatch[1],
          title,
        });
      }
    }

    return videos;
  } catch {
    // Fallback to hardcoded videos if fetch fails
    return [
      { id: "xcJTeDtoDcI", title: "217. díl Šimrání" },
      { id: "eZMz180AkKo", title: "216. díl — Ženský cyklus, plodnost a antikoncepce" },
      { id: "V8oHbpuzsTU", title: "215. díl — Tělo, vztahy, nahota a popularita" },
      { id: "xsWSRHv1Chc", title: "214. díl — Porod z pohledu muže" },
      { id: "MwMIw6tgjX4", title: "213. díl — Manželství a pás cudnosti" },
    ];
  }
}
