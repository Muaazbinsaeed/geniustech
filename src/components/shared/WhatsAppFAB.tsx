"use client";

import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export function WhatsAppFAB() {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("common");

  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    "Hi! I need help with device repair."
  );
  const phoneLink = getPhoneLink(SITE_CONFIG.phone);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              href={phoneLink}
              className="flex items-center gap-3 bg-primary text-white px-4 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-shadow"
            >
              <Phone className="h-5 w-5" />
              <span className="text-sm font-medium">{t("callNow")}</span>
            </motion.a>

            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-shadow"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{t("whatsapp")}</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all",
          isExpanded
            ? "bg-card border border-card-border text-foreground"
            : "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isExpanded ? "Close menu" : "Open contact menu"}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
