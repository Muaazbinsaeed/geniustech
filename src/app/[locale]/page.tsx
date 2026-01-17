import { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/home/HeroSlider";
import { TrustBar } from "@/components/home/TrustBar";
import { SITE_CONFIG, type Locale } from "@/lib/constants";
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { VideoSchema } from "@/components/seo/SchemaMarkup";

// Dynamic imports for below-fold components (code splitting)
const VideoShortsSection = dynamic(() => import("@/components/home/VideoShortsSection").then(mod => ({ default: mod.VideoShortsSection })));
const Services = dynamic(() => import("@/components/home/Services").then(mod => ({ default: mod.Services })));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs").then(mod => ({ default: mod.WhyChooseUs })));
const ServiceAreas = dynamic(() => import("@/components/home/ServiceAreas").then(mod => ({ default: mod.ServiceAreas })));
const Reviews = dynamic(() => import("@/components/home/Reviews").then(mod => ({ default: mod.Reviews })));
const CTASection = dynamic(() => import("@/components/home/CTASection").then(mod => ({ default: mod.CTASection })));
const WhatsAppFAB = dynamic(() => import("@/components/shared/WhatsAppFAB").then(mod => ({ default: mod.WhatsAppFAB })));

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${SITE_CONFIG.name} | Dubai's Fastest Device Repair Service | Same-Day Repair`,
    description: `Dubai's #1 phone & laptop repair service. Same-day iPhone, MacBook, Samsung repair in Dubai Marina, JLT & JBR. Free pickup & delivery. Expert technicians, premium parts, affordable prices. Call now!`,
    keywords: [
      // Primary keywords
      "phone repair dubai",
      "iphone repair dubai",
      "iphone repair dubai marina",
      "mobile repair dubai",
      "phone repair near me dubai",
      // Device-specific keywords
      "macbook repair dubai",
      "macbook repair jlt",
      "samsung repair dubai",
      "laptop repair dubai",
      "laptop repair jbr",
      "ipad repair dubai",
      "android repair dubai",
      // Service-specific keywords
      "iphone screen repair dubai",
      "iphone battery replacement dubai",
      "screen replacement dubai marina",
      "same day phone repair dubai",
      "emergency phone repair dubai",
      // Location keywords
      "phone repair jlt",
      "phone repair jbr",
      "mobile repair dubai marina",
      "device repair near me",
      // Long-tail keywords
      "best iphone repair dubai marina",
      "affordable phone repair dubai",
      "fast laptop repair dubai",
      "free pickup delivery dubai",
      "iphone 15 repair dubai",
      "iphone 14 screen repair dubai",
      // Brand keywords
      "apple repair dubai",
      "samsung galaxy repair dubai",
      "google pixel repair dubai",
      "device repair uae",
    ],
    alternates: generateAlternates(locale as Locale, ""),
    openGraph: {
      title: `${SITE_CONFIG.name} | Dubai's Fastest Device Repair | Same-Day Service`,
      description: `Dubai's #1 phone & laptop repair. Same-day iPhone, MacBook, Samsung repair in Dubai Marina, JLT & JBR. Free pickup & delivery!`,
      type: "website",
      locale: getOGLocale(locale as Locale),
      url: `${SITE_CONFIG.url}/${locale}`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_CONFIG.name} | Same-Day Phone Repair Dubai`,
      description: `Dubai's fastest device repair. iPhone, MacBook, Samsung repair in Dubai Marina. Free pickup!`,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <VideoSchema videos={SITE_CONFIG.location.youtubeShorts} />
      <Header />
      <main id="main-content">
        <HeroSlider />
        <TrustBar />
        <VideoShortsSection videos={SITE_CONFIG.location.youtubeShorts} />
        <Services />
        <WhyChooseUs />
        <ServiceAreas />
        <Reviews />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
