import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Check, Zap, Shield, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { Button } from "@/components/ui/Button";
import { ProductSchema } from "@/components/seo/SchemaMarkup";
import { SITE_CONFIG, LOCALES, type Locale } from "@/lib/constants";
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/utils";

// Generate static params for all locales
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  const title = `${t("metaTitle")} | ${SITE_CONFIG.name}`;
  const description = t("metaDescription");

  return {
    title,
    description,
    keywords: [
      "iPhone repair cost Dubai",
      "phone repair price Dubai Marina",
      "MacBook repair cost JLT",
      "screen replacement price Dubai",
      "battery replacement cost Dubai",
      "Samsung repair price JBR",
      "affordable phone repair Dubai",
      "cheap phone repair Dubai Marina",
      "laptop repair cost Dubai",
      "phone repair rates UAE",
    ],
    alternates: generateAlternates(locale as Locale, "/pricing"),
    openGraph: {
      title,
      description,
      type: "website",
      locale: getOGLocale(locale as Locale),
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/pricing`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

// Pricing data structure
const pricingData = {
  iphone: {
    category: "iPhone Repair",
    services: [
      { name: "iPhone 15 Pro Max Screen", minPrice: 800, maxPrice: 1200 },
      { name: "iPhone 15 Pro Screen", minPrice: 700, maxPrice: 1000 },
      { name: "iPhone 15/14 Pro Screen", minPrice: 600, maxPrice: 900 },
      { name: "iPhone 13/12 Pro Screen", minPrice: 400, maxPrice: 700 },
      { name: "iPhone 11/XS/X Screen", minPrice: 300, maxPrice: 500 },
      { name: "iPhone Battery (All Models)", minPrice: 150, maxPrice: 450 },
      { name: "iPhone Charging Port", minPrice: 150, maxPrice: 350 },
      { name: "iPhone Back Glass", minPrice: 200, maxPrice: 600 },
    ],
  },
  macbook: {
    category: "MacBook Repair",
    services: [
      { name: "MacBook Pro 16\" Screen", minPrice: 1500, maxPrice: 2500 },
      { name: "MacBook Pro 14\" Screen", minPrice: 1200, maxPrice: 2000 },
      { name: "MacBook Air M2 Screen", minPrice: 800, maxPrice: 1500 },
      { name: "MacBook Air M1 Screen", minPrice: 700, maxPrice: 1200 },
      { name: "MacBook Battery (All Models)", minPrice: 350, maxPrice: 950 },
      { name: "MacBook Keyboard", minPrice: 400, maxPrice: 1200 },
      { name: "MacBook Logic Board Repair", minPrice: 500, maxPrice: 1500 },
    ],
  },
  samsung: {
    category: "Samsung & Android Repair",
    services: [
      { name: "Samsung S24 Ultra Screen", minPrice: 600, maxPrice: 800 },
      { name: "Samsung S24/S23 Screen", minPrice: 400, maxPrice: 600 },
      { name: "Samsung A Series Screen", minPrice: 200, maxPrice: 400 },
      { name: "Google Pixel Screen", minPrice: 350, maxPrice: 600 },
      { name: "OnePlus Screen", minPrice: 300, maxPrice: 500 },
      { name: "Android Battery", minPrice: 150, maxPrice: 350 },
    ],
  },
  ipad: {
    category: "iPad Repair",
    services: [
      { name: "iPad Pro 12.9\" Screen", minPrice: 700, maxPrice: 1000 },
      { name: "iPad Pro 11\" Screen", minPrice: 500, maxPrice: 800 },
      { name: "iPad Air Screen", minPrice: 400, maxPrice: 600 },
      { name: "iPad Mini Screen", minPrice: 350, maxPrice: 500 },
      { name: "iPad Battery", minPrice: 250, maxPrice: 500 },
    ],
  },
  laptop: {
    category: "Laptop Repair",
    services: [
      { name: "Laptop Screen (15-17\")", minPrice: 500, maxPrice: 1200 },
      { name: "Laptop Screen (13-14\")", minPrice: 400, maxPrice: 900 },
      { name: "Laptop Battery", minPrice: 250, maxPrice: 600 },
      { name: "Laptop Keyboard", minPrice: 200, maxPrice: 600 },
      { name: "SSD Upgrade", minPrice: 200, maxPrice: 500 },
    ],
  },
  smartwatch: {
    category: "Smartwatch Repair",
    services: [
      { name: "Apple Watch Ultra Screen", minPrice: 500, maxPrice: 800 },
      { name: "Apple Watch Series 9/8 Screen", minPrice: 300, maxPrice: 500 },
      { name: "Apple Watch SE Screen", minPrice: 250, maxPrice: 400 },
      { name: "Apple Watch Battery", minPrice: 200, maxPrice: 400 },
    ],
  },
};

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");

  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    "Hi! I'd like to get a quote for device repair."
  );

  const highlights = [
    { icon: Zap, label: t("highlights.sameDay") },
    { icon: Truck, label: t("highlights.freePickup") },
    { icon: Shield, label: t("highlights.warranty") },
    { icon: Check, label: t("highlights.noHidden") },
  ];

  return (
    <>
      {/* Product Schema for each category */}
      {Object.entries(pricingData).map(([key, data]) => (
        <ProductSchema
          key={key}
          name={`${data.category} Services in Dubai`}
          description={`Professional ${data.category.toLowerCase()} services in Dubai Marina, JLT, JBR. Same-day service with warranty.`}
          category={data.category}
          offers={data.services.map((s) => ({
            name: s.name,
            minPrice: s.minPrice,
            maxPrice: s.maxPrice,
            description: `${s.name} repair service`,
          }))}
        />
      ))}

      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-cyan/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {t("badge")}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("title")}
              </h1>
              <p className="text-lg text-foreground-muted mb-6">
                {t("subtitle")}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer - AEO Optimized */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm text-foreground-muted mb-2">{t("quickAnswer.label")}</p>
              <p className="text-xl font-semibold quick-answer">{t("quickAnswer.value")}</p>
            </div>
          </div>
        </section>

        {/* Pricing Tables */}
        {Object.entries(pricingData).map(([key, data]) => (
          <section
            key={key}
            className="py-12 even:bg-background-secondary"
            id={key}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">{data.category}</h2>
                <div className="bg-card border border-card-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-background-secondary">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          {t("table.service")}
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold">
                          {t("table.price")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {data.services.map((service, index) => (
                        <tr key={index} className="hover:bg-background-secondary/50 transition-colors">
                          <td className="px-4 py-3 text-sm">{service.name}</td>
                          <td className="px-4 py-3 text-sm text-right font-medium">
                            <span className="text-primary">
                              AED {service.minPrice}
                            </span>
                            {service.minPrice !== service.maxPrice && (
                              <span className="text-foreground-muted">
                                {" "}- {service.maxPrice}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-foreground-muted mt-3 text-center">
                  {t("table.disclaimer")}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-cyan/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-foreground-muted mb-8">
                {t("cta.subtitle")}
              </p>
              <Button variant="whatsapp" size="lg" asChild>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t("cta.button")}
                </a>
              </Button>
              <p className="text-sm text-foreground-muted mt-4">
                {t("cta.response")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
