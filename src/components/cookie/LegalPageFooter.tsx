"use client";

import Link from "next/link";
import CookieSettingsLink from "./CookieSettingsLink";

export default function LegalPageFooter() {
  return (
    <div
      style={{
        marginTop: "48px",
        paddingTop: "24px",
        borderTop: "1px solid #E5DDD4",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        fontSize: "13px",
      }}
    >
      <Link href="/" style={{ color: "#C4674A", textDecoration: "none" }}>
        Zur Startseite
      </Link>
      <Link href="/datenschutz" style={{ color: "#7A6A60", textDecoration: "none" }}>
        Datenschutz
      </Link>
      <Link href="/impressum" style={{ color: "#7A6A60", textDecoration: "none" }}>
        Impressum
      </Link>
      <CookieSettingsLink />
    </div>
  );
}
