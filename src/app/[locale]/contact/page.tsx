import { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, type Locale } from "@/lib/constants";
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const description = `Contact ${SITE_CONFIG.name} for phone repair in Dubai Marina. WhatsApp: ${SITE_CONFIG.whatsapp}. Located inside Pluspoint Mini Mart, West Avenue Building. Open 10AM-10PM daily. Free pickup in JLT, JBR!`;
  return {
    title: `Contact Us | Phone Repair Dubai Marina | ${SITE_CONFIG.name}`,
    description,
    keywords: [
      "phone repair contact dubai",
      "genius tech location",
      "phone repair shop dubai marina",
      "device repair near me",
      "repair shop west avenue dubai",
      "phone repair pluspoint mini mart",
      "whatsapp phone repair dubai",
      "call phone repair dubai",
    ],
    alternates: generateAlternates(locale as Locale, "/contact"),
    openGraph: {
      title: `Contact ${SITE_CONFIG.name} | Dubai Marina Phone Repair`,
      description,
      type: "website",
      locale: getOGLocale(locale as Locale),
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/contact`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `Contact ${SITE_CONFIG.name} | Dubai Phone Repair`,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    "Hi! I need help with device repair."
  );
  const phoneLink = getPhoneLink(SITE_CONFIG.phone);

  const contactMethods = [
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      value: SITE_CONFIG.whatsapp,
      link: whatsappLink,
      primary: true,
      description: "Fastest response - usually within minutes",
      isWhatsApp: true,
    },
    {
      icon: Phone,
      title: t("phone"),
      value: SITE_CONFIG.phone,
      link: phoneLink,
      primary: false,
      description: "Call us directly",
      isWhatsApp: false,
    },
    {
      icon: Mail,
      title: t("email"),
      value: SITE_CONFIG.email,
      link: `mailto:${SITE_CONFIG.email}`,
      primary: false,
      description: "For inquiries and quotes",
      isWhatsApp: false,
    },
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero Banner */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          {/* Background Image - Tech workspace with devices */}
          <Image
            src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1600&q=80"
            alt="Contact Genius Tech"
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
                  <WhatsAppIcon className="h-4 w-4" />
                  {t("subtitle")}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {t("title")}
                </h1>
                <p className="text-lg text-foreground-muted max-w-xl">
                  Get in touch with our expert team for fast, reliable device repairs in Dubai.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.isWhatsApp ? "_blank" : undefined}
                  rel={method.isWhatsApp ? "noopener noreferrer" : undefined}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                    method.primary
                      ? "bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white border-transparent"
                      : "bg-card border-card-border hover:border-primary/50"
                  }`}
                >
                  <method.icon className={`h-8 w-8 mb-4 ${method.primary ? "text-white" : "text-primary"}`} />
                  <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                  <p className={`text-sm ${method.primary ? "text-white/90" : "text-foreground-muted"}`}>
                    {method.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Map */}
        <section className="py-12 bg-background-secondary">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Location Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  {t("findUs")}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t("address")}</h3>
                      <p className="text-foreground-muted">
                        {SITE_CONFIG.address.full}
                      </p>
                      <p className="text-sm text-primary mt-1">
                        {t("landmark")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t("hours")}</h3>
                      <p className="text-foreground-muted">{t("everyday")}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="whatsapp" asChild>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      WhatsApp Us
                    </a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a
                      href={SITE_CONFIG.location.googleMapsPin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-card-border h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.0!2d55.1367!3d25.0818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7e99b9affe7cc891!2sGenius%20Tech!5e0!3m2!1sen!2sae!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Genius Tech Location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-12 relative overflow-hidden">
          {/* Background Image - Dubai Marina */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1722502831583-b4e93ecc6027?w=1600&q=80"
              alt="Dubai Marina skyline"
              fill
              className="object-cover opacity-5"
            />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Free Pickup & Delivery Areas
            </h2>
            <p className="text-foreground-muted mb-8">
              We offer free pickup and delivery in these areas
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {SITE_CONFIG.serviceAreas.map((area, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full bg-primary/10 text-primary font-medium backdrop-blur-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
