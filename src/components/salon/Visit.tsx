"use client";

import Image from "next/image";
import { useRef } from "react";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { BRAND, IMAGES, LOCATIONS } from "@/lib/salon-data";
import { gsap, SplitText, useGSAP } from "@/lib/motion";
import { ArrowIcon, MagneticButton, Sparkle } from "./ui";

export default function Visit({ site }: { site: SalonSiteState }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const stage = q("[data-vstage]")[0];

        // Bild zoomt beim Durchscrollen leicht heraus
        gsap.fromTo(
          q("[data-vstage] img"),
          { scale: 1.2 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom bottom", scrub: true } },
        );

        // Headline: Buchstaben tauchen mit leichter Unschärfe auf
        const split = SplitText.create(q("[data-vhead]"), {
          type: "words,chars",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.chars, {
              yPercent: 60,
              autoAlpha: 0,
              filter: "blur(12px)",
              duration: 1.2,
              stagger: 0.025,
              ease: "power3.out",
              scrollTrigger: { trigger: stage, start: "top 55%", once: true },
            });
          },
        });

        gsap.from(q("[data-vcard]"), {
          x: -60,
          autoAlpha: 0,
          duration: 1.3,
          scrollTrigger: { trigger: stage, start: "top 45%", once: true },
        });

        gsap.from(q("[data-loc]"), {
          y: 80,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.3,
          scrollTrigger: { trigger: q("[data-locs]")[0], start: "top 85%", once: true },
        });

        return () => split.revert();
      });
    },
    { scope: ref },
  );

  const locations = [LOCATIONS.lindenau, LOCATIONS.seetal];

  return (
    <section ref={ref} id="visit" className="bg-paper px-3 pb-6 sm:px-5">
      <div
        data-vstage
        className="relative mx-auto flex min-h-[94svh] max-w-[1600px] flex-col justify-between overflow-hidden rounded-[32px] bg-ink p-5 text-paper sm:p-10 lg:p-14"
      >
        <Image src={IMAGES.hero} alt="Lichtdurchfluteter Salon mit Lederstühlen" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-black/5" />

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs">
            <Sparkle className="size-2.5 text-blush" /> Kontakt &amp; Standorte
          </span>
          <span className="text-xs uppercase tracking-[0.18em] text-white/70">Termine nach Vereinbarung</span>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-end">
          <div data-vcard className="glass-dark order-2 rounded-[28px] p-6 lg:order-1">
            <p className="text-lg font-light">Wo dürfen wir Sie begrüßen?</p>
            <div className="mt-5 grid gap-2">
              {locations.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => site.openBookingAt(l.id)}
                  className="group flex items-center justify-between rounded-2xl border border-white/20 px-4 py-3.5 text-left transition-colors hover:bg-white hover:text-ink"
                >
                  <span>
                    <span className="block text-[15px]">{l.name}</span>
                    <span className="block text-xs opacity-60">{l.shortAddress}</span>
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-ink group-hover:text-paper">
                    <ArrowIcon className="size-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
          <h2
            data-vhead
            className="order-1 text-[clamp(3rem,8.5vw,9rem)] font-light leading-[0.9] tracking-[-0.045em] lg:order-2 lg:text-right"
          >
            Nehmen Sie
            <br />
            <span className="font-serif italic tracking-[-0.02em]">Platz.</span>
          </h2>
        </div>
      </div>

      <div data-locs className="mx-auto mt-3 grid max-w-[1600px] gap-3 md:grid-cols-2 sm:mt-5 sm:gap-5">
        {locations.map((l, i) => (
          <article key={l.id} data-loc className="rounded-[28px] bg-cream p-6 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-rose">Standort 0{i + 1}</p>
                <h3 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">{l.name}</h3>
              </div>
              <MagneticButton variant="dark" onClick={() => site.openBookingAt(l.id)} className="shrink-0">
                Buchen
              </MagneticButton>
            </div>
            <dl className="mt-10 grid gap-x-8 gap-y-6 text-[15px] sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted">Adresse</dt>
                <dd className="mt-1">
                  {l.street}
                  <br />
                  {l.zipCity}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Telefon</dt>
                <dd className="mt-1">
                  <a href={BRAND.phoneHref} className="underline-offset-4 hover:text-rose hover:underline">
                    {BRAND.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">E-Mail</dt>
                <dd className="mt-1">
                  <a href={`mailto:${BRAND.email}`} className="underline-offset-4 hover:text-rose hover:underline">
                    {BRAND.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Termine</dt>
                <dd className="mt-1">Nach Vereinbarung</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
