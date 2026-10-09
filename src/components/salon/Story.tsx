"use client";

import Image from "next/image";
import { useRef } from "react";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { BRAND, IMAGES } from "@/lib/salon-data";
import { gsap, useGSAP } from "@/lib/motion";
import { MagneticButton } from "./ui";

const CHAPTERS = [
  {
    eyebrow: "Erste Generation",
    big: String(BRAND.since),
    name: "Helene,",
    role: "die Gründerin.",
    body: (
      <>
        Alles begann mit unserer Großmutter <strong className="font-medium text-paper">Helene</strong> im
        Jahr {BRAND.since}. Sie war eine Exotin ihrer Zeit – emanzipiert, selbstständig und weltoffen. Ihr
        kleiner Friseursalon wurde zu einem Ort der Zusammenkunft, für Jung und Alt.
      </>
    ),
    image: IMAGES.about[0],
    alt: "Helene, die Gründerin, beim Frisieren",
  },
  {
    eyebrow: "Zweite Generation",
    big: "Erbe",
    name: "Clara,",
    role: "das Erbe.",
    body: (
      <>
        Unsere Mutter <strong className="font-medium text-paper">Clara</strong> führte das Handwerk weiter und
        machte daraus ein wahrhaftiges Unternehmen – mit Herz, Anspruch und einem Blick für jeden Gast.
      </>
    ),
    image: IMAGES.about[1],
    alt: "Clara im Salon",
  },
  {
    eyebrow: "Dritte Generation",
    big: "Heute",
    name: "Elena & Sophie,",
    role: "heute.",
    body: (
      <>
        Heute tragen wir, <strong className="font-medium text-paper">Elena &amp; Sophie</strong>, diese
        Familientradition in die dritte Generation – persönlich, modern und mit derselben Leidenschaft für
        gutes Handwerk.
      </>
    ),
    image: IMAGES.about[2],
    alt: "Elena und Sophie im Salon",
  },
];

export default function Story({ site }: { site: SalonSiteState }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const texts = q("[data-chapter]");
        const imgs = q("[data-img]");
        const bigs = q("[data-big]");
        const dots = q("[data-dot]");

        gsap.set(imgs.slice(1), { clipPath: "inset(100% 0% 0% 0% round 28px)" });
        gsap.set(texts.slice(1), { autoAlpha: 0 });
        gsap.set(bigs.slice(1), { autoAlpha: 0, yPercent: 30 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => "+=" + window.innerHeight * 2.6,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: "labelsDirectional", duration: { min: 0.3, max: 0.9 }, ease: "power2.inOut" },
          },
        });

        tl.addLabel("c0");
        tl.to(q("[data-progress]"), { scaleX: 1, ease: "none", duration: 2.4 }, 0);
        for (let i = 1; i < CHAPTERS.length; i++) {
          const at = (i - 1) * 1.2 + 0.2;
          const prevLines = texts[i - 1].querySelectorAll("[data-ln]");
          const nextLines = texts[i].querySelectorAll("[data-ln]");
          tl.to(prevLines, { yPercent: -110, autoAlpha: 0, stagger: 0.04, duration: 0.5 }, at)
            .set(texts[i], { autoAlpha: 1 }, at + 0.35)
            .from(nextLines, { yPercent: 110, autoAlpha: 0, stagger: 0.05, duration: 0.6, ease: "power3.out" }, at + 0.4)
            .to(imgs[i], { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1 }, at)
            .from(imgs[i].querySelector("img"), { scale: 1.3, yPercent: 8, duration: 1 }, at)
            .to(imgs[i - 1], { scale: 0.86, filter: "brightness(0.45)", duration: 1 }, at)
            .to(bigs[i - 1], { autoAlpha: 0, yPercent: -30, duration: 0.6 }, at)
            .to(bigs[i], { autoAlpha: 1, yPercent: 0, duration: 0.7 }, at + 0.3)
            .to(dots[i - 1], { width: 8, backgroundColor: "rgba(251,248,245,0.25)", duration: 0.4 }, at + 0.3)
            .to(dots[i], { width: 28, backgroundColor: "#a3555f", duration: 0.4 }, at + 0.3)
            .addLabel("c" + i, at + 1);
        }
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="story"
      className="relative overflow-hidden bg-ink text-paper motion-safe:h-[100svh]"
      aria-label="Unsere Geschichte"
    >
      {/* Große Hintergrund-Wörter */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden motion-safe:block">
        {CHAPTERS.map((c) => (
          <span
            key={c.big}
            data-big
            className="absolute -bottom-[0.18em] right-[-0.04em] font-serif text-[34vw] italic leading-none text-white/[0.04] lg:text-[22vw]"
          >
            {c.big}
          </span>
        ))}
      </div>

      <div className="relative mx-auto grid h-full max-w-[1400px] gap-8 px-5 pb-10 pt-24 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20 lg:py-0 motion-safe:grid-rows-[minmax(0,1fr)_auto] lg:motion-safe:grid-rows-1">
        {/* Text */}
        <div className="relative order-2 flex flex-col lg:order-1">
          <div className="mb-8 hidden items-center gap-4 motion-safe:flex">
            <span className="eyebrow text-paper/50">Unsere Geschichte</span>
            <span className="relative h-px w-24 overflow-hidden bg-paper/15">
              <span data-progress className="absolute inset-0 origin-left scale-x-0 bg-rose" />
            </span>
          </div>

          <div className="grid motion-reduce:gap-16">
            {CHAPTERS.map((c, i) => (
              <article key={c.name} data-chapter className="[grid-area:1/1] motion-reduce:[grid-area:auto]">
                <p data-ln className="eyebrow mb-5 text-rose">
                  {String(i + 1).padStart(2, "0")} — {c.eyebrow}
                </p>
                <h2 className="font-serif text-[clamp(2.6rem,5.4vw,5.6rem)] leading-[0.95] tracking-[-0.02em]">
                  <span className="block overflow-hidden pb-[0.06em]">
                    <span data-ln className="block">
                      {c.name}
                    </span>
                  </span>
                  <span className="block overflow-hidden pb-[0.06em]">
                    <em data-ln className="block text-blush">
                      {c.role}
                    </em>
                  </span>
                </h2>
                <p data-ln className="mt-6 max-w-[30rem] text-[15px] leading-relaxed text-paper/65 lg:text-base">
                  {c.body}
                </p>
                {i === CHAPTERS.length - 1 && (
                  <div data-ln className="mt-8">
                    <MagneticButton variant="light" onClick={site.openBooking}>
                      Termin bei uns
                    </MagneticButton>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-10 hidden gap-2 motion-safe:flex" aria-hidden>
            {CHAPTERS.map((c, i) => (
              <span
                key={c.name}
                data-dot
                className="h-2 rounded-full"
                style={{ width: i === 0 ? 28 : 8, background: i === 0 ? "#a3555f" : "rgba(251,248,245,0.25)" }}
              />
            ))}
          </div>
        </div>

        {/* Bilder-Stapel */}
        <div className="relative order-1 h-full min-h-0 lg:order-2 lg:h-[76svh] motion-reduce:h-[60svh]">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.image}
              data-img
              className="absolute inset-0 overflow-hidden rounded-[28px] bg-ink-soft will-change-transform"
              style={{ zIndex: i + 1 }}
            >
              <Image src={c.image} alt={c.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="glass-dark absolute bottom-4 left-4 rounded-full px-4 py-2 text-xs text-paper/90">
                {c.eyebrow}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
