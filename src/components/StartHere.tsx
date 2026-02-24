const episodes = [
  { num: 1, title: "Co je to vlastně intimita?", tag: "Základy" },
  { num: 2, title: "Jak mluvit o tom, co chcete", tag: "Komunikace" },
  { num: 3, title: "Tělo, stud a sebepřijetí", tag: "Body positivity" },
  { num: 4, title: "Fantazie: normální, nebo divné?", tag: "Destigmatizace" },
  { num: 5, title: "Consent — víc než ano a ne", tag: "Hranice" },
  { num: 6, title: "Cesta k orgasmu (a proč nespěchat)", tag: "Rozkoš" },
  { num: 7, title: "Kink 101: co to je a kde začít", tag: "Kink" },
  { num: 8, title: "První zkušenost s bondage", tag: "BDSM" },
  { num: 9, title: "Dominance, submise a důvěra", tag: "Power play" },
  { num: 10, title: "Aftercare: co se děje potom", tag: "Aftercare" },
];

export function StartHere() {
  return (
    <section id="start" className="py-[100px] px-12">
      <div className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] mb-5 font-normal">
        Začni tady
      </div>
      <h2 className="font-headline font-normal text-[clamp(32px,4vw,52px)] leading-[1.1] text-[var(--cream)] mb-8">
        10 epizod od vanilla po BDSM
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {episodes.map((ep) => (
          <div
            key={ep.num}
            className="flex items-center gap-4 px-6 py-5 border border-[var(--gold-06)] rounded-xl hover:border-[var(--gold)]/20 transition-colors cursor-pointer"
          >
            <span className="font-headline text-[28px] text-[var(--gold)]/20 w-10 shrink-0">
              {ep.num}
            </span>
            <div>
              <div className="font-medium text-[15px] text-[var(--cream)] mb-0.5">
                {ep.title}
              </div>
              <div className="text-[11px] tracking-[1px] uppercase text-[var(--gold)]">
                {ep.tag}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
