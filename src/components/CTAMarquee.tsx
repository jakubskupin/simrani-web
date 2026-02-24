function MarqueeBlock() {
  const items = ["Poslouchejte", "Šimrání", "Poslouchejte", "Šimrání", "Poslouchejte", "Šimrání", "Poslouchejte", "Šimrání", "Poslouchejte", "Šimrání"];
  return (
    <div className="flex items-center shrink-0">
      {items.map((text, i) => (
        <span key={i} className="flex items-center">
          <span className="font-headline font-normal text-[36px] md:text-[80px] text-[var(--cream)]">
            {text}
          </span>
          <span className="font-headline font-normal italic text-[36px] md:text-[80px] text-[var(--gold)] mx-1 md:mx-2">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export function CTAMarquee() {
  return (
    <section className="flex flex-col items-center gap-7 md:gap-10 py-12 md:py-20 overflow-hidden">
      {/* Marquee strip — two identical copies for seamless loop */}
      <div className="flex items-center whitespace-nowrap animate-marquee">
        <MarqueeBlock />
        <MarqueeBlock />
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <a
          href="https://www.forendors.cz/simrani.cz"
          className="inline-flex items-center gap-2 px-7 md:px-8 py-3 md:py-3.5 bg-[var(--gold)] rounded-full text-[13px] md:text-[14px] font-medium text-[var(--deep)] hover:bg-[var(--cream)] transition-all"
        >
          Na Forendors
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[var(--deep)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
