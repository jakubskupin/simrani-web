const quotes = [
  "Díky Markétě a jejím hostům jsem prošla dost výraznou změnou v chápání vlastní intimity.",
  "Naprosto boží podcast, který by měl být součástí základního vzdělání.",
  "Kde jiní v otázkách sexu se zarděním končí, Markéta začíná.",
  "Šimrání mi dodalo odvahu zkoušet nové věci. Uvědomila jsem si, že jsem normální.",
  "Podcast pozitivně ovlivnil celou mou existenci a sexualitu.",
  "Šimrání mění životy a vřele doporučuji každému.",
];

export function Testimonials() {
  return (
    <section className="py-[100px] px-12">
      <div className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] mb-5 font-normal">
        Co říkají posluchačky
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((q, i) => (
          <div
            key={i}
            className="p-9 border border-[var(--gold-10)] rounded-2xl font-headline italic font-light text-[21px] leading-[1.55] text-[var(--cream-60)] hover:border-[var(--gold-25)] transition-colors"
          >
            &bdquo;{q}&ldquo;
          </div>
        ))}
      </div>
    </section>
  );
}
