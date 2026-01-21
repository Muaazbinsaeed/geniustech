import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  MapPin,
  Check,
  Phone,
  ArrowLeft,
  Truck,
  Clock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { Button } from "@/components/ui/Button";
import { getAllAreaSlugs, getAreaBySlug } from "@/data/areas";
import { servicesData } from "@/data/services";
import { SITE_CONFIG, type Locale } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink, safeArray } from "@/lib/utils";
import { generateAlternates, getOGLocale } from "@/lib/seo";
import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

export async function generateStaticParams() {
  return getAllAreaSlugs().map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string; locale: string }>;
}): Promise<Metadata> {
  const { area, locale } = await params;
  const areaData = getAreaBySlug(area);

  if (!areaData) {
    return { title: "Area Not Found" };
  }

  const tArea = await getTranslations({ locale, namespace: "areaData" });
  const name = tArea(`${area}.name`);

  // Generate area-specific keywords
  const areaKeywords: Record<string, string[]> = {
    "dubai-marina": [
      "phone repair dubai marina",
      "iphone repair dubai marina",
      "mobile repair west avenue",
      "phone fix marina walk",
      "laptop repair marina",
      "samsung repair dubai marina",
      "device repair near marina mall",
    ],
    "jlt": [
      "phone repair jlt",
      "iphone repair jumeirah lake towers",
      "mobile repair jlt cluster",
      "laptop repair jlt dubai",
      "samsung repair jlt",
      "phone screen repair jlt",
    ],
    "jbr": [
      "phone repair jbr",
      "iphone repair jumeirah beach residence",
      "mobile repair the walk jbr",
      "laptop repair jbr dubai",
      "samsung repair jbr",
      "device repair near jbr",
    ],
  };

  const specificKeywords = areaKeywords[area] || [];

  return {
    title: `Phone & Laptop Repair ${name} | Free Pickup | Same-Day Service`,
    description: `Expert phone, laptop & device repair in ${name}. Free pickup & delivery, same-day service. iPhone, MacBook, Samsung repair by certified technicians. WhatsApp us now!`,
    keywords: [
      `phone repair ${name.toLowerCase()}`,
      `laptop repair ${name.toLowerCase()}`,
      `iphone repair ${name.toLowerCase()}`,
      `macbook repair ${name.toLowerCase()}`,
      `free pickup ${name.toLowerCase()}`,
      `same day repair ${name.toLowerCase()}`,
      `mobile repair ${name.toLowerCase()}`,
      ...specificKeywords,
    ],
    alternates: generateAlternates(locale as Locale, `/areas/${area}`),
    openGraph: {
      title: `Phone Repair ${name} | Free Pickup & Delivery | ${SITE_CONFIG.name}`,
      description: `Expert device repair in ${name}. Free pickup, same-day service!`,
      type: "website",
      locale: getOGLocale(locale as Locale),
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/areas/${area}`,
      images: [areaData.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `Phone Repair ${name} | Free Pickup | ${SITE_CONFIG.name}`,
      description: `Expert device repair with free pickup in ${name}!`,
      images: [areaData.image],
    },
  };
}

interface AreaPageProps {
  params: Promise<{ area: string; locale: string }>;
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area, locale } = await params;
  setRequestLocale(locale);

  const areaData = getAreaBySlug(area);

  if (!areaData) {
    notFound();
  }

  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tService = await getTranslations("serviceData");
  const tArea = await getTranslations("areaData");

  // Get translated area data with safe defaults
  const name = tArea(`${area}.name`);
  const fullName = tArea(`${area}.fullName`);
  const description = tArea(`${area}.description`);
  const highlights = safeArray(tArea.raw(`${area}.highlights`) as string[] | undefined);
  const landmarks = safeArray(tArea.raw(`${area}.landmarks`) as string[] | undefined);

  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    `Hi! I need device repair service in ${name}.`
  );
  const phoneLink = getPhoneLink(SITE_CONFIG.phone);

  // Prepare breadcrumb data
  const breadcrumbs = [
    { name: "Home", url: `${SITE_CONFIG.url}/${locale}` },
    { name: tNav("areas"), url: `${SITE_CONFIG.url}/${locale}/areas` },
    { name: name, url: `${SITE_CONFIG.url}/${locale}/areas/${area}` },
  ];

  return (
    <>
      {/* SEO Schema Markup */}
      <LocalBusinessSchema />
      <BreadcrumbSchema items={breadcrumbs} />

      <Header />
      <main id="main-content" className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/5" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          {/* Background Area Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={areaData.image}
              alt={`${name} skyline`}
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <Link
              href={`/${locale}/areas`}
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backTo")} {tNav("areas")}
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-sm font-medium mb-6">
                  <Truck className="h-4 w-4" />
                  {t("freePickupDelivery")}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {t("deviceRepairIn")} {name}
                </h1>
                <p className="text-lg text-foreground-muted mb-8">
                  {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="whatsapp" size="lg" asChild>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      {t("getFreeQuote")}
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={phoneLink} className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      {t("callNow")}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Area Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={areaData.image}
                  alt={name}
                  width={600}
                  height={400}
                  className="object-cover w-full h-[300px] md:h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white font-bold text-2xl mb-2">{fullName}</h2>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{t("freePickupDelivery")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t("serviceHighlights")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-card-border">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Available */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t("servicesAvailableIn")} {name}
            </h2>
            <p className="text-foreground-muted text-center mb-12 max-w-2xl mx-auto">
              {t("weRepairAllDevices")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData.map((service) => (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.slug}`}
                  className="p-6 rounded-xl bg-card border border-card-border hover:border-primary/30 transition-colors group"
                >
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {tService(`${service.id}.title`)}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {tService(`${service.id}.shortDesc`)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t("howItWorks")}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <WhatsAppIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">1. {t("step1Title")}</h3>
                <p className="text-sm text-foreground-muted">
                  {t("step1Desc")}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">2. {t("step2Title")}</h3>
                <p className="text-sm text-foreground-muted">
                  {t("step2Desc")}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3. {t("step3Title")}</h3>
                <p className="text-sm text-foreground-muted">
                  {t("step3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Landmarks */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t("servingAll")} {name}
            </h2>
            <p className="text-foreground-muted text-center mb-8">
              {t("nearLandmarks")}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {landmarks.map((landmark, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-card border border-card-border text-sm flex items-center gap-2"
                >
                  <MapPin className="h-3 w-3 text-primary" />
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-cyan/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("needRepairIn")} {name}?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              {t("contactUsPickup")}
            </p>
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t("whatsappUsNow")}
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
