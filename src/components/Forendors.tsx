const benefits = [
  { icon: "mic", label: "Celý archiv 200+ epizod" },
  { icon: "message-circle", label: "Discord — komunita bez filtrů" },
  { icon: "video", label: "ŠOL — měsíční live s Markétou" },
  { icon: "users", label: "Offline setkání s komunitou" },
];

const discordMessages = [
  {
    name: "Katka",
    nameColor: "#C59B68",
    avatarColor: "#6B5A4E",
    text: "Ten dnešní live byl nejlepší za poslední půlrok. Díky všem za otevřenost.",
  },
  {
    name: "Markéta",
    nameColor: "#E8B4D8",
    avatarColor: "#5C6B4E",
    text: "Děkuju vám. Tenhle prostor existuje díky vám všem.",
  },
  {
    name: "Jana",
    nameColor: "#C59B68",
    avatarColor: "#8B4E6B",
    text: "Poprvé v životě cítím, že nejsem divná. Tohle je můj safe space.",
  },
];

export function Forendors() {
  return (
    <section id="komunita" className="flex flex-col items-center py-16 md:py-[100px] px-5 md:px-12">
      <div className="flex flex-col items-center gap-6 md:gap-8 max-w-[960px] w-full bg-gradient-to-br from-[var(--wine)] to-[var(--deep)] rounded-2xl md:rounded-3xl p-8 md:p-14 text-center">
        <div className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-[var(--gold)] font-normal">
          Vyšimraná komunita
        </div>
        <h2 className="font-headline font-normal text-[24px] md:text-[44px] leading-[1.15] text-[var(--cream)] max-w-[700px]">
          Přidej se ke komunitě, kde se nemusíš stydět
        </h2>
        <p className="text-[13px] md:text-[15px] leading-[1.7] text-[var(--cream-60)] max-w-[580px] font-light">
          200+ epizod v archivu, měsíční live setkání s Markétou a Discord plný
          lidí, se kterými můžeš řešit to, co jinde nemůžeš.
        </p>

        {/* Benefits + Discord Preview */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Benefits Panel */}
          <div className="flex flex-col justify-center gap-5 md:gap-5 flex-1 py-4 md:py-6 md:px-4">
            {benefits.map((b) => (
              <div key={b.icon} className="flex items-center gap-3">
                <BenefitIcon name={b.icon} />
                <span className="text-[13px] md:text-[14px] text-[var(--cream-60)] font-light text-left">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          {/* Discord Preview */}
          <div className="flex flex-col gap-3.5 flex-1 bg-[#2B1A27] rounded-xl p-5 overflow-hidden">
            <div className="flex items-center gap-1.5 text-[var(--cream-35)]">
              <span className="text-[14px] font-bold leading-none">#</span>
              <span className="text-[12px] font-medium">sol-live-chat</span>
            </div>
            {discordMessages.map((msg) => (
              <div key={msg.name} className="flex items-start gap-2.5">
                <div
                  className="w-7 h-7 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: msg.avatarColor }}
                />
                <div className="flex flex-col gap-0.5 text-left">
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: msg.nameColor }}
                  >
                    {msg.name}
                  </span>
                  <span className="text-[12px] leading-[1.5] text-[var(--cream-60)] font-light">
                    {msg.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col items-center gap-4 mt-2">
          <div className="font-headline text-[20px] md:text-[24px] text-[var(--gold)]">
            248 Kč / měsíc
          </div>
          <a
            href="https://www.forendors.cz/simrani.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-11 py-4 bg-[var(--gold)] rounded-full text-[14px] md:text-[15px] font-semibold text-[var(--deep)] hover:bg-[var(--cream)] transition-all"
          >
            Zkus to na měsíc
          </a>
          <span className="text-[11px] text-[var(--cream-35)] font-light">
            přes platformu Forendors
          </span>
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ name }: { name: string }) {
  const cls = "w-[22px] h-[22px] text-[var(--gold)] shrink-0";
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
