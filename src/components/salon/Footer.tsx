import Image from "next/image";
import Link from "next/link";
import CookieSettingsLink from "@/components/cookie/CookieSettingsLink";
import { BRAND } from "@/lib/salon-data";

export default function Footer() {
  return (
    <footer style={{ background: "#120E0A", padding: "48px 0", borderTop: "1px solid rgba(249,244,238,0.06)" }}>
      <div
        className="salon-section-pad salon-footer-flex"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={160}
            height={44}
            style={{ height: "44px", width: "auto", marginBottom: "14px", display: "block" }}
          />
          <p style={{ fontSize: "12px", fontWeight: "300", color: "rgba(249,244,238,0.3)" }}>
            © 2026 {BRAND.name}. Demo-Referenzprojekt.
          </p>
        </div>
        <div
          className="salon-footer-right"
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px" }}
        >
          <span
            style={{
              color: "rgba(249,244,238,0.4)",
              fontSize: "12px",
              fontWeight: "300",
              letterSpacing: "0.06em",
            }}
          >
            {BRAND.instagram}
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            <Link
              href="/datenschutz"
              className="salon-link-footer"
              style={{
                fontSize: "11px",
                fontWeight: "300",
                color: "rgba(249,244,238,0.22)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              Datenschutz
            </Link>
            <CookieSettingsLink />
            <Link
              href="/impressum"
              className="salon-link-footer"
              style={{
                fontSize: "11px",
                fontWeight: "300",
                color: "rgba(249,244,238,0.22)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
