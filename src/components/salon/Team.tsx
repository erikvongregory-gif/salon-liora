"use client";

import Image from "next/image";
import { useRef } from "react";
import { TEAM } from "@/lib/salon-data";
import { gsap, useGSAP } from "@/lib/motion";
import { RevealText, Sparkle } from "./ui";

export default function Team() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-member]").forEach((card, i) => {
          const frame = card.querySelector("[data-frame]");
          const img = card.querySelector("img");
          gsap.fromTo(
            frame,
            { clipPath: "inset(18% 12% 18% 12% round 40px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 95%", end: "top 35%", scrub: true },
            },
          );
          gsap.fromTo(
            img,
            { scale: 1.3, yPercent: -6 },
            {
              scale: 1.05,
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
          gsap.from(card.querySelectorAll("[data-info] > *"), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1.1,
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 60%", once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="team" className="relative bg-paper px-5 pb-24 pt-32 sm:px-8 lg:pb-40 lg:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-2 text-rose">
              <Sparkle className="size-3" /> Das Team
            </p>
            <RevealText className="font-serif text-[clamp(3rem,8vw,8.5rem)] leading-[0.88] tracking-[-0.03em]">
              Elena <em className="text-rose">&amp;</em> Sophie
            </RevealText>
          </div>
          <RevealText
            as="p"
            delay={0.15}
            className="max-w-md text-base leading-relaxed text-muted lg:justify-self-end lg:text-lg"
          >
            Zwei Schwestern, zwei Handschriften – und ein gemeinsamer Anspruch: dass Sie sich nach jedem Termin
            ein bisschen mehr wie Sie selbst fühlen.
          </RevealText>
        </div>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-8 lg:mt-24 lg:gap-16">
          {TEAM.map((m, i) => (
            <article key={m.id} data-member className={i === 1 ? "md:mt-40" : ""}>
              <div
                data-frame
                data-cursor={m.name}
                className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand"
              >
                <Image
                  src={m.image}
                  alt={`${m.name} – ${m.specialty}`}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover object-top transition-[filter] duration-700 group-hover:brightness-105"
                />
                <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[20px] px-5 py-4 sm:right-auto sm:min-w-[260px]">
                  <div>
                    <p className="font-serif text-2xl leading-none">{m.name}</p>
                    <p className="mt-1 text-xs text-muted">{m.specialty}</p>
                  </div>
                  <span className="ml-6 font-serif text-3xl text-rose">0{i + 1}</span>
                </div>
              </div>
              <div data-info className="mt-6 grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-8">
                <p className="eyebrow pt-1 text-rose">{m.specialty}</p>
                <p className="max-w-sm text-[15px] leading-relaxed text-muted">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
