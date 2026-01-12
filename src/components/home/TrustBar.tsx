"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  value: string;
  suffix?: string;
}

function Counter({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const hasDecimal = value.includes(".");
  const numericValue = hasDecimal ? parseFloat(value) : parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const hasPlus = value.includes("+");
  const isNonNumeric = isNaN(parseFloat(value));

  useEffect(() => {
    if (isInView && !isNonNumeric) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(hasDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, isNonNumeric, hasDecimal]);

  return (
    <span ref={ref}>
      {isNonNumeric ? value : hasDecimal ? count.toFixed(1) : count.toLocaleString()}
      {hasPlus && "+"}
      {suffix}
    </span>
  );
}

export function TrustBar() {
  const t = useTranslations("trust");

  const stats = [
    { value: "5000+", label: t("repairs") },
    { value: "Same Day", label: t("sameDay") },
    { value: "4.9", label: t("rating"), suffix: "★" },
    { value: "Free", label: t("freePickup") },
  ];

  return (
    <section className="py-12 bg-background-secondary border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-foreground-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
