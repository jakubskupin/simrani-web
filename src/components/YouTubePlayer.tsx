"use client";

import { useState } from "react";
import type { YouTubeVideo } from "@/lib/youtube";

export function YouTubePlayer({ episodes }: { episodes: YouTubeVideo[] }) {
  const [activeVideo, setActiveVideo] = useState(episodes[0]?.id ?? "");

  return (
    <>
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

      {/* Thumbnails — show the 4 episodes that aren't active */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-[1000px]">
        {episodes
          .filter((ep) => ep.id !== activeVideo)
          .map((ep) => (
            <button
              key={ep.id}
              onClick={() => setActiveVideo(ep.id)}
              className="relative aspect-video rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
            >
              <img
                src={`https://img.youtube.com/vi/${ep.id}/mqdefault.jpg`}
                alt={ep.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <span className="text-[13px] font-normal leading-snug text-[var(--cream-60)] text-left">
                  {ep.title}
                </span>
              </div>
            </button>
          ))}
      </div>
    </>
  );
}
