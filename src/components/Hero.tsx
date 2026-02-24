export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden px-12 pb-20">
      {/* Background — replace gradient with real photo via CSS background-image */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--wine)] to-[var(--deep)]"
        style={{
          /* backgroundImage: "url('/marketa-hero.jpg')", */
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/55 to-[var(--deep)]/20" />

      {/* Content */}
      <div className="relative z-[2] max-w-[640px]">
        <h1 className="font-headline font-normal text-[clamp(56px,7vw,96px)] leading-[0.95] text-[var(--cream)] mb-4">
          Šimrání
        </h1>
        <div className="text-[14px] tracking-[2px] uppercase text-[var(--gold)] mb-6 font-normal">
          Podcast o intimitě, sexualitě &amp; BDSM
        </div>
        <p className="text-[17px] leading-[1.7] text-[var(--cream-60)] max-w-[440px] mb-9 font-light">
          Otevřené rozhovory o tom, o čem se běžně nemluví. S&nbsp;lehkostí,
          respektem a zvědavostí. Protože intimita si zaslouží vlastní hlas.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="https://www.forendors.cz/simrani.cz"
            className="inline-block px-9 py-3.5 border border-[var(--gold)] rounded-full text-[14px] font-medium text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all"
          >
            Předplať si
          </a>
          <a
            href="#podcast"
            className="text-[14px] text-[var(--cream-60)] border-b border-[var(--cream)]/20 pb-0.5 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
          >
            nebo začni poslouchat zdarma →
          </a>
        </div>
      </div>
    </section>
  );
}
