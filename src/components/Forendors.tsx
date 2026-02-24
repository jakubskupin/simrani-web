const benefits = [
  { icon: "🎙", label: "Celý archiv\n200+ epizod" },
  { icon: "💬", label: "Discord\nkomunita" },
  { icon: "📹", label: "ŠOL — měsíční\nonline live" },
  { icon: "🤝", label: "Offline\nsetkání" },
];

export function Forendors() {
  return (
    <section id="komunita" className="py-[100px] px-12">
      <div className="max-w-[900px] mx-auto bg-gradient-to-br from-[var(--wine)] to-[var(--deep)] rounded-3xl p-16 text-center">
        <div className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] mb-5 font-normal">
          Chceš víc?
        </div>
        <h2 className="font-headline font-normal text-[clamp(32px,4vw,52px)] leading-[1.1] text-[var(--cream)] mb-4">
          Odemkni celý svět Šimrání
        </h2>
        <p className="text-[16px] leading-[1.7] text-[var(--cream-60)] max-w-[560px] mx-auto mb-8 font-light">
          Přístup k archivu 200+ epizod, bonusovým dílům, měsíčním online
          setkáním a komunitě lidí, kteří se nestydí mluvit.
        </p>

        <div className="flex justify-center gap-8 mb-10 flex-wrap">
          {benefits.map((b) => (
            <div key={b.icon} className="text-center w-[140px]">
              <div className="text-[28px] mb-2">{b.icon}</div>
              <div className="text-[13px] text-[var(--cream-60)] whitespace-pre-line">
                {b.label}
              </div>
            </div>
          ))}
        </div>

        <div className="font-headline text-[24px] text-[var(--gold)] mb-6">
          248 Kč / měsíc
        </div>
        <a
          href="https://www.forendors.cz/simrani.cz"
          className="inline-block px-9 py-3.5 border border-[var(--gold)] rounded-full text-[14px] font-medium text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--deep)] transition-all"
        >
          Předplať si na Forendors
        </a>
      </div>
    </section>
  );
}
