"use client";

import { useState } from "react";

export function PricingToggle() {
  const [isSubscriber, setIsSubscriber] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => setIsSubscriber(false)}
          className={`text-[13px] sm:text-[14px] font-medium px-4 sm:px-5 py-2 rounded-full transition-all duration-300 ${
            !isSubscriber
              ? "bg-[var(--gold)] text-[var(--deep)]"
              : "text-[var(--cream-60)] hover:text-[var(--cream)]"
          }`}
        >
          Standardní cena
        </button>
        <button
          onClick={() => setIsSubscriber(true)}
          className={`text-[13px] sm:text-[14px] font-medium px-4 sm:px-5 py-2 rounded-full transition-all duration-300 ${
            isSubscriber
              ? "bg-[var(--gold)] text-[var(--deep)]"
              : "text-[var(--cream-60)] hover:text-[var(--cream)]"
          }`}
        >
          Jsem předplatitel/ka
        </button>
      </div>

      {/* Pricing card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-[var(--gold-25)] bg-[var(--gold-06)] transition-all duration-300">
        {/* Zaváděcí cena badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--gold)] px-3 py-[3px] bg-[rgba(197,155,104,0.12)] rounded-full">
            Zaváděcí cena pro prvních 5
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            {isSubscriber && (
              <span className="inline-block text-[11px] font-semibold tracking-[2px] uppercase text-[var(--deep)] bg-[var(--gold)] px-3 py-[3px] rounded-full mb-2">
                &minus;25 %
              </span>
            )}
            <div className="font-headline text-[32px] sm:text-[40px] font-semibold text-[var(--cream)] transition-all duration-300">
              {isSubscriber ? "517 Kč" : "690 Kč"}
            </div>
            <div className="text-[13px] text-[var(--cream-60)]">
              45 minut / Google Meet
            </div>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center w-fit px-7 py-3 rounded-full bg-[var(--gold)] text-[var(--deep)] text-[13px] font-semibold hover:bg-[var(--cream)] hover:-translate-y-px transition-all duration-300"
          >
            Vyber si termín
          </a>
        </div>

        {isSubscriber && (
          <p className="text-[13px] leading-[1.6] text-[var(--cream-60)] mb-5">
            Trvalá sleva pro předplatitele na{" "}
            <a
              href="https://www.forendors.cz/simrani.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] hover:text-[var(--cream)] transition-colors underline underline-offset-2"
            >
              Forendors
            </a>{" "}
            nebo{" "}
            <a
              href="https://open.spotify.com/show/4YtZKf6TsvMbCiuEu2zoUc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] hover:text-[var(--cream)] transition-colors underline underline-offset-2"
            >
              Spotify
            </a>
            . Ne jen první hovor, ale každý.
          </p>
        )}

        {/* QR kód — vycentrovaný */}
        <div className="pt-5 border-t border-[var(--gold-10)] flex flex-col items-center">
          <div className="text-[12px] text-[var(--cream-35)] mb-3">
            QR kód pro platbu převodem ({isSubscriber ? "517 Kč" : "690 Kč"}):
          </div>
          <div className="w-[200px] h-[200px] rounded-xl bg-[var(--wine-bg)] border border-[var(--gold-10)] flex items-center justify-center transition-all duration-300">
            <div className="text-[11px] text-[var(--cream-35)] text-center px-3">
              QR kód
              <br />
              <span className="text-[var(--gold)] font-medium text-[14px]">
                {isSubscriber ? "517 Kč" : "690 Kč"}
              </span>
              <br />
              <span className="text-[10px]">(doplníme)</span>
            </div>
          </div>
          <p className="text-[12px] leading-[1.6] text-[var(--cream-35)] mt-4 text-center max-w-[360px]">
            Platba předem potvrzuje rezervaci. Připravuju se na každý hovor a&nbsp;chci mít jistotu, že se potkáme.
          </p>
        </div>
      </div>
    </div>
  );
}
