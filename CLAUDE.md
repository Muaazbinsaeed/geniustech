# Genius Tech - Device Repair Website

## Project Overview

**Business:** Genius Tech - Dubai's fastest device repair service
**Location:** West Avenue Building, Shop 1, Al Yahoom St, Dubai Marina (Inside Pluspoint Mini Mart)
**Service Areas:** Dubai Marina, JLT, JBR
**Tagline:** "Quality means doing something right when no one is looking"

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework (App Router) |
| React | 19.2.3 | UI library |
| Tailwind CSS | 4.x | Styling |
| next-intl | 4.7 | Internationalization (7 languages) |
| Framer Motion | 12.25 | Animations |
| next-themes | 0.4.6 | Theme management |
| Lucide React | 0.562 | Icons |
| TypeScript | 5.x | Type safety |

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Locale-based routing
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout with i18n
│   │   ├── not-found.tsx      # Custom 404 page
│   │   ├── error.tsx          # Error boundary
│   │   ├── loading.tsx        # Loading state
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── areas/
│   │   │   ├── page.tsx
│   │   │   └── [area]/page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── global-error.tsx       # Root error handler
│   ├── sitemap.ts             # Dynamic sitemap
│   ├── robots.ts              # Robots.txt config
│   └── icon.png               # Favicon
├── components/
│   ├── home/                  # Home page sections
│   │   ├── HeroSlider.tsx
│   │   ├── TrustBar.tsx
│   │   ├── Services.tsx
│   │   ├── ServiceAreas.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Reviews.tsx
│   │   ├── CTASection.tsx
│   │   └── VideoSection.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── shared/
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── WhatsAppFAB.tsx
│   ├── ui/
│   │   └── Button.tsx
│   ├── analytics/
│   │   ├── GoogleAnalytics.tsx
│   │   └── GoogleAds.tsx
│   ├── providers/
│   │   └── ThemeProvider.tsx
│   └── seo/
│       └── SchemaMarkup.tsx
├── data/
│   ├── services.ts            # Services data
│   ├── areas.ts               # Service areas data
│   └── blog.ts                # Blog posts
├── i18n/
│   ├── config.ts
│   └── request.ts
├── lib/
│   ├── constants.ts           # Site config
│   └── utils.ts               # Utilities
├── messages/                  # Translation files (7 languages)
│   ├── en.json
│   ├── ar.json
│   ├── hi.json
│   ├── ur.json
│   ├── ru.json
│   ├── fr.json
│   └── es.json
├── types/
│   └── index.ts
└── middleware.ts              # i18n routing
```

## Languages & Localization

| Code | Language | Direction | Status |
|------|----------|-----------|--------|
| en | English | LTR | Default |
| ar | Arabic | RTL | Complete |
| hi | Hindi | LTR | Complete |
| ur | Urdu | RTL | Complete |
| ru | Russian | LTR | Complete |
| fr | French | LTR | Complete |
| es | Spanish | LTR | Complete |

## Services

1. **iPhone Repair** (`/services/iphone-repair`)
2. **MacBook Repair** (`/services/macbook-repair`)
3. **Android Repair** (`/services/android-repair`)
4. **iPad & Tablet Repair** (`/services/ipad-repair`)
5. **Laptop Repair** (`/services/laptop-repair`)
6. **Smartwatch Repair** (`/services/smartwatch-repair`)

## Service Areas

1. **Dubai Marina** (`/areas/dubai-marina`)
2. **JLT** (`/areas/jlt`)
3. **JBR** (`/areas/jbr`)

## Configuration

### Site Config (`src/lib/constants.ts`)

```typescript
SITE_CONFIG = {
  name: "Genius Tech",
  url: "https://geniustech.ae",
  phone: "+971502719636",
  whatsapp: "+971547507842",
  email: "Geniustechmob@gmail.com",
  address: "West Avenue Building, Shop 1, Dubai Marina",
  mapsUrl: "https://maps.app.goo.gl/tofFaRBugv3Qn3st6",
  social: {
    instagram: "https://www.instagram.com/geniustechmobrepair",
    tiktok: "https://www.tiktok.com/@geniustech66",
    facebook: "https://www.facebook.com/MobileRepairGeniusTech"
  }
}
```

### Environment Variables (`.env.local`)

```env
# Site URL
NEXT_PUBLIC_SITE_URL=https://geniustech.ae

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Ads (optional)
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION=
NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION=
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Design System

### Brand Colors
- **Primary:** Blue gradient (#0066ff → cyan)
- **Accent:** Orange (#ff6b35)
- **WhatsApp:** Green (#25D366)

### Typography
- Font: Geist (Next.js default)
- RTL: System Arabic fonts

## Key Features

- **Static Generation (SSG)** - All 159 pages pre-rendered
- **Error Handling** - Custom 404, error boundaries
- **SEO** - Sitemap, robots.txt, schema markup
- **Analytics** - GA4 and Google Ads ready (env-based)
- **Performance** - Optimized images, lazy loading
- **Accessibility** - Semantic HTML, ARIA labels

## Adding Content

### New Service
1. Add to `src/data/services.ts`
2. Add translations in all `src/messages/*.json`
3. Page auto-generates at `/[locale]/services/[slug]`

### New Blog Post
1. Add to `src/data/blog.ts`
2. Page auto-generates at `/[locale]/blog/[slug]`

### New Language
1. Create `src/messages/{code}.json`
2. Add locale to `LOCALES` in `src/lib/constants.ts`
3. Add to `RTL_LOCALES` if right-to-left

## Important Notes

- WhatsApp is the primary CTA (not phone calls)
- Highlight "Inside Pluspoint Mini Mart" for directions
- Free pickup/delivery in JLT, JBR, Marina is key differentiator
- Dark mode is the default theme
- No specific warranty terms mentioned
