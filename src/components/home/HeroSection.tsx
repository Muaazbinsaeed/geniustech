import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";
import { HeroBackgroundSlider } from "./HeroBackgroundSlider";

export async function HeroSection() {
  const t = await getTranslations("hero");
  const tTrust = await getTranslations("trust");
  const tCommon = await getTranslations("common");

  const whatsappLink = getWhatsAppLink(SITE_CONFIG.whatsapp, "Hi! I need help with device repair.");
  const phoneLink = getPhoneLink(SITE_CONFIG.phone);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16 md:pt-18 lg:pt-20">
      {/* Client-side background slider */}
      <HeroBackgroundSlider />

      {/* Server-rendered content - renders immediately for fast LCP */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Content Box with brand gradient background */}
          <div className="bg-gradient-to-br from-[#0a1628]/90 via-[#0d2847]/85 to-[#0f3460]/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border-l-4 border-orange shadow-2xl">
            {/* Static h1 - no animation for fast LCP */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6">
              <span className="text-white">{t("title")}</span>
              <br />
              <span className="gradient-text">{t("titleHighlight")}</span>
            </h1>

            {/* Static subtitle - LCP element, renders immediately */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mb-6 sm:mb-8">
              {t("subtitle")}
            </p>

            {/* CTA Buttons - static for performance */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button variant="whatsapp" size="lg" asChild>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t("cta.whatsapp")}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={phoneLink} className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  {t("cta.call")}
                </a>
              </Button>
            </div>

            {/* Trust Indicators - static for performance */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm font-medium">4.9 {tCommon("googleRating")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">{tTrust("sameDay")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">{tTrust("freePickup")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">{tCommon("premiumParts")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
