const episodes = [
  { num: 1, title: "Co je to vlastně intimita?", tag: "ZÁKLADY" },
  { num: 2, title: "Jak mluvit o tom, co chcete", tag: "KOMUNIKACE" },
  { num: 3, title: "Tělo, stud a sebepřijetí", tag: "BODY POSITIVITY" },
  { num: 4, title: "Fantazie: normální, nebo divné?", tag: "DESTIGMATIZACE" },
  { num: 5, title: "Consent — víc než ano a ne", tag: "HRANICE" },
  { num: 6, title: "Cesta k orgasmu (a proč nespěchat)", tag: "ROZKOŠ" },
  { num: 7, title: "Kink 101: co to je a kde začít", tag: "KINK" },
  { num: 8, title: "První zkušenost s bondage", tag: "BDSM" },
];

export function StartHere() {
  return (
    <section
      id="start"
      className="flex flex-col items-center py-16 md:py-[100px] px-5 md:px-12 gap-5 md:gap-6"
    >
      <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)] font-normal">
        Markétina volba
      </div>
      <h2 className="font-headline font-normal text-[28px] md:text-[42px] leading-[1.1] text-[var(--cream)] text-center">
        8 dílů pro nováčky
      </h2>
      <p className="text-[14px] md:text-[17px] leading-[1.7] text-[var(--cream-60)] font-light text-center max-w-[640px]">
        Tyhle epizody jsem pro vás vybrala, protože v nich
        najdete přesně to, kvůli čemu Šimrání vzniklo — otevřenost, respekt
        a odvahu mluvit o intimitě bez studu.
      </p>

      {/* Timeline list */}
      <div className="flex flex-col w-full max-w-[600px]">
        {episodes.map((ep, i) => (
          <EpisodeCard
            key={ep.num}
            num={ep.num}
            title={ep.title}
            tag={ep.tag}
            isLast={i === episodes.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function EpisodeCard({
  num,
  title,
  tag,
  isLast,
}: {
  num: number;
  title: string;
  tag: string;
  isLast: boolean;
}) {
  return (
    <div className="flex items-center gap-4 md:gap-5 py-3 md:py-4 cursor-pointer group">
      {/* Number circle + connecting line */}
      <div className="flex flex-col items-center w-8 md:w-10 shrink-0 self-stretch">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[var(--gold)] flex items-center justify-center shrink-0">
          <span className="font-headline text-[13px] md:text-[16px] font-normal text-[var(--gold)]">
            {num}
          </span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-black" />
        )}
      </div>

      {/* Title + tag */}
      <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
        <div className="text-[13px] md:text-[15px] font-medium text-[var(--cream)]">
          {title}
        </div>
        <div className="text-[9px] md:text-[11px] tracking-[1px] uppercase text-[var(--gold)] font-normal">
          {tag}
        </div>
      </div>

      {/* Chevron */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 md:w-5 md:h-5 text-[var(--gold)] opacity-35 group-hover:opacity-70 transition-opacity shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
  );
}
