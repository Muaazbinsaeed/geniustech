import { LOCALES, DEFAULT_LOCALE, RTL_LOCALES, type Locale } from "@/lib/constants";

export const locales = LOCALES;
export const defaultLocale = DEFAULT_LOCALE;
export const rtlLocales = RTL_LOCALES;

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}
