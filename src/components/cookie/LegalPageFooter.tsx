"use client";

import Link from "next/link";
import CookieSettingsLink from "./CookieSettingsLink";

export default function LegalPageFooter() {
  return (
    <div className="mt-14 flex flex-wrap gap-5 border-t border-line pt-6 text-sm">
      <Link href="/" className="text-rose hover:underline">
        Zur Startseite
      </Link>
      <Link href="/datenschutz" className="text-muted hover:text-ink">
        Datenschutz
      </Link>
      <Link href="/impressum" className="text-muted hover:text-ink">
        Impressum
      </Link>
      <CookieSettingsLink className="text-muted hover:text-ink" />
    </div>
  );
}
