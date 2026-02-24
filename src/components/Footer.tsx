const links = [
  { label: "Instagram", href: "#" },
  { label: "Spotify", href: "#" },
  { label: "Apple", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Merch", href: "https://shop.simrani.cz" },
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
