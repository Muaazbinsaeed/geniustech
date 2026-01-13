import { Metadata } from "next";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/home/HeroSlider";
import { TrustBar } from "@/components/home/TrustBar";
import { SITE_CONFIG } from "@/lib/constants";

// Dynamic imports for below-fold components (code splitting)
const VideoSection = dynamic(() => import("@/components/home/VideoSection").then(mod => ({ default: mod.VideoSection })));
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
    title: `${SITE_CONFIG.name} | Dubai's Fastest Device Repair Service`,
    description: SITE_CONFIG.description,
    keywords: [
      "phone repair dubai",
      "iphone repair dubai marina",
      "macbook repair jlt",
      "laptop repair jbr",
      "same day phone repair dubai",
      "free pickup delivery dubai",
      "samsung repair dubai",
      "device repair uae",
    ],
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
    },
    openGraph: {
      title: `${SITE_CONFIG.name} | Dubai's Fastest Device Repair`,
      description: SITE_CONFIG.description,
      type: "website",
      locale: "en_AE",
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSlider />
        <TrustBar />
        <VideoSection
          videoId={SITE_CONFIG.location.youtubeVideoId || undefined}
          videoUrl={SITE_CONFIG.location.videoUrl || undefined}
        />
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
