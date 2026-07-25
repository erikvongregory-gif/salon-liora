import type { SalonSiteState } from "@/hooks/useSalonSite";

type Props = {
  site: SalonSiteState;
};

export default function BookingOverlay({ site }: Props) {
  if (!site.bookingOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, animation: "fadeIn 0.25s ease" }}>
      <div
        onClick={site.closeBooking}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(18,12,8,0.68)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      />
      <div
        className="salon-booking-panel"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "520px",
          background: "#F9F4EE",
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
          boxShadow: "-12px 0 60px rgba(0,0,0,0.22)",
          animation: "slideInRight 0.35s ease",
        }}
      >
        <div style={{ height: "3px", background: "#E5DDD4", flexShrink: 0 }}>
          <div
            style={{
              height: "100%",
              background: "#C4674A",
              width: site.progressPct,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "22px 36px",
            borderBottom: "1px solid #E5DDD4",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {site.showBack && (
              <button
                type="button"
                onClick={site.backStep}
                className="salon-icon-btn"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#7A6A60",
                  cursor: "pointer",
                  fontSize: "20px",
                  lineHeight: 1,
                  padding: "2px 10px 2px 0",
                  transition: "color 0.2s",
                }}
              >
                ←
              </button>
            )}
            <div>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C4674A",
                  marginBottom: "3px",
                  fontWeight: "400",
                }}
              >
                Schritt {site.bookingStep} von 6
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontWeight: "400",
                  color: "#1A1410",
                  margin: 0,
                }}
              >
                {site.bookingStepTitle}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={site.closeBooking}
            className="salon-icon-btn"
            style={{
              background: "transparent",
              border: "none",
              color: "#7A6A60",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
              padding: "4px",
              transition: "color 0.2s",
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
          {site.isStep1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div
                onClick={site.selectLindenau}
                className="salon-booking-loc"
                style={{
                  padding: "28px",
                  border: "1.5px solid #E5DDD4",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: "#FEFCFA",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "26px",
                    fontWeight: "400",
                    color: "#1A1410",
                    margin: "0 0 6px",
                  }}
                >
                  Lindenau
                </h4>
                <p style={{ fontSize: "13px", fontWeight: "300", color: "#7A6A60", margin: 0 }}>
                  Musterstraße 12 · 12345 Lindenau
                </p>
              </div>
              <div
                onClick={site.selectSeetal}
                className="salon-booking-loc"
                style={{
                  padding: "28px",
                  border: "1.5px solid #E5DDD4",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: "#FEFCFA",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "26px",
                    fontWeight: "400",
                    color: "#1A1410",
                    margin: "0 0 6px",
                  }}
                >
                  Seetal
                </h4>
                <p style={{ fontSize: "13px", fontWeight: "300", color: "#7A6A60", margin: 0 }}>
                  Am See 3 · 12346 Seetal
                </p>
              </div>
            </div>
          )}

          {site.isStep2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {site.servicesList.map((svc) => (
                <div key={svc.id} onClick={svc.onClick} style={svc.itemStyle}>
                  <div>
                    <p style={{ fontSize: "14px", color: "#1A1410", margin: "0 0 3px", fontWeight: "400" }}>
                      {svc.name}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#7A6A60",
                        margin: 0,
                        fontWeight: "300",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {svc.duration}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "19px",
                      fontWeight: "500",
                      color: "#1A1410",
                      whiteSpace: "nowrap",
                      marginLeft: "12px",
                    }}
                  >
                    {svc.price}
                  </span>
                </div>
              ))}
            </div>
          )}

          {site.isStep3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {site.stylists.map((stylist) => (
                <div key={stylist.id} onClick={stylist.onClick} style={stylist.cardStyle}>
                  <div style={{ display: "grid", gridTemplateColumns: "96px 1fr" }}>
                    <div style={stylist.imgStyle} />
                    <div
                      style={{
                        padding: "18px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "22px",
                          fontWeight: "400",
                          color: "#1A1410",
                          margin: "0 0 5px",
                        }}
                      >
                        {stylist.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#C4674A",
                          margin: "0 0 10px",
                          fontWeight: "400",
                        }}
                      >
                        {stylist.specialty}
                      </p>
                      <p style={{ fontSize: "13px", fontWeight: "300", color: "#7A6A60", margin: 0, lineHeight: "1.55" }}>
                        {stylist.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {site.isStep4 && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <button
                  type="button"
                  onClick={site.prevMonth}
                  className="salon-icon-btn"
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    lineHeight: 1,
                    padding: "6px 10px",
                    transition: "color 0.2s",
                    cursor: site.prevMonthCursor,
                    color: site.prevMonthColor,
                  }}
                >
                  ←
                </button>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",
                    fontWeight: "400",
                    color: "#1A1410",
                    textTransform: "capitalize",
                    letterSpacing: "0.02em",
                  }}
                >
                  {site.monthName}
                </span>
                <button
                  type="button"
                  onClick={site.nextMonth}
                  className="salon-icon-btn"
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    lineHeight: 1,
                    padding: "6px 10px",
                    cursor: "pointer",
                    color: "#7A6A60",
                    transition: "color 0.2s",
                  }}
                >
                  →
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "4px" }}>
                {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day, i) => (
                  <div
                    key={day}
                    style={{
                      textAlign: "center",
                      fontSize: "11px",
                      color: i === 6 ? "#B0A498" : "#7A6A60",
                      padding: "5px 0",
                      fontWeight: "400",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "2px",
                  marginBottom: "28px",
                }}
              >
                {site.calDays.map((calDay) => (
                  <div
                    key={calDay.key}
                    onClick={calDay.onClick ?? undefined}
                    style={calDay.cellStyle}
                  >
                    {calDay.dayNum}
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7A6A60",
                  marginBottom: "12px",
                  fontWeight: "400",
                }}
              >
                Uhrzeit wählen
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "6px",
                  marginBottom: "4px",
                }}
              >
                {site.timeSlots.map((slot) => (
                  <div key={slot.time} onClick={slot.onClick} style={slot.slotStyle}>
                    {slot.time}
                  </div>
                ))}
              </div>
              <button type="button" onClick={site.goToStep5} style={site.step4ContinueStyle}>
                Weiter →
              </button>
            </div>
          )}

          {site.isStep5 && (
            <div>
              <div
                style={{
                  background: "#F2EBE3",
                  padding: "16px 20px",
                  borderLeft: "3px solid #C4674A",
                  marginBottom: "28px",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    marginBottom: "10px",
                    fontWeight: "400",
                  }}
                >
                  Ihre Buchung
                </p>
                <p style={{ fontSize: "14px", fontWeight: "400", color: "#1A1410", margin: "0 0 4px" }}>
                  {site.booking.service?.name}
                </p>
                <p style={{ fontSize: "12px", fontWeight: "300", color: "#7A6A60", margin: "0 0 2px" }}>
                  {site.bookingDateStr} · {site.booking.time} Uhr
                </p>
                <p style={{ fontSize: "12px", fontWeight: "300", color: "#7A6A60", margin: 0 }}>
                  {site.booking.stylist} · {site.bookingLocationStr}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#7A6A60",
                      marginBottom: "8px",
                      fontWeight: "400",
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    value={site.booking.name}
                    onChange={site.setName}
                    placeholder="Ihr vollständiger Name"
                    className="salon-input-focus"
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      border: "1px solid #E5DDD4",
                      background: "#FEFCFA",
                      fontSize: "14px",
                      fontWeight: "300",
                      color: "#1A1410",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#7A6A60",
                      marginBottom: "8px",
                      fontWeight: "400",
                    }}
                  >
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    value={site.booking.email}
                    onChange={site.setEmail}
                    placeholder="ihre@email.de"
                    className="salon-input-focus"
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      border: "1px solid #E5DDD4",
                      background: "#FEFCFA",
                      fontSize: "14px",
                      fontWeight: "300",
                      color: "#1A1410",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#7A6A60",
                      marginBottom: "8px",
                      fontWeight: "400",
                    }}
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={site.booking.phone}
                    onChange={site.setPhone}
                    placeholder="+49 ..."
                    className="salon-input-focus"
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      border: "1px solid #E5DDD4",
                      background: "#FEFCFA",
                      fontSize: "14px",
                      fontWeight: "300",
                      color: "#1A1410",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => void site.goToStep6()}
                  disabled={site.submitting}
                  style={site.step5ContinueStyle}
                >
                  {site.submitting ? "Wird gesendet..." : "Termin anfragen"}
                </button>
              </div>
            </div>
          )}

          {site.isStep6 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: "rgba(196,103,74,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 28px",
                  color: "#C4674A",
                  fontSize: "24px",
                  border: "1.5px solid rgba(196,103,74,0.28)",
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "32px",
                  fontWeight: "300",
                  color: "#1A1410",
                  marginBottom: "14px",
                }}
              >
                Demo abgeschlossen
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "300",
                  color: "#7A6A60",
                  lineHeight: "1.72",
                  marginBottom: "20px",
                  maxWidth: "360px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Danke fürs Ausprobieren
                {site.booking.name ? (
                  <>
                    ,{" "}
                    <strong style={{ color: "#1A1410", fontWeight: "400" }}>{site.booking.name}</strong>
                  </>
                ) : null}
                !
              </p>
              <div
                style={{
                  textAlign: "left",
                  background: "rgba(196,103,74,0.08)",
                  border: "1px solid rgba(196,103,74,0.28)",
                  padding: "16px 18px",
                  marginBottom: "28px",
                  maxWidth: "360px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#C4674A",
                    margin: "0 0 8px",
                    fontWeight: "400",
                  }}
                >
                  Hinweis
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "300",
                    color: "#5C4E46",
                    lineHeight: "1.65",
                    margin: 0,
                  }}
                >
                  Dies ist eine Entwurfs-/Demo-Website. Es wurde kein echter Termin gebucht und keine
                  Daten versendet.
                </p>
              </div>
              <div
                style={{
                  textAlign: "left",
                  background: "#F2EBE3",
                  padding: "20px 24px",
                  marginBottom: "24px",
                  borderLeft: "3px solid #C4674A",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A6A60",
                        fontWeight: "400",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Leistung
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#1A1410",
                        fontWeight: "400",
                        textAlign: "right",
                      }}
                    >
                      {site.booking.service?.name}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A6A60",
                        fontWeight: "400",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Datum
                    </span>
                    <span style={{ fontSize: "13px", color: "#1A1410", fontWeight: "400", textAlign: "right" }}>
                      {site.bookingDateStr}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A6A60",
                        fontWeight: "400",
                      }}
                    >
                      Uhrzeit
                    </span>
                    <span style={{ fontSize: "13px", color: "#1A1410", fontWeight: "400" }}>
                      {site.booking.time} Uhr
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A6A60",
                        fontWeight: "400",
                      }}
                    >
                      Stylistin
                    </span>
                    <span style={{ fontSize: "13px", color: "#1A1410", fontWeight: "400" }}>
                      {site.booking.stylist}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A6A60",
                        fontWeight: "400",
                      }}
                    >
                      Standort
                    </span>
                    <span style={{ fontSize: "13px", color: "#1A1410", fontWeight: "400" }}>
                      {site.bookingLocationStr}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={site.closeBooking}
                className="salon-btn-dark-solid"
                style={{
                  background: "#1A1410",
                  color: "#F9F4EE",
                  border: "none",
                  padding: "15px 28px",
                  fontSize: "12px",
                  fontWeight: "400",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background 0.2s",
                }}
              >
                Schließen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
