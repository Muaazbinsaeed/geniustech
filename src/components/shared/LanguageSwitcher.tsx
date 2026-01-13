"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LOCALE_NAMES, type Locale } from "@/lib/constants";

// Country codes for flag images (using flagcdn.com)
const LOCALE_COUNTRY: Record<Locale, string> = {
  en: "gb",
  ar: "ae",
  hi: "in",
  ur: "pk",
  ru: "ru",
  fr: "fr",
  es: "es",
};

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function LanguageSwitcher({ className, compact = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsOpen(false);
  };

  const locales = Object.entries(LOCALE_NAMES) as [Locale, string][];

  const getFlagUrl = (code: Locale) =>
    `https://flagcdn.com/w40/${LOCALE_COUNTRY[code]}.png`;

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-card-border transition-all duration-200",
          "hover:border-primary/50 hover:bg-background-secondary",
          compact
            ? "h-10 w-10 justify-center bg-card"
            : "h-10 px-3 bg-card"
        )}
        aria-label={tCommon("selectLanguage")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Image
          src={getFlagUrl(locale)}
          alt={LOCALE_NAMES[locale]}
          width={20}
          height={15}
          className="rounded-sm object-cover shadow-sm"
          unoptimized
        />
        {!compact && (
          <>
            <span className="text-sm font-medium">{LOCALE_NAMES[locale]}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-foreground-muted transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-44 rounded-xl bg-card border border-card-border shadow-2xl overflow-hidden z-50"
            role="listbox"
            aria-label={tCommon("selectLanguage")}
          >
            {locales.map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLocaleChange(code)}
                role="option"
                aria-selected={locale === code}
                className={cn(
                  "w-full px-3 py-2.5 text-sm text-left transition-all duration-150 flex items-center gap-3",
                  "hover:bg-background-secondary",
                  locale === code
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground"
                )}
              >
                <Image
                  src={getFlagUrl(code)}
                  alt={name}
                  width={20}
                  height={15}
                  className="rounded-sm object-cover shadow-sm"
                  unoptimized
                />
                <span>{name}</span>
                {locale === code && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
