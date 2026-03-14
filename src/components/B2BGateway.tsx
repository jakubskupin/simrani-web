"use client";

import { useState } from "react";

export function B2BGateway() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[var(--wine-bg)] px-5 md:px-12 lg:px-[120px] py-12 md:py-16">
      {/* Background image — revealed on CTA hover */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <img
          src="/b2b-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay to keep text readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(26,10,20,0.94) 0%, rgba(26,10,20,0.85) 50%, rgba(26,10,20,0.5) 80%, rgba(26,10,20,0.25) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
        {/* Left — text */}
        <div className="flex flex-col gap-3.5">
          <span className="text-[11px] font-medium tracking-[4px] uppercase text-[var(--gold)]">
            Pro firmy
          </span>
          <h2 className="font-headline text-[26px] md:text-[32px] font-semibold italic text-[var(--cream)]">
            Doporučte mě do firmy
          </h2>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--cream-60)] max-w-[600px]">
            Pokud akce proběhne, roční předplatné podcastu je na&nbsp;mě.
          </p>
          <div className="flex items-center gap-5 mt-1 text-[12px] text-[var(--cream-35)]">
            <span>Důvěřují mi:</span>
            <span className="font-semibold tracking-[2px] uppercase text-[13px]">
              Škoda Auto
            </span>
            <span className="font-semibold tracking-[2px] uppercase text-[13px]">
              Direct Pojišťovna
            </span>
          </div>
        </div>

        {/* Right — CTA */}
        <a
          href="/pro-firmy"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[var(--gold)] text-[14px] font-semibold text-[var(--deep)] hover:bg-[var(--cream)] transition-all shrink-0 w-fit"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Mám odvahu →
        </a>
      </div>
    </section>
  );
}
