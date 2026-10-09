"use client";

import Image from "next/image";
import { useRef } from "react";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { galleryCaptions, galleryImgUrls } from "@/lib/salon-data";
import { gsap, useGSAP } from "@/lib/motion";
import { MagneticButton, RevealText, Sparkle } from "./ui";

// Wechselnde Höhen und Versätze für einen lebendigen Rhythmus
const SHAPES = [
  { box: "lg:h-[50vh] lg:w-[37vh]", align: "lg:self-end" },
  { box: "lg:h-[40vh] lg:w-[31vh]", align: "lg:self-start" },
  { box: "lg:h-[55vh] lg:w-[43vh]", align: "lg:self-center" },
  { box: "lg:h-[44vh] lg:w-[33vh]", align: "lg:self-end" },
];

export default function Gallery({ site }: { site: SalonSiteState }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = q("[data-gtrack]")[0] as HTMLElement;
        const distance = () => track.scrollWidth - window.innerWidth;

        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-gpin]")[0],
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(q("[data-gbar]"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: q("[data-gpin]")[0], start: "top top", end: () => "+=" + distance(), scrub: true },
        });

        // Jedes Bild hat eigene Parallaxe innerhalb der horizontalen Bewegung
        q("[data-gitem]").forEach((item: HTMLElement) => {
          gsap.fromTo(
            item.querySelector("img"),
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                containerAnimation: scroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
          gsap.from(item.querySelector("[data-cap]"), {
            yPercent: 100,
            autoAlpha: 0,
            duration: 0.9,
            scrollTrigger: { trigger: item, containerAnimation: scroll, start: "left 85%", once: true },
          });
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-gitem]"), {
          y: 60,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          scrollTrigger: { trigger: q("[data-gtrack]")[0], start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="gallery" className="relative bg-cream">
      <div data-gpin className="relative overflow-hidden py-24 lg:flex lg:h-[100svh] lg:flex-col lg:py-0">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8 lg:pt-28">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2 text-rose">
              <Sparkle className="size-3" /> Galerie
            </p>
            <RevealText className="font-serif text-[clamp(2.8rem,6vw,6rem)] leading-[0.9] tracking-[-0.02em]">
              Unsere <em className="text-rose">Arbeiten</em>
            </RevealText>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-3 text-xs text-muted lg:flex">
              {String(galleryImgUrls.length).padStart(2, "0")} Looks
              <span className="relative h-px w-32 overflow-hidden bg-ink/15">
                <span data-gbar className="absolute inset-0 origin-left scale-x-0 bg-rose" />
              </span>
            </span>
            <MagneticButton variant="outline" onClick={site.openBooking}>
              Termin vereinbaren
            </MagneticButton>
          </div>
        </div>

        <div className="no-scrollbar mt-12 overflow-x-auto lg:mt-6 lg:flex lg:flex-1 lg:items-center lg:overflow-visible">
          <ul
            data-gtrack
            className="flex w-max snap-x snap-mandatory gap-4 px-5 sm:px-8 lg:h-[62vh] lg:snap-none lg:gap-8 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] lg:pr-[12vw]"
          >
            {galleryImgUrls.map((src, i) => (
              <li key={src} data-gitem className={`flex snap-start flex-col ${SHAPES[i % SHAPES.length].align}`}>
                <button
                  type="button"
                  onClick={() => site.openGallery(i)}
                  data-cursor="Ansehen"
                  aria-label={`${galleryCaptions[i]} vergrößern`}
                  className={`group relative h-[58vh] w-[72vw] max-w-[340px] overflow-hidden rounded-[24px] bg-sand sm:w-[44vw] lg:max-w-none ${SHAPES[i % SHAPES.length].box}`}
                >
                  <Image
                    src={src}
                    alt={galleryCaptions[i]}
                    fill
                    sizes="(min-width: 1024px) 34vh, 72vw"
                    className="object-cover lg:scale-[1.3] transition-[filter] duration-700 group-hover:brightness-90"
                  />
                </button>
                <div className="mt-3 flex items-baseline justify-between gap-4 overflow-hidden">
                  <span data-cap className="flex w-full items-baseline justify-between">
                    <span className="font-serif text-xl">{galleryCaptions[i]}</span>
                    <span className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
