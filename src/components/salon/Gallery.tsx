import type { SalonSiteState } from "@/hooks/useSalonSite";

type Props = {
  site: SalonSiteState;
};

export default function Gallery({ site }: Props) {
  return (
    <section id="gallery" data-screen-label="Galerie" style={{ background: "#1A1410", padding: "120px 0" }}>
      <div className="salon-section-pad" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 64px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "56px",
          }}
        >
          <div>
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
              Galerie
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "54px",
                fontWeight: "300",
                color: "#F9F4EE",
                lineHeight: "1.1",
              }}
            >
              Unsere Arbeiten
            </h2>
          </div>
          <button
            type="button"
            onClick={site.openBooking}
            className="salon-gallery-outline"
            style={{
              background: "transparent",
              color: "rgba(249,244,238,0.65)",
              border: "1px solid rgba(249,244,238,0.22)",
              padding: "14px 28px",
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Termin vereinbaren
          </button>
        </div>
        <div className="salon-gallery-cols" style={{ columnCount: 4, columnGap: "10px" }}>
          {site.galleryImages.map((img) => (
            <div
              key={img.src}
              className="salon-gallery-item"
              style={{
                breakInside: "avoid",
                marginBottom: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.5s ease",
              }}
              onClick={img.onClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") img.onClick();
              }}
              role="button"
              tabIndex={0}
            >
              <div style={img.bgStyle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
