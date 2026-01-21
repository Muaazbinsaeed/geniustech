# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Links

| Resource | URL |
|----------|-----|
| **Live Website** | https://geniustechuae.com |
| **GitHub Repository** | https://github.com/Muaazbinsaeed/geniustech |
| **Vercel Dashboard** | https://vercel.com/muaazs-projects-bc145511/geniustech |

## Build Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production (generates static pages for all locales)
npm run lint     # Run ESLint
npm start        # Start production server
```

## Architecture Overview

### Tech Stack

- **Next.js 16** with App Router (React 19)
- **Tailwind CSS 4** - Uses `@tailwindcss/postcss` (not the legacy v3 config)
- **next-intl** - Internationalization
- **Framer Motion** - Animations
- **@ducanh2912/next-pwa** - Progressive Web App support
- **@vercel/analytics** - Analytics integration

### Internationalization (i18n)

This is a fully internationalized Next.js App Router site using `next-intl`. All routes are prefixed with locale (`/en/`, `/ar/`, etc.). Supported locales are defined in `src/lib/constants.ts` (`LOCALES` array).

**Key pattern**: Every page must call `setRequestLocale(locale)` at the top of the component for static generation to work:

```typescript
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // ...
}
```

**Translation access**:
- Server components: `const t = await getTranslations("namespace")`
- Client components: `const t = useTranslations("namespace")` (requires `"use client"`)
- Raw arrays/objects: `t.raw("key")` returns the untranslated JSON structure
- Translation files: `src/messages/{locale}.json`

**RTL languages**: Arabic (`ar`) and Urdu (`ur`) use RTL layout. Check with `isRtlLocale(locale)` from `@/i18n/config`.

### Static Page Generation

Dynamic routes use `generateStaticParams()` to pre-render all combinations of locale + slug:

```typescript
export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}
```

The middleware (`src/middleware.ts`) handles locale detection and redirects.

### Data Layer

Static data lives in `src/data/`:
- `services.ts` - Service definitions with `getAllServiceSlugs()`, `getServiceBySlug(slug)`
- `areas.ts` - Service area definitions
- `blog.ts` - Blog post data

Service content (features, issues, FAQs) is stored in translation files under `serviceData.{slug}`.

### Component Organization

- `components/home/` - Homepage sections (HeroSlider, Services, WhyChooseUs, etc.)
- `components/layout/` - Header, Footer (shared across all pages)
- `components/shared/` - Reusable components (ThemeToggle, LanguageSwitcher, WhatsAppFAB)
- `components/icons/` - Custom icons (WhatsAppIcon)
- `components/ui/` - Base UI components (Button)

### Utility Functions

**`src/lib/utils.ts`**:
- `cn(...classes)` - Merge Tailwind classes with conflict resolution (clsx + tailwind-merge)
- `getWhatsAppLink(phone, message?)` - Generate WhatsApp deep link
- `getPhoneLink(phone)` - Generate tel: link

### SEO Utilities

**`src/lib/seo.ts`** provides helpers for multi-language SEO:

```typescript
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";

