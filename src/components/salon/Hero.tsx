"use client";

import Image from "next/image";
import { useRef } from "react";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { BRAND, IMAGES } from "@/lib/salon-data";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/motion";
import { MagneticButton, Pill, Sparkle } from "./ui";

const CHIPS = [
  { label: "Schnitt & Styling", dark: false },
  { label: "Balayage & Farbe", dark: true },
  { label: "Glossing & Pflege", dark: false },
  { label: "Herren & Kinder", dark: true },
];

export default function Hero({ site }: { site: SalonSiteState }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let splits: SplitText[] = [];
        let cancelled = false;

        // Intro erst nach dem Laden der Schriften, damit SplitText richtig misst
        document.fonts.ready.then(() => {
          if (cancelled) return;
          const head = SplitText.create(q("[data-head]"), { type: "lines,words", mask: "lines" });
          const side = SplitText.create(q("[data-side]"), { type: "lines", mask: "lines" });
          splits = [head, side];

          gsap.set(q(".js-intro"), { visibility: "visible" });

          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.from(q("[data-letter]"), { yPercent: 105, duration: 1.6, stagger: 0.07 }, 0)
            .fromTo(
              q("[data-portrait]"),
              { clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)",
                duration: 1.8,
                ease: "expo.inOut",
              },
              0.15,
            )
            .from(q("[data-portrait] img"), { scale: 1.4, duration: 2.4, ease: "expo.out" }, 0.5)
            .from(head.lines, { yPercent: 110, rotate: 3, duration: 1.4, stagger: 0.1 }, 0.9)
            .from(q("[data-stroke]"), { drawSVG: "0%", duration: 1.4, ease: "power2.inOut" }, 1.5)
            .from(side.lines, { yPercent: 110, duration: 1.3, stagger: 0.08 }, 1.0)
            .from(q("[data-fade]"), { autoAlpha: 0, y: 24, duration: 1.2, stagger: 0.08 }, 1.25)
            .from(q("[data-card]"), { autoAlpha: 0, y: 60, scale: 0.94, duration: 1.4, stagger: 0.15 }, 1.4)
            .from(q("[data-chip]"), { autoAlpha: 0, x: -24, duration: 0.9, stagger: 0.07 }, 1.7)
            .from(
              q("[data-count]"),
              {
                textContent: 0,
                duration: 1.6,
                ease: "power2.out",
                snap: { textContent: 1 },
              },
              1.7,
            );
        });

        // Scroll-Parallax: Schriftzug, Porträt und Karten bewegen sich in eigenen Tiefen
        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-wordmark]"), { yPercent: 35, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-portrait-wrap]"), { yPercent: -8, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-portrait] img"), { scale: 1.12, ease: "none", scrollTrigger: st });
        if (window.matchMedia("(min-width: 1024px)").matches) {
          gsap.to(q("[data-depth='1']"), { yPercent: -40, ease: "none", scrollTrigger: st });
          gsap.to(q("[data-depth='2']"), { yPercent: -80, ease: "none", scrollTrigger: st });
        }

        // Maus-Parallax auf Karten (nur Desktop)
        const cards = q("[data-mouse]") as HTMLElement[];
        const movers = cards.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
          f: Number(el.dataset.mouse),
        }));
        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.f);
            m.y(ny * m.f);
          });
        };
        window.addEventListener("pointermove", onMove);

        return () => {
          cancelled = true;
          splits.forEach((s) => s.revert());
          window.removeEventListener("pointermove", onMove);
        };
      });

      ScrollTrigger.refresh();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(120%_80%_at_50%_0%,#fbf6f2_0%,#f3ebe5_55%,#eee2db_100%)] pb-16 pt-24 lg:min-h-[100svh] lg:pb-10"
    >
      {/* Meta-Zeile */}
      <div className="relative z-20 mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 sm:px-8">
        <Pill className="js-intro">
          <span data-fade className="inline-flex items-center gap-2">
            <svg viewBox="0 0 16 16" className="size-3.5 text-rose" fill="none" aria-hidden>
              <path
                d="M8 14s5-4.2 5-8A5 5 0 0 0 3 6c0 3.8 5 8 5 8Z"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <circle cx="8" cy="6" r="1.6" fill="currentColor" />
            </svg>
            Lindenau · Seetal
          </span>
        </Pill>
        <div className="js-intro hidden items-center gap-6 text-[11px] uppercase tracking-[0.14em] text-ink/60 md:flex">
          <span data-fade className="flex items-center gap-3">
            <Pill>Seit</Pill> {BRAND.since}
          </span>
          <span data-fade className="flex items-center gap-3">
            <Pill>Leistungen</Pill>
            <span className="leading-tight">
              Schnitt · Farbe
              <br />
              Pflege · Styling
            </span>
          </span>
          <span data-fade className="flex items-center gap-3">
            <Pill>Familie</Pill> 3. Generation
          </span>
        </div>
      </div>

      {/* Riesiger Verlaufs-Schriftzug */}
      <div
        data-wordmark
        aria-hidden
        className="pointer-events-none relative z-0 mt-6 select-none px-3 sm:mt-4 lg:absolute lg:inset-x-0 lg:top-[8.5rem] lg:mt-0"
      >
        <div
          className="flex justify-center font-sans text-[29vw] font-light leading-[0.78] tracking-[-0.07em] lg:text-[31vw]"
          style={{ maskImage: "linear-gradient(to bottom, #000 45%, transparent 98%)" }}
        >
          {"LIORA".split("").map((ch, i) => (
            <span key={i} className="-mx-[0.15em] block overflow-hidden pb-[0.04em]">
              <span data-letter className="js-intro wordmark block px-[0.15em]">
                {ch}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:mt-[17vw] lg:grid-cols-[1fr_minmax(300px,26vw)_1fr] lg:items-start lg:gap-8">
        {/* Links: Headline */}
        <div className="order-2 lg:order-1 lg:pt-[6vw]">
          <h1
            data-head
            className="js-intro font-serif text-[clamp(3rem,6.2vw,6.4rem)] leading-[0.92] tracking-[-0.02em]"
          >
            Schönheit
            <br />
            ist{" "}
            <span className="relative inline-block">
              <em>Handwerk.</em>
              <svg
                viewBox="0 0 300 30"
                className="absolute -bottom-[0.12em] left-[-4%] h-[0.32em] w-[112%] text-rose"
                fill="none"
                aria-hidden
              >
                <path
                  data-stroke
                  d="M4 20C60 8 140 4 296 12M30 26c70-10 160-12 236-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p data-fade className="js-intro mt-8 max-w-[22rem] text-[15px] leading-relaxed text-muted">
            Ihr Friseursalon in dritter Generation. Persönlich, professionell und mit Herz – in Lindenau &amp;
            Seetal.
          </p>
          <div data-fade className="js-intro mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton onClick={site.openBooking}>Termin buchen</MagneticButton>
            <MagneticButton variant="outline" onClick={() => site.scrollTo("story")}>
              Unsere Geschichte
            </MagneticButton>
          </div>

          <dl data-fade className="js-intro mt-12 hidden gap-10 lg:flex" data-depth="1">
            <div>
              <dt className="text-xs text-muted">gegründet</dt>
              <dd className="font-serif text-3xl text-rose">
                <span data-count>{BRAND.since}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Standorte</dt>
              <dd className="font-serif text-3xl text-rose">02</dd>
            </div>
          </dl>
        </div>

        {/* Mitte: Porträt */}
        <div data-portrait-wrap className="relative order-1 mx-auto w-full max-w-[420px] lg:order-2 lg:max-w-none">
          <div
            data-portrait
            className="js-intro relative aspect-[3/4.1] overflow-hidden rounded-b-[32px] rounded-t-[999px] bg-sand"
          >
            <Image
              src={IMAGES.portrait}
              alt="Platinblonder, glatter Long Bob – Arbeit aus dem Salon"
              fill
              preload
              sizes="(min-width: 1024px) 26vw, 90vw"
              className="object-cover object-[50%_20%]"
            />
          </div>

          {/* Glas-Karte: Leistungen */}
          <div
            data-card
            data-depth="1"
            className="js-intro relative z-10 mx-auto -mt-24 w-[86%] max-w-[300px] lg:absolute lg:-bottom-[14%] lg:left-[calc(50%-145px)] lg:mt-0 lg:w-[290px]"
          >
            <div data-mouse="-18" className="glass rounded-[26px] p-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 text-[11px] text-ink/70">
                <Sparkle className="size-2.5 text-rose" /> Was wir lieben
              </span>
              <p className="mt-4 font-serif text-2xl leading-none">Unsere Leistungen</p>
              <ul className="mt-4 flex flex-col items-start gap-2">
                {CHIPS.map((c) => (
                  <li
                    key={c.label}
                    data-chip
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] ${
                      c.dark ? "bg-ink text-paper" : "bg-blush/80 text-ink"
                    }`}
                  >
                    <Sparkle className="size-2 opacity-70" />
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Rechts: Untertitel + Preis-Karte */}
        <div className="order-3 flex flex-col items-start gap-10 lg:items-end lg:pt-[3vw] lg:text-right">
          <p
            data-side
            className="js-intro hidden font-serif text-[clamp(2.4rem,4.4vw,4.6rem)] leading-[0.92] tracking-[-0.02em] lg:block"
          >
            Friseursalon
            <br />
            in dritter
            <br />
            <em className="text-rose">Generation</em>
          </p>

          <div data-card data-depth="2" className="js-intro w-full max-w-[260px] lg:mt-[4vw]">
            <div data-mouse="24" className="glass rounded-[26px] p-6 text-left">
              <Sparkle className="size-4 text-rose" />
              <p className="mt-3 text-[15px] font-medium">Preise ab</p>
              <p className="mt-1 text-xs leading-snug text-muted">
                Bubenschnitt, Herrenschnitt &amp; Co. – transparent und ohne Überraschungen.
              </p>
              <p className="mt-6 font-sans text-[64px] font-light leading-none tracking-[-0.04em]">
                <span data-count>25</span>
                <span className="ml-1 text-3xl text-rose">€</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <button
        type="button"
        onClick={() => site.scrollTo("story")}
        data-fade
        className="js-intro absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-ink/50 lg:flex"
      >
        <span className="relative h-8 w-px overflow-hidden bg-ink/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-rose" />
        </span>
        Scrollen
      </button>
    </section>
  );
}
