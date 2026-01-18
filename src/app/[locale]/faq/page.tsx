import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ChevronDown, Search, MessageCircle, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { Button } from "@/components/ui/Button";
import { FAQPageSchema } from "@/components/seo/SchemaMarkup";
import { SITE_CONFIG, LOCALES, type Locale } from "@/lib/constants";
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

// Generate static params for all locales
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  const title = `${t("metaTitle")} | ${SITE_CONFIG.name}`;
  const description = t("metaDescription");

  return {
    title,
    description,
    keywords: [
      "phone repair FAQ Dubai",
      "iPhone repair cost Dubai",
      "MacBook repair questions",
      "phone repair time Dubai",
      "screen repair warranty Dubai",
      "phone repair pickup Dubai",
      "same day repair FAQ",
      "water damage repair FAQ",
      "battery replacement questions",
      "phone repair Dubai Marina FAQ",
    ],
    alternates: generateAlternates(locale as Locale, "/faq"),
    openGraph: {
      title,
      description,
      type: "website",
      locale: getOGLocale(locale as Locale),
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/faq`,
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

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const tService = await getTranslations("serviceData");

  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    "Hi! I have a question about your repair services."
  );
  const phoneLink = getPhoneLink(SITE_CONFIG.phone);

  // Aggregate FAQs from all services
  const serviceCategories = [
    { key: "iphone-repair", name: t("categories.iphone") },
    { key: "macbook-repair", name: t("categories.macbook") },
    { key: "android-repair", name: t("categories.android") },
    { key: "ipad-repair", name: t("categories.ipad") },
    { key: "laptop-repair", name: t("categories.laptop") },
    { key: "smartwatch-repair", name: t("categories.smartwatch") },
  ];

  // Get FAQs from translation files
  const allFaqs: FAQ[] = [];
  const faqsByCategory: Record<string, FAQ[]> = {};

  for (const category of serviceCategories) {
    try {
      const faqs = tService.raw(`${category.key}.faqs`) as { q: string; a: string }[];
      if (Array.isArray(faqs)) {
        faqsByCategory[category.key] = faqs.map((faq) => ({
          question: faq.q,
          answer: faq.a,
          category: category.name,
        }));
        allFaqs.push(...faqsByCategory[category.key]);
      }
    } catch {
      faqsByCategory[category.key] = [];
    }
  }

  // General FAQs
  const generalFaqs: FAQ[] = [
    {
      question: t("general.pickup.q"),
      answer: t("general.pickup.a"),
      category: t("categories.general"),
    },
    {
      question: t("general.warranty.q"),
      answer: t("general.warranty.a"),
      category: t("categories.general"),
    },
    {
      question: t("general.time.q"),
      answer: t("general.time.a"),
      category: t("categories.general"),
    },
    {
      question: t("general.payment.q"),
      answer: t("general.payment.a"),
      category: t("categories.general"),
    },
    {
      question: t("general.quote.q"),
      answer: t("general.quote.a"),
      category: t("categories.general"),
    },
  ];

  // Combine all FAQs for schema
  const schemaFaqs = [...generalFaqs, ...allFaqs].map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <FAQPageSchema
        faqs={schemaFaqs}
        pageUrl={`${SITE_CONFIG.url}/${locale}/faq`}
        pageName={t("title")}
      />
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-cyan/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Search className="h-4 w-4" />
                {t("badge")}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("title")}
              </h1>
              <p className="text-lg text-foreground-muted">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Answer Section - AEO Optimized */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-center">{t("quickAnswers")}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card border border-card-border">
                  <p className="text-sm text-foreground-muted mb-1">{t("qa.cost.label")}</p>
                  <p className="font-semibold quick-answer">{t("qa.cost.value")}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-card-border">
                  <p className="text-sm text-foreground-muted mb-1">{t("qa.time.label")}</p>
                  <p className="font-semibold quick-answer">{t("qa.time.value")}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-card-border">
                  <p className="text-sm text-foreground-muted mb-1">{t("qa.warranty.label")}</p>
                  <p className="font-semibold quick-answer">{t("qa.warranty.value")}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-card-border">
                  <p className="text-sm text-foreground-muted mb-1">{t("qa.pickup.label")}</p>
                  <p className="font-semibold quick-answer">{t("qa.pickup.value")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* General FAQs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{t("categories.general")}</h2>
              <div className="space-y-4">
                {generalFaqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group rounded-xl bg-card border border-card-border overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                      <span className="font-medium faq-question pr-4">{faq.question}</span>
                      <ChevronDown className="h-5 w-5 text-foreground-muted transition-transform group-open:rotate-180 flex-shrink-0" />
                    </summary>
                    <div className="px-4 pb-4 text-foreground-muted faq-answer">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service-Specific FAQs */}
        {serviceCategories.map((category) => {
          const faqs = faqsByCategory[category.key];
          if (!faqs || faqs.length === 0) return null;

          return (
            <section key={category.key} className="py-12 even:bg-background-secondary">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="group rounded-xl bg-card border border-card-border overflow-hidden"
                      >
                        <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                          <span className="font-medium faq-question pr-4">{faq.question}</span>
                          <ChevronDown className="h-5 w-5 text-foreground-muted transition-transform group-open:rotate-180 flex-shrink-0" />
                        </summary>
                        <div className="px-4 pb-4 text-foreground-muted faq-answer">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Still Have Questions CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-cyan/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-foreground-muted mb-8">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
