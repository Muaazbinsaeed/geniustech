"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
// Note: Using <a> instead of <Link> is intentional here because global-error.tsx
// renders outside the normal Next.js app context and <Link> may not work correctly.

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, sans-serif",
            backgroundColor: "#0a0a0a",
            color: "#fafafa",
            padding: "1rem",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            {/* Error Icon */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2rem",
              }}
            >
              !
            </div>

            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Something Went Wrong
            </h1>

            <p
              style={{
                color: "#a1a1aa",
                marginBottom: "1.5rem",
              }}
            >
              A critical error occurred. Please try refreshing the page.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={reset}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#0066ff",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "transparent",
                  color: "#fafafa",
                  border: "1px solid #27272a",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Go Home
              </a>
            </div>

            {process.env.NODE_ENV === "development" && error.digest && (
              <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#71717a" }}>
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
