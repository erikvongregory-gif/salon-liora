import { TEAM } from "@/lib/salon-data";

export default function Team() {
  return (
    <section data-screen-label="Team" style={{ background: "#F9F4EE", padding: "120px 0" }}>
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
            Das Team
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
            Elena &amp; Sophie
          </h2>
        </div>
        <div
          className="salon-team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "56px",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          {TEAM.map((member) => (
            <div key={member.id} style={{ textAlign: "center" }}>
              <div style={{ overflow: "hidden", aspectRatio: "3/4", marginBottom: "28px" }}>
                <div
                  className="salon-img-hover"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url('${member.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    transition: "transform 0.6s ease",
                  }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "30px",
                  fontWeight: "400",
                  color: "#1A1410",
                  marginBottom: "8px",
                  letterSpacing: "0.02em",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C4674A",
                  marginBottom: "16px",
                  fontWeight: "400",
                }}
              >
                {member.specialty}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "300",
                  color: "#7A6A60",
                  lineHeight: "1.72",
                  maxWidth: "300px",
                  margin: "0 auto",
                }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
