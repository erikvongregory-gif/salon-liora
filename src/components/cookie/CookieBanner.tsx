"use client";

import Link from "next/link";
import { useRef } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { gsap, useGSAP } from "@/lib/motion";

const btn = "h-11 rounded-full px-5 text-[13px] font-medium transition-colors";

export default function CookieBanner() {
  const { bannerVisible, acceptAll, rejectAll, openSettings } = useCookieConsent();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!bannerVisible) return;
      gsap.from(ref.current, { y: 60, autoAlpha: 0, duration: 1.2, delay: 2.2, ease: "expo.out" });
    },
    { dependencies: [bannerVisible] },
  );

  if (!bannerVisible) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      aria-modal="false"
      className="fixed inset-x-3 bottom-3 z-[400] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[420px]"
    >
      <div className="glass rounded-[28px] p-6">
        <p className="eyebrow mb-2 text-rose">Cookie-Einstellungen</p>
        <h2 id="cookie-banner-title" className="font-serif text-3xl leading-none">
          Ihre Privatsphäre ist uns wichtig
        </h2>
        <p id="cookie-banner-desc" className="mt-3 text-[13px] leading-relaxed text-muted">
          Wir verwenden Cookies und ähnliche Technologien. Notwendige Cookies sind für den Betrieb der Website
          erforderlich. Statistik- und Marketing-Cookies setzen wir nur mit Ihrer Einwilligung ein. Details finden
          Sie in unserer{" "}
          <Link href="/datenschutz" className="text-rose underline underline-offset-4">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={rejectAll} className={`${btn} border border-line hover:border-ink/40`}>
            Nur notwendige
          </button>
          <button type="button" onClick={openSettings} className={`${btn} border border-line hover:border-ink/40`}>
            Einstellungen
          </button>
          <button type="button" onClick={acceptAll} className={`${btn} flex-1 bg-ink text-paper hover:bg-rose`}>
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
