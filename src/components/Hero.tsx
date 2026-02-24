const heroStats = [
  { num: "200+", label: "Epizod" },
  { num: "4.6★", label: "Apple Podcasts" },
  { num: "4×", label: "Měsíčně" },
];

export function Hero() {
  return (
    <section className="relative h-[780px] md:h-[939px] overflow-hidden">
      {/* Fallback gradient while image loads */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--wine)] to-[var(--deep)]" />
      {/* Photo — mobile: Pencil V2 framing (508×824 in 390×780 at -84,-86); desktop: cover centered */}
      <img
        src="/marketa-simrani.png"
        alt=""
        className="absolute z-0 object-cover max-w-none w-[130.3%] h-[105.6%] left-[-21.5%] top-[-11%] md:w-full md:h-full md:left-0 md:top-0 md:object-center"
      />
      {/* Gradient overlay — from TOP (dark) fading down to transparent (desktop) */}
      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, #1A0A14CC 0%, #1A0A1480 15%, #1A0A1430 25%, transparent 35%)",
        }}
      />
      {/* Bottom fade — V2 strong fade for mobile */}
      <div
        className="absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #1A0A1420 30%, #1A0A14BB 50%, #1A0A14F0 65%, #1A0A14 75%)",
        }}
      />
      {/* Bottom fade — desktop */}
      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, #1A0A1480 75%, #1A0A14CC 85%, #1A0A14 95%)",
        }}
      />

      {/* Content — mobile: sits in the dark faded area below photo */}
      <div className="absolute z-[2] left-5 md:left-16 top-[410px] md:top-[200px] w-[350px] md:w-[640px] flex flex-col gap-3.5 md:gap-4">
        <div className="text-[10px] md:text-[12px] tracking-[3px] uppercase font-medium text-[var(--gold)]">
          Podcast o intimitě
        </div>
        <h1
          className="font-headline font-normal text-[56px] md:text-[96px] leading-[0.95] text-[var(--cream)]"
          style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}
        >
          Šimrání
        </h1>

        <div className="flex flex-col gap-3.5 md:gap-6 w-full md:w-[600px]">
          <div className="font-headline italic font-normal text-[17px] md:text-[22px] leading-[1.3] text-[var(--gold)]">
            Kde ostatní končí, tam já začínám.
          </div>
          <p className="text-[14px] md:text-[16px] leading-[1.6] text-[var(--cream-60)] font-light md:max-w-[440px]">
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
              className="text-[13px] md:text-[14px] text-[var(--cream-60)] font-light hover:text-[var(--gold)] transition-colors"
            >
              nebo začni poslouchat zdarma →
            </a>
          </div>
        </div>
      </div>

      {/* Stats row — mobile: pinned near bottom; desktop: inside content flow */}
      <div className="absolute z-[2] left-5 md:left-16 bottom-auto md:bottom-auto top-[684px] md:top-[680px] flex items-center gap-6 md:gap-8">
        {heroStats.map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5">
            <span className="font-headline text-[22px] md:text-[28px] font-normal text-[var(--gold)]">
              {s.num}
            </span>
            <span className="text-[10px] md:text-[11px] font-normal text-[var(--cream-35)]">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
