import { LOCALES, SITE_CONFIG, type Locale } from "./constants";

/**
 * Generate language alternates for hreflang tags
 * @param path - The path after the locale (e.g., "/services/iphone-repair")
 * @returns Object mapping locale codes to full URLs
 */
export function generateLanguageAlternates(path: string = ""): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const locale of LOCALES) {
    alternates[locale] = `${SITE_CONFIG.url}/${locale}${path}`;
  }

  // Add x-default pointing to English
  alternates["x-default"] = `${SITE_CONFIG.url}/en${path}`;

  return alternates;
}

/**
 * Get OpenGraph locale format for a given locale
 * @param locale - The locale code (e.g., "en", "ar")
 * @returns OpenGraph formatted locale (e.g., "en_AE", "ar_AE")
 */
export function getOGLocale(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: "en_AE",
    ar: "ar_AE",
    hi: "hi_IN",
    ur: "ur_PK",
    ru: "ru_RU",
    fr: "fr_FR",
    es: "es_ES",
  };
  return localeMap[locale] || "en_AE";
}

/**
 * Default OG image configuration
 */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_CONFIG.url}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: `${SITE_CONFIG.name} - Dubai Device Repair`,
};

/**
 * Generate full metadata alternates object
 * @param locale - Current locale
 * @param path - Path after locale
 * @returns Alternates object for Next.js metadata
 */
export function generateAlternates(locale: Locale, path: string = "") {
  return {
    canonical: `${SITE_CONFIG.url}/${locale}${path}`,
    languages: generateLanguageAlternates(path),
  };
}
