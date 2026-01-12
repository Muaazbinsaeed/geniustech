import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/home/HeroSlider";
import { TrustBar } from "@/components/home/TrustBar";
import { VideoSection } from "@/components/home/VideoSection";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { Reviews } from "@/components/home/Reviews";
import { CTASection } from "@/components/home/CTASection";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
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
  openGraph: {
    title: `${SITE_CONFIG.name} | Dubai's Fastest Device Repair`,
    description: SITE_CONFIG.description,
    type: "website",
    locale: "en_AE",
  },
};

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
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
