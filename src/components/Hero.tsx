const heroStats = [
  { num: "200+", label: "Epizod" },
  { num: "4.6★", label: "Apple Podcasts" },
  { num: "4×", label: "Měsíčně" },
];

export function Hero() {
  return (
    <section className="relative h-[700px] md:h-[939px] overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--wine)] to-[var(--deep)] bg-cover bg-center"
        style={{
          backgroundImage: "url('/marketa-simrani.png')",
        }}
      />
      {/* Gradient overlay — from TOP (dark) fading down to transparent */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, #1A0A14CC 0%, #1A0A1480 15%, #1A0A1430 25%, transparent 35%)",
        }}
      />
      {/* Dark overlay for mobile readability */}
      <div
        className="absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #1A0A14DD 0%, #1A0A14AA 30%, #1A0A1480 50%, #1A0A1460 65%, #1A0A14CC 80%, #1A0A14 95%)",
        }}
      />
      {/* Bottom fade — smooth transition to page background (desktop) */}
      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, #1A0A1480 75%, #1A0A14CC 85%, #1A0A14 95%)",
        }}
      />

      {/* Content */}
      <div className="absolute z-[2] left-5 md:left-16 top-[80px] md:top-[200px] w-[calc(100%-40px)] md:w-[640px] flex flex-col gap-4">
        <div className="text-[11px] md:text-[12px] tracking-[3px] uppercase font-medium text-[var(--gold)]">
          Podcast o intimitě
        </div>
        <h1
          className="font-headline font-normal text-[64px] md:text-[96px] leading-[0.95] text-[var(--cream)] drop-shadow-lg"
          style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}
        >
          Šimrání
        </h1>

        <div className="flex flex-col gap-5 md:gap-6 w-full md:w-[600px] mt-2">
          <div className="font-headline italic font-normal text-[18px] md:text-[22px] leading-[1.3] text-[var(--gold)] drop-shadow-md">
            Kde ostatní končí,{"\n"}tam já začínám.
          </div>
          <p className="text-[14px] md:text-[16px] leading-[1.6] text-[var(--cream-60)] font-light md:max-w-[440px] drop-shadow-sm">
            Otevřené rozhovory o intimitě, vztazích a sexualitě.{" "}
            S&nbsp;lehkostí, respektem a zvědavostí.
          </p>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5">
            <a
              href="https://www.forendors.cz/simrani.cz"
              className="inline-flex items-center justify-center px-9 py-3.5 bg-[var(--gold)] rounded-full text-[14px] font-medium text-[var(--deep)] hover:bg-[var(--cream)] transition-all"
            >
              Předplať si na Forendors
            </a>
            <a
              href="#podcast"
              className="text-[13px] md:text-[14px] text-[var(--cream-60)] font-light hover:text-[var(--gold)] transition-colors drop-shadow-sm"
            >
              nebo začni poslouchat zdarma →
            </a>
          </div>

          {/* Mini stats row */}
          <div className="flex items-center gap-6 md:gap-8 mt-2">
            {heroStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="font-headline text-[28px] font-normal text-[var(--gold)] drop-shadow-md">
                  {s.num}
                </span>
                <span className="text-[11px] font-normal text-[var(--cream-35)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
