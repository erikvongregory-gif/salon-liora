"use client";

import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsentContext";

const btnBase: React.CSSProperties = {
  padding: "13px 24px",
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "all 0.2s",
  border: "none",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
};

export default function CookieBanner() {
  const { bannerVisible, acceptAll, rejectAll, openSettings } = useCookieConsent();

  if (!bannerVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      aria-modal="false"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 400,
        padding: "16px",
        animation: "fadeUp 0.4s ease both",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          background: "#F9F4EE",
          border: "1px solid #E5DDD4",
          boxShadow: "0 -8px 40px rgba(26,20,16,0.12)",
          padding: "28px 32px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C4674A",
            marginBottom: "10px",
            fontWeight: 400,
          }}
        >
          Cookie-Einstellungen
        </p>
        <h2
          id="cookie-banner-title"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: "28px",
            fontWeight: 300,
            color: "#1A1410",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          Ihre Privatsphäre ist uns wichtig
        </h2>
        <p
          id="cookie-banner-desc"
          style={{
            fontSize: "14px",
            fontWeight: 300,
            color: "#7A6A60",
            lineHeight: 1.75,
            marginBottom: "24px",
            maxWidth: "720px",
          }}
        >
          Wir verwenden Cookies und ähnliche Technologien. Notwendige Cookies sind für den
          Betrieb der Website erforderlich. Statistik- und Marketing-Cookies setzen wir nur
          mit Ihrer Einwilligung ein. Details finden Sie in unserer{" "}
          <Link
            href="/datenschutz"
            style={{ color: "#C4674A", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={rejectAll}
            className="salon-cookie-btn-outline"
            style={{
              ...btnBase,
              background: "transparent",
              color: "#1A1410",
              border: "1px solid #E5DDD4",
            }}
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="salon-cookie-btn-outline"
            style={{
              ...btnBase,
              background: "transparent",
              color: "#1A1410",
              border: "1px solid #E5DDD4",
            }}
          >
            Einstellungen
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="salon-btn-accent"
            style={{
              ...btnBase,
              background: "#C4674A",
              color: "#F9F4EE",
              marginLeft: "auto",
            }}
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
