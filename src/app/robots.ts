import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Google crawlers
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/og-image.jpg"],
      },
      // Bing crawler
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      // AI/LLM crawlers - Allow for GEO (Generative Engine Optimization)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      // Default rule for all other crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
