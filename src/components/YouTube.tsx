const episodes = [
  "Epizoda 215",
  "Epizoda 214",
  "Epizoda 213",
  "Epizoda 212",
];

export function YouTube() {
  return (
    <section
      id="podcast"
      className="flex flex-col items-center py-[100px] px-12 bg-gradient-to-b from-[var(--deep)] via-[#120810] to-[var(--deep)]"
    >
      <div className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] mb-5 font-normal">
        Nejnovější
      </div>
      <h2 className="font-headline font-normal text-[clamp(32px,4vw,52px)] leading-[1.1] text-[var(--cream)] mb-8">
        Poslouchej
      </h2>

      {/* Main video */}
      <div className="w-full max-w-[1000px] aspect-video rounded-2xl overflow-hidden bg-black mb-10">
        <iframe
          src="https://www.youtube.com/embed?listType=user_uploads&list=Šimránípodcast"
          allowFullScreen
          loading="lazy"
          className="w-full h-full border-0"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-[1000px]">
        {episodes.map((ep) => (
          <div
            key={ep}
            className="aspect-video rounded-[10px] bg-[var(--wine)] flex items-end p-3.5 text-[14px] font-normal leading-snug text-[var(--cream-60)] cursor-pointer hover:opacity-80 transition-opacity"
          >
            {ep}
          </div>
        ))}
      </div>
    </section>
  );
}
