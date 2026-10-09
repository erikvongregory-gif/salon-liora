"use client";

import Image from "next/image";
import { useRef } from "react";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { PRICE_GROUPS, SERVICE_CATEGORIES, serviceData } from "@/lib/salon-data";
import { gsap, useGSAP } from "@/lib/motion";
import { ArrowIcon, MagneticButton, RevealText, Sparkle } from "./ui";

export default function Services({ site }: { site: SalonSiteState }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Bühne öffnet sich beim Hineinscrollen
        const stage = q("[data-stage]")[0];
        gsap.fromTo(
          stage,
          { clipPath: "inset(8% 6% 8% 6% round 48px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            ease: "none",
            scrollTrigger: { trigger: stage, start: "top 90%", end: "top 15%", scrub: true },
          },
        );
        gsap.fromTo(
          q("[data-stage] img"),
          { scale: 1.25 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.from(q("[data-stage-card]"), {
          y: 80,
          autoAlpha: 0,
          duration: 1.4,
          scrollTrigger: { trigger: stage, start: "top 45%", once: true },
        });

        // Kategorie-Karten
        gsap.from(q("[data-cat]"), {
          y: 120,
          autoAlpha: 0,
          rotate: 2,
          duration: 1.4,
          stagger: 0.12,
          scrollTrigger: { trigger: q("[data-cats]")[0], start: "top 80%", once: true },
        });

        // Preisliste: Linien zeichnen sich, Zeilen gleiten nach
        q("[data-group]").forEach((g: HTMLElement) => {
          gsap.from(g.querySelectorAll("[data-rule]"), {
            scaleX: 0,
            duration: 1.4,
            stagger: 0.06,
            ease: "expo.inOut",
            scrollTrigger: { trigger: g, start: "top 80%", once: true },
          });
          gsap.from(g.querySelectorAll("[data-row-inner]"), {
            yPercent: 100,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.06,
            delay: 0.2,
            scrollTrigger: { trigger: g, start: "top 80%", once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="services" className="relative bg-paper px-3 pb-24 sm:px-5 lg:pb-36">
      {/* Bild-Bühne mit Glas-Karte */}
      <div
        data-stage
        className="relative mx-auto flex min-h-[92svh] max-w-[1600px] flex-col justify-end overflow-hidden rounded-[32px] bg-ink text-paper"
      >
        <Image
          src="/salon/service-color.webp"
          alt="Lange Brunette-Wellen mit karamellfarbener Balayage"
          fill
          sizes="100vw"
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />

        <div className="relative grid gap-8 p-5 sm:p-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-end lg:p-14">
          <div data-stage-card className="glass-dark rounded-[28px] p-6 sm:p-7">
            <span className="grid size-9 place-items-center rounded-full bg-white/15">
              <Sparkle className="size-3.5" />
            </span>
            <p className="mt-6 text-xl font-light leading-snug">Leistungen &amp; Preise</p>
            <p className="mt-3 border-l border-white/30 pl-4 text-[13px] leading-relaxed text-white/70">
              Vom klassischen Schnitt bis zur Balayage mit Glossing – jede Leistung beginnt mit einer ehrlichen
              Beratung.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <MagneticButton variant="light" onClick={() => site.scrollTo("prices")}>
                Preisliste
              </MagneticButton>
            </div>
          </div>
          <RevealText
            start="top 75%"
            className="text-[clamp(2.8rem,7vw,7.2rem)] font-light leading-[0.95] tracking-[-0.04em] lg:text-right"
          >
            Für jeden Anlass,
            <br />
            <span className="font-serif italic tracking-[-0.02em]">jeden Stil.</span>
          </RevealText>
        </div>

        <div className="relative mx-5 mb-5 flex items-center justify-between border-t border-white/25 pt-4 text-sm text-white/80 sm:mx-10 lg:mx-14 lg:mb-8">
          <span>Schnitt · Farbe · Pflege · Styling</span>
          <ArrowIcon className="size-4 rotate-90" />
        </div>
      </div>

      {/* Kategorien */}
      <div data-cats className="mx-auto mt-6 grid max-w-[1600px] gap-3 md:grid-cols-3 sm:mt-5">
        {SERVICE_CATEGORIES.map((c) => (
          <button
            key={c.no}
            type="button"
            data-cat
            data-cursor="Buchen"
            onClick={site.openBooking}
            className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[28px] bg-cream p-6 text-left sm:p-8"
          >
            <Image
              src={c.image}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="scale-110 object-cover opacity-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-100 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative flex items-start justify-between transition-colors duration-500 group-hover:text-paper">
              <span className="font-serif text-6xl leading-none text-rose transition-colors group-hover:text-blush">
                {c.no}
              </span>
              <span className="rounded-full border border-current/20 px-3 py-1.5 text-xs">{c.from}</span>
            </div>
            <div className="relative transition-colors duration-500 group-hover:text-paper">
              <h3 className="font-serif text-4xl leading-none">{c.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/75">
                {c.text}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Preisliste */}
      <div id="prices" className="mx-auto mt-24 max-w-[1400px] px-2 sm:px-3 lg:mt-36">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2 text-rose">
              <Sparkle className="size-3" /> Preisliste
            </p>
            <RevealText className="font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.02em]">
              Klar kalkuliert, <em className="text-rose">fair</em> beraten.
            </RevealText>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Tippen Sie auf eine Leistung, um direkt einen Termin dafür anzufragen.
            </p>
          </div>

          <div className="grid gap-14">
            {PRICE_GROUPS.map((g) => (
              <div key={g.title} data-group>
                <p className="eyebrow mb-2 text-muted">{g.title}</p>
                <ul>
                  {g.ids.map((id) => {
                    const s = serviceData.find((x) => x.id === id)!;
                    return (
                      <li key={id} className="relative overflow-hidden">
                        <span data-rule className="absolute inset-x-0 bottom-0 h-px origin-left bg-line" />
                        <button
                          type="button"
                          onClick={() => site.openBookingWithService(id)}
                          className="group relative block w-full text-left"
                        >
                          <span className="absolute inset-0 origin-bottom scale-y-0 rounded-xl bg-cream transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                          <span
                            data-row-inner
                            className="relative grid grid-cols-[1fr_auto] items-center gap-4 px-1 py-5 transition-[padding] duration-500 group-hover:px-4 sm:grid-cols-[1fr_auto_auto] sm:py-6"
                          >
                            <span className="text-base sm:text-lg">{s.name}</span>
                            <span className="hidden text-xs uppercase tracking-[0.14em] text-muted sm:block">
                              {s.duration}
                            </span>
                            <span className="flex items-center gap-3 font-serif text-2xl text-rose sm:min-w-28 sm:justify-end">
                              {s.price}
                              <ArrowIcon className="size-3.5 -translate-x-2 text-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
