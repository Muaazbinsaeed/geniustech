import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, ArrowRight, Truck, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { areasData } from "@/data/areas";
import { SITE_CONFIG } from "@/lib/constants";

interface AreasPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AreasPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "areas" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return {
    title: `${t("title")} | ${tCommon("freePickupDelivery")}`,
    description: `${t("freeService")} ${SITE_CONFIG.serviceAreas.join(", ")}.`,
  };
}

export default async function AreasPage({ params }: AreasPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("areas");
  const tArea = await getTranslations("areaData");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          {/* Background Image - Dubai Marina Skyline */}
          <Image
            src="https://images.unsplash.com/photo-1722502831583-b4e93ecc6027?w=1600&q=80"
            alt="Dubai Service Areas"
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
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-500 text-sm font-medium mb-4 backdrop-blur-sm">
                  <Truck className="h-4 w-4" />
                  {t("subtitle")}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {t("title")}
                </h1>
                <p className="text-lg text-foreground-muted max-w-xl">
                  {t("freeService")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">

          {/* Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {areasData.map((area) => {
              const name = tArea(`${area.id}.name`);
              const fullName = tArea(`${area.id}.fullName`);

              return (
                <Link
                  key={area.id}
                  href={`/${locale}/areas/${area.slug}`}
                  className="group rounded-2xl bg-card border border-card-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] overflow-hidden"
                >
                  {/* Area Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={area.image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{name}</h2>
                    <p className="text-foreground-muted text-sm mb-4">
                      {fullName}
                    </p>

                    <div className="flex items-center gap-2 text-green-500 text-sm mb-4">
                      <Check className="h-4 w-4" />
                      {tCommon("freePickupDelivery")}
                    </div>

                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      <span className="text-sm">{tCommon("viewDetails")}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Map Section */}
          <div className="rounded-2xl overflow-hidden border border-card-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.168!2d55.1408!3d25.0764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402c126e3%3A0x7e99b9affe7cc891!2sGenius%20Tech%20Phone%20Repair!5e0!3m2!1sen!2sae!4v1704067890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Genius Tech Location"
            />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
