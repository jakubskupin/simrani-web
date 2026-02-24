export function Festival() {
  return (
    <section className="py-8 md:py-12 px-5 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-8 border border-[var(--gold-10)] rounded-2xl p-7 md:p-12 flex-wrap">
        <div>
          <h3 className="font-headline text-[22px] md:text-[28px] font-normal text-[var(--cream)]">
            Intimity Festival 2026
          </h3>
          <p className="text-[12px] md:text-[14px] text-[var(--cream-35)] mt-2 leading-[1.6]">
            6.–7. listopadu, Praha · Bezpečný prostor
            pro dospělé rozhovory
          </p>
        </div>
        <a
          href="https://intimityfestival.cz"
          className="inline-block px-7 md:px-9 py-3 md:py-3.5 border border-[var(--gold)] rounded-full text-[13px] md:text-[14px] font-medium text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all shrink-0"
        >
          Více info
        </a>
      </div>
    </section>
  );
}
