const stats = [
  { num: "200+", desc: "Epizod" },
  { num: "4.6★", desc: "Apple Podcasts" },
  { num: "177", desc: "Hodnocení" },
  { num: "2×", desc: "Týdně" },
];

export function Stats() {
  return (
    <div className="flex justify-center gap-14 py-13 px-12 flex-wrap border-b border-[var(--gold-06)]">
      {stats.map((s) => (
        <div key={s.desc} className="text-center">
          <div className="font-headline text-[42px] font-normal text-[var(--cream)] mb-1.5">
            {s.num}
          </div>
          <div className="text-[12px] tracking-[1px] uppercase text-[var(--cream-35)]">
            {s.desc}
          </div>
        </div>
      ))}
    </div>
  );
}
