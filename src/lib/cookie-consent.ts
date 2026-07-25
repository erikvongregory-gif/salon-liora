export type CookieCategory = "essential" | "statistics" | "marketing";

export type CookieConsent = {
  essential: true;
  statistics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const CONSENT_STORAGE_KEY = "salon-liora-cookie-consent";
export const CONSENT_VERSION = 1;

export const COOKIE_CATEGORIES: {
  id: CookieCategory;
  title: string;
  description: string;
  required: boolean;
}[] = [
  {
    id: "essential",
    title: "Notwendig",
    description:
      "Erforderlich für Grundfunktionen wie die Speicherung Ihrer Cookie-Einstellungen und die Terminbuchung.",
    required: true,
  },
  {
    id: "statistics",
    title: "Statistik",
    description:
      "Hilft uns zu verstehen, wie Besucher die Website nutzen (z. B. Seitenaufrufe). Daten werden anonymisiert ausgewertet.",
    required: false,
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Ermöglicht personalisierte Inhalte und Werbung auf Drittplattformen wie Social Media.",
    required: false,
  },
];

export function getDefaultConsent(): CookieConsent {
  return {
    essential: true,
    statistics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
  };
}

export function getAcceptAllConsent(): CookieConsent {
  return {
    essential: true,
    statistics: true,
    marketing: true,
    updatedAt: new Date().toISOString(),
  };
}

export function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CookieConsent & { version?: number };
    if (parsed.version !== CONSENT_VERSION) return null;

    return {
      essential: true,
      statistics: !!parsed.statistics,
      marketing: !!parsed.marketing,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
}

export function storeConsent(consent: CookieConsent) {
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ ...consent, version: CONSENT_VERSION }),
  );
}

export function hasConsentChoice(): boolean {
  return readStoredConsent() !== null;
}
