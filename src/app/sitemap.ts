import { MetadataRoute } from "next";
import { LOCALES, SITE_CONFIG } from "@/lib/constants";
import { getAllServiceSlugs } from "@/data/services";
import { getAllAreaSlugs } from "@/data/areas";
import { getAllBlogSlugs } from "@/data/blog";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceSlugs = getAllServiceSlugs();
  const areaSlugs = getAllAreaSlugs();
  const blogSlugs = getAllBlogSlugs();

  const routes: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  const staticPages = ["", "/about", "/contact", "/services", "/areas", "/blog", "/privacy", "/terms"];

  for (const locale of LOCALES) {
    // Add static pages
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : page === "/services" || page === "/areas" ? 0.9 : 0.7,
      });
    }

    // Add service pages
    for (const slug of serviceSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Add area pages
    for (const slug of areaSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/areas/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Add blog posts
    for (const slug of blogSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
