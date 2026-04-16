import Link from "next/link";

export function AnnouncementBarB() {
  return (
    <Link
      href="/konzultace"
      className="group relative flex items-center justify-center overflow-hidden px-5 md:px-12 py-3 bg-gradient-to-r from-[var(--wine)] via-[var(--gold)] to-[var(--wine)] hover:brightness-110 transition-all"
    >
      <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap text-center">
        <span className="text-[10px] font-bold tracking-[2px] uppercase text-[var(--deep)] px-2.5 py-[3px] rounded-full bg-[var(--cream)] whitespace-nowrap">
          Nová služba
        </span>
        <span className="text-[12px] sm:text-[14px] font-medium text-[var(--deep)]">
          Konzultace s&nbsp;Markétou
          <span className="hidden sm:inline"> &mdash; zaváděcí cena pro prvních 5</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] sm:text-[13px] font-semibold text-[var(--deep)] underline underline-offset-2 decoration-[var(--deep)] group-hover:decoration-transparent transition-all">
          Chci termín
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
