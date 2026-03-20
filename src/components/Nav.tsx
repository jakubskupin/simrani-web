export function Nav() {
  return (
    <nav className="hidden md:flex sticky top-0 z-50 items-center justify-between px-12 py-5 bg-[var(--deep)]/90 backdrop-blur-lg border-b border-[var(--gold-06)]">
      <a
        href="/"
        className="font-headline text-[20px] md:text-[22px] font-normal text-[var(--cream)]"
        style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}
      >
        Šimrání
      </a>
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex gap-8 list-none text-[13px] font-normal tracking-[1px]">
          <li><a href="#podcast" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Podcast</a></li>
          <li><a href="#eventy" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Eventy</a></li>
          <li><a href="#komunita" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Komunita</a></li>
          <li><a href="#marketa" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">O mně</a></li>
        </ul>
        <a
          href="https://www.forendors.cz/simrani.cz"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-5 py-2 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[13px] font-medium tracking-[1px] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all duration-300"
        >
          Forendors
        </a>
      </div>
    </nav>
  );
}
