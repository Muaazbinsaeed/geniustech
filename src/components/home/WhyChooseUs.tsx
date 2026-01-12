"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Zap,
  Gem,
  BadgeDollarSign,
  Truck,
  Home,
  ShieldCheck,
} from "lucide-react";

const uspIcons = {
  fastest: Zap,
  parts: Gem,
  prices: BadgeDollarSign,
  pickup: Truck,
  onsite: Home,
  experts: ShieldCheck,
};

const uspImages = {
  fastest: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80",
  parts: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
  prices: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
  pickup: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  onsite: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
  experts: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80",
};

const usps = ["fastest", "parts", "prices", "pickup", "onsite", "experts"] as const;

export function WhyChooseUs() {
  const t = useTranslations("whyUs");

  return (
    <section className="py-20 md:py-28 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
          <p className="text-foreground-muted mt-3 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-cyan mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => {
            const Icon = uspIcons[usp];
            const imageUrl = uspImages[usp];

            return (
              <motion.div
                key={usp}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-card border border-card-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={t(`${usp}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors">
                    <Icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">
                    {t(`${usp}.title`)}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {t(`${usp}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
