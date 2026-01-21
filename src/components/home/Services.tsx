"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  ArrowRight,
} from "lucide-react";
import { servicesData } from "@/data/services";

const serviceIcons: Record<string, typeof Smartphone> = {
  Smartphone: Smartphone,
  Laptop: Laptop,
  Tablet: Tablet,
  Watch: Watch,
};

// Map service id to translation key (without -repair suffix)
const serviceKeyMap: Record<string, string> = {
  "iphone-repair": "iphone",
  "macbook-repair": "macbook",
  "android-repair": "android",
  "ipad-repair": "ipad",
  "laptop-repair": "laptop",
  "smartwatch-repair": "smartwatch",
};

export function Services() {
  const locale = useLocale();
  const t = useTranslations("services");
  const tCommon = useTranslations("common");

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {t("title")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3">{t("subtitle")}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-cyan mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Services Grid - Equal height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {servicesData.map((service, index) => {
            const Icon = serviceIcons[service.icon] || Smartphone;
            const translationKey = serviceKeyMap[service.id];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/${locale}/services/${service.slug}`}>
                  <div className="group relative h-full min-h-[280px] sm:min-h-[320px] rounded-xl sm:rounded-2xl bg-card border border-card-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] overflow-hidden flex flex-col">
                    {/* Image */}
                    <div className="relative w-full h-36 sm:h-44 overflow-hidden flex-shrink-0">
                      <Image
                        src={service.image}
                        alt={t(`${translationKey}.title`)}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col">
                      {/* Icon Badge */}
                      <div className="absolute -top-6 sm:-top-7 left-4 sm:left-6 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg transition-colors bg-card text-primary border border-card-border group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                        <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>

                      <div className="mt-4 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg sm:text-xl mb-2">
                          {t(`${translationKey}.title`)}
                        </h3>
                        <p className="text-foreground-muted text-xs sm:text-sm leading-relaxed flex-1">
                          {t(`${translationKey}.desc`)}
                        </p>

                        {/* Arrow */}
                        <div className="mt-4 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                          <span className="text-sm">{tCommon("learnMore")}</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
