import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Markéta pro firmy — Šimrání",
  description:
    "Přednášky a workshopy o komunikaci, intimitě a well-beingu pro firemní týmy. Neformálně, otevřeně, s respektem.",
  openGraph: {
    title: "Markéta pro firmy — Šimrání",
    description:
      "Přednášky a workshopy o komunikaci, intimitě a well-beingu pro firemní týmy.",
    type: "website",
    locale: "cs_CZ",
    siteName: "Šimrání",
  },
};

const topics = [
  {
    num: "01",
    title: "Jak mluvit o tom, o čem se nemluví",
    lead: "Komunikace o potřebách, hranicích a blízkosti. V týmu i ve vztahu.",
    bullets: [
      "Proč je to tak těžké téma",
      "Rozdíl mezi přáním a výčitkou",
      "Jazyk, který spojuje vs. jazyk, který vypíná",
      "Mlčení jako forma komunikace",
    ],
  },
  {
    num: "02",
    title: "Well-being, tělo a sebeúcta",
    lead: "Vztah k vlastnímu tělu jako základ celkového well-beingu.",
    bullets: [
      "Stud, srovnávání, odpojení od těla",
      "Změny těla v čase a jejich přijetí",
      "Bezpečí vs. výkon",
      "Drobné návraty k vnímání sebe sama",
    ],
  },
  {
    num: "03",
    title: "Co nás nenaučili — a proč na tom záleží",
    lead: "Dospělá edukace o intimitě. Bez ostychu, bez poučování.",
    bullets: [
      "Co chybělo ve školní sexuální výchově",
      "Mýty vs. realita (touha, souhlas, role)",
      "Normalizace: nejste sami",
      "Prostor pro otázky, ne pro hodnocení",
    ],
  },
];

const testimonials = [
  {
    label: "Odvaha otevřít nová témata",
    quote:
      "Markéta dokázala otevřít témata, o kterých se u nás nikdy nemluvilo — a přitom se nikdo necítil trapně. Kolegové si to chválili ještě týdny poté.",
    source: "Škoda Auto",
  },
  {
    label: "Přirozený přístup k citlivým tématům",
    quote:
      "Měli jsme obavy, jak téma intimity zapadne do firemního prostředí. Markéta to pojala tak přirozeně, že na konci chtěli všichni pokračování.",
    source: "Direct Pojišťovna",
  },
];

