export function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center bg-[var(--wine)] px-12 py-2.5">
      <div className="flex items-center justify-center gap-3 flex-1">
        <span className="text-[13px] text-[var(--cream)]">
          IF party — prozkoumejte své fantazie už v sobotu 28. 2. 2026
        </span>
        <span className="inline-flex items-center px-3 py-1 bg-[var(--gold)] rounded-full text-[11px] font-semibold text-[var(--deep)]">
          Vstupenky
        </span>
      </div>
      <button className="text-[var(--cream-60)] hover:text-[var(--cream)] transition-colors" aria-label="Zavřít">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  );
}
