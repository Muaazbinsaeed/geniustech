"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

export function CTASection() {
  const t = useTranslations("cta");
  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    "Hi! I'd like to get a free quote for device repair."
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-cyan/5 to-orange/5" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted mb-10 italic">
            &quot;{t("subtitle")}&quot;
          </p>

          <Button variant="whatsapp" size="lg" asChild>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t("button")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
