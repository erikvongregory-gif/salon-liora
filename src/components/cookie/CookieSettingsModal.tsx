"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { COOKIE_CATEGORIES } from "@/lib/cookie-consent";
import { lockScroll } from "@/lib/motion";

const btn = "h-11 rounded-full px-5 text-[13px] font-medium transition-colors";

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
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [settingsOpen, closeSettings]);

  if (!settingsOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-settings-title"
      aria-modal="true"
      data-lenis-prevent
      className="fixed inset-0 z-[700] grid place-items-center p-4"
    >
      <div onClick={closeSettings} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
      <div className="relative flex max-h-[min(90vh,700px)] w-full max-w-[540px] flex-col overflow-hidden rounded-[32px] bg-paper shadow-2xl">
        <div className="flex items-center justify-between px-7 pb-4 pt-7">
          <div>
            <p className="eyebrow text-rose">Datenschutz</p>
            <h2 id="cookie-settings-title" className="mt-1 font-serif text-3xl leading-none">
              Cookie-Einstellungen
            </h2>
          </div>
          <button
            type="button"
            onClick={closeSettings}
            aria-label="Schließen"
            className="grid size-10 place-items-center rounded-full bg-ink/5 transition-[transform,background] duration-500 hover:rotate-90 hover:bg-ink hover:text-paper"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
              <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 pb-6">
          <p className="mb-5 text-sm leading-relaxed text-muted">
            Wählen Sie, welche Cookies wir verwenden dürfen. Notwendige Cookies können nicht deaktiviert werden.
            Weitere Informationen in der{" "}
            <Link href="/datenschutz" className="text-rose underline underline-offset-4">
              Datenschutzerklärung
            </Link>
            .
          </p>

          <div className="grid gap-3">
            {COOKIE_CATEGORIES.map((cat) => {
              const checked = cat.id === "essential" ? true : cat.id === "statistics" ? statistics : marketing;
              const disabled = cat.required;

              return (
                <div key={cat.id} className="rounded-[20px] bg-cream p-5">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <h3 className="font-serif text-xl leading-none">
                      {cat.title}
                      {cat.required && (
                        <span className="eyebrow ml-3 align-middle !text-[10px] text-rose">Immer aktiv</span>
                      )}
                    </h3>
                    <label
                      className={`relative inline-block h-6 w-11 shrink-0 ${disabled ? "cursor-default opacity-50" : "cursor-pointer"}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        aria-label={cat.title}
                        onChange={(e) => {
                          if (cat.id === "statistics") setStatistics(e.target.checked);
                          if (cat.id === "marketing") setMarketing(e.target.checked);
                        }}
                        className="peer absolute size-0 opacity-0"
                      />
                      <span
                        className={`absolute inset-0 rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose ${checked ? "bg-rose" : "bg-sand"}`}
                      />
                      <span
                        className={`absolute top-[3px] size-[18px] rounded-full bg-paper transition-[left] duration-300 ${checked ? "left-[23px]" : "left-[3px]"}`}
                      />
                    </label>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted">{cat.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-line px-7 py-5">
          <button type="button" onClick={rejectAll} className={`${btn} border border-line hover:border-ink/40`}>
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={() => savePreferences(statistics, marketing)}
            className={`${btn} flex-1 bg-ink text-paper hover:bg-ink-soft`}
          >
            Auswahl speichern
          </button>
          <button type="button" onClick={acceptAll} className={`${btn} bg-rose text-paper hover:bg-rose-deep`}>
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
