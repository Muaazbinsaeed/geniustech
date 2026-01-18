import { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Shield, Award, Zap, Heart } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { Button } from "@/components/ui/Button";
import { AboutPageSchema } from "@/components/seo/SchemaMarkup";
import { SITE_CONFIG, type Locale } from "@/lib/constants";
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/utils";

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const description = `${SITE_CONFIG.name} - Dubai Marina's trusted phone & laptop repair experts. Certified technicians, genuine parts, same-day service. Serving Dubai Marina, JLT, JBR since 2018. 5000+ repairs completed.`;
  return {
    title: `About ${SITE_CONFIG.name} | Dubai Marina's Trusted Phone Repair Experts`,
    description,
    keywords: [
      "genius tech dubai",
      "phone repair company dubai",
      "trusted repair shop dubai marina",
      "certified phone technicians dubai",
      "best repair shop jlt",
      "reliable laptop repair dubai",
      "professional device repair uae",
    ],
    alternates: generateAlternates(locale as Locale, "/about"),
    openGraph: {
      title: `About ${SITE_CONFIG.name} | Dubai Marina's Expert Phone Repair Team`,
      description,
      type: "website",
      locale: getOGLocale(locale as Locale),
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/about`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `About ${SITE_CONFIG.name} | Dubai's Phone Repair Experts`,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    "Hi! I'd like to learn more about your services."
  );

  const values = [
    {
      icon: Shield,
      titleKey: "quality",
    },
    {
      icon: Zap,
      titleKey: "speed",
    },
    {
      icon: Heart,
      titleKey: "care",
    },
    {
      icon: Award,
      titleKey: "expertise",
    },
  ];

  return (
    <>
      <AboutPageSchema />
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero Banner */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          {/* Background Image - Tech workspace / Team */}
          <Image
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=80"
            alt="About Genius Tech"
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
                  {t("badge")}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {t("title")}
                </h1>
                <p className="text-lg text-foreground-muted max-w-xl">
                  {t("subtitle")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t("storyTitle")}
                </h2>
                <div className="space-y-4 text-foreground-muted">
                  <p>{t("description")}</p>
                  <p>{t("mission")}</p>
                  <p>{t("promise")}</p>
                </div>

                <div className="mt-8">
                  <Button variant="whatsapp" asChild>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      {t("contactUs")}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Stats with Background Image - Dubai tech scene */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl overflow-hidden -z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1722502831583-b4e93ecc6027?w=800&q=80"
                    alt="Dubai Marina tech scene"
                    fill
                    className="object-cover opacity-10"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-card border border-card-border text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">5000+</div>
                    <div className="text-sm text-foreground-muted">Repairs Completed</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-card border border-card-border text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">4.9★</div>
                    <div className="text-sm text-foreground-muted">Google Rating</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-card border border-card-border text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">Same Day</div>
                    <div className="text-sm text-foreground-muted">Service</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-card border border-card-border text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">Free</div>
                    <div className="text-sm text-foreground-muted">Pickup & Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t("valuesTitle")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-card-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t(`values.${value.titleKey}.title`)}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {t(`values.${value.titleKey}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tagline Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <blockquote className="text-2xl md:text-3xl font-medium italic text-foreground-muted max-w-3xl mx-auto">
              &quot;{SITE_CONFIG.tagline}&quot;
            </blockquote>
            <p className="mt-4 text-primary font-semibold">— The Genius Tech Promise</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-cyan/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              {t("ctaSubtitle")}
            </p>
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t("ctaButton")}
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
