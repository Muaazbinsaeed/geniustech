"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Check, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const areas = [
  {
    key: "marina",
    slug: "dubai-marina",
    // Dubai Marina with boats and towers
    image: "https://images.unsplash.com/photo-1722502831583-b4e93ecc6027?w=400&q=80"
  },
  {
    key: "jlt",
    slug: "jlt",
    // JLT towers with lakes
    image: "https://images.unsplash.com/photo-1722942461266-625f57773ca8?w=400&q=80"
  },
  {
    key: "jbr",
    slug: "jbr",
    // JBR beach and Ain Dubai
    image: "https://images.unsplash.com/photo-1654673207910-bf813a89b625?w=400&q=80"
  },
];

export function ServiceAreas() {
  const locale = useLocale();
  const t = useTranslations("areas");

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              {t("subtitle")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              {t("title")}
            </h2>

            <div className="space-y-4 mb-8">
              {areas.map((area, index) => (
                <motion.div
                  key={area.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/${locale}/areas/${area.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border hover:border-primary/50 hover:bg-background-secondary transition-all group"
                  >
                    {/* Area Image */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={area.image}
                        alt={t(area.key)}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="64px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{t(area.key)}</div>
                      <div className="text-sm text-foreground-muted">
                        Free pickup & delivery
                      </div>
                    </div>
                    <Check className="h-5 w-5 text-green-500" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <p className="text-foreground-muted">{t("freeService")}</p>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-card-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14452.275123456789!2d55.13!3d25.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402c126e3%3A0x7e99b9affe7cc891!2sDubai%20Marina!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Genius Tech Location - Dubai Marina"
              />
            </div>

            {/* Map Overlay */}
            <a
              href={SITE_CONFIG.location.googleMapsPin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur border border-card-border rounded-lg text-sm font-medium hover:bg-card transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View on Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