export default function ProFirmy() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex flex-col-reverse lg:flex-row min-h-[560px]">
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 px-5 py-8 sm:px-10 sm:py-12 lg:px-20 lg:py-20 lg:pl-[120px] bg-[var(--deep)] relative z-[2]">
          <div className="text-[11px] font-normal tracking-[3px] text-[var(--gold)] uppercase">
            Markéta pro firmy
          </div>
          <h1 className="font-headline text-[26px] sm:text-[36px] lg:text-[48px] font-bold italic leading-[1.15] tracking-[-1px] text-[var(--cream)]">
            Neformální hovory
            <br className="hidden lg:block" />
            {" "}o intimitě.
            <br className="hidden lg:block" />
            {" "}To je moje doména
          </h1>
          <p className="text-[15px] sm:text-[18px] leading-[1.6] text-[var(--cream-60)] max-w-[500px]">
            Naplněný vztah je pro výkon stejně důležitý jako dobrý spánek. Pomáhám týmům otevřít témata, která se v&nbsp;práci neřeší, ale ovlivňují všechno.
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center w-fit px-8 sm:px-11 py-3 sm:py-[14px] rounded-full bg-[var(--gold)] text-[var(--deep)] text-[13px] sm:text-[14px] font-semibold hover:bg-[var(--cream)] hover:-translate-y-px transition-all duration-300"
          >
            Napište mi &rarr;
          </a>
        </div>
        <div className="w-full lg:w-1/2 h-[240px] sm:h-[300px] lg:h-auto bg-[var(--wine-bg)] relative overflow-hidden">
          <Image
            src="/marketa-faberova-simrani-event-2026.jpg"
            alt="Markéta Fáberová na pódiu — live event Šimrání"
            fill
            priority
            className="object-cover object-[50%_20%] scale-110 origin-[50%_20%]"
          />
          {/* Left fade — desktop only */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-[var(--deep)] to-transparent z-[1] pointer-events-none" />
          {/* Bottom fade — mobile only */}
          <div className="block lg:hidden absolute inset-x-0 bottom-0 h-[80px] bg-gradient-to-b from-transparent to-[var(--deep)] z-[1] pointer-events-none" />
        </div>
        {/* Bottom fade — desktop */}
        <div className="hidden lg:block absolute inset-x-0 bottom-0 h-[80px] bg-gradient-to-b from-transparent via-[#2A0F2640] to-[#2A0F26] z-[3] pointer-events-none" />
      </section>

      {/* PROMISE */}
      <section className="bg-[var(--wine-bg)] px-5 py-9 sm:px-10 sm:py-12 lg:px-[120px] lg:py-16 relative z-[4]">
        <div className="max-w-[780px]">
          <h2 className="font-headline text-[20px] sm:text-[26px] font-semibold italic text-[var(--cream)] mb-5">
            Obsah přizpůsobím vašemu prostředí. Vždy
          </h2>
          <p className="text-[15px] sm:text-base leading-[1.7] text-[var(--cream-60)] mb-7">
            Vím, že pozvat někoho mluvit o intimitě do firmy chce odvahu. Proto se vždy předem bavíme o tom, co je pro váš tým vhodné, kde jsou hranice a co od přednášky očekáváte. Vy rozhodujete o rámci — já ho naplním obsahem, který má dopad.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-[10px]">
            {["Žádná terapie", "Žádná ezoterika", "Workplace-safe", "Dospělé, ne explicitní"].map(
              (pill) => (
                <span
                  key={pill}
                  className="text-[11px] sm:text-[12px] font-medium tracking-[1px] uppercase text-[var(--cream-35)] px-[14px] sm:px-[18px] py-[6px] sm:py-[7px] border border-[var(--gold-10)] rounded-full"
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* FORMAT */}
      <section className="bg-[var(--wine-bg)] px-5 pb-9 sm:px-10 sm:pb-12 lg:px-[120px] lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
          <div className="flex-1 flex flex-col gap-[6px] p-5 sm:p-7 lg:p-8 border border-[var(--gold-10)] rounded-2xl">
            <div className="text-[12px] font-medium tracking-[2px] uppercase text-[var(--gold)]">
              Přednáška
            </div>
            <div className="font-headline text-[19px] sm:text-[22px] font-semibold text-[var(--cream)]">
              60–90 minut
            </div>
            <div className="text-[13px] text-[var(--cream-35)]">
              Humor, příběhy, prostor na otázky
            </div>
          </div>
          <div className="px-6 font-headline text-[15px] italic text-[var(--cream-35)] shrink-0">
            nebo
          </div>
          <div className="flex-1 flex flex-col gap-[6px] p-5 sm:p-7 lg:p-8 border border-[var(--gold-10)] rounded-2xl">
            <div className="text-[12px] font-medium tracking-[2px] uppercase text-[var(--gold)]">
              Workshop
            </div>
            <div className="font-headline text-[19px] sm:text-[22px] font-semibold text-[var(--cream)]">
              3 hodiny
            </div>
            <div className="text-[13px] text-[var(--cream-35)]">
              Zážitek, sdílení, společná práce
            </div>
          </div>
        </div>
        <div className="mt-5 text-[14px] italic text-[var(--cream-35)] text-center">
          <strong className="text-[var(--gold)] font-medium not-italic">Vždy na míru</strong> — obsah, jazyk i hloubku ladím s vámi předem
        </div>
      </section>

      {/* TOPICS */}
      <section className="bg-[var(--deep)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-20">
        <div className="text-[11px] font-normal tracking-[3px] text-[var(--gold)] uppercase mb-4">
          Témata
        </div>
        <h2 className="font-headline text-[26px] sm:text-[36px] font-normal text-[var(--cream)] mb-7 sm:mb-12">
          O čem mluvím ráda
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.num}
              className="flex flex-col gap-[14px] p-6 sm:p-8 rounded-2xl bg-[var(--wine-bg)] border border-[var(--gold-10)] hover:border-[var(--gold-25)] transition-colors"
            >
              <div className="font-headline text-[28px] font-light italic text-[var(--gold-25)]">
                {topic.num}
              </div>
              <div className="font-headline text-[20px] font-semibold italic text-[var(--cream)]">
                {topic.title}
              </div>
              <div className="text-[14px] leading-[1.6] text-[var(--cream-60)] mb-[10px]">
                {topic.lead}
              </div>
              <ul className="flex flex-col gap-1">
                {topic.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-[13px] text-[var(--cream-35)] pl-[14px] relative before:content-['·'] before:absolute before:left-0 before:text-[var(--gold-25)]"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--deep)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-20">
        <div className="text-[11px] font-normal tracking-[3px] text-[var(--gold)] uppercase mb-4">
          Ohlasy
        </div>
        <h2 className="font-headline text-[26px] sm:text-[36px] font-normal text-[var(--cream)] mb-7 sm:mb-12">
          Přežili to. A chtějí víc
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.source}
              className="flex flex-col gap-5 p-7 sm:p-9 rounded-2xl border border-[var(--gold-10)] hover:border-[var(--gold-25)] transition-colors"
            >
              <div className="text-[14px] font-semibold text-[var(--cream)]">
                {t.label}
              </div>
              <div className="font-headline text-[15px] sm:text-[17px] font-light italic leading-[1.6] text-[var(--cream-60)]">
                {t.quote}
              </div>
              <div className="text-[12px] text-[var(--cream-35)]">
                — {t.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REFERRAL TIP */}
      <section className="bg-[var(--deep)] px-5 py-8 sm:px-10 sm:py-12 lg:px-[120px] flex justify-center">
        <div className="max-w-[620px] p-6 sm:p-9 border border-[var(--gold-25)] rounded-2xl bg-[var(--gold-06)]">
          <div className="inline-flex items-center gap-2 w-fit text-[11px] font-semibold tracking-[2px] uppercase text-[var(--gold)] px-4 py-[6px] bg-[rgba(197,155,104,0.12)] rounded-full mb-[14px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
            </svg>
            Tip pro posluchače
          </div>
          <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[var(--cream-60)]">
            Posloucháte Šimrání? Pokud vám dává smysl, co dělám, a&nbsp;znáte ve firmě někoho, kdo rozhoduje o&nbsp;vzdělávání — propojte nás. Stačí přeposlat tuhle stránku nebo napsat jméno a&nbsp;e-mail.{" "}
            <strong className="text-[var(--cream)] font-semibold">
              Když z&nbsp;toho vznikne přednáška nebo workshop, celoroční předplatné podcastu je na&nbsp;mě.
            </strong>
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="kontakt"
        className="bg-[var(--wine-bg)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-20 flex flex-col items-center gap-6 text-center"
      >
        <h2 className="font-headline text-[24px] sm:text-[32px] lg:text-[42px] font-normal text-[var(--cream)]">
          Kdy to otevřeme?
        </h2>
        <a
          href="mailto:marketa@simrani.cz"
          className="inline-flex items-center px-7 sm:px-11 py-3 sm:py-4 rounded-full bg-[var(--gold)] text-[var(--deep)] text-[13px] sm:text-[14px] font-semibold hover:bg-[var(--cream)] hover:-translate-y-px transition-all duration-300"
        >
          marketa@simrani.cz
        </a>
        <div className="flex flex-col items-center gap-1 text-[12px] sm:text-[13px]">
          <span className="text-[var(--cream-35)] italic">
            Raději se nejdřív podívat, kdo jsem?
          </span>
          <a
            href="https://www.linkedin.com/in/marketa-faber/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--gold)] font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Najdete mě i na LinkedIn &rarr;
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 py-5 sm:px-10 lg:px-[120px] lg:py-8 bg-[var(--deep)] border-t border-[var(--gold-06)] flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-center sm:text-left">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="font-headline text-[20px] text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
          >
            Šimrání
          </Link>
          <div className="text-[13px] text-[var(--cream-35)]">
            &copy; 2026 Šimrání Podcast
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          <Link href="/" className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors">
            Hlavní stránka
          </Link>
          <a href="https://www.instagram.com/simrani_podcast" target="_blank" rel="noopener noreferrer" className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors">
            Instagram
          </a>
          <a href="https://open.spotify.com/show/4YtZKf6TsvMbCiuEu2zoUc" target="_blank" rel="noopener noreferrer" className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors">
            Spotify
          </a>
          <a href="https://www.youtube.com/@ŠimráníPodcast" target="_blank" rel="noopener noreferrer" className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors">
            YouTube
          </a>
          <a href="https://www.forendors.cz/simrani.cz" target="_blank" rel="noopener noreferrer" className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors">
            Forendors
          </a>
        </div>
      </footer>
    </>
  );
}
