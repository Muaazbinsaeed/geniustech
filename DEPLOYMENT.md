# Deployment Guide

This document provides detailed instructions for deploying the Genius Tech website.

## Pre-Deployment Checklist

### 1. Environment Variables

Set up the following environment variables in your deployment platform:

```env
NEXT_PUBLIC_SITE_URL=https://geniustechuae.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION=
NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION=
```

**Note:** All variables are optional. The site will work without them, but analytics will be disabled.

### 2. Required Assets

#### Open Graph Image (OG Image)

**Status:** ⚠️ **REQUIRED** - Currently missing

**What you need:**
- Create an image file: `public/og-image.jpg`
- Dimensions: **1200x630 pixels** (recommended for social media)
- Format: JPG or PNG
- File size: Keep under 1MB for fast loading

**What to include in the image:**
- Genius Tech logo
- Tagline: "Dubai's Fastest Device Repair"
- Visual elements: Phone/device imagery, Dubai Marina location reference
- Brand colors: Primary blue (#0066ff) and orange accent

**Tools to create:**
- Canva (template: "Open Graph Image")
- Figma
- Photoshop
- Online OG image generators

**Why it's important:**
- Shows a preview when sharing on Facebook, Twitter, LinkedIn, WhatsApp
- Improves click-through rates from social media
- Required for proper SEO and social media optimization

**Current status:** The site references `/og-image.jpg` in metadata, but the file doesn't exist. Social media shares will show a generic preview until this is added.

### 3. Build Configuration

The project is configured for:
- **Framework:** Next.js 16.1.1
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (handled automatically by Next.js)
- **Node Version:** 18.x or higher recommended

### 4. Domain Configuration

1. Point your domain to your hosting provider
2. Configure DNS records (A record or CNAME)
3. Enable SSL/HTTPS (automatic on most platforms)
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Deployment Platforms

### Option 1: Vercel (Recommended)

**Why:** Built by Next.js creators, zero configuration needed

**Steps:**
1. Push code to GitHub/GitLab/Bitbucket
2. Sign up at [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables in project settings
6. Deploy (automatic on every push)

**Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- Automatic SSL
- Global CDN

**If you exceed 100GB:** Upgrade to Pro ($20/mo) or switch to Cloudflare Pages

### Option 2: Cloudflare Pages

**Why:** Unlimited bandwidth on free tier

**Steps:**
1. Push code to Git repository
2. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect repository
4. Build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
5. Add environment variables
6. Deploy

**Free Tier:**
- Unlimited bandwidth
- 500 builds/month
- Automatic SSL
- Global CDN

### Option 3: Netlify

**Steps:**
1. Connect Git repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

**Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month

## Post-Deployment

### 1. Verify Deployment

- [ ] Site loads correctly
- [ ] All 7 languages work (`/en`, `/ar`, `/hi`, `/ur`, `/ru`, `/fr`, `/es`)
- [ ] SSL certificate is active (HTTPS)
- [ ] Images load correctly
- [ ] WhatsApp links work
- [ ] PWA manifest loads

### 2. SEO Verification

- [ ] Sitemap accessible: `https://yourdomain.com/sitemap.xml`
- [ ] Robots.txt accessible: `https://yourdomain.com/robots.txt`
- [ ] OG image loads: `https://yourdomain.com/og-image.jpg` (after creation)
- [ ] All pages have proper meta tags
- [ ] Schema markup validates (use Google Rich Results Test)

### 3. Analytics Setup

- [ ] Google Analytics tracking works (if configured)
- [ ] Google Ads conversion tracking works (if configured)
- [ ] Test conversion events (WhatsApp clicks, phone calls)

### 4. Performance Check

- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Check Core Web Vitals (LCP < 2.5s, CLS < 0.1)
- [ ] Test on mobile devices
- [ ] Verify PWA installation works
- [ ] Test all 7 language versions

### 5. AI/GEO Verification

- [ ] llms.txt accessible: `https://geniustechuae.com/llms.txt`
- [ ] Schema markup validates at validator.schema.org
- [ ] Rich Results Test passes

## Troubleshooting

### Build Fails

**Error:** "Module not found"
- Solution: Run `npm install` locally, commit `package-lock.json`

**Error:** "Type errors"
- Solution: Fix TypeScript errors before deploying

### Images Not Loading

- Check image URLs are accessible
- Verify `next.config.ts` remote patterns include your image domains
- Ensure images have proper alt text

### Environment Variables Not Working

- Verify variables are set in deployment platform
- Check variable names match exactly (case-sensitive)
- Restart deployment after adding variables

### PWA Not Working

- Ensure `next-pwa` is properly configured
- Check service worker is generated in build
- Verify `manifest.json` is accessible

## Support

For deployment issues:
1. Check build logs in your hosting platform
2. Review Next.js deployment documentation
3. Check GitHub issues for known problems

---

**Last Updated:** January 2026
