"use client";

import { useEffect, useState } from "react";

const images = ["/image_front/image1.jpeg", "/image_front/image2.jpeg"];

const SLIDE_DURATION = 7000;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      SLIDE_DURATION
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt=""
            className={`w-full h-full object-cover ${
              i === active ? "animate-hero-zoom" : "scale-[1.12]"
            }`}
          />
        </div>
      ))}

      {/* Green DMI tint over the photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,83,45,0.93) 0%, rgba(21,128,61,0.72) 45%, rgba(20,83,45,0.88) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/55" />

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
        {images.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-7 bg-dmi-gold" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
