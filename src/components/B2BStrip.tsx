"use client";

import { useState } from "react";

export function B2BStrip() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative overflow-hidden border-t border-[rgba(197,155,104,0.06)] rounded-xl px-7 md:px-10 py-10 md:py-14 mt-2">
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
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-medium tracking-[3px] uppercase text-[var(--gold)] opacity-50">
            Pro firmy
          </span>
          <p className="text-[18px] md:text-[20px] font-headline italic text-[var(--cream)] opacity-80">
            Doporučte mě do firmy
          </p>
          <p className="text-[13px] leading-relaxed text-[var(--cream-35)] max-w-[460px]">
            Pokud akce proběhne, roční předplatné podcastu je na&nbsp;mě.
          </p>
          <div className="flex items-center gap-4 mt-0.5 text-[11px] text-[var(--cream-35)] opacity-50">
            <span>Důvěřují mi:</span>
            <span className="font-semibold tracking-[2px] uppercase text-[12px]">
              Škoda Auto
            </span>
            <span className="font-semibold tracking-[2px] uppercase text-[12px]">
              Direct Pojišťovna
            </span>
          </div>
        </div>
        <a
          href="/pro-firmy"
          className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-[var(--gold-25)] text-[13px] font-medium text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all shrink-0 w-fit"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Mám odvahu →
        </a>
      </div>
    </div>
  );
}
