"use client";

import Image from "next/image";
import { useRef } from "react";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { galleryCaptions, galleryImgUrls } from "@/lib/salon-data";
import { gsap, useGSAP } from "@/lib/motion";
import { ArrowIcon } from "./ui";

export default function GalleryLightbox({ site }: { site: SalonSiteState }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const dir = useRef(1);
  const i = site.galleryIndex;

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(ref.current, { visibility: "visible" })
        .fromTo(ref.current, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
        .from("[data-lb-ui]", { autoAlpha: 0, y: 20, stagger: 0.05, duration: 0.6, ease: "power3.out" }, "-=0.3");
    },
    { scope: ref },
  );

  useGSAP(() => {
    if (!tl.current) return;
    if (site.galleryOpen) tl.current.timeScale(1).play();
    else tl.current.timeScale(1.5).reverse();
  }, [site.galleryOpen]);

  // Bildwechsel: neues Bild wischt in Richtung der Navigation herein
  useGSAP(
    () => {
      if (!site.galleryOpen) return;
      gsap.fromTo(
        "[data-lb-img]",
        { clipPath: dir.current > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)", scale: 1.08 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.9, ease: "expo.out" },
      );
      gsap.fromTo("[data-lb-cap]", { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "expo.out" });
    },
    { scope: ref, dependencies: [i] },
  );

  const prev = () => {
    dir.current = -1;
    site.prevGallery();
  };
  const next = () => {
    dir.current = 1;
    site.nextGallery();
  };

  return (
    <div
      ref={ref}
      className="invisible fixed inset-0 z-[650] flex flex-col bg-ink text-paper"
      role="dialog"
      aria-modal="true"
      aria-label="Galerie"
      aria-hidden={!site.galleryOpen}
    >
      <div data-lb-ui className="flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-serif text-2xl">
          {String(i + 1).padStart(2, "0")}
          <span className="text-paper/35"> / {String(galleryImgUrls.length).padStart(2, "0")}</span>
        </span>
        <button
          type="button"
          onClick={site.closeGallery}
          aria-label="Schließen"
          className="grid size-11 place-items-center rounded-full border border-white/20 transition-[transform,background] duration-500 hover:rotate-90 hover:bg-white hover:text-ink"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-5 sm:px-24">
        <div data-lb-img className="relative h-full w-full">
          <Image
            key={galleryImgUrls[i]}
            src={galleryImgUrls[i]}
            alt={galleryCaptions[i]}
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>
        <button
          type="button"
          onClick={prev}
          aria-label="Vorheriges Bild"
          className="glass-dark absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full sm:left-8"
        >
          <ArrowIcon className="size-4 -rotate-[135deg]" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Nächstes Bild"
          className="glass-dark absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full sm:right-8"
        >
          <ArrowIcon className="size-4 rotate-45" />
        </button>
      </div>

      <div data-lb-ui className="overflow-hidden px-5 py-6 text-center sm:px-8">
        <p data-lb-cap className="font-serif text-3xl italic">
          {galleryCaptions[i]}
        </p>
      </div>
    </div>
  );
}
