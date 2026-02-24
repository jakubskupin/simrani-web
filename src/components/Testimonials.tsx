const quotes = [
  { title: "Změna v chápání intimity", quote: "Díky Markétě a jejím hostům jsem prošla dost výraznou změnou v chápání vlastní intimity.", source: "Apple Podcasts" },
  { title: "Součást základního vzdělání", quote: "Naprosto boží podcast, který by měl být součástí základního vzdělání.", source: "Spotify" },
  { title: "Markéta začíná tam, kde jiní končí", quote: "Kde jiní v otázkách sexu se zarděním končí, Markéta začíná.", source: "Apple Podcasts" },
  { title: "Odvaha zkoušet nové věci", quote: "Šimrání mi dodalo odvahu zkoušet nové věci. Uvědomila jsem si, že jsem normální.", source: "Spotify" },
  { title: "Pozitivní vliv na celou existenci", quote: "Podcast pozitivně ovlivnil celou mou existenci a sexualitu.", source: "Apple Podcasts" },
  { title: "Mění životy", quote: "Šimrání mění životy a vřele doporučuji každému.", source: "Spotify" },
];

export function Testimonials() {
  return (
    <section className="flex flex-col items-center py-[100px] px-12 gap-8">
      <div className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] font-normal">
        Co říkají posluchači
      </div>
      <h2 className="font-headline font-normal text-[48px] leading-[1.1] text-[var(--cream)] text-center">
        Šimrání mění životy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {quotes.slice(0, 3).map((q, i) => (
          <TestimonialCard key={i} {...q} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {quotes.slice(3).map((q, i) => (
          <TestimonialCard key={i + 3} {...q} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ title, quote, source }: { title: string; quote: string; source: string }) {
  return (
    <div className="flex flex-col gap-3.5 p-9 border border-[var(--gold-10)] rounded-2xl hover:border-[var(--gold-25)] transition-colors">
      <div className="text-[14px] font-semibold text-[var(--cream)]">
        {title}
      </div>
      <div className="font-headline italic font-light text-[21px] leading-[1.55] text-[var(--cream-60)]">
        {quote}
      </div>
      <div className="text-[12px] font-normal text-[var(--cream-35)]">
        — {source}
      </div>
    </div>
  );
}
