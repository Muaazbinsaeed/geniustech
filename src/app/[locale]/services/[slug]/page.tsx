import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Check,
  MessageCircle,
  Phone,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { Button } from "@/components/ui/Button";
import { getAllServiceSlugs, getServiceBySlug } from "@/data/services";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

const iconMap: Record<string, typeof Smartphone> = {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  // Get translated title and description
  const tService = await getTranslations({ locale, namespace: `serviceData.${slug}` });
  const title = tService("title");
  const description = tService("description");

  return {
    title: `${title} Dubai | Same-Day Repair`,
    description: description,
    keywords: [
      `${title.toLowerCase()} dubai`,
      `${title.toLowerCase()} dubai marina`,
      `${title.toLowerCase()} jlt`,
      `${title.toLowerCase()} jbr`,
      "same day repair",
      "free pickup dubai",
    ],
  };
}

interface ServicePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tService = await getTranslations(`serviceData.${slug}`);

  const Icon = iconMap[service.icon] || Smartphone;

  const serviceTitle = tService("title");
  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    `Hi! I need help with ${serviceTitle}.`
  );
  const phoneLink = getPhoneLink(SITE_CONFIG.phone);

  // Get arrays from translations
  const features = tService.raw("features") as string[];
  const issues = tService.raw("issues") as { title: string; desc: string }[];
  const faqs = tService.raw("faqs") as { q: string; a: string }[];

  return (
    <>
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/5" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          {/* Hero Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={service.image}
              alt={serviceTitle}
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backTo")} {tNav("services")}
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {serviceTitle}
                </h1>
                <p className="text-lg text-foreground-muted mb-8">
                  {tService("description")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="whatsapp" size="lg" asChild>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
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

              {/* Service Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={service.image}
                  alt={serviceTitle}
                  width={600}
                  height={400}
                  className="object-cover w-full h-[300px] md:h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-white">
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{serviceTitle}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-background-secondary">
          <div className="container mx-auto px-4">
            <h2 className="font-bold text-2xl md:text-3xl text-center mb-8">{t("whatWeFix")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-card-border">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-500" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t("commonIssues")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-card-border hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2">{issue.title}</h3>
                  <p className="text-sm text-foreground-muted">
                    {issue.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t("faq")}
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group p-6 rounded-xl bg-card border border-card-border"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-medium pr-4">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-foreground-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-foreground-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-cyan/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("readyToFix")}
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              {t("contactUsWhatsapp")}
            </p>
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
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
