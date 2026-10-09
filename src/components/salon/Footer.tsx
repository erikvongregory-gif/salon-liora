"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CookieSettingsLink from "@/components/cookie/CookieSettingsLink";
import { BRAND } from "@/lib/salon-data";
import { gsap, scrollToId, useGSAP } from "@/lib/motion";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-fletter]", {
          yPercent: 100,
          stagger: 0.06,
          ease: "expo.out",
          duration: 1.6,
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
        gsap.from("[data-flogo]", {
          autoAlpha: 0,
          y: 30,
          duration: 1.4,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink px-5 pt-20 text-paper sm:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div data-flogo>
          <Image src={BRAND.logo} alt={BRAND.name} width={180} height={105} className="h-auto w-[150px]" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/55">{BRAND.tagline} Seit {BRAND.since} in Familienhand.</p>
        </div>
        <nav className="grid content-start gap-3 text-sm text-paper/70" aria-label="Footer-Navigation">
          <p className="eyebrow mb-1 text-paper/40">Salon</p>
          {[
            ["story", "Geschichte"],
            ["services", "Leistungen"],
            ["gallery", "Galerie"],
            ["visit", "Kontakt"],
          ].map(([id, label]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)} className="w-fit transition-colors hover:text-paper">
              {label}
            </button>
          ))}
        </nav>
        <div className="grid content-start gap-3 text-sm text-paper/70">
          <p className="eyebrow mb-1 text-paper/40">Kontakt</p>
          <a href={BRAND.phoneHref} className="w-fit hover:text-paper">
            {BRAND.phone}
          </a>
          <a href={`mailto:${BRAND.email}`} className="w-fit hover:text-paper">
            {BRAND.email}
          </a>
          <span>{BRAND.instagram}</span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none mt-16 flex select-none justify-center font-sans text-[29vw] font-light leading-[0.74] tracking-[-0.06em]"
      >
        {"LIORA".split("").map((ch, i) => (
          <span key={i} className="-mx-[0.15em] block overflow-hidden">
            <span data-fletter className="wordmark block px-[0.15em]">
              {ch}
            </span>
          </span>
        ))}
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-paper/45">
        <span>© 2026 {BRAND.name}. Demo-Referenzprojekt.</span>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/datenschutz" className="hover:text-paper">
            Datenschutz
          </Link>
          <Link href="/impressum" className="hover:text-paper">
            Impressum
          </Link>
          <CookieSettingsLink className="hover:text-paper" />
          <span>
            Erstellt von{" "}
            <a href="https://evglab.com" target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              evglab.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
