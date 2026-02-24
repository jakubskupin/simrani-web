"use client";

import { useState } from "react";

const episodes = [
  {
    id: "xcJTeDtoDcI",
    title: "217. díl Šimrání",
  },
  {
    id: "eZMz180AkKo",
    title: "216. díl — Ženský cyklus, plodnost a antikoncepce",
  },
  {
    id: "V8oHbpuzsTU",
    title: "215. díl — Tělo, vztahy, nahota a popularita",
  },
  {
    id: "xsWSRHv1Chc",
    title: "214. díl — Porod z pohledu muže, Heated Rivalry i ocet",
  },
];

const platforms = [
  { icon: "youtube", label: "YouTube", href: "https://www.youtube.com/@%C5%A0imr%C3%A1n%C3%ADpodcast" },
  { icon: "headphones", label: "Spotify", href: "https://open.spotify.com/show/0DIaEPDBFwSaBTTpZ4bnfj" },
  { icon: "podcast", label: "Apple Podcasts", href: "https://podcasts.apple.com/cz/podcast/%C5%A1imr%C3%A1n%C3%AD/id1552335085" },
];

export function YouTube() {
  const [activeVideo, setActiveVideo] = useState(episodes[0].id);

  return (
    <section
      id="podcast"
      className="flex flex-col items-center py-[100px] px-12 gap-8 bg-gradient-to-b from-[var(--deep)] via-[#120810] to-[var(--deep)]"
    >
      <h2 className="font-headline font-normal text-[42px] leading-[1.1] text-[var(--cream)]">
        Nejnovější epizody
      </h2>

      {/* Main video */}
      <div className="w-full max-w-[1000px] aspect-video rounded-2xl overflow-hidden bg-black">
        <iframe
          key={activeVideo}
          src={`https://www.youtube.com/embed/${activeVideo}`}
          allowFullScreen
          loading="lazy"
          className="w-full h-full border-0"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-[1000px]">
        {episodes.map((ep) => (
          <button
            key={ep.id}
            onClick={() => setActiveVideo(ep.id)}
            className={`relative aspect-video rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group ${
              activeVideo === ep.id ? "ring-2 ring-[var(--gold)]" : ""
            }`}
          >
            {/* YouTube thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${ep.id}/mqdefault.jpg`}
              alt={ep.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay + title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
              <span className="text-[13px] font-normal leading-snug text-[var(--cream-60)] text-left">
                {ep.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Platformy strip */}
      <div className="flex flex-col items-center gap-4 w-full pt-6 border-t border-[var(--gold-06)]">
        <span className="text-[11px] tracking-[2px] uppercase font-medium text-[var(--cream-35)]">
          Poslouchej také na
        </span>
        <div className="flex gap-3">
          {platforms.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-2.5 border border-[var(--gold-10)] rounded-full hover:border-[var(--gold-25)] transition-colors"
            >
              <PlatformIcon name={p.icon} />
              <span className="text-[13px] font-medium text-[var(--cream-60)]">
                {p.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformIcon({ name }: { name: string }) {
  const iconClass = "w-5 h-5 text-[var(--gold)]";
  switch (name) {
    case "youtube":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
      );
    case "headphones":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
      );
    case "podcast":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.85 18.58a9 9 0 1 0-9.7 0"/><path d="M8 14a5 5 0 1 1 8 0"/><circle cx="12" cy="11" r="1"/><path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"/></svg>
      );
    default:
      return null;
  }
}
