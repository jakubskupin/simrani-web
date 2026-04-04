import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PricingToggle } from "./PricingToggle";

export const metadata: Metadata = {
  title: "Konzultace o intimitě a vztazích — Šimrání",
  description:
    "45 minut jen pro tebe a tvoje otázky. Konzultace o intimitě s Markétou ze Šimrání. Na základě zkušeností, ne teorie.",
  openGraph: {
    title: "Konzultace o intimitě s Markétou — Šimrání podcast",
    description:
      "45 minut jen pro tebe a tvoje otázky. Konzultace o intimitě s Markétou ze Šimrání. Na základě zkušeností, ne teorie.",
    type: "website",
    locale: "cs_CZ",
    siteName: "Šimrání",
  },
  twitter: {
    card: "summary_large_image",
    title: "Konzultace o intimitě s Markétou — Šimrání podcast",
    description:
      "45 minut jen pro tebe a tvoje otázky. Konzultace o intimitě s Markétou ze Šimrání. Na základě zkušeností, ne teorie.",
  },
};

/* ────────────────────── ICONS (inline SVG, project pattern) ────────────────────── */

const iconClass = "w-5 h-5 text-[var(--gold)] shrink-0";

function CompassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

/* ────────────────────── DATA ────────────────────── */

const useCases = [
  {
    icon: <MessageIcon />,
    title: "Jak o tom mluvit",
    desc: "Víš, co chceš, ale neumíš to pojmenovat. Pomůžu ti najít slova pro ten rozhovor, který odsouvíš měsíce.",
  },
  {
    icon: <CompassIcon />,
    title: "Kam vyrazit poprvé",
    desc: "Akce, festivaly, párty. Byla jsem tam. Řeknu ti, co čekat, co si vzít, na co se připravit.",
  },
  {
    icon: <FlameIcon />,
    title: "Rozvíjet intimitu",
    desc: "BDSM, smyslové zážitky, bondáž. Praktické tipy z první ruky, ne teorie z článku.",
  },
  {
    icon: <HelpCircleIcon />,
    title: "Osobní dilema",
    desc: "To, na co se googlíš v anonymním okně. Tady to můžeš říct nahlas.",
  },
];


const faqs = [
  {
    q: "Stačí mi napsat na Instagram?",
    a: "Na drobné dotazy odpovídám stále přes DM na Instagramu a o to nikdo nepřijde. Konzultace je pro chvíle, kdy chceš víc. Širší pohled, oponenturu, hlubší a intimní diskuzi nad tématem, na které nestačí pár zpráv.",
  },
  {
    q: "Je to terapie?",
    a: "Ne. Nejsem terapeutka. Je to rozhovor na základě mých zkušeností. Jako kdybys zavolala kamarádce, která už toho hodně zažila.",
  },
  {
    q: "Musím zaplatit předem?",
    a: "Ano. Na každý hovor se připravuju a vyhrazuju si na něj čas. Platba předem potvrzuje, že se opravdu potkáme. Po výběru termínu dostaneš QR kód na platbu převodem.",
  },
  {
    q: "Co když se nemůžu dostavit?",
    a: "Termín můžeš přesunout minimálně 24 hodin předem. Stačí napsat na marketa@simrani.cz.",
  },
  {
    q: "Jak hovor probíhá?",
    a: "Přes Google Meet, 45 minut. Bez záznamu. Můžeš mít zapnutou kameru, nebo ne. Jak ti je pohodlně.",
  },
  {
    q: "Mám slevu jako předplatitel/ka?",
    a: 'Ano! Předplatitelé na Forendors nebo Spotify mají trvalou slevu 25 %. Klikni na „Jsem předplatitel/ka" v ceníku a zobrazí se ti zvýhodněný QR kód.',
  },
];

/* ────────────────────── PAGE ────────────────────── */

