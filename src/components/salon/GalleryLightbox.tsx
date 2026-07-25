import type { SalonSiteState } from "@/hooks/useSalonSite";

type Props = {
  site: SalonSiteState;
};

export default function GalleryLightbox({ site }: Props) {
  if (!site.galleryOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(10,6,3,0.97)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <button
        type="button"
        onClick={site.closeGallery}
        className="salon-lightbox-btn"
        style={{
          position: "absolute",
          top: "28px",
          right: "36px",
          background: "transparent",
          border: "none",
          color: "rgba(249,244,238,0.55)",
          fontSize: "26px",
          cursor: "pointer",
          lineHeight: 1,
          padding: "4px",
          transition: "color 0.2s",
        }}
      >
        ✕
      </button>
      <button
        type="button"
        onClick={site.prevGallery}
        className="salon-lightbox-btn"
        style={{
          position: "absolute",
          left: "36px",
          background: "transparent",
          border: "none",
          color: "rgba(249,244,238,0.45)",
          fontSize: "36px",
          cursor: "pointer",
          padding: "8px",
          lineHeight: 1,
          transition: "color 0.2s",
        }}
      >
        ←
      </button>
      <div style={site.lightboxImgStyle} />
      <button
        type="button"
        onClick={site.nextGallery}
        className="salon-lightbox-btn"
        style={{
          position: "absolute",
          right: "36px",
          background: "transparent",
          border: "none",
          color: "rgba(249,244,238,0.45)",
          fontSize: "36px",
          cursor: "pointer",
          padding: "8px",
          lineHeight: 1,
          transition: "color 0.2s",
        }}
      >
        →
      </button>
    </div>
  );
}
