export function CTAMarquee() {
  return (
    <section className="flex flex-col items-center gap-10 py-20 overflow-hidden">
      {/* Marquee strip */}
      <div className="flex items-center whitespace-nowrap animate-marquee">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="font-headline font-normal text-[80px] text-[var(--cream)]">
              {i % 2 === 0 ? "Poslouchejte" : "Šimrání"}
            </span>
            {i < 5 && (
              <span className="font-headline font-normal italic text-[80px] text-[var(--gold)] mx-1">
                {" "}·{" "}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <a
          href="https://www.forendors.cz/simrani.cz"
          className="inline-flex items-center gap-2 px-8 py-3.5 border border-[var(--gold)] rounded-full text-[14px] font-medium text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all"
        >
          Na Forendors
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[var(--gold)]"
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
