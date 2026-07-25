"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { COOKIE_CATEGORIES } from "@/lib/cookie-consent";

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

export default function CookieSettingsModal() {
  const { settingsOpen, consent, closeSettings, savePreferences, acceptAll, rejectAll } =
    useCookieConsent();
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (settingsOpen) {
      setStatistics(consent?.statistics ?? false);
      setMarketing(consent?.marketing ?? false);
    }
  }, [settingsOpen, consent]);

  useEffect(() => {
    if (!settingsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSettings();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [settingsOpen, closeSettings]);

  if (!settingsOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-settings-title"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={closeSettings}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(18,12,8,0.68)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(520px, calc(100vw - 32px))",
          maxHeight: "min(90vh, 680px)",
          background: "#F9F4EE",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          animation: "fadeUp 0.35s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "22px 28px",
            borderBottom: "1px solid #E5DDD4",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C4674A",
                marginBottom: "3px",
              }}
            >
              Datenschutz
            </p>
            <h2
              id="cookie-settings-title"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "22px",
                fontWeight: 400,
                color: "#1A1410",
                margin: 0,
              }}
            >
              Cookie-Einstellungen
            </h2>
          </div>
          <button
            type="button"
            onClick={closeSettings}
            aria-label="Schließen"
            className="salon-icon-btn"
            style={{
              background: "transparent",
              border: "none",
              color: "#7A6A60",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
              padding: "4px",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 300,
              color: "#7A6A60",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            Wählen Sie, welche Cookies wir verwenden dürfen. Notwendige Cookies können nicht
            deaktiviert werden. Weitere Informationen in der{" "}
            <Link href="/datenschutz" style={{ color: "#C4674A" }}>
              Datenschutzerklärung
            </Link>
            .
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {COOKIE_CATEGORIES.map((cat) => {
              const checked =
                cat.id === "essential"
                  ? true
                  : cat.id === "statistics"
                    ? statistics
                    : marketing;
              const disabled = cat.required;

              return (
                <div
                  key={cat.id}
                  style={{
                    padding: "18px 20px",
                    border: "1px solid #E5DDD4",
                    background: "#FEFCFA",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                        fontSize: "18px",
                        fontWeight: 400,
                        color: "#1A1410",
                        margin: 0,
                      }}
                    >
                      {cat.title}
                      {cat.required && (
                        <span
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#C4674A",
                            marginLeft: "10px",
                            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                          }}
                        >
                          Immer aktiv
                        </span>
                      )}
                    </h3>
                    <label
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "44px",
                        height: "24px",
                        flexShrink: 0,
                        cursor: disabled ? "default" : "pointer",
                        opacity: disabled ? 0.5 : 1,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={(e) => {
                          if (cat.id === "statistics") setStatistics(e.target.checked);
                          if (cat.id === "marketing") setMarketing(e.target.checked);
                        }}
                        style={{
                          opacity: 0,
                          width: 0,
                          height: 0,
                          position: "absolute",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: checked ? "#C4674A" : "#E5DDD4",
                          borderRadius: "24px",
                          transition: "background 0.2s",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "3px",
                          left: checked ? "23px" : "3px",
                          width: "18px",
                          height: "18px",
                          background: "#F9F4EE",
                          borderRadius: "50%",
                          transition: "left 0.2s",
                        }}
                      />
                    </label>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "#7A6A60",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            padding: "20px 28px",
            borderTop: "1px solid #E5DDD4",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
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
            onClick={() => savePreferences(statistics, marketing)}
            style={{
              ...btnBase,
              background: "#1A1410",
              color: "#F9F4EE",
              flex: 1,
            }}
          >
            Auswahl speichern
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="salon-btn-accent"
            style={{
              ...btnBase,
              background: "#C4674A",
              color: "#F9F4EE",
            }}
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
