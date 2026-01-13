import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { SITE_CONFIG } from "@/lib/constants";

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const description = `Terms of Service for ${SITE_CONFIG.name}. Read our terms and conditions for device repair services in Dubai.`;
  return {
    title: "Terms of Service | Genius Tech",
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/terms`,
    },
    openGraph: {
      title: `Terms of Service | ${SITE_CONFIG.name}`,
      description,
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/terms`,
    },
    twitter: {
      card: "summary",
      title: `Terms of Service | ${SITE_CONFIG.name}`,
      description,
    },
  };
}

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");
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
                <h2 className="text-xl font-bold mb-4">{t("sections.acceptance.title")}</h2>
                <p className="text-foreground-muted">{t("sections.acceptance.content")}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.services.title")}</h2>
                <p className="text-foreground-muted mb-4">{t("sections.services.content")}</p>
                <ul className="list-disc pl-6 space-y-2 text-foreground-muted">
                  <li>{t("sections.services.items.diagnosis")}</li>
                  <li>{t("sections.services.items.repair")}</li>
                  <li>{t("sections.services.items.parts")}</li>
                  <li>{t("sections.services.items.pickup")}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.warranty.title")}</h2>
                <p className="text-foreground-muted mb-4">{t("sections.warranty.content")}</p>
                <ul className="list-disc pl-6 space-y-2 text-foreground-muted">
                  <li>{t("sections.warranty.items.coverage")}</li>
                  <li>{t("sections.warranty.items.exclusions")}</li>
                  <li>{t("sections.warranty.items.claims")}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.liability.title")}</h2>
                <p className="text-foreground-muted">{t("sections.liability.content")}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.data.title")}</h2>
                <p className="text-foreground-muted">{t("sections.data.content")}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t("sections.payment.title")}</h2>
                <p className="text-foreground-muted">{t("sections.payment.content")}</p>
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
