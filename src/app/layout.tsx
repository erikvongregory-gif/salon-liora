import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import CookieConsentManager from "@/components/cookie/CookieConsentManager";
import ConsentAwareAnalytics from "@/components/cookie/ConsentAwareAnalytics";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { BRAND } from "@/lib/salon-data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full">
        <CookieConsentProvider>
          {children}
          <CookieConsentManager />
          <ConsentAwareAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
