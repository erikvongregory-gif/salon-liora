"use client";

import CookieBanner from "./CookieBanner";
import CookieSettingsModal from "./CookieSettingsModal";

export default function CookieConsentManager() {
  return (
    <>
      <CookieBanner />
      <CookieSettingsModal />
    </>
  );
}
