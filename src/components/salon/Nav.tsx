import Image from "next/image";
import type { SalonSiteState } from "@/hooks/useSalonSite";
import { BRAND } from "@/lib/salon-data";

type Props = {
  site: SalonSiteState;
};

export default function Nav({ site }: Props) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.35s ease",
        background: site.navBg,
        backdropFilter: site.navBlur,
        WebkitBackdropFilter: site.navBlur,
        borderBottom: `1px solid ${site.navBorderColor}`,
      }}
    >
      <div
        className="salon-section-pad"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "76px",
        }}
      >
        <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={160}
            height={46}
            style={{
              height: "46px",
              width: "auto",
              transition: "filter 0.35s",
              filter: site.navScrolled ? "brightness(0)" : "none",
            }}
            priority
          />
        </a>
        <div className="salon-nav-links" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <a
            href="#about"
            onClick={site.scrollToAbout}
            className="salon-nav-link"
            style={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
              color: site.navTextColor,
            }}
          >
            Über uns
          </a>
          <a
            href="#services"
            onClick={site.scrollToServices}
            className="salon-nav-link"
            style={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
              color: site.navTextColor,
            }}
          >
            Leistungen
          </a>
          <a
            href="#gallery"
            onClick={site.scrollToGallery}
            className="salon-nav-link"
            style={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
              color: site.navTextColor,
            }}
          >
            Galerie
          </a>
          <a
            href="#contact"
            onClick={site.scrollToContact}
            className="salon-nav-link"
            style={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
              color: site.navTextColor,
            }}
          >
            Kontakt
          </a>
        </div>
        <button
          type="button"
          onClick={site.openBooking}
          className="salon-btn-accent"
          style={{
            background: "#C4674A",
            color: "#F9F4EE",
            border: "none",
            padding: "13px 28px",
            fontSize: "12px",
            fontWeight: "400",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          Termin buchen
        </button>
      </div>
    </nav>
  );
}
