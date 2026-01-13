import { MetadataRoute } from "next";
import { LOCALES, SITE_CONFIG } from "@/lib/constants";
import { getAllServiceSlugs } from "@/data/services";
import { getAllAreaSlugs } from "@/data/areas";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

// Use a static date for pages that don't have specific modification dates
// This represents when the site was last significantly updated
const SITE_LAST_MODIFIED = new Date("2026-01-12");

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
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : page === "/services" || page === "/areas" ? 0.9 : 0.7,
      });
    }

    // Add service pages
    for (const slug of serviceSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Add area pages
    for (const slug of areaSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/areas/${slug}`,
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Add blog posts with actual dates from blog data
    for (const slug of blogSlugs) {
      const blogPost = getBlogPostBySlug(slug);
      // Use updatedAt if available, otherwise publishedAt, otherwise fallback to site date
      const lastModified = blogPost?.updatedAt
        ? new Date(blogPost.updatedAt)
        : blogPost?.publishedAt
          ? new Date(blogPost.publishedAt)
          : SITE_LAST_MODIFIED;

      routes.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
