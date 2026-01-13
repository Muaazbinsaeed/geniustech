# Genius Tech - Dubai Device Repair

A modern, multi-lingual website for Genius Tech, Dubai's fastest device repair service.

## Features

- **7 Languages** - English 🇬🇧, Arabic 🇦🇪, Hindi 🇮🇳, Urdu 🇵🇰, Russian 🇷🇺, French 🇫🇷, Spanish 🇪🇸
- **RTL Support** - Full right-to-left layout for Arabic and Urdu
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-first, works on all devices
- **WhatsApp Integration** - Primary CTA with official WhatsApp Business icon
- **SEO Optimized** - Sitemap, robots.txt, schema markup, hreflang tags
- **Video Integration** - YouTube Shorts with VideoObject schema
- **Analytics Ready** - Google Analytics & Ads integration
- **PWA Support** - Offline-ready progressive web app

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

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://geniustech.ae

# Google Analytics (Optional)
# Get your Measurement ID from Google Analytics dashboard
# Format: G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Google Ads (Optional)
# Get your Conversion ID from Google Ads dashboard
# Format: AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=

# Google Ads Conversion Labels (Optional)
# Get these from your Google Ads conversion actions
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION=
NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION=
```

**Note:** All environment variables are optional. The site will work without them, but analytics and conversion tracking will be disabled.

## Deployment

### Deploy to Vercel (Recommended)

**Step 1: Go to Vercel**
- Visit [vercel.com](https://vercel.com) and sign in with GitHub

**Step 2: Import Project**
1. Click **"Add New..."** → **"Project"**
2. Find **"geniustech"** in your repository list
3. Click **"Import"**

**Step 3: Configure Project**
- Leave defaults as-is
- Optionally add environment variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Your GA4 ID (optional) |

**Step 4: Deploy**
- Click **"Deploy"** and wait ~2 minutes
- You'll get a URL like `https://geniustech.vercel.app`

**Step 5: Custom Domain (Optional)**
1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `geniustech.ae`)
3. Update your domain DNS:
   - **A Record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com`

Your site will auto-deploy on every push to `main`.

### Pre-Deployment Checklist

- [ ] Create `og-image.jpg` (1200x630px) in `/public` folder
- [ ] Set environment variables in Vercel dashboard
- [ ] Configure custom domain (if applicable)
- [ ] Test all language routes after deployment

## License

Private - All rights reserved

---

**Genius Tech** - Dubai Marina, UAE
