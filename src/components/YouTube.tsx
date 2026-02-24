import { getLatestVideos } from "@/lib/youtube";
import { YouTubePlayer } from "./YouTubePlayer";

const platforms = [
  { icon: "youtube", label: "YouTube", href: "https://www.youtube.com/@%C5%A0imr%C3%A1n%C3%ADpodcast" },
  { icon: "headphones", label: "Spotify", href: "https://open.spotify.com/show/4YtZKf6TsvMbCiuEu2zoUc" },
  { icon: "podcast", label: "Apple Podcasts", href: "https://podcasts.apple.com/cz/podcast/%C5%A1imr%C3%A1n%C3%AD/id1579002710" },
];

export async function YouTube() {
  const episodes = await getLatestVideos(5);

  return (
    <section
      id="podcast"
      className="flex flex-col items-center py-16 md:py-[100px] px-5 md:px-12 gap-6 md:gap-8 bg-gradient-to-b from-[var(--deep)] via-[#120810] to-[var(--deep)]"
    >
      <h2 className="font-headline font-normal text-[28px] md:text-[42px] leading-[1.1] text-[var(--cream)]">
        Nejnovější epizody
      </h2>

      <YouTubePlayer episodes={episodes} />

      {/* Platformy strip */}
      <div className="flex flex-col items-center gap-3 md:gap-4 w-full pt-5 md:pt-6 border-t border-[var(--gold-06)]">
        <span className="text-[10px] md:text-[11px] tracking-[2px] uppercase font-medium text-[var(--cream-35)]">
          Poslouchej také na
        </span>
        <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
          {platforms.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 border border-[var(--gold-10)] rounded-full hover:border-[var(--gold-25)] transition-colors"
            >
              <PlatformIcon name={p.icon} />
              <span className="text-[11px] md:text-[13px] font-medium text-[var(--cream-60)]">
                {p.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformIcon({ name }: { name: string }) {
  const iconClass = "w-5 h-5 text-[var(--gold)]";
  switch (name) {
    case "youtube":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
      );
    case "headphones":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
      );
    case "podcast":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.85 18.58a9 9 0 1 0-9.7 0"/><path d="M8 14a5 5 0 1 1 8 0"/><circle cx="12" cy="11" r="1"/><path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"/></svg>
      );
    default:
      return null;
  }
}
