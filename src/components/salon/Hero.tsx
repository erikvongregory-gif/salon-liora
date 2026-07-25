import { BRAND, IMAGES } from "@/lib/salon-data";
import type { SalonSiteState } from "@/hooks/useSalonSite";

type Props = {
  site: SalonSiteState;
};

export default function Hero({ site }: Props) {
  return (
    <section
      data-screen-label="Hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${IMAGES.hero}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(110deg, rgba(18,12,8,0.93) 0%, rgba(18,12,8,0.55) 55%, rgba(18,12,8,0.12) 100%)",
        }}
      />
      <div
        className="salon-hero-pad"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "100px 80px 80px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "580px", animation: "fadeUp 1s ease 0.2s both" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C4674A",
              marginBottom: "24px",
              fontWeight: "400",
            }}
          >
            Friseursalon · Seit {BRAND.since}
          </p>
          <h1
            className="salon-hero-title"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "82px",
              fontWeight: "300",
              color: "#F9F4EE",
              lineHeight: "1.04",
              marginBottom: "26px",
              textWrap: "pretty",
            }}
          >
            Schönheit
            <br />
            <em style={{ fontWeight: "300" }}>ist Handwerk.</em>
          </h1>
          <p
            style={{
              fontSize: "17px",
              fontWeight: "300",
              color: "rgba(249,244,238,0.7)",
              lineHeight: "1.7",
              marginBottom: "48px",
              maxWidth: "420px",
            }}
          >
            Ihr Friseursalon in dritter Generation. Persönlich, professionell und mit Herz – in
            Lindenau &amp; Seetal.
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={site.openBooking}
              className="salon-btn-accent"
              style={{
                background: "#C4674A",
                color: "#F9F4EE",
                border: "none",
                padding: "17px 38px",
                fontSize: "13px",
                fontWeight: "400",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Termin buchen
            </button>
            <button
              type="button"
              onClick={site.scrollToAbout}
              className="salon-btn-hero-outline"
              style={{
                background: "transparent",
                color: "rgba(249,244,238,0.85)",
                border: "1px solid rgba(249,244,238,0.32)",
                padding: "17px 38px",
                fontSize: "13px",
                fontWeight: "400",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Unsere Geschichte
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          left: "80px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          animation: "fadeIn 1.5s ease 1.4s both",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "44px",
            background: "linear-gradient(to bottom, rgba(249,244,238,0.45), transparent)",
          }}
        />
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(249,244,238,0.38)",
          }}
        >
          Lindenau &amp; Seetal
        </span>
      </div>
    </section>
  );
}
