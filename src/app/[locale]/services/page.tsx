import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { servicesData } from "@/data/services";
import { SITE_CONFIG, type Locale } from "@/lib/constants";
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";

const iconMap: Record<string, typeof Smartphone> = {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
};

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const description = `Professional device repair services in Dubai. iPhone, MacBook, Android, iPad, laptop, and smartwatch repairs. Same-day service with free pickup in ${SITE_CONFIG.serviceAreas.join(", ")}.`;
  return {
    title: "Device Repair Services",
    description,
    alternates: generateAlternates(locale as Locale, "/services"),
    openGraph: {
      title: `Device Repair Services | ${SITE_CONFIG.name}`,
      description,
      type: "website",
      locale: getOGLocale(locale as Locale),
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/services`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `Device Repair Services | ${SITE_CONFIG.name}`,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const tService = await getTranslations("serviceData");

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero Banner */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=1600&q=80"
            alt="Device Repair Services"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4 backdrop-blur-sm">
                  {t("title")}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {t("subtitle")}
                </h1>
                <p className="text-lg text-foreground-muted max-w-xl">
                  {tCommon("expertRepairs")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => {
              const Icon = iconMap[service.icon] || Smartphone;
              const title = tService(`${service.id}.title`);
              const shortDesc = tService(`${service.id}.shortDesc`);

              return (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.slug}`}
                  className="group rounded-2xl bg-card border border-card-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] overflow-hidden"
                >
                  {/* Service Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-foreground-muted text-sm mb-4">
                      {shortDesc}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      <span className="text-sm">{tCommon("learnMore")}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
