import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import CookieConsentManager from "@/components/cookie/CookieConsentManager";
import ConsentAwareAnalytics from "@/components/cookie/ConsentAwareAnalytics";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
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

export const metadata: Metadata = {
  title: "Salon Liora | Friseursalon Demo",
  description:
    "Fiktiver Friseursalon in dritter Generation – Demo-Referenzprojekt für Webdesign.",
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
