"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type CookieConsent,
  getAcceptAllConsent,
  getDefaultConsent,
  hasConsentChoice,
  readStoredConsent,
  storeConsent,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: CookieConsent | null;
  bannerVisible: boolean;
  settingsOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (statistics: boolean, marketing: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
  closeBanner: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setBannerVisible(!hasConsentChoice());
    setReady(true);
  }, []);

  const persist = useCallback((next: CookieConsent) => {
    storeConsent(next);
    setConsent(next);
    setBannerVisible(false);
    setSettingsOpen(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: next }));
  }, []);

  const acceptAll = useCallback(() => persist(getAcceptAllConsent()), [persist]);

  const rejectAll = useCallback(() => persist(getDefaultConsent()), [persist]);

  const savePreferences = useCallback(
    (statistics: boolean, marketing: boolean) => {
      persist({
        essential: true,
        statistics,
        marketing,
        updatedAt: new Date().toISOString(),
      });
    },
    [persist],
  );

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
    setBannerVisible(false);
  }, []);

  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const closeBanner = useCallback(() => setBannerVisible(false), []);

  const value = useMemo(
    () => ({
      consent: ready ? consent : null,
      bannerVisible: ready && bannerVisible,
      settingsOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openSettings,
      closeSettings,
      closeBanner,
    }),
    [
      ready,
      consent,
      bannerVisible,
      settingsOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openSettings,
      closeSettings,
      closeBanner,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
