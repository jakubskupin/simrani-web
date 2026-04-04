"use client";

import { useState } from "react";

export function PricingToggle() {
  const [isSubscriber, setIsSubscriber] = useState(false);
  const currentPrice = isSubscriber ? 517 : 690;

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex items-center rounded-full bg-[var(--wine-bg)] border border-[var(--gold-10)] p-1">
          <button
            onClick={() => setIsSubscriber(false)}
            className={`text-[13px] sm:text-[14px] font-medium px-5 py-2 rounded-full transition-all duration-300 ${
              !isSubscriber
                ? "bg-[var(--gold)] text-[var(--deep)]"
                : "text-[var(--cream-60)] hover:text-[var(--cream)]"
            }`}
          >
            Standardní
          </button>
          <button
            onClick={() => setIsSubscriber(true)}
            className={`text-[13px] sm:text-[14px] font-medium px-5 py-2 rounded-full transition-all duration-300 ${
              isSubscriber
                ? "bg-[var(--gold)] text-[var(--deep)]"
                : "text-[var(--cream-60)] hover:text-[var(--cream)]"
            }`}
          >
            Předplatitel/ka
          </button>
        </div>
      </div>

      <div className="text-center mb-6">
        {isSubscriber ? (
          <span className="text-[13px] text-[var(--gold)] font-medium">
            25 % sleva ze zaváděcí ceny
          </span>
        ) : (
          <span className="text-[13px] text-[var(--cream-35)]">
            Předplatitelé mají trvalou slevu 25 %
          </span>
        )}
      </div>

      {/* Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-[var(--gold-25)] bg-[var(--gold-06)] text-center">
        {/* Zaváděcí badge */}
        <div className="flex justify-center mb-4">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[2px] uppercase text-[var(--gold)] px-3 py-[3px] bg-[rgba(197,155,104,0.12)] rounded-full whitespace-nowrap">
            Zaváděcí cena pro prvních 5
          </span>
        </div>

        {isSubscriber && (
          <span className="inline-block text-[11px] font-semibold tracking-[2px] uppercase text-[var(--deep)] bg-[var(--gold)] px-3 py-[3px] rounded-full mb-2">
            &minus;25 %
          </span>
        )}
        <div className="font-headline text-[32px] sm:text-[40px] font-semibold text-[var(--cream)] transition-all duration-300">
          {currentPrice} Kč
        </div>
        <div className="text-[13px] text-[var(--cream-60)] mb-5">
          45 minut / Google Meet
        </div>

        {/* QR kód */}
        <div className="pt-5 border-t border-[var(--gold-10)] flex flex-col items-center">
          <div className="text-[12px] text-[var(--cream-35)] mb-3">
            {isSubscriber ? "Zvýhodněný QR" : "QR"} kód pro platbu převodem ({currentPrice} Kč):
          </div>
          <div className="w-[200px] h-[200px] rounded-xl bg-[var(--wine-bg)] border border-[var(--gold-10)] flex items-center justify-center">
            <div className="text-[11px] text-[var(--cream-35)] text-center px-3">
              QR kód
              <br />
              <span className="text-[var(--gold)] font-medium text-[14px]">
                {currentPrice} Kč
              </span>
              <br />
              <span className="text-[10px]">(doplníme)</span>
            </div>
          </div>
        </div>

        {/* Budoucí cena — mění se s togglem */}
        <div className="mt-5 pt-5 border-t border-[var(--gold-10)]">
          <div className="text-[13px] text-[var(--cream-35)]">
            Po zaplnění 5 míst se cena zvýší na{" "}
            <span className="text-[var(--cream)] font-medium whitespace-nowrap">{isSubscriber ? "1\u00a0035" : "1\u00a0380"}\u00a0Kč</span>
          </div>
        </div>
      </div>
    </div>
  );
}
