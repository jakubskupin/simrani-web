"use client";

import { useState } from "react";

export function PricingToggle() {
  const [isSubscriber, setIsSubscriber] = useState(false);
  const currentPrice = isSubscriber ? 1035 : 1380;

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
            25 % sleva pro předplatitele
          </span>
        ) : (
          <span className="text-[13px] text-[var(--cream-35)]">
            Předplatitelé mají trvalou slevu 25 %
          </span>
        )}
      </div>

      {/* Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-[var(--gold-25)] bg-[var(--gold-06)] text-center">
        {isSubscriber && (
          <span className="inline-block text-[11px] font-semibold tracking-[2px] uppercase text-[var(--deep)] bg-[var(--gold)] px-3 py-[3px] rounded-full mb-2">
            &minus;25 %
          </span>
        )}
        <div className="font-headline text-[32px] sm:text-[40px] font-semibold text-[var(--cream)] transition-all duration-300">
          {currentPrice.toLocaleString("cs-CZ")} Kč
        </div>
        <div className="text-[13px] text-[var(--cream-60)] mb-5">
          45 minut / Google Meet
        </div>

        {/* QR kód */}
        <div className="pt-5 border-t border-[var(--gold-10)] flex flex-col items-center">
          <div className="text-[12px] text-[var(--cream-35)] mb-3">
            {isSubscriber ? "Zvýhodněný QR" : "QR"} kód pro platbu převodem ({currentPrice.toLocaleString("cs-CZ")} Kč):
          </div>
          <div className="w-[200px] h-[200px] rounded-xl bg-white border border-[var(--gold-10)] p-2 flex items-center justify-center">
            <img
              src={isSubscriber ? "/qr-1035.jpg" : "/qr-1380.jpg"}
              alt={`QR kód pro platbu ${currentPrice.toLocaleString("cs-CZ")} Kč`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
