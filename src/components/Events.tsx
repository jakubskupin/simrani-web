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
  description: string;
  location: string;
  date: string;
  price: string;
  priceHighlight?: boolean;
  cta: { label: string; href?: string };
  ctaVariant?: "text" | "button";
  image?: string;
  border?: boolean;
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
}: EventCardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden bg-[var(--wine-bg)] ${
        border ? "ring-1 ring-[var(--gold-25)]" : ""
      }`}
    >
      {/* Image placeholder */}
      <div className="w-full h-[200px] bg-[var(--wine)] relative">
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
      </div>

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
            className="inline-flex w-fit items-center justify-center px-7 py-3 rounded-lg bg-[var(--gold)] text-[14px] font-semibold text-[var(--deep)] hover:bg-[var(--cream)] transition-all"
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
    <section className="bg-[var(--deep)] px-5 md:px-12 lg:px-[120px] py-16 md:py-20">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-medium tracking-[4px] uppercase text-[var(--gold)]">
            Od sluchátek k setkání
          </span>
          <h2 className="font-headline text-[36px] md:text-[48px] font-normal italic text-[var(--cream)] tracking-tight">
            Kde se šimrá
          </h2>
          <p className="text-[16px] md:text-[18px] leading-[1.5] text-[var(--cream-60)] max-w-[700px]">
            Podcast byl začátek. Workshopy, komunitní setkání, festival — vyber
            si, co ti sedí.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <EventCard
            badge="Již brzy"
            title="Workshop pro páry"
            description="Komorní půldenní zážitek pro 5–8 párů. Komunikace, hravost, důvěra — pod vedením Markéty."
            location="Praha"
            date="Duben 2026"
            price="2 500 Kč / pár"
            priceHighlight
            cta={{ label: "Duben 2026" }}
          />

          <EventCard
            badge="Pro předplatitele"
            title="ŠOL offline"
            description="Exkluzivní setkání pro předplatitele. Večer plný rozhovorů, otázek a komunity — jako podcast, ale naživo."
            location="Praha"
            date="Termín připravujeme"
            price="V rámci předplatného"
            priceHighlight
            cta={{
              label: "Pro předplatitele →",
              href: "https://www.forendors.cz/simrani.cz",
            }}
          />

          <EventCard
            badge="6.–7. listopadu 2026"
            badgeVariant="gold"
            title="Intimity Festival"
            description="Největší český festival o intimitě a vztazích. Přednášky, workshopy, panely — celý den pro jednotlivce i páry. Grand Hotel International, Praha."
            location="Grand Hotel International, Praha"
            date="6.–7. listopadu 2026"
            price="Early bird spuštěno"
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
