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
npm run build    # Build for production (generates 208 static pages)
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/[locale]/     # Locale-prefixed pages
├── components/       # React components
├── data/             # Static data (services, areas, blog)
├── messages/         # Translation files (7 languages)
└── lib/              # Utilities and constants
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://geniustechuae.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX      # Optional
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX         # Optional
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION=     # Optional
NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION=         # Optional
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy (auto-deploys on push to `main`)

**Current Setup:** geniustechuae.com via Vercel DNS

### Post-Deployment Checklist

- [ ] All 7 languages work (`/en`, `/ar`, `/hi`, `/ur`, `/ru`, `/fr`, `/es`)
- [ ] SSL active (HTTPS)
- [ ] Sitemap: `https://geniustechuae.com/sitemap.xml`
- [ ] Robots: `https://geniustechuae.com/robots.txt`
- [ ] PWA installable
- [ ] WhatsApp links work

## Audit Scores

### Production (geniustechuae.com)

| Dimension | Score | Status |
|-----------|-------|--------|
| Performance | 78/100 | ⚠️ Needs Work |
| Accessibility | 93/100 | ✅ Good |
| Best Practices | 100/100 | ✅ Excellent |
| SEO | 92/100 | ✅ Good |
| PWA | 75/100 | ⚠️ Needs Work |
| AISEO/GEO/AEO | 80/100 | ✅ Good |
| Mobile | 95/100 | ✅ Excellent |
| i18n | 100/100 | ✅ Excellent |
| **Overall** | **87/100** | ✅ Good |

### Localhost (Development)

| Page | Perf | A11y | BP | SEO |
|------|------|------|-----|-----|
| Homepage | 87 | 100 | 100 | 92 |
| Service | 91 | 100 | 100 | 92 |
| Arabic RTL | 87 | 100 | 100 | 92 |
| Contact | 70 | 95 | 100 | 92 |

*Tested January 21, 2026 via Lighthouse CLI*

## Documentation

- [Project Report](docs/PROJECT_REPORT.md) - Detailed audit scores, metrics, and recommendations
- [CLAUDE.md](CLAUDE.md) - Development guidelines and architecture

## License

Private - All rights reserved

---

**Genius Tech** - Dubai Marina, UAE
