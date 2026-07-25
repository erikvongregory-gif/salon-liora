import { BRAND, CONTACT_EMAIL, LOCATIONS } from "@/lib/salon-data";
import type { SalonSiteState } from "@/hooks/useSalonSite";

type Props = {
  site: SalonSiteState;
};

export default function Contact({ site }: Props) {
  return (
    <section id="contact" data-screen-label="Kontakt" style={{ background: "#F9F4EE", padding: "120px 0" }}>
      <div className="salon-section-pad" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C4674A",
              marginBottom: "16px",
              fontWeight: "400",
            }}
          >
            Kontakt &amp; Standorte
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "54px",
              fontWeight: "300",
              color: "#1A1410",
              lineHeight: "1.1",
            }}
          >
            Besuchen Sie uns
          </h2>
        </div>
        <div
          className="salon-contact-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}
        >
          <div style={{ background: "#1A1410", padding: "56px" }}>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C4674A",
                marginBottom: "24px",
                fontWeight: "400",
              }}
            >
              Standort 01
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "38px",
                fontWeight: "300",
                color: "#F9F4EE",
                marginBottom: "36px",
              }}
            >
              {LOCATIONS.lindenau.name}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "44px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    minWidth: "70px",
                    paddingTop: "2px",
                    fontWeight: "400",
                  }}
                >
                  Adresse
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "rgba(249,244,238,0.78)",
                    lineHeight: "1.6",
                  }}
                >
                  {LOCATIONS.lindenau.street}
                  <br />
                  {LOCATIONS.lindenau.zipCity}
                </span>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    minWidth: "70px",
                    paddingTop: "2px",
                    fontWeight: "400",
                  }}
                >
                  Telefon
                </span>
                <a
                  href={BRAND.phoneHref}
                  className="salon-link-light"
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "rgba(249,244,238,0.78)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {BRAND.phone}
                </a>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    minWidth: "70px",
                    paddingTop: "2px",
                    fontWeight: "400",
                  }}
                >
                  E-Mail
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="salon-link-light"
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "rgba(249,244,238,0.78)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    wordBreak: "break-all",
                  }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    minWidth: "70px",
                    paddingTop: "2px",
                    fontWeight: "400",
                  }}
                >
                  Termine
                </span>
                <span style={{ fontSize: "14px", fontWeight: "300", color: "rgba(249,244,238,0.78)" }}>
                  Nach Vereinbarung
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={site.selectLindenauFromContact}
              className="salon-btn-accent"
              style={{
                background: "#C4674A",
                color: "#F9F4EE",
                border: "none",
                padding: "15px 28px",
                fontSize: "12px",
                fontWeight: "400",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                width: "100%",
                transition: "background 0.2s",
              }}
            >
              Termin in {LOCATIONS.lindenau.name} buchen
            </button>
          </div>
          <div style={{ background: "#2E2418", padding: "56px" }}>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C4674A",
                marginBottom: "24px",
                fontWeight: "400",
              }}
            >
              Standort 02
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "38px",
                fontWeight: "300",
                color: "#F9F4EE",
                marginBottom: "36px",
              }}
            >
              {LOCATIONS.seetal.name}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "44px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    minWidth: "70px",
                    paddingTop: "2px",
                    fontWeight: "400",
                  }}
                >
                  Adresse
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "rgba(249,244,238,0.78)",
                    lineHeight: "1.6",
                  }}
                >
                  {LOCATIONS.seetal.street}
                  <br />
                  {LOCATIONS.seetal.zipCity}
                </span>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    minWidth: "70px",
                    paddingTop: "2px",
                    fontWeight: "400",
                  }}
                >
                  Telefon
                </span>
                <a
                  href={BRAND.phoneHref}
                  className="salon-link-light"
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "rgba(249,244,238,0.78)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {BRAND.phone}
                </a>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    minWidth: "70px",
                    paddingTop: "2px",
                    fontWeight: "400",
                  }}
                >
                  E-Mail
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="salon-link-light"
                  style={{
                    fontSize: "14px",
                    fontWeight: "300",
                    color: "rgba(249,244,238,0.78)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    wordBreak: "break-all",
                  }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    minWidth: "70px",
                    paddingTop: "2px",
                    fontWeight: "400",
                  }}
                >
                  Termine
                </span>
                <span style={{ fontSize: "14px", fontWeight: "300", color: "rgba(249,244,238,0.78)" }}>
                  Nach Vereinbarung
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={site.selectSeetalFromContact}
              className="salon-btn-accent"
              style={{
                background: "#C4674A",
                color: "#F9F4EE",
                border: "none",
                padding: "15px 28px",
                fontSize: "12px",
                fontWeight: "400",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                width: "100%",
                transition: "background 0.2s",
              }}
            >
              Termin in {LOCATIONS.seetal.name} buchen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
