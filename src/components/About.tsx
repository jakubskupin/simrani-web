const mediaMentions = [
  {
    label: "DVTV",
    desc: "Rozhovor o (ne)monogamii",
    href: "https://www.youtube.com/watch?v=YxkNTfiySR4",
  },
  {
    label: "HEROINE",
    desc: "Uvědomit si vlastní touhy",
    href: "https://www.heroine.cz/vztahy-a-sex/12085-utajene-pribehy-me-fascinuji-rika-autorka-noveho-podcastu-rozkos-tabu-v-erotice-se-neboji",
  },
];

export function About() {
  return (
    <section id="marketa" className="flex flex-col md:flex-row items-center gap-8 md:gap-16 py-16 md:py-[100px] px-5 md:px-12">
      {/* Photo with dark overlay tints */}
      <div className="relative w-full h-[350px] md:h-auto md:aspect-square rounded-2xl md:rounded-[20px] overflow-hidden shrink-0 md:max-w-[50%]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/market-faber-bio.png')",
          }}
        />
        {/* Edge fade — blends dark photo into page background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #1A0A14 0%, transparent 8%, transparent 85%, #1A0A14 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #1A0A14 0%, transparent 10%, transparent 80%, #1A0A14 100%)",
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3.5 md:gap-4">
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)] font-normal">
          O mně
        </div>
        <h2 className="font-headline font-normal text-[36px] md:text-[52px] leading-[1.1] text-[var(--cream)]">
          Markéta
        </h2>
        <p className="text-[14px] md:text-[16px] leading-[1.8] text-[var(--cream-60)] font-light">
          Jsem žena, matka, manželka. A taky člověk, kterého intimita
          fascinuje natolik, že o ní natočil přes 200 epizod podcastu.
        </p>
        <p className="text-[14px] md:text-[16px] leading-[1.8] text-[var(--cream-60)] font-light">
          Šimrání vzniklo ze zvědavosti — a z frustrace, že v Česku chyběl
          prostor, kde se o sexualitě mluví normálně. Nejsem terapeutka. Jsem
          průvodkyně, která jde první a říká: pojď, nic se nestane.
        </p>
        <div className="font-headline italic font-normal text-[18px] md:text-[22px] leading-[1.4] text-[var(--cream)]">
          &bdquo;Intimita začíná tam, kde končí komfortní zóna. A právě tam se
          odehrávají ty nejkrásnější rozhovory.&ldquo;
        </div>
        {/* Media mentions */}
        <div className="flex flex-col gap-2.5 mt-3 md:mt-4">
          <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--cream-35)] font-normal">
            Znáte mě z
          </div>
          <div className="flex gap-3 md:gap-4 items-stretch">
            {mediaMentions.map((m) => (
              <a
                key={m.label}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 px-4 md:px-5 py-2.5 md:py-3 bg-[rgba(197,155,104,0.05)] border border-[rgba(197,155,104,0.10)] rounded-xl hover:bg-[rgba(197,155,104,0.12)] hover:border-[rgba(197,155,104,0.35)] transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="text-[13px] md:text-[15px] font-medium tracking-[1.5px] uppercase text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                    {m.label}
                  </span>
                  <span className="hidden md:inline text-[var(--cream-35)] group-hover:text-[var(--gold)] group-hover:translate-x-0.5 transition-all text-[11px]">
                    ↗
                  </span>
                </span>
                <span className="text-[11px] md:text-[12px] text-[var(--cream-35)] group-hover:text-[var(--cream-60)] font-light transition-colors">
                  {m.desc}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
