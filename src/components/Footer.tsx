const links = [
  { label: "Instagram", href: "https://www.instagram.com/simrani.podcast/" },
  { label: "Spotify", href: "https://open.spotify.com/show/4YtZKf6TsvMbCiuEu2zoUc" },
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/cz/podcast/%C5%A1imr%C3%A1n%C3%AD/id1579002710" },
  { label: "YouTube", href: "https://www.youtube.com/@ŠimráníPodcast" },
  { label: "Forendors", href: "https://www.forendors.cz/simrani.cz" },
];

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-start gap-8 px-12 py-12 border-t border-[var(--gold-06)] text-[13px] text-[var(--cream-35)]">
      <div>
        <div className="font-headline text-[20px] text-[var(--cream)] mb-2">
          Šimrání
        </div>
        <div>&copy; 2026 Šimrání Podcast</div>
      </div>
      <div className="flex gap-5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
