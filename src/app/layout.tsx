import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import CookieConsentManager from "@/components/cookie/CookieConsentManager";
import ConsentAwareAnalytics from "@/components/cookie/ConsentAwareAnalytics";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { BRAND } from "@/lib/salon-data";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://salon-liora.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} | Friseursalon Demo`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Fiktiver Friseursalon in dritter Generation – Demo-Referenzprojekt für Webdesign.",
  applicationName: BRAND.name,
  keywords: ["Friseursalon", "Demo", "Webdesign", "Referenz", BRAND.name],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: BRAND.name,
    title: `${BRAND.name} | Friseursalon Demo`,
    description:
      "Fiktiver Friseursalon in dritter Generation – Demo-Referenzprojekt für Webdesign.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Friseursalon Demo`,
    description:
      "Fiktiver Friseursalon in dritter Generation – Demo-Referenzprojekt für Webdesign.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${instrument.variable} ${interTight.variable} h-full`}>
      <body className="min-h-full">
        <noscript>
          <style>{`.js-intro{visibility:visible!important}`}</style>
        </noscript>
        <CookieConsentProvider>
          {children}
          <CookieConsentManager />
          <ConsentAwareAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
