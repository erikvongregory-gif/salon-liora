"use client";

import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieSettingsLink() {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className="salon-link-footer"
      style={{
        fontSize: "11px",
        fontWeight: 300,
        color: "#7A6A60",
        background: "none",
        border: "none",
        cursor: "pointer",
        transition: "color 0.2s",
        padding: 0,
        fontFamily: "inherit",
        textDecoration: "none",
      }}
    >
      Cookie-Einstellungen
    </button>
  );
}