export default function Konzultace() {
  return (
    <>
      {/* HERO — full-width photo background, text left */}
      <section className="relative h-[780px] md:min-h-[720px] md:h-auto overflow-hidden">
        {/* Logo — absolute over hero */}
        <Link
          href="/"
          className="absolute top-5 left-5 sm:left-10 lg:left-[120px] z-[10] font-headline text-[20px] sm:text-[22px] font-normal text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
          style={{ fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144" }}
        >
          Šimrání
        </Link>
        {/* Background fallback gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--wine)] to-[var(--deep)]" />
        {/* Photo placeholder — replace with real image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/marketa-faberova-simrani-konzultace.png"
            alt="Markéta Fáberová — 1:1 konzultace Šimrání"
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Overlay gradient — only left side for text readability */}
        <div
          className="absolute inset-y-0 left-0 w-[55%] z-[1] hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #1A0A14E8 0%, #1A0A14CC 50%, transparent 100%)",
          }}
        />
        {/* Bottom fade — desktop, into deep */}
        <div
          className="absolute inset-0 z-[1] hidden md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent 75%, #1A0A1480 85%, #1A0A14CC 92%, #1A0A14 100%)",
          }}
        />
        {/* Mobile bottom fade — strong fade for text readability */}
        <div
          className="absolute inset-0 z-[1] md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 30%, #1A0A1480 50%, #1A0A14CC 60%, #1A0A14F0 70%, #1A0A14 80%)",
          }}
        />

        {/* Content — mobile: pinned to bottom below photo; desktop: centered left */}
        <div className="absolute md:relative z-[2] left-0 right-0 bottom-0 md:bottom-auto md:top-0 md:flex md:flex-col md:justify-center md:min-h-[720px] px-5 sm:px-10 lg:px-[120px] pb-8 pt-4 md:py-20">
          <div className="max-w-[540px] flex flex-col gap-3 md:gap-5">
            <div className="text-[10px] md:text-[12px] tracking-[3px] uppercase font-medium text-[var(--gold)]">
              1 : 1&ensp;Konzultace
            </div>
            <h1
              className="font-headline text-[32px] sm:text-[44px] lg:text-[56px] font-normal leading-[1.05] text-[var(--cream)]"
              style={{
                fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144",
              }}
            >
              45 minut jen
              <br />
              pro tebe
              <br />
              <span className="text-[var(--gold)]">a&nbsp;tvoje otázky</span>
            </h1>
            <p className="text-[14px] md:text-[16px] leading-[1.6] text-[var(--cream-60)] font-light max-w-[440px]">
              Na drobnosti odpovídám stále přes DM. Ale některé otázky
              potřebují víc než pár zpráv. Potřebují prostor, kde se nemusíš
              stydět za to, co se chceš zeptat.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mt-1">
              <a
                href="#booking"
                className="inline-flex items-center px-9 py-3.5 bg-[var(--gold)] rounded-full text-[14px] font-medium text-[var(--deep)] hover:bg-[var(--cream)] transition-all"
              >
                Vyber si termín
              </a>
              <a
                href="#video"
                className="text-[13px] md:text-[14px] text-[var(--cream-60)] font-light hover:text-[var(--gold)] transition-colors"
              >
                nebo si poslechni, o co jde &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-[var(--deep)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-20">
        <AnimatedSection className="text-center">
          <div className="text-[11px] font-normal tracking-[3px] text-[var(--gold)] uppercase mb-4">
            Pro koho to je
          </div>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-normal text-[var(--cream)] mb-8 sm:mb-12">
            Co spolu můžeme řešit
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[780px] mx-auto">
          {useCases.map((uc, i) => (
            <AnimatedSection key={uc.title} delay={i * 0.1}>
              <div className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-[var(--gold-10)] hover:border-[var(--gold-25)] transition-colors">
                <div className="shrink-0 mt-[2px]">{uc.icon}</div>
                <div>
                  <div className="font-headline text-[16px] sm:text-[18px] font-semibold italic text-[var(--cream)] mb-1">
                    {uc.title}
                  </div>
                  <div className="text-[13px] sm:text-[14px] leading-[1.6] text-[var(--cream-60)]">
                    {uc.desc}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* VIDEO — Markéta vysvětluje konzultace (start 14:05) */}
      <section id="video" className="bg-[var(--deep)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-20">
        <AnimatedSection className="max-w-[780px] mx-auto">
          <div className="text-[11px] font-normal tracking-[3px] text-[var(--gold)] uppercase mb-4 text-center">
            Markéta vysvětluje
          </div>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-normal text-[var(--cream)] mb-8 text-center">
            Poslechni si to z&nbsp;první ruky
          </h2>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--gold-10)]">
            <iframe
              src="https://www.youtube.com/embed/t7Zfe8_vWk4?start=845&rel=0"
              title="Markéta o konzultacích — Šimrání"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* PROČ ZROVNA MARKÉTA — 3 value pillars */}
      <section className="bg-[var(--wine-bg)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-20">
        <AnimatedSection className="max-w-[780px] mx-auto text-center">
          <div className="text-[11px] font-normal tracking-[3px] text-[var(--gold)] uppercase mb-4">
            Proč zrovna já
          </div>
          <h2
            className="font-headline text-[24px] sm:text-[32px] font-normal text-[var(--cream)] mb-4"
            style={{
              fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144",
            }}
          >
            Co vám můžu předat
          </h2>
        </AnimatedSection>
        <div className="flex flex-col gap-5 max-w-[780px] mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="p-6 sm:p-7 rounded-2xl border border-[var(--gold-10)] hover:border-[var(--gold-25)] transition-colors">
              <div className="flex gap-4 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--gold)] shrink-0 mt-1">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <div className="font-headline text-[17px] sm:text-[19px] font-semibold italic text-[var(--cream)] mb-2">
                    Zažila jsem to
                  </div>
                  <div className="text-[13px] sm:text-[14px] leading-[1.7] text-[var(--cream-60)]">
                    Byla jsem na BDSM akcích, festivalech, workshopech, párty. Vím, co se děje za dveřmi, o&nbsp;kterých přemýšlíš. Narozdíl od terapeuta nebo sexuologa ti můžu říct, jak to vypadá zevnitř. Praktické tipy, ne poučky z&nbsp;knihy.
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="p-6 sm:p-7 rounded-2xl border border-[var(--gold-10)] hover:border-[var(--gold-25)] transition-colors">
              <div className="flex gap-4 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--gold)] shrink-0 mt-1">
                  <path d="M12 20h9" />
                  <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                </svg>
                <div>
                  <div className="font-headline text-[17px] sm:text-[19px] font-semibold italic text-[var(--cream)] mb-2">
                    200+ příběhů v&nbsp;hlavě
                  </div>
                  <div className="text-[13px] sm:text-[14px] leading-[1.7] text-[var(--cream-60)]">
                    Za 200+ epizod podcastu jsem slyšela stovky příběhů lidí, kteří řeší to samé co ty. Vím, která epizoda se týká tvého tématu, a&nbsp;pošlu ti konkrétní odkazy. Odejdeš s&nbsp;materiálem, ne jen s&nbsp;pocitem.
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="p-6 sm:p-7 rounded-2xl border border-[var(--gold-10)] hover:border-[var(--gold-25)] transition-colors">
              <div className="flex gap-4 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--gold)] shrink-0 mt-1">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div>
                  <div className="font-headline text-[17px] sm:text-[19px] font-semibold italic text-[var(--cream)] mb-2">
                    Propojím tě s&nbsp;komunitou
                  </div>
                  <div className="text-[13px] sm:text-[14px] leading-[1.7] text-[var(--cream-60)]">
                    Mám Discord plný lidí, kteří řeší podobná témata. V&nbsp;BDSM komunitě je těžké najít lidi se stejnými zájmy. Můžu tě nasměrovat do diskuzí, propojit s&nbsp;lidmi, kteří si tím prošli. To je hodnota, kterou jinde nedostaneš.
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CO TO NENÍ */}
      <section className="bg-[var(--deep)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-16">
        <AnimatedSection className="max-w-[680px] mx-auto text-center">
          <h2
            className="font-headline text-[22px] sm:text-[28px] font-normal text-[var(--cream)] mb-6"
            style={{
              fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144",
            }}
          >
            Upřímně, co ode mě <span className="italic">ne</span>čekej
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            {[
              "Ne terapie",
              "Ne poradenství",
              "Ne všeználek",
              "Ne náhrada za odborníka",
            ].map((pill) => (
              <span
                key={pill}
                className="text-[11px] sm:text-[12px] font-medium tracking-[1px] uppercase text-[var(--cream-35)] px-[14px] sm:px-[18px] py-[6px] sm:py-[7px] border border-[var(--gold-10)] rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>
          <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[var(--cream-60)] mb-6">
            Jsem někdo, kdo už toho hodně zažil. Navštívila jsem spoustu míst,
            mluvila s&nbsp;desítkami lidí, prošla si vlastní cestou. Můžu ti
            říct, co a&nbsp;jak. Upřímně, z&nbsp;první ruky. Ale nejsem
            odbornice a&nbsp;nebudu se tak tvářit.
          </p>
          <p
            className="font-headline text-[16px] sm:text-[18px] italic text-[var(--gold)] leading-[1.5]"
            style={{
              fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144",
            }}
          >
            „Nejsem terapeutka. Jsem ta, která už tam byla, a&nbsp;říká: pojď, nic se nestane."
          </p>
        </AnimatedSection>
      </section>

      {/* PUSH — rozpohybuj to */}
      <section className="bg-[var(--wine-bg)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-16">
        <AnimatedSection className="max-w-[600px] mx-auto text-center">
          <h2
            className="font-headline text-[22px] sm:text-[28px] lg:text-[32px] font-normal text-[var(--cream)] mb-5"
            style={{
              fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144",
            }}
          >
            Podcastů jsi slyšela dost.
            <br />
            <span className="text-[var(--gold)] italic">Teď to chce rozhovor.</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[var(--cream-60)]">
            Poslouchat příběhy je první krok. Ale ten tvůj se rozpohybuje, až o&nbsp;něm promluvíš. 45 minut, praktické tipy, konkrétní odkazy. Žádná teorie, žádné „to bude dobré". Jen upřímný rozhovor s&nbsp;někým, kdo tam už byl.
          </p>
        </AnimatedSection>
      </section>

      {/* VERTICAL TIMELINE — booking flow */}
      <section id="booking" className="bg-[var(--deep)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-20">
        <AnimatedSection className="text-center mb-10">
          <div className="text-[11px] font-normal tracking-[3px] text-[var(--gold)] uppercase mb-4">
            Jak to funguje
          </div>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-normal text-[var(--cream)]">
            Tři jednoduché kroky
          </h2>
        </AnimatedSection>

        <div className="max-w-[640px] mx-auto">
          {/* Step 1 — Vyber si termín */}
          <AnimatedSection delay={0.1}>
            <div className="flex gap-5 sm:gap-8">
              {/* Timeline line + circle */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[var(--gold)] flex items-center justify-center font-headline text-[18px] sm:text-[20px] font-semibold text-[var(--gold)]">
                  1
                </div>
                <div className="w-px flex-1 bg-[var(--gold-10)] mt-3" />
              </div>
              {/* Content */}
              <div className="pb-10">
                <div className="font-headline text-[17px] sm:text-[19px] font-semibold italic text-[var(--cream)] mb-2">
                  Vyber si termín a napiš, co řešíš
                </div>
                <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[var(--cream-60)] mb-5">
                  Zvol volný slot v&nbsp;kalendáři. V&nbsp;rezervačním formuláři mi napiš, co tě trápí nebo zajímá. Díky tomu se na hovor připravím.
                </p>
                {/* Calendar placeholder */}
                <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[var(--gold-25)] bg-[var(--gold-06)]">
                  <div className="text-[14px] text-[var(--cream-60)] mb-4">
                    Zde bude kalendář pro výběr termínu
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center px-8 py-3 rounded-full bg-[var(--gold)] text-[var(--deep)] text-[13px] sm:text-[14px] font-semibold hover:bg-[var(--cream)] hover:-translate-y-px transition-all duration-300"
                  >
                    Otevřít kalendář &rarr;
                  </a>
                  <div className="text-[11px] text-[var(--cream-35)] mt-3">
                    (Google Calendar Appointment Schedule, doplníme odkaz)
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Step 2 — Zaplať předem */}
          <AnimatedSection delay={0.2}>
            <div className="flex gap-5 sm:gap-8">
              {/* Timeline line + circle */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[var(--gold)] flex items-center justify-center font-headline text-[18px] sm:text-[20px] font-semibold text-[var(--gold)]">
                  2
                </div>
                <div className="w-px flex-1 bg-[var(--gold-10)] mt-3" />
              </div>
              {/* Content */}
              <div className="pb-10">
                <div className="font-headline text-[17px] sm:text-[19px] font-semibold italic text-[var(--cream)] mb-2">
                  Zaplať převodem předem
                </div>
                <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[var(--cream-60)] mb-5">
                  Po rezervaci naskenuj QR kód v&nbsp;bankovní aplikaci. Platba předem potvrzuje rezervaci. Připravuju se na každý hovor a&nbsp;chci mít jistotu, že se potkáme.
                </p>
                {/* Pricing toggle */}
                <div id="cena">
                  <PricingToggle />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Step 3 — Připoj se */}
          <AnimatedSection delay={0.3}>
            <div className="flex gap-5 sm:gap-8">
              {/* Timeline circle (no line after) */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[var(--gold)] flex items-center justify-center font-headline text-[18px] sm:text-[20px] font-semibold text-[var(--gold)]">
                  3
                </div>
              </div>
              {/* Content */}
              <div>
                <div className="font-headline text-[17px] sm:text-[19px] font-semibold italic text-[var(--cream)] mb-2">
                  Připoj se a ptej se
                </div>
                <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[var(--cream-60)]">
                  45 minut jen pro tebe. Přes Google Meet, bez záznamu, bez hodnocení. Jenom upřímný rozhovor. Odkaz ti přijde automaticky po rezervaci.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--deep)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-20">
        <AnimatedSection className="max-w-[680px] mx-auto text-center">
          <div className="text-[11px] font-normal tracking-[3px] text-[var(--gold)] uppercase mb-4">
            Časté otázky
          </div>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-normal text-[var(--cream)] mb-8">
            Možná se ptáš&hellip;
          </h2>
          <div className="flex flex-col gap-3 text-left">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-[var(--gold-10)] hover:border-[var(--gold-25)] transition-colors overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 cursor-pointer list-none text-[15px] sm:text-[16px] font-semibold text-[var(--cream)] select-none">
                  {faq.q}
                  <svg
                    className="w-4 h-4 shrink-0 text-[var(--gold)] transition-transform duration-300 group-open:rotate-45"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </summary>
                <div className="px-5 sm:px-6 pb-5 text-[13px] sm:text-[14px] leading-[1.7] text-[var(--cream-60)]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--wine-bg)] px-5 py-10 sm:px-10 sm:py-[60px] lg:px-[120px] lg:py-16 flex flex-col items-center gap-5 text-center">
        <AnimatedSection className="flex flex-col items-center gap-5">
          <h2
            className="font-headline text-[22px] sm:text-[30px] lg:text-[38px] font-normal text-[var(--cream)]"
            style={{
              fontVariationSettings: "'WONK' 1, 'SOFT' 50, 'opsz' 144",
            }}
          >
            Stále váháš?
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[var(--cream-60)] max-w-[440px]">
            Většina lidí, co mi nakonec zavolala, taky nejdřív váhala.
            Napiš mi, co řešíš, a&nbsp;řekneme si, jestli to dává smysl.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:marketa@simrani.cz"
              className="inline-flex items-center px-7 sm:px-9 py-3 rounded-full bg-[var(--gold)] text-[var(--deep)] text-[13px] sm:text-[14px] font-semibold hover:bg-[var(--cream)] hover:-translate-y-px transition-all duration-300"
            >
              marketa@simrani.cz
            </a>
            <a
              href="https://www.instagram.com/simrani_podcast"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 sm:px-9 py-3 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[13px] sm:text-[14px] font-semibold hover:bg-[var(--gold)] hover:text-[var(--deep)] hover:-translate-y-px transition-all duration-300"
            >
              Instagram DM
            </a>
          </div>
        </AnimatedSection>
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
          <Link
            href="/"
            className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors"
          >
            Hlavní stránka
          </Link>
          <Link
            href="/pro-firmy"
            className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors"
          >
            Pro firmy
          </Link>
          <a
            href="https://www.instagram.com/simrani_podcast"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.forendors.cz/simrani.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] sm:text-[13px] text-[var(--cream-35)] hover:text-[var(--gold)] transition-colors"
          >
            Forendors
          </a>
        </div>
      </footer>
    </>
  );
}
