import { ImageResponse } from "next/og";
import { getAreaBySlug } from "@/data/areas";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = "Service Area - Genius Tech Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const areaData = getAreaBySlug(area);

  // Format area ID to display name (e.g., "dubai-marina" -> "Dubai Marina")
  const formatAreaName = (id: string) => {
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = areaData ? formatAreaName(areaData.id) : "Service Area";
  const subtitle = `Phone & Laptop Repair in ${title}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #00d4ff20 0%, transparent 50%, #0066ff10 100%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, zIndex: 10 }}>
          {/* Logo area */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #0066ff, #00d4ff)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              GENIUS
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#ff6600" }}>TECH</div>
          </div>

          {/* Location icon */}
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>📍</div>

          {/* Area title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              color: "#888888",
              marginBottom: "40px",
            }}
          >
            {subtitle}
          </div>

          {/* Features */}
          <div style={{ display: "flex", gap: "30px", marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#00ff88",
                }}
              />
              <span style={{ color: "#ffffff", fontSize: "24px" }}>Free Pickup & Delivery</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#00ff88",
                }}
              />
              <span style={{ color: "#ffffff", fontSize: "24px" }}>Same-Day Service</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #333",
            paddingTop: "30px",
            marginTop: "30px",
          }}
        >
          <div style={{ color: "#666", fontSize: "20px" }}>{SITE_CONFIG.url.replace("https://", "")}</div>
          <div style={{ color: "#0066ff", fontSize: "20px" }}>Serving Dubai Marina, JLT & JBR</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
