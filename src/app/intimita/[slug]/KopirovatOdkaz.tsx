"use client";

import { useState } from "react";

/** Adresa pojmu ke sdílení s tlačítkem na zkopírování. */
export function KopirovatOdkaz({ url }: { url: string }) {
  const [hotovo, setHotovo] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(url).then(() => {
          setHotovo(true);
          setTimeout(() => setHotovo(false), 1800);
        });
      }}
      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-[4px] bg-[var(--wine-bg)] text-left hover:bg-[var(--wine)] transition-colors"
    >
      <span className="font-mono text-[11px] text-[var(--cream)] truncate">{url.replace(/^https?:\/\//, "")}</span>
      <span className="text-[11px] text-[var(--gold)] shrink-0">{hotovo ? "Zkopírováno" : "Kopírovat"}</span>
    </button>
  );
}
