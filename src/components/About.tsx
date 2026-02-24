const mediaLogos = ["DVTV", "Heroine", "Rozkoš", "Konsent"];

export function About() {
  return (
    <section id="marketa" className="py-[100px] px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Photo placeholder */}
        <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-[var(--wine)] to-[var(--deep)] flex items-center justify-center text-[12px] tracking-[2px] uppercase text-[var(--cream-35)]">
          Portrét Markéty
        </div>

        {/* Text */}
        <div>
          <div className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] mb-5 font-normal">
            O mně
          </div>
          <h2 className="font-headline font-normal text-[clamp(32px,4vw,52px)] leading-[1.1] text-[var(--cream)] mb-8">
            Markéta
          </h2>
          <p className="text-[16px] leading-[1.8] text-[var(--cream-60)] mb-4 font-light">
            Jsem žena, matka, manželka. A taky člověk, kterého intimita
            fascinuje natolik, že o ní natočil přes 200 epizod podcastu.
          </p>
          <p className="text-[16px] leading-[1.8] text-[var(--cream-60)] mb-6 font-light">
            Šimrání vzniklo ze zvědavosti — a z frustrace, že v Česku chyběl
            prostor, kde se o sexualitě mluví normálně. Nejsem terapeutka. Jsem
            průvodkyně, která jde první a říká: pojď, nic se nestane.
          </p>
          <div className="font-headline italic text-[22px] leading-[1.4] text-[var(--cream)] mb-8">
            &bdquo;Kde ostatní končí, tam já začínám.&ldquo;
          </div>
          <div className="flex gap-6 items-center flex-wrap">
            {mediaLogos.map((logo) => (
              <span
                key={logo}
                className="px-4 py-2 border border-[var(--gold)]/12 rounded-lg text-[12px] tracking-[1px] uppercase text-[var(--cream-35)]"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
