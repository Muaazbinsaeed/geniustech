import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { locales } from "@/i18n/config";
import { getDirection } from "@/i18n/config";
import { SITE_CONFIG, LOCALES } from "@/lib/constants";
import {
  LocalBusinessSchema,
  OrganizationSchema,
  WebSiteSchema,
  ActionSchema,
} from "@/components/seo/SchemaMarkup";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleAds } from "@/components/analytics/GoogleAds";
import { DevToolbar } from "@/components/dev/DevToolbar";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} - Dubai's Fastest Device Repair`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "phone repair dubai",
    "iphone repair dubai marina",
    "macbook repair jlt",
    "laptop repair jbr",
    "mobile repair dubai",
    "same day phone repair",
    "screen replacement dubai",
    "battery replacement dubai",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - Dubai's Fastest Device Repair`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Dubai Device Repair Service`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Dubai's Fastest Device Repair`,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai Marina",
    "geo.position": "25.0818;55.1367",
    "ICBM": "25.0818, 55.1367",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = getDirection(locale as typeof locales[number]);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* Theme flash prevention - must be first */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='dark'||(!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />

        {/* Critical resource hints - fonts only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Non-critical DNS prefetch */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />

        {/* Preload hero image for faster LCP - desktop */}
        <link rel="preload" href="/images/hero/shop-interior.jpg" as="image" media="(min-width: 768px)" />
        {/* Mobile-specific smaller image preload */}
        <link rel="preload" href="/images/hero/shop-interior.jpg" as="image" media="(max-width: 767px)" fetchPriority="high" />

        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0066ff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE_CONFIG.name} />

        {/* Hreflang tags for multi-language SEO */}
        {LOCALES.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`${SITE_CONFIG.url}/${loc}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_CONFIG.url}/en`} />

        {/* Structured Data / Schema Markup */}
        <LocalBusinessSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <ActionSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="skip-to-content"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <GoogleAds />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <DevToolbar />
      </body>
    </html>
  );
}
