"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { servicesData } from "@/data/services";

// TikTok icon component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tService = useTranslations("serviceData");

  const currentYear = new Date().getFullYear();

  const serviceLinks = servicesData.slice(0, 6).map((service) => ({
    href: `/${locale}/services/${service.slug}`,
    id: service.id,
  }));

  const areaLinks = [
    { href: `/${locale}/areas/dubai-marina`, label: "Dubai Marina" },
    { href: `/${locale}/areas/jlt`, label: "JLT" },
    { href: `/${locale}/areas/jbr`, label: "JBR" },
  ];

  const companyLinks = [
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/blog`, label: tNav("blog") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  const socialLinks = [
    { href: SITE_CONFIG.social.instagram, icon: Instagram, label: "Instagram" },
    { href: SITE_CONFIG.social.tiktok, icon: TikTokIcon, label: "TikTok" },
    { href: SITE_CONFIG.social.facebook, icon: Facebook, label: "Facebook" },
  ];

  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 mb-4"
            >
              <Image
                src="/logo.jpg"
                alt="Genius Tech"
                width={100}
                height={35}
                className="h-8 w-auto object-contain"
                quality={85}
              />
              <span className="text-base font-bold">
                <span className="gradient-text">GENIUS</span>{" "}
                <span className="text-orange">TECH</span>
              </span>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`https://maps.app.goo.gl/tofFaRBugv3Qn3st6`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-foreground-muted hover:text-primary transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{SITE_CONFIG.address.short}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 text-sm text-foreground-muted hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-sm text-foreground-muted hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold mb-4">{t("services")}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted hover:text-primary transition-colors"
                  >
                    {tService(`${link.id}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Column */}
          <div>
            <h3 className="font-semibold mb-4">{t("areas")}</h3>
            <ul className="space-y-2">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mt-6 mb-4">{t("company")}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-semibold mb-4">{t("connect")}</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-xl bg-card border border-card-border flex items-center justify-center transition-all hover:border-primary hover:bg-primary hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-muted">
            {t("copyright", { year: currentYear })}
          </p>
          <div className="flex gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-sm text-foreground-muted hover:text-primary transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-sm text-foreground-muted hover:text-primary transition-colors"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
