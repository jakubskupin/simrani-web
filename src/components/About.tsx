const mediaLogos = ["DVTV", "HEROINE"];

export function About() {
  return (
    <section id="marketa" className="flex items-center gap-16 py-[100px] px-12">
      {/* Photo with dark overlay tints */}
      <div className="relative w-full aspect-square rounded-[20px] overflow-hidden shrink-0 max-w-[50%]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/market-foto/market-velkyusmev-square.png')",
          }}
        />
        {/* Radial dark tint */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 120% at 40% 35%, #1A0A1450 0%, #1A0A1490 40%, #1A0A14CC 65%, #1A0A14EE 85%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, #1A0A1470 58%, #1A0A14CC 72%, #1A0A14F0 83%, #1A0A14 90%)",
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-4">
        <div className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] font-normal">
          O mně
        </div>
        <h2 className="font-headline font-normal text-[52px] leading-[1.1] text-[var(--cream)]">
          Markéta
        </h2>
        <p className="text-[16px] leading-[1.8] text-[var(--cream-60)] font-light">
          Jsem žena, matka, manželka. A taky člověk, kterého intimita
          fascinuje natolik, že o ní natočil přes 200 epizod podcastu.
        </p>
        <p className="text-[16px] leading-[1.8] text-[var(--cream-60)] font-light">
          Šimrání vzniklo ze zvědavosti — a z frustrace, že v Česku chyběl
          prostor, kde se o sexualitě mluví normálně. Nejsem terapeutka. Jsem
          průvodkyně, která jde první a říká: pojď, nic se nestane.
        </p>
        <div className="font-headline italic font-normal text-[22px] leading-[1.4] text-[var(--cream)]">
          &bdquo;Intimita začíná tam, kde končí komfortní zóna. A právě tam se
          odehrávají ty nejkrásnější rozhovory.&ldquo;
        </div>
        <div className="flex gap-6 items-center flex-wrap">
          {mediaLogos.map((logo) => (
            <span
              key={logo}
              className="px-4 py-2 border border-[rgba(197,155,104,0.12)] rounded-lg text-[12px] tracking-[1px] uppercase text-[var(--cream-35)]"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
