export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 bg-[var(--deep)]/90 backdrop-blur-lg border-b border-[var(--gold-06)]">
      <a href="#" className="font-headline text-[22px] font-normal text-[var(--cream)]">
        Šimrání
      </a>
      <ul className="hidden md:flex gap-8 list-none text-[13px] font-normal tracking-[1px]">
        <li><a href="#podcast" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Podcast</a></li>
        <li><a href="#start" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Začni tady</a></li>
        <li><a href="#marketa" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">O mně</a></li>
        <li><a href="#komunita" className="text-[var(--cream-60)] hover:text-[var(--gold)] transition-colors">Komunita</a></li>
      </ul>
    </nav>
  );
}
