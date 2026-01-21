import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/data/blog";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = "Blog Post - Genius Tech Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const title = post?.title || "Device Repair Tips";
  const category = post?.category || "Repair Guide";
  const readTime = post?.readTime || 5;

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
            background: "linear-gradient(135deg, #0066ff15 0%, transparent 50%, #ff660015 100%)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, zIndex: 10 }}>
          {/* Top bar with logo and category */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #0066ff, #00d4ff)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                GENIUS
              </div>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ff6600" }}>TECH</div>
            </div>
            <div
              style={{
                backgroundColor: "#0066ff",
                color: "#ffffff",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {category}
            </div>
          </div>

          {/* Blog icon */}
          <div
            style={{
              fontSize: "48px",
              marginBottom: "20px",
            }}
          >
            📱
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: "30px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {/* Meta info */}
          <div style={{ display: "flex", gap: "30px", marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "24px" }}>⏱️</span>
              <span style={{ color: "#888888", fontSize: "22px" }}>{readTime} min read</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "24px" }}>📍</span>
              <span style={{ color: "#888888", fontSize: "22px" }}>Dubai Marina</span>
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
          <div style={{ color: "#666", fontSize: "20px" }}>Blog · {SITE_CONFIG.url.replace("https://", "")}</div>
          <div style={{ color: "#888", fontSize: "18px" }}>Expert Device Repair Tips & Guides</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
