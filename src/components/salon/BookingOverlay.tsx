"use client";

import Image from "next/image";
import { useRef } from "react";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { IMAGES, LOCATIONS } from "@/lib/salon-data";
import { gsap, useGSAP } from "@/lib/motion";
import { ArrowIcon, MagneticButton, Sparkle } from "./ui";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export default function BookingOverlay({ site }: { site: SalonSiteState }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const b = site.booking;

  // Öffnen / Schließen als umkehrbare Timeline
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(ref.current, { visibility: "visible" })
        .fromTo("[data-backdrop]", { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0 : 0.6 }, 0)
        .fromTo("[data-panel]", { xPercent: 105 }, { xPercent: 0, duration: reduce ? 0 : 1 }, 0)
        .fromTo("[data-panel-inner]", { x: 80 }, { x: 0, duration: reduce ? 0 : 1.1, ease: "expo.out" }, 0.25);
    },
    { scope: ref },
  );

  useGSAP(() => {
    if (!tl.current) return;
    if (site.bookingOpen) tl.current.timeScale(1).play();
    else tl.current.timeScale(1.4).reverse();
  }, [site.bookingOpen]);

  // Schrittwechsel: Inhalt gleitet gestaffelt herein, Fortschritt füllt sich
  useGSAP(
    () => {
      gsap.to("[data-progress]", { scaleX: site.progress, duration: 0.9, ease: "expo.out" });
      if (!site.bookingOpen) return;
      gsap.fromTo(
        "[data-step] > *",
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.05, ease: "expo.out", clearProps: "transform" },
      );
      ref.current?.querySelector("[data-scroll]")?.scrollTo({ top: 0 });
    },
    { scope: ref, dependencies: [site.bookingStep, site.bookingOpen] },
  );

  return (
    <div
      ref={ref}
      className="invisible fixed inset-0 z-[600]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      aria-hidden={!site.bookingOpen}
    >
      <div data-backdrop onClick={site.closeBooking} className="absolute inset-0 bg-ink/45 backdrop-blur-sm" />

      <div
        data-panel
        className="absolute inset-y-0 right-0 flex w-full max-w-[640px] flex-col overflow-hidden bg-paper sm:inset-y-3 sm:right-3 sm:rounded-[32px]"
      >
        <div data-panel-inner className="flex min-h-0 flex-1 flex-col">
          {/* Kopf */}
          <div className="flex items-center justify-between gap-4 px-6 pb-5 pt-6 sm:px-9 sm:pt-8">
            <div className="flex items-center gap-3">
              {site.showBack && (
                <button
                  type="button"
                  onClick={site.backStep}
                  aria-label="Zurück"
                  className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-paper"
                >
                  <ArrowIcon className="size-3.5 -rotate-[135deg]" />
                </button>
              )}
              <div>
                <p className="eyebrow text-rose">
                  {site.bookingStep < 6 ? `Schritt ${site.bookingStep} von 5` : "Fertig"}
                </p>
                <h2 id="booking-title" className="mt-1 font-serif text-3xl leading-none sm:text-4xl">
                  {site.bookingStepTitle}
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={site.closeBooking}
              aria-label="Schließen"
              className="grid size-10 place-items-center rounded-full bg-ink/5 transition-[transform,background] duration-500 hover:rotate-90 hover:bg-ink hover:text-paper"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mx-6 h-[3px] overflow-hidden rounded-full bg-sand sm:mx-9">
            <div data-progress className="h-full origin-left scale-x-0 rounded-full bg-rose" />
          </div>

          {/* Gewählte Optionen als Chips */}
          {site.bookingStep < 6 && (b.location || b.service || b.stylist) && (
            <div className="flex flex-wrap gap-2 px-6 pt-5 sm:px-9">
              {[site.bookingLocationStr, b.service?.name, b.stylist].filter(Boolean).map((t) => (
                <span key={t} className="rounded-full bg-blush/70 px-3 py-1 text-xs text-ink/80">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div data-scroll data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-6 sm:px-9">
            <div data-step key={site.bookingStep}>
              {site.bookingStep === 1 &&
                [LOCATIONS.lindenau, LOCATIONS.seetal].map((l, i) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => site.selectLocation(l.id)}
                    className={`group relative mb-3 flex h-44 w-full items-end overflow-hidden rounded-[24px] p-5 text-left text-paper ${
                      b.location === l.id ? "ring-2 ring-rose ring-offset-2 ring-offset-paper" : ""
                    }`}
                  >
                    <Image
                      src={i === 0 ? IMAGES.hero : IMAGES.about[2]}
                      alt=""
                      fill
                      sizes="600px"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
                    <span className="relative flex w-full items-end justify-between">
                      <span>
                        <span className="block font-serif text-4xl leading-none">{l.name}</span>
                        <span className="mt-1 block text-xs text-white/75">{l.shortAddress}</span>
                      </span>
                      <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                        <ArrowIcon className="size-3.5" />
                      </span>
                    </span>
                  </button>
                ))}

              {site.bookingStep === 2 &&
                site.services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => site.selectService(s.id)}
                    className={`mb-2 flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
                      b.service?.id === s.id
                        ? "border-rose bg-blush/40"
                        : "border-line hover:border-ink/30 hover:bg-cream"
                    }`}
                  >
                    <span>
                      <span className="block text-[15px]">{s.name}</span>
                      <span className="mt-0.5 block text-xs text-muted">{s.duration}</span>
                    </span>
                    <span className="font-serif text-2xl text-rose">{s.price}</span>
                  </button>
                ))}

              {site.bookingStep === 3 &&
                site.stylists.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => site.selectStylist(m.name)}
                    className={`group mb-3 flex w-full items-center gap-5 rounded-[24px] border p-3 pr-5 text-left transition-colors ${
                      b.stylist === m.name ? "border-rose bg-blush/40" : "border-line hover:bg-cream"
                    }`}
                  >
                    <span className="relative h-32 w-28 shrink-0 overflow-hidden rounded-[18px]">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="112px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      />
                    </span>
                    <span className="flex-1">
                      <span className="block font-serif text-3xl leading-none">{m.name}</span>
                      <span className="eyebrow mt-2 block text-rose">{m.specialty}</span>
                      <span className="mt-2 block text-sm leading-snug text-muted">{m.bookingBio}</span>
                    </span>
                  </button>
                ))}

              {site.bookingStep === 4 && (
                <>
                  <div className="rounded-[24px] border border-line p-4 sm:p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={site.prevMonth}
                        disabled={!site.canGoPrev}
                        aria-label="Vorheriger Monat"
                        className="grid size-9 place-items-center rounded-full border border-line disabled:opacity-30"
                      >
                        <ArrowIcon className="size-3 -rotate-[135deg]" />
                      </button>
                      <p className="font-serif text-2xl capitalize">{site.monthName}</p>
                      <button
                        type="button"
                        onClick={site.nextMonth}
                        aria-label="Nächster Monat"
                        className="grid size-9 place-items-center rounded-full border border-line"
                      >
                        <ArrowIcon className="size-3 rotate-45" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {WEEKDAYS.map((d) => (
                        <span key={d} className="pb-2 text-[11px] uppercase tracking-wider text-muted">
                          {d}
                        </span>
                      ))}
                      {site.calDays.map((d) => (
                        <button
                          key={d.key}
                          type="button"
                          onClick={d.onClick ?? undefined}
                          disabled={!d.onClick}
                          className={`mx-auto grid aspect-square w-full max-w-11 place-items-center rounded-full text-sm transition-colors ${
                            d.selected
                              ? "bg-ink text-paper"
                              : d.disabled
                                ? "text-ink/20"
                                : d.isToday
                                  ? "text-rose ring-1 ring-rose/50 hover:bg-cream"
                                  : "hover:bg-cream"
                          } ${d.dayNum ? "" : "invisible"}`}
                        >
                          {d.dayNum}
                        </button>
                      ))}
                    </div>
                  </div>

                  {b.date && (
                    <div className="mt-6">
                      <p className="eyebrow mb-3 text-muted">Uhrzeit wählen</p>
                      <div className="grid grid-cols-3 gap-2">
                        {site.times.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => site.selectTime(t)}
                            className={`rounded-full border py-3 text-sm transition-colors ${
                              b.time === t ? "border-rose bg-rose text-paper" : "border-line hover:border-ink/40"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <MagneticButton onClick={site.goToStep5} disabled={!site.canStep4} className="w-full justify-between">
                      Weiter
                    </MagneticButton>
                  </div>
                </>
              )}

              {site.bookingStep === 5 && (
                <>
                  <Summary site={site} />
                  <div className="mt-6 grid gap-4">
                    {[
                      { label: "Name *", type: "text", value: b.name, on: site.setName, ph: "Ihr vollständiger Name", ac: "name" },
                      { label: "E-Mail *", type: "email", value: b.email, on: site.setEmail, ph: "ihre@email.de", ac: "email" },
                      { label: "Telefon", type: "tel", value: b.phone, on: site.setPhone, ph: "+49 ...", ac: "tel" },
                    ].map((f) => (
                      <label key={f.label} className="block">
                        <span className="eyebrow mb-2 block text-muted">{f.label}</span>
                        <input
                          type={f.type}
                          value={f.value}
                          onChange={f.on}
                          placeholder={f.ph}
                          autoComplete={f.ac}
                          className="h-13 w-full rounded-2xl border border-line bg-white/60 px-4 text-[15px] outline-none transition-colors placeholder:text-ink/30 focus:border-rose"
                        />
                      </label>
                    ))}
                  </div>
                  <div className="mt-8">
                    <MagneticButton
                      variant="rose"
                      onClick={site.goToStep6}
                      disabled={!site.canStep5 || site.submitting}
                      className="w-full justify-between"
                    >
                      {site.submitting ? "Wird gesendet …" : "Termin anfragen"}
                    </MagneticButton>
                  </div>
                </>
              )}

              {site.bookingStep === 6 && (
                <>
                  <div className="grid size-16 place-items-center rounded-full bg-rose text-paper">
                    <Sparkle className="size-6" />
                  </div>
                  <p className="eyebrow mt-8 text-rose">Demo abgeschlossen</p>
                  <p className="mt-2 font-serif text-5xl leading-[0.95]">
                    Danke fürs <em>Ausprobieren.</em>
                  </p>
                  <div className="mt-6 rounded-2xl bg-blush/50 p-5 text-sm leading-relaxed text-ink/80">
                    <span className="eyebrow mb-1 block text-rose">Hinweis</span>
                    Dies ist eine Entwurfs-/Demo-Website. Es wurde kein echter Termin gebucht und keine Daten
                    versendet.
                  </div>
                  <div className="mt-6">
                    <Summary site={site} />
                  </div>
                  <div className="mt-8">
                    <MagneticButton onClick={site.closeBooking} className="w-full justify-between">
                      Schließen
                    </MagneticButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ site }: { site: SalonSiteState }) {
  const b = site.booking;
  const rows = [
    ["Leistung", b.service ? `${b.service.name} · ${b.service.price}` : "–"],
    ["Datum", site.bookingDateStr || "–"],
    ["Uhrzeit", b.time ? `${b.time} Uhr` : "–"],
    ["Stylistin", b.stylist ?? "–"],
    ["Standort", site.bookingLocationStr || "–"],
  ];
  return (
    <div className="rounded-[24px] bg-cream p-5">
      <p className="eyebrow mb-3 text-muted">Ihre Buchung</p>
      <dl className="grid gap-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 border-b border-line pb-2 last:border-0 last:pb-0">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
