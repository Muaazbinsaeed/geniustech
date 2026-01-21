# Genius Tech UAE

A multi-language device repair service website for Dubai's fastest repair shop.

**Live Site:** [geniustechuae.com](https://geniustechuae.com)

## Features

- **7 Languages** - English, Arabic, Hindi, Urdu, Russian, French, Spanish
- **RTL Support** - Full right-to-left layout for Arabic and Urdu
- **Dark/Light Mode** - Theme toggle with system preference detection
- **PWA Ready** - Installable app with offline support
- **SEO Optimized** - Schema markup, sitemap, hreflang, AI crawler support

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **Tailwind CSS 4**
- **next-intl** for i18n
- **Framer Motion** for animations
- **TypeScript**

## Quick Start

```bash
npm install
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/[locale]/     # Locale-prefixed pages (208 static pages)
├── components/       # React components
├── data/             # Static data (services, areas, blog)
├── messages/         # Translation files (7 languages)
└── lib/              # Utilities and constants
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/services` | All repair services |
| `/services/[slug]` | Individual service (6 services) |
| `/areas` | Service areas |
| `/areas/[area]` | Individual area (3 areas) |
| `/blog` | Blog articles |
| `/blog/[slug]` | Blog post |
| `/about` | About page |
| `/contact` | Contact page |

## Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SITE_URL=https://geniustechuae.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX      # Optional
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX         # Optional
```

## Deployment

Deployed to **Vercel** with auto-deploy on push to `main`.

1. Import project at [vercel.com](https://vercel.com)
2. Add environment variables (optional)
3. Deploy

Custom domain configured with Vercel DNS.

## Documentation

- [Project Report](docs/PROJECT_REPORT.md) - Detailed audit scores and recommendations
- [CLAUDE.md](CLAUDE.md) - Development guidelines and architecture

## Lighthouse Scores

| Metric | Homepage | Service Page |
|--------|----------|--------------|
| Performance | 74 | 92 |
| Accessibility | 93 | 96 |
| Best Practices | 100 | 100 |
| SEO | 92 | 92 |

*Tested January 21, 2026*

## License

Private - All rights reserved

---

**Genius Tech** - Dubai Marina, UAE
