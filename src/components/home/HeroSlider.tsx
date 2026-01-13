"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

const slides = [
  {
    id: 1,
    // Dubai Marina with modern buildings - blue hour
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    titleKey: "slide1Title",
    subtitleKey: "slide1Subtitle",
  },
  {
    id: 2,
    // Modern smartphone on clean surface - bright
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1920&q=80",
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
  },
  {
    id: 3,
    // MacBook Pro clean setup - modern workspace
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1920&q=80",
    titleKey: "slide3Title",
    subtitleKey: "slide3Subtitle",
  },
  {
    id: 4,
    // Dubai JBR beach skyline - bright day
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=80",
    titleKey: "slide4Title",
    subtitleKey: "slide4Subtitle",
  },
];

export function HeroSlider() {
  const t = useTranslations("hero");
  const tTrust = useTranslations("trust");
  const tCommon = useTranslations("common");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const whatsappLink = getWhatsAppLink(SITE_CONFIG.whatsapp, "Hi! I need help with device repair.");
  const phoneLink = getPhoneLink(SITE_CONFIG.phone);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10" />
        </motion.div>
      </AnimatePresence>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Content Box with brand gradient background */}
          <div className="bg-gradient-to-br from-[#0a1628]/90 via-[#0d2847]/85 to-[#0f3460]/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border-l-4 border-orange shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                  <span className="text-white">{t("title")}</span>
                  <br />
                  <span className="gradient-text">{t("titleHighlight")}</span>
                </h1>
              </motion.div>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
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
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm font-medium">4.9 {tCommon("googleRating")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">{tTrust("sameDay")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">{tTrust("freePickup")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">{tCommon("premiumParts")}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-card/80 backdrop-blur border border-card-border hover:bg-card transition-colors group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-foreground-muted group-hover:text-primary transition-colors" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-card/80 backdrop-blur border border-card-border hover:bg-card transition-colors group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-foreground-muted group-hover:text-primary transition-colors" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-foreground-muted/30 hover:bg-foreground-muted/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
