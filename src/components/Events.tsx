import { B2BStrip } from "./B2BStrip";

const iconClass = "w-3.5 h-3.5 text-[var(--gold)] shrink-0";

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
  );
}

function TicketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
  );
}

interface EventCardProps {
  badge: string;
  badgeVariant?: "default" | "gold";
  title: string;
  description: React.ReactNode;
  location: string;
  date: string;
  price: string;
  priceHighlight?: boolean;
  cta: { label: string; href?: string };
  ctaVariant?: "text" | "button";
  image?: string;
  border?: boolean;
  highlight?: boolean;
}

function EventCard({
  badge,
  badgeVariant = "default",
  title,
  description,
  location,
  date,
  price,
  priceHighlight = false,
  cta,
  ctaVariant = "text",
  image,
  border = false,
  highlight = false,
}: EventCardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden w-[85vw] max-w-[340px] shrink-0 snap-start md:max-w-none md:w-[calc((100%-48px)/3)] ${
        highlight
          ? "bg-[rgba(197,155,104,0.08)] border border-[var(--gold)]"
          : border
            ? "bg-[var(--wine-bg)] border border-[var(--gold-25)]"
            : "bg-[var(--wine-bg)]"
      }`}
    >
      {/* Image — hidden until real photos are provided */}
      {/* <div className="w-full h-[200px] bg-[var(--wine)] relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--cream-35)] text-[12px] tracking-[2px] uppercase">
            Foto placeholder
          </div>
        )}
      </div> */}

      {/* Body */}
      <div className="flex flex-col gap-3.5 p-7">
        {/* Badge */}
        <span
          className={`inline-flex w-fit px-3.5 py-1 rounded-full text-[10px] font-semibold tracking-[2px] uppercase ${
            badgeVariant === "gold"
              ? "bg-[var(--gold)] text-[var(--deep)]"
              : "bg-[rgba(197,155,104,0.19)] text-[var(--gold)]"
          }`}
        >
          {badge}
        </span>

        {/* Title */}
        <h3 className="font-headline text-[24px] font-semibold italic text-[var(--cream)]">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[13px] leading-[1.6] text-[var(--cream-60)]">
          {description}
        </p>

        {/* Meta strip */}
        <div className="flex flex-col gap-1.5 pt-3.5">
          <div className="flex items-center gap-2">
            <MapPinIcon />
            <span className="text-[12px] text-[var(--cream-35)]">
              {location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <span className="text-[12px] text-[var(--cream-35)]">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <TicketIcon />
            <span
              className={`text-[12px] ${
                priceHighlight
                  ? "text-[var(--cream)] font-semibold"
                  : "text-[var(--cream-35)]"
              }`}
            >
              {price}
            </span>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-[var(--gold-25)]" />

        {/* CTA */}
        {ctaVariant === "button" ? (
          <a
            href={cta.href || "#"}
            target={cta.href?.startsWith("http") ? "_blank" : undefined}
            rel={cta.href?.startsWith("http") ? "noopener" : undefined}
            className="inline-flex w-fit items-center justify-center px-7 py-3 rounded-full bg-[var(--gold)] text-[14px] font-semibold text-[var(--deep)] hover:bg-[var(--cream)] transition-all"
          >
            {cta.label}
          </a>
        ) : (
          <a
            href={cta.href || "#"}
            target={cta.href?.startsWith("http") ? "_blank" : undefined}
            rel={cta.href?.startsWith("http") ? "noopener" : undefined}
            className="text-[13px] font-medium text-[var(--gold)] hover:text-[var(--cream)] transition-colors w-fit"
          >
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

export function Events() {
  return (
    <section id="eventy" className="bg-[var(--deep)] px-5 md:px-12 lg:px-[120px] pt-16 md:pt-20 pb-10 md:pb-12">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-medium tracking-[4px] uppercase text-[var(--gold)]">
            Od sluchátek k setkání
          </span>
          <h2 className="font-headline text-[36px] md:text-[48px] font-normal italic text-[var(--cream)] tracking-tight">
            Kde to šimrá
          </h2>
        </div>

        {/* Cards grid — horizontal scroll on mobile, 3-col on desktop */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:pl-0 md:-mr-12 lg:-mr-[120px] md:pr-12 lg:pr-[120px]">
          <EventCard
            badge="Ověřuji zájem"
            badgeVariant="gold"
            title="Workshop pro páry"
            description={<>Komorní půldenní zážitek pro 3–5 párů. Komunikace, hravost, důvěra. <a href="https://youtu.be/t7Zfe8_vWk4?t=294" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:text-[var(--cream)] transition-colors underline underline-offset-2">Víc o tom ve videu</a>.</>}
            location="Praha"
            date="Termín vybereme společně"
            price="∞"
            cta={{
              label: "Napište mi DM →",
              href: "https://www.instagram.com/simrani_podcast",
            }}
            image="/pirko-ws.png"
            border
            highlight
          />

          <EventCard
            badge="24. dubna"
            title="Alterno Vanilla"
            description={<>Šimrací sraz před Alternem Vanilla. Potkej komunitu naživo a nalaď se na večer. Vstupenky na samotnou akci koupíš na <a href="https://hellevents.cz/cs/vstupenky/128-alterno-vanilla-2026.html" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] underline hover:text-[var(--cream)] transition-colors">hellevents.cz</a>.</>}
            location="Bar Decentní Dýně (u Tresoru), Praha"
            date="24. dubna 2026, od 20:00"
            price="Vstup zdarma"
            cta={{
              label: "Rezervovat místo →",
              href: "https://docs.google.com/forms/d/e/1FAIpQLSd7QLeAFlwdMPUMM7hGYAiM8UaFW7JlUjJmdJ0UjhG2_FNHcg/viewform",
            }}
          />

          <EventCard
            badge="5. června"
            title="Šimrací Buřty"
            description="Neformální setkání venku. Buřty, příroda a rozhovory bez filtrů."
            location="Upřesníme"
            date="5. června 2026"
            price="Upřesníme"
            cta={{ label: "Více info brzy" }}
          />

          <EventCard
            badge="18. srpna"
            title="Šimrání Live"
            description="Letní podcastová scéna v Troji. Live natáčení epizody pod širým nebem."
            location="Troja, Praha"
            date="18. srpna 2026"
            price="Upřesníme"
            cta={{ label: "Více info brzy" }}
          />

          <EventCard
            badge="6.–7. listopadu"
            badgeVariant="gold"
            title="Intimity Festival"
            description="Největší český festival o intimitě a vztazích. Přednášky, workshopy, panely — celý den pro jednotlivce i páry."
            location="Grand Hotel International, Praha"
            date="6.–7. listopadu 2026"
            price="Early bird v prodeji"
            priceHighlight
            cta={{
              label: "intimityfestival.cz →",
              href: "https://intimityfestival.cz",
            }}
            ctaVariant="button"
            border
            image="/intimity-festival.jpg"
          />
        </div>

        {/* B2B strip — inline under events */}
        <B2BStrip />
      </div>
    </section>
  );
}
