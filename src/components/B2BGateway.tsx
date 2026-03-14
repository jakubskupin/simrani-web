export function B2BGateway() {
  return (
    <section className="bg-[var(--wine-bg)] px-5 md:px-12 lg:px-[120px] py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
        {/* Left — text */}
        <div className="flex flex-col gap-3.5">
          <span className="text-[11px] font-medium tracking-[4px] uppercase text-[var(--gold)]">
            Pro firmy
          </span>
          <h2 className="font-headline text-[26px] md:text-[32px] font-semibold italic text-[var(--cream)]">
            Pozvěte mě do vaší firmy
          </h2>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--cream-60)] max-w-[600px]">
            Přednášky a workshopy o komunikaci, intimitě a well-beingu pro
            firemní týmy. Neformálně, otevřeně, s&nbsp;respektem.
          </p>
          <div className="flex items-center gap-5 mt-1 text-[12px] text-[var(--cream-35)]">
            <span>Důvěřují mi:</span>
            <span className="font-semibold tracking-[2px] uppercase text-[13px]">Škoda Auto</span>
            <span className="font-semibold tracking-[2px] uppercase text-[13px]">Direct Pojišťovna</span>
          </div>
        </div>

        {/* Right — CTA */}
        <a
          href="/pro-firmy"
          className="inline-flex items-center justify-center px-9 py-4 rounded-lg border border-[var(--gold)] text-[15px] font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all shrink-0 w-fit"
        >
          Zjistit více →
        </a>
      </div>
    </section>
  );
}
