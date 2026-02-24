const links = [
  { label: "Instagram", href: "https://www.instagram.com/simrani_podcast" },
  { label: "Spotify", href: "https://open.spotify.com/show/4YtZKf6TsvMbCiuEu2zoUc" },
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/cz/podcast/%C5%A1imr%C3%A1n%C3%AD/id1579002710" },
  { label: "YouTube", href: "https://www.youtube.com/@ŠimráníPodcast" },
  { label: "Forendors", href: "https://www.forendors.cz/simrani.cz" },
];

export function Footer() {
  return (
    <footer className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start md:gap-8 px-5 md:px-12 py-8 md:py-12 border-t border-[var(--gold-06)] text-[13px] text-[var(--cream-35)]">
      <div>
        <div className="font-headline text-[18px] md:text-[20px] text-[var(--cream)] mb-2">
          Šimrání
        </div>
        <div className="text-[11px] md:text-[13px]">&copy; 2026 Šimrání Podcast</div>
      </div>
      <div className="flex gap-4 md:gap-5 flex-wrap">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] md:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
