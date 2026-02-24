export function Festival() {
  return (
    <section className="py-12 px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border border-[var(--gold-10)] rounded-2xl p-12 flex-wrap">
        <div>
          <h3 className="font-headline text-[28px] font-normal text-[var(--cream)]">
            Intimity Festival 2026
          </h3>
          <p className="text-[14px] text-[var(--cream-35)] mt-2">
            6.–7. listopadu, Praha · 99 programových bodů · Bezpečný prostor
            pro dospělé rozhovory
          </p>
        </div>
        <a
          href="https://intimityfestival.cz"
          className="inline-block px-9 py-3.5 border border-[var(--gold)] rounded-full text-[14px] font-medium text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all shrink-0"
        >
          Více info
        </a>
      </div>
    </section>
  );
}
