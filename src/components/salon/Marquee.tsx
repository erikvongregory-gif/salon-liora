"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion";
import { Sparkle } from "./ui";

const WORDS = ["Schnitt", "Balayage", "Glossing", "Styling", "Highlights", "Pflege", "Hochsteckfrisuren", "Farbe"];

/** Endlos-Laufband, das auf Scroll-Geschwindigkeit und -Richtung reagiert. */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to("[data-track]", { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
        let dir = 1;
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            dir = self.direction;
            const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 400);
            gsap.to(loop, { timeScale: boost * dir, duration: 0.25, overwrite: true });
            gsap.to(loop, { timeScale: dir, duration: 1.4, delay: 0.25, ease: "power2.out" });
          },
        });
        gsap.fromTo(
          ref.current,
          { rotate: -2.5 },
          {
            rotate: 1.5,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  const row = (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span className={`px-8 font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-none ${i % 2 ? "italic text-blush" : ""}`}>
            {w}
          </span>
          <Sparkle className="size-5 text-rose sm:size-7" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative z-10 -my-10 overflow-hidden py-10" aria-hidden>
      <div ref={ref} className="-ml-[5vw] w-[110vw] origin-center bg-ink py-6 text-paper sm:py-8">
        <div data-track className="flex w-max">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
