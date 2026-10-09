"use client";

import { useRef, useState } from "react";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { BRAND } from "@/lib/salon-data";
import { gsap, lockScroll, ScrollTrigger, useGSAP } from "@/lib/motion";

const LINKS = [
  { id: "story", label: "Geschichte" },
  { id: "team", label: "Team" },
  { id: "services", label: "Leistungen" },
  { id: "gallery", label: "Galerie" },
  { id: "visit", label: "Kontakt" },
];

export default function Nav({ site }: { site: SalonSiteState }) {
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const bar = ref.current!.querySelector("[data-bar]");
      gsap.from(ref.current, { yPercent: -120, duration: 1.2, delay: 1.1, ease: "expo.out" });

      // Glas-Hintergrund nach dem Hero-Anfang, beim Runterscrollen ausblenden
      ScrollTrigger.create({
        start: 80,
        end: "max",
        onUpdate: (self) => {
          gsap.to(ref.current, {
            yPercent: self.direction === 1 && self.scroll() > 400 ? -130 : 0,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
        onToggle: (self) => bar?.classList.toggle("is-solid", self.isActive),
      });

      const items = menuRef.current!.querySelectorAll("[data-mi]");
      menuTl.current = gsap
        .timeline({ paused: true })
        .set(menuRef.current, { display: "flex" })
        .fromTo(
          menuRef.current,
          { clipPath: "inset(0 0 100% 0 round 0 0 32px 32px)" },
          { clipPath: "inset(0 0 0% 0 round 0 0 0px 0px)", duration: 0.9, ease: "expo.inOut" },
        )
        .from(items, { yPercent: 120, duration: 0.9, stagger: 0.06, ease: "expo.out" }, "-=0.35");
    },
    { scope: ref },
  );

  const toggle = (next: boolean) => {
    setOpen(next);
    lockScroll(next);
    if (next) gsap.to(ref.current, { yPercent: 0, duration: 0.4 });
    if (next) menuTl.current?.timeScale(1).play();
    else menuTl.current?.timeScale(1.6).reverse();
  };

  const go = (id: string) => {
    if (open) toggle(false);
    site.scrollTo(id);
  };

  return (
    <>
    <header ref={ref} className="fixed inset-x-0 top-0 z-[300] px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        data-bar
        className="mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full border border-transparent px-2 pl-5 transition-[background,border-color,box-shadow,backdrop-filter] duration-500 [&.is-solid]:border-white/70 [&.is-solid]:bg-white/65 [&.is-solid]:shadow-[0_20px_50px_-30px_rgba(60,30,30,0.35)] [&.is-solid]:backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => go("top")}
          className="relative z-10 font-serif text-[22px] leading-none tracking-tight"
          aria-label={`${BRAND.name} – nach oben`}
        >
          Salon <em className="text-rose">Liora</em>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => go(l.id)}
              className="rounded-full px-4 py-2 text-[13px] text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={site.openBooking}
            className="hidden h-10 items-center rounded-full bg-ink px-5 text-[13px] font-medium text-paper transition-colors hover:bg-rose sm:inline-flex"
          >
            Termin buchen
          </button>
          <button
            type="button"
            onClick={() => toggle(!open)}
            aria-expanded={open}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="grid size-10 place-items-center rounded-full bg-ink/5 lg:hidden"
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "top-full"}`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[290] hidden flex-col justify-between bg-cream px-6 pb-10 pt-28 lg:hidden"
      >
        <nav className="flex flex-col" aria-label="Mobile Navigation">
          {LINKS.map((l, i) => (
            <span key={l.id} className="overflow-hidden">
              <button
                data-mi
                type="button"
                onClick={() => go(l.id)}
                className="flex w-full items-baseline gap-4 border-b border-line py-4 text-left font-serif text-5xl"
              >
                <span className="font-sans text-xs text-rose">0{i + 1}</span>
                {l.label}
              </button>
            </span>
          ))}
        </nav>
        <span className="overflow-hidden">
          <button
            data-mi
            type="button"
            onClick={() => {
              toggle(false);
              site.openBooking();
            }}
            className="h-14 w-full rounded-full bg-ink text-sm font-medium text-paper"
          >
            Termin buchen
          </button>
        </span>
      </div>
    </>
  );
}
