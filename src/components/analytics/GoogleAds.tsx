"use client";

import Script from "next/script";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export function GoogleAds() {
  // Don't render if no Ads ID is configured
  if (!GOOGLE_ADS_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}

// Track conversion events
export function trackConversion(conversionLabel: string) {
  if (typeof window !== "undefined" && GOOGLE_ADS_ID) {
    window.gtag?.("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
    });
  }
}

// Track WhatsApp click as conversion
export function trackWhatsAppConversion() {
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION;
  if (conversionLabel) {
    trackConversion(conversionLabel);
  }
}

// Track phone call as conversion
export function trackPhoneCallConversion() {
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION;
  if (conversionLabel) {
    trackConversion(conversionLabel);
  }
}
