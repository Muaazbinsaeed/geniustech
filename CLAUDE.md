# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production (generates all 159 static pages)
npm run lint     # Run ESLint
npm start        # Start production server
```

## Architecture Overview

### Internationalization (i18n)

This is a fully internationalized Next.js App Router site using `next-intl`. All routes are prefixed with locale (`/en/`, `/ar/`, etc.).

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

### Key Components

**WhatsAppIcon** (`components/icons/WhatsAppIcon.tsx`): Official WhatsApp Business SVG logo, used throughout the site.

**LanguageSwitcher** (`components/shared/LanguageSwitcher.tsx`):
- Uses flag images from flagcdn.com
- Props: `compact` (boolean) - shows only flag icon for mobile navbar
- Supports all 7 languages with country flags (GB, AE, IN, PK, RU, FR, ES)

**VideoShortsSection** (`components/home/VideoShortsSection.tsx`):
- Displays YouTube Shorts with hero layout (large + small cards)
- Video IDs configured in `SITE_CONFIG.location.youtubeShorts`
- Uses modal for video playback with responsive 9:16 aspect ratio

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

## Adding Content

### New Service
1. Add entry to `src/data/services.ts`
2. Add `serviceData.{slug}` translations to all 7 files in `src/messages/`
3. Page auto-generates at `/{locale}/services/{slug}`

### New Blog Post
1. Add to `src/data/blog.ts`
2. Page auto-generates at `/{locale}/blog/{slug}`

### New Language
1. Create `src/messages/{code}.json` (copy structure from `en.json`)
2. Add code to `LOCALES` in `src/lib/constants.ts`
3. Add to `RTL_LOCALES` if right-to-left

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

When adding new UI text, always add translations to all 7 files in `src/messages/`.
