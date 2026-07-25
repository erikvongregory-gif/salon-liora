"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

/**
 * Lädt optionale Tracking-Skripte nur nach Einwilligung.
 * Aktuell keine Skripte aktiv – bereit für z. B. Google Analytics.
 */
export default function ConsentAwareAnalytics() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!consent?.statistics) return;

    // Beispiel: Google Analytics erst nach Einwilligung laden
    // const script = document.createElement("script");
    // script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXX";
    // document.head.appendChild(script);
  }, [consent?.statistics]);

  useEffect(() => {
    if (!consent?.marketing) return;

    // Beispiel: Meta Pixel erst nach Einwilligung laden
  }, [consent?.marketing]);

  return null;
}
