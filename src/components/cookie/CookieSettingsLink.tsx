"use client";

import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieSettingsLink({ className = "" }: { className?: string }) {
  const { openSettings } = useCookieConsent();

  return (
    <button type="button" onClick={openSettings} className={`transition-colors ${className}`}>
      Cookie-Einstellungen
    </button>
  );
}
