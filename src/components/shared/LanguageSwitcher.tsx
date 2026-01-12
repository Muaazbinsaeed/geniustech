"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALE_NAMES, type Locale } from "@/lib/constants";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
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

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-10 px-3 rounded-xl bg-card border border-card-border transition-all hover:border-primary/50 hover:bg-background-secondary"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 text-foreground-muted" />
        <span className="text-sm font-medium">{LOCALE_NAMES[locale]}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-foreground-muted transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 rounded-xl bg-card border border-card-border shadow-lg overflow-hidden z-50 animate-fade-in">
          {locales.map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLocaleChange(code)}
              className={cn(
                "w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-background-secondary",
                locale === code && "bg-primary/10 text-primary font-medium"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
