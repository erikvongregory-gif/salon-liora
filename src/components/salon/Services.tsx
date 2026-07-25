import type { SalonSiteState } from "@/hooks/useSalonSite";

type Props = {
  site: SalonSiteState;
};

export default function Services({ site }: Props) {
  return (
    <section id="services" data-screen-label="Leistungen" style={{ background: "#F2EBE3", padding: "120px 0" }}>
      <div className="salon-section-pad" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
        <div style={{ marginBottom: "72px" }}>
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
            Leistungen &amp; Preise
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "58px",
              fontWeight: "300",
              color: "#1A1410",
              lineHeight: "1.06",
              textWrap: "pretty",
            }}
          >
            Für jeden Anlass,
            <br />
            <em>jeden Stil.</em>
          </h2>
        </div>
        <div
          className="salon-services-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3px",
            marginBottom: "100px",
          }}
        >
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "2/3", background: "#1A1410" }}>
            <div
              className="salon-img-hover-lg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                  backgroundImage: "url('/salon/service-cut.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.8,
                transition: "transform 0.7s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(18,12,8,0.85) 0%, transparent 55%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 0, padding: "32px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C4674A",
                  marginBottom: "10px",
                  fontWeight: "400",
                }}
              >
                01
              </span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "26px",
                  fontWeight: "400",
                  color: "#F9F4EE",
                  margin: "0 0 6px",
                }}
              >
                Schnitt &amp; Styling
              </h3>
              <p style={{ fontSize: "13px", fontWeight: "300", color: "rgba(249,244,238,0.6)", margin: 0 }}>
                Ab 25 €
              </p>
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "2/3", background: "#1A1410" }}>
            <div
              className="salon-img-hover-lg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                  backgroundImage: "url('/salon/service-color.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.8,
                transition: "transform 0.7s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(18,12,8,0.85) 0%, transparent 55%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 0, padding: "32px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C4674A",
                  marginBottom: "10px",
                  fontWeight: "400",
                }}
              >
                02
              </span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "26px",
                  fontWeight: "400",
                  color: "#F9F4EE",
                  margin: "0 0 6px",
                }}
              >
                Balayage &amp; Farbe
              </h3>
              <p style={{ fontSize: "13px", fontWeight: "300", color: "rgba(249,244,238,0.6)", margin: 0 }}>
                Ab 113 €
              </p>
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "2/3", background: "#1A1410" }}>
            <div
              className="salon-img-hover-lg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                  backgroundImage: "url('/salon/service-care.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.8,
                transition: "transform 0.7s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(18,12,8,0.85) 0%, transparent 55%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 0, padding: "32px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C4674A",
                  marginBottom: "10px",
                  fontWeight: "400",
                }}
              >
                03
              </span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "26px",
                  fontWeight: "400",
                  color: "#F9F4EE",
                  margin: "0 0 6px",
                }}
              >
                Herren &amp; Kinder
              </h3>
              <p style={{ fontSize: "13px", fontWeight: "300", color: "rgba(249,244,238,0.6)", margin: 0 }}>
                Ab 25 €
              </p>
            </div>
          </div>
        </div>
        <div style={{ background: "#F9F4EE", padding: "64px", border: "1px solid #E5DDD4" }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "40px",
              fontWeight: "300",
              color: "#1A1410",
              textAlign: "center",
              marginBottom: "52px",
            }}
          >
            Preisliste
          </h3>
          <div
            className="salon-price-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px" }}
          >
            <div>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C4674A",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #E5DDD4",
                  marginBottom: 0,
                  fontWeight: "400",
                }}
              >
                Damen
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>
                    Waschen, Schneiden &amp; Föhnen
                  </span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    60 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  58 €
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>Waschen &amp; Föhnen</span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    45 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  38 €
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>Ansatzfarbe + WSF</span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    120 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  113 €
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>
                    Ansatzfarbe + Highlights + WSF
                  </span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    150 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  130 €
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>
                    Strähnen OK + Glossing + WSF
                  </span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    180 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  160 €
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>
                    Strähnen GK + Glossing + WSF
                  </span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    180 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  208 €
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>
                    Balayage + Glossing + WSF
                  </span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    180 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  229 €
                </span>
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C4674A",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #E5DDD4",
                  marginBottom: 0,
                  fontWeight: "400",
                }}
              >
                Herren &amp; Kinder
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>Herrenhaarschnitt</span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    30 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  32 €
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>Mädchenschnitt</span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    30 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  35 €
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#1A1410", fontWeight: "400" }}>Bubenschnitt</span>
                  <span style={{ fontSize: "12px", color: "#7A6A60", marginLeft: "10px", fontWeight: "300" }}>
                    20 Min
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "17px",
                    color: "#1A1410",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  25 €
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "300",
                  color: "#A89990",
                  lineHeight: "1.65",
                  marginTop: "32px",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(229,221,212,0.5)",
                }}
              >
                * Preise können je nach Mehraufwand und Material variieren. Gerne beraten wir Sie persönlich.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "52px" }}>
            <button
              type="button"
              onClick={site.openBooking}
              className="salon-btn-dark"
              style={{
                background: "#1A1410",
                color: "#F9F4EE",
                border: "none",
                padding: "16px 44px",
                fontSize: "12px",
                fontWeight: "400",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Jetzt Termin buchen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
