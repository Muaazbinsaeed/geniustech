# Genius Tech - Dubai Device Repair

A modern, multi-lingual website for Genius Tech, Dubai's fastest device repair service.

## Features

- **7 Languages** - English, Arabic, Hindi, Urdu, Russian, French, Spanish
- **RTL Support** - Full right-to-left layout for Arabic and Urdu
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-first, works on all devices
- **SEO Optimized** - Sitemap, robots.txt, schema markup
- **Analytics Ready** - Google Analytics & Ads integration

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **next-intl** - Internationalization
- **Framer Motion** - Animations
- **TypeScript** - Type safety

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/[locale]/     # Pages with locale routing
├── components/       # React components
├── data/            # Static data (services, areas, blog)
├── messages/        # Translation files (7 languages)
└── lib/             # Utilities and constants
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/services` | All repair services |
| `/services/[slug]` | Individual service |
| `/areas` | Service areas |
| `/areas/[area]` | Individual area |
| `/blog` | Blog articles |
| `/blog/[slug]` | Blog post |
| `/about` | About us |
| `/contact` | Contact page |

## Configuration

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SITE_URL=https://geniustech.ae
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

## License

Private - All rights reserved

---

**Genius Tech** - Dubai Marina, UAE
