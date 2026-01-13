"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

// Mock reviews - in production, fetch from Google Places API
const reviews = [
  {
    id: "1",
    author: "Ahmed K.",
    rating: 5,
    text: "Amazing service! Fixed my iPhone screen in just 2 hours. Very professional team.",
    date: "2 weeks ago",
  },
  {
    id: "2",
    author: "Sarah M.",
    rating: 5,
    text: "Best phone repair in Dubai Marina. They came to my office for free pickup. Highly recommend!",
    date: "1 month ago",
  },
  {
    id: "3",
    author: "Mike R.",
    rating: 5,
    text: "Great prices and quality parts. My MacBook works like new. Thank you Genius Tech!",
    date: "3 weeks ago",
  },
  {
    id: "4",
    author: "Priya S.",
    rating: 5,
    text: "Fast, reliable, and honest. They gave me a fair quote and delivered on time.",
    date: "1 week ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const t = useTranslations("reviews");
  const tCommon = useTranslations("common");

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
          <p className="text-foreground-muted mt-3">{t("subtitle")}</p>

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-2xl font-bold">4.9</span>
            <span className="text-foreground-muted">(230+ {tCommon("reviewCount")})</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-card-border"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 text-sm leading-relaxed line-clamp-4">
                &quot;{review.text}&quot;
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{review.author}</div>
                  <div className="text-xs text-foreground-muted">
                    {review.date}
                  </div>
                </div>
                <div className="text-xs text-foreground-muted">
                  {tCommon("viaGoogle")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href={SITE_CONFIG.location.googleMapsPin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            {t("viewAll")}
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
