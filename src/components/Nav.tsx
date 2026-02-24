export function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 md:px-12 md:py-5 bg-[var(--deep)]/90 backdrop-blur-lg border-b border-[var(--gold-06)]">
      <a
        href="#"
        className="font-headline text-[20px] md:text-[22px] font-normal text-[var(--cream)]"
        style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}
      >
        Šimrání
      </a>
      <ul className="hidden md:flex gap-8 list-none text-[13px] font-normal tracking-[1px]">
        <li><a href="#podcast" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Podcast</a></li>
        <li><a href="#start" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Začni tady</a></li>
        <li><a href="#komunita" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Komunita</a></li>
        <li><a href="#marketa" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">O mně</a></li>
      </ul>
      {/* Hamburger icon — mobile only */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-[var(--cream-60)] md:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </nav>
  );
}
