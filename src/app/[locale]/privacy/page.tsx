import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { SITE_CONFIG, type Locale } from "@/lib/constants";
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const description = `Privacy Policy for ${SITE_CONFIG.name}. Learn how we collect, use, and protect your personal information.`;
  return {
    title: "Privacy Policy | Genius Tech",
    description,
    alternates: generateAlternates(locale as Locale, "/privacy"),
    openGraph: {
      title: `Privacy Policy | ${SITE_CONFIG.name}`,
      description,
      type: "website",
      locale: getOGLocale(locale as Locale),
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/privacy`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: `Privacy Policy | ${SITE_CONFIG.name}`,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {tCommon("backToHome")}
          </Link>

          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("title")}</h1>
            <p className="text-foreground-muted mb-8">{t("lastUpdated")}: January 2026</p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.intro.title")}</h2>
                <p className="text-foreground-muted">{t("sections.intro.content")}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.collection.title")}</h2>
                <p className="text-foreground-muted mb-4">{t("sections.collection.content")}</p>
                <ul className="list-disc pl-6 space-y-2 text-foreground-muted">
                  <li>{t("sections.collection.items.name")}</li>
                  <li>{t("sections.collection.items.contact")}</li>
                  <li>{t("sections.collection.items.device")}</li>
                  <li>{t("sections.collection.items.location")}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.usage.title")}</h2>
                <p className="text-foreground-muted mb-4">{t("sections.usage.content")}</p>
                <ul className="list-disc pl-6 space-y-2 text-foreground-muted">
                  <li>{t("sections.usage.items.service")}</li>
                  <li>{t("sections.usage.items.communication")}</li>
                  <li>{t("sections.usage.items.improvement")}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.protection.title")}</h2>
                <p className="text-foreground-muted">{t("sections.protection.content")}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.sharing.title")}</h2>
                <p className="text-foreground-muted">{t("sections.sharing.content")}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.contact.title")}</h2>
                <p className="text-foreground-muted">
                  {t("sections.contact.content")} <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">{SITE_CONFIG.email}</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
