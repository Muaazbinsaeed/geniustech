import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
