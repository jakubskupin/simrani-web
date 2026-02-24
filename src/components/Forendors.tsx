const benefits = [
  { icon: "mic", label: "200+\nepizod" },
  { icon: "message-circle", label: "Discord\nkomunita" },
  { icon: "video", label: "Měsíční\nlive" },
  { icon: "users", label: "Offline\nsetkání" },
];

export function Forendors() {
  return (
    <section id="komunita" className="flex flex-col items-center py-16 md:py-[100px] px-5 md:px-12">
      <div className="flex flex-col items-center gap-4 max-w-[900px] w-full bg-gradient-to-br from-[var(--wine)] to-[var(--deep)] rounded-2xl md:rounded-3xl p-10 md:p-16 text-center">
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)] font-normal">
          Chceš víc?
        </div>
        <h2 className="font-headline font-normal text-[28px] md:text-[52px] leading-[1.1] text-[var(--cream)]">
          Odemkni celý svět Šimrání
        </h2>
        <p className="text-[14px] md:text-[16px] leading-[1.7] text-[var(--cream-60)] max-w-[560px] font-light">
          Přístup k archivu 200+ epizod, bonusovým dílům, měsíčním online
          setkáním a komunitě lidí, kteří se nestydí mluvit.
        </p>

        <div className="flex justify-center gap-3 md:gap-8 py-4 md:py-6 flex-wrap">
          {benefits.map((b, i) => (
            <div
              key={b.icon}
              className={`flex flex-col items-center gap-1.5 md:gap-2 w-[80px] md:w-[140px] ${i === 3 ? "hidden md:flex" : ""}`}
            >
              <BenefitIcon name={b.icon} />
              <div className="text-[10px] md:text-[13px] text-[var(--cream-60)] whitespace-pre-line text-center">
                {b.label}
              </div>
            </div>
          ))}
        </div>

        <div className="font-headline text-[20px] md:text-[24px] text-[var(--gold)]">
          248 Kč / měsíc
        </div>
        <a
          href="https://www.forendors.cz/simrani.cz"
          className="inline-flex items-center justify-center px-9 py-3.5 bg-[var(--gold)] rounded-full text-[13px] md:text-[14px] font-medium text-[var(--deep)] hover:bg-[var(--cream)] transition-all"
        >
          Předplať si na Forendors
        </a>
      </div>
    </section>
  );
}

function BenefitIcon({ name }: { name: string }) {
  const cls = "w-[22px] h-[22px] md:w-7 md:h-7 text-[var(--gold)]";
  switch (name) {
    case "mic":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
      );
    case "message-circle":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
      );
    case "video":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
      );
    case "users":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
      );
    default:
      return null;
  }
}