// In generateMetadata:
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    alternates: generateAlternates(locale, "/services"),
    openGraph: {
      locale: getOGLocale(locale),
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
```

**Schema Components** (`components/seo/SchemaMarkup.tsx`):
- `LocalBusinessSchema` - Business structured data
- `ServiceSchema` - Service page structured data
- `BlogPostSchema` - Article structured data
- `FAQSchema` - FAQ structured data
- `BreadcrumbSchema` - Navigation breadcrumbs
- `VideoSchema` - YouTube video structured data

### Site Configuration

All business info in `src/lib/constants.ts` via `SITE_CONFIG`:
- Contact: `phone`, `whatsapp`, `email`
- Location: `address`, `location.googleMapsPin`
- Social: `social.instagram`, `social.tiktok`, `social.facebook`

Locales defined as: `LOCALES`, `RTL_LOCALES`, `DEFAULT_LOCALE`, `LOCALE_NAMES`

### PWA Configuration

The site is a Progressive Web App using `@ducanh2912/next-pwa`. PWA is disabled in development mode. Service worker and caching strategies are configured in `next.config.ts`. The manifest is at `public/manifest.json`.

### Image Sources

Remote images are allowed from these domains (configured in `next.config.ts`):
- `images.unsplash.com`, `images.pexels.com` - Stock photos
- `i.ytimg.com` - YouTube thumbnails
- `flagcdn.com` - Country flags
- `lh3.googleusercontent.com`, `maps.googleapis.com` - Google services

## Adding Content

### New Service
1. Add entry to `src/data/services.ts`
2. Add `serviceData.{slug}` translations to all locale files in `src/messages/`
3. Page auto-generates at `/{locale}/services/{slug}`

### New Blog Post
1. Add to `src/data/blog.ts`
2. Page auto-generates at `/{locale}/blog/{slug}`

### New Language
1. Create `src/messages/{code}.json` (copy structure from `en.json`)
2. Add locale code to `LOCALES` array in `src/lib/constants.ts`
3. Add to `RTL_LOCALES` array if right-to-left
4. Add locale name to `LOCALE_NAMES` record

## Business Context

- **WhatsApp is primary CTA** (not phone calls) - use `getWhatsAppLink()` from `@/lib/utils`
- **Free pickup/delivery** in JLT, JBR, Marina is key differentiator
- Location landmark: "Inside Pluspoint Mini Mart"
- Dark mode is the default theme

## Translation Best Practices

**Never hardcode English text in components.** Use translation keys:

```typescript
// Bad
<span>View on Google Maps</span>

// Good
const tCommon = useTranslations("common");
<span>{tCommon("viewOnGoogleMaps")}</span>
```

**Common translation namespaces:**
- `common` - Shared UI text (buttons, labels, aria-labels)
- `nav` - Navigation links
- `hero` - Hero section content
- `trust` - Trust indicators (ratings, guarantees)
- `services` / `serviceData` - Service content
- `areas` - Service area content
- `reviews` - Customer reviews section
- `video` - Video section content

When adding new UI text, add translations to all locale files in `src/messages/`.

## Deployment

Deployed to Vercel with auto-deploy on push to `main`. See README.md for detailed deployment instructions.

**Environment variables** (optional):
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 ID (format: `G-XXXXXXXXXX`)
- `NEXT_PUBLIC_GOOGLE_ADS_ID` - Google Ads conversion ID (format: `AW-XXXXXXXXXX`)
- `NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION` - WhatsApp button conversion label
- `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION` - Phone call conversion label

## Changelog

### v1.6.1 (Jan 21, 2026) - Error Handling & Code Quality
- **bdf99d9** `fix: Add error handling and null checks for critical code paths`
  - Added `isValidPhoneNumber()` and `safeArray()` utility functions
  - Fixed potential crashes from undefined arrays in service/area pages
  - Added XSS protection to blog `formatContent()` function
  - Phone validation with safe fallbacks for invalid numbers

### v1.6.0 (Jan 21, 2026) - Documentation & Audit
- **57f2fac** `docs: Add comprehensive multi-dimensional project report`
  - Fresh Lighthouse audits (Production + Localhost)
  - 12 dimensions analyzed: Performance, SEO, PWA, AISEO/GEO/AEO, Accessibility, Mobile, i18n, Security
  - Priority action items documented
- **d8ebb52** `docs: Reorganize documentation and add project report`
  - Created `docs/` folder structure
  - Archived old reports to `docs/archive/`
  - Updated README and CLAUDE.md with changelog

### v1.5.0 (Jan 18, 2026) - SEO/AEO/GEO Optimization
- **3ace14f** `feat: Add advanced SEO/AEO/GEO optimizations`
  - PWA icons at all required sizes (48-512px) with maskable variants
  - Error boundaries and loading states for all routes
  - Focus trap and keyboard navigation in mobile menu
  - 44px minimum touch targets (WCAG 2.1 AA)
  - `llms.txt` for AI crawlers (ChatGPT, Perplexity)
  - AI crawler rules in robots.txt
- **ab8d622** `perf: Comprehensive SEO optimization with branded images`

### v1.4.0 (Jan 14, 2026) - Domain & Infrastructure
- **a0272d1** `docs: Update project links and domain configuration`
- **55c2c1b** `chore: Update site URL to geniustechuae.com`
- **4c7813e** `perf: Add SEO schema markup and performance optimizations`
- **47a019a** `fix: Replace deprecated next-pwa with maintained fork`
- **1815a2f** `docs: Add detailed Vercel deployment instructions`

### v1.3.0 (Jan 14, 2026) - Video & i18n
- **14c1e17** `feat: Complete i18n and SEO improvements for video section`
- **e2e2ae0** `refactor: Update video section to hero layout`
- **127b59a** `feat: Add YouTube Shorts section and SEO improvements`
- **fb82c86** `feat: Update WhatsApp icon and language switcher with flags`

### v1.2.0 (Jan 12, 2026) - SEO Quick Wins
- **9a9c8ee** `perf: Implement SEO and accessibility quick wins`
- **0d0014a** `docs: Add comprehensive website analysis report`
- **5df417c** `chore: Add environment variables template`

### v1.0.0 (Jan 12, 2026) - Initial Release
- **4e38c08** `feat: Complete Genius Tech device repair website`
  - Multi-lingual support (7 languages: EN, AR, HI, UR, RU, FR, ES)
  - RTL support for Arabic and Urdu
  - Dark/light theme with system preference detection
  - 159 static pages generated
  - SEO: sitemap.xml, robots.txt, schema markup
  - Homepage with hero slider, services, areas, reviews
  - 6 service pages, 3 area pages, 5 blog articles
- **b357f32** `Initial commit from Create Next App`

## Documentation

- [Project Report](docs/PROJECT_REPORT.md) - Detailed audit scores, metrics, and recommendations
