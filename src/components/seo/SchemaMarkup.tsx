import { SITE_CONFIG } from "@/lib/constants";
import { BlogPost } from "@/data/blog";

// LocalBusiness Schema - Enhanced for SEO/AEO/GEO
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MobilePhoneStore", "ProfessionalService"],
    "@id": `${SITE_CONFIG.url}/#business`,
    name: SITE_CONFIG.name,
    alternateName: "Genius Tech Mobile Repair Dubai",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    logo: `${SITE_CONFIG.url}/logo.jpg`,
    foundingDate: "2018",
    slogan: "Dubai's Fastest Device Repair - Same Day Service",
    priceRange: "AED 99-999",
    currenciesAccepted: "AED",
    paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Google Pay, Bank Transfer",
    hasMap: SITE_CONFIG.location.googleMapsPin,
    isAcceptingNewCustomers: true,
    knowsLanguage: ["en", "ar", "hi", "ur", "ru", "fr", "es"],
    keywords: [
      "phone repair Dubai Marina",
      "iPhone repair Dubai",
      "MacBook repair JLT",
      "Samsung repair JBR",
      "same day phone repair Dubai",
      "free pickup delivery Dubai",
      "mobile repair near DMCC metro"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "West Avenue Building, Shop 1, Al Yahoom St",
      addressLocality: "Dubai Marina",
      addressRegion: "Dubai",
      postalCode: "00000",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.location.lat,
      longitude: SITE_CONFIG.location.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.tiktok,
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Dubai",
        "@id": "https://www.wikidata.org/wiki/Q612",
      },
      {
        "@type": "Place",
        name: "Dubai Marina",
      },
      {
        "@type": "Place",
        name: "Jumeirah Lakes Towers (JLT)",
      },
      {
        "@type": "Place",
        name: "Jumeirah Beach Residence (JBR)",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: SITE_CONFIG.location.lat,
        longitude: SITE_CONFIG.location.lng,
      },
      geoRadius: "10000",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "iPhone Screen Repair",
          description: "Same-day iPhone screen replacement with OEM-grade parts",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "200",
          maxPrice: "1200",
          priceCurrency: "AED",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "MacBook Battery Replacement",
          description: "Professional MacBook battery replacement with warranty",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "350",
          maxPrice: "950",
          priceCurrency: "AED",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free Pickup & Delivery",
          description: "Free device pickup and delivery in Dubai Marina, JLT, JBR",
        },
        price: "0",
        priceCurrency: "AED",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Device Repair Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "iPhone Repair",
            description: "Professional iPhone screen, battery, and component repair services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MacBook Repair",
            description: "Expert MacBook screen, keyboard, and battery repair services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Android Phone Repair",
            description: "Samsung, Google, OnePlus and all Android phone repairs",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "230",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Ahmed K." },
        reviewBody: "Amazing service! Fixed my iPhone screen in just 2 hours. Free pickup from my office in JLT.",
        datePublished: "2025-01-12",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Sarah M." },
        reviewBody: "Best phone repair in Dubai Marina. Same-day MacBook battery replacement with warranty.",
        datePublished: "2025-01-05",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Mohammed R." },
        reviewBody: "Excellent experience! WhatsApp response was instant and they fixed my Samsung same day.",
        datePublished: "2024-12-29",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.jpg`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "West Avenue Building, Shop 1, Al Yahoom St",
      addressLocality: "Dubai Marina",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.tiktok,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Arabic", "Hindi", "Urdu"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema
interface ServiceSchemaProps {
  slug: string;
  title: string;
  description: string;
  features: string[];
  locale: string;
}

export function ServiceSchema({ slug, title, description, features, locale }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/${locale}/services/${slug}`,
    name: title,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/#business`,
      name: SITE_CONFIG.name,
    },
    areaServed: {
      "@type": "City",
      name: "Dubai",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: title,
      itemListElement: features.map((feature, index) => ({
        "@type": "Offer",
        "@id": `${SITE_CONFIG.url}/${locale}/services/${slug}#offer-${index}`,
        itemOffered: {
          "@type": "Service",
          name: feature,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Blog Post Schema
interface BlogPostSchemaProps {
  post: BlogPost;
  locale: string;
}

export function BlogPostSchema({ post, locale }: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_CONFIG.url}/${locale}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/${locale}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema (for sitelinks search box)
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: ["en", "ar", "hi", "ur", "ru", "fr", "es"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// VideoObject Schema for YouTube Shorts
interface VideoSchemaProps {
  videos: readonly { id: string; title: string }[];
}

export function VideoSchema({ videos }: VideoSchemaProps) {
  const schemas = videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE_CONFIG.url}/#video-${video.id}`,
    name: video.title,
    description: `${video.title} - ${SITE_CONFIG.name} device repair service in Dubai`,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    uploadDate: new Date().toISOString().split("T")[0],
    contentUrl: `https://www.youtube.com/shorts/${video.id}`,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: `https://www.youtube.com/shorts/${video.id}`,
    },
  }));

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// Service Area Schema for location-specific pages
interface AreaSchemaProps {
  areaName: string;
  areaSlug: string;
  description: string;
  locale: string;
}

export function AreaSchema({ areaName, areaSlug, description, locale }: AreaSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/${locale}/areas/${areaSlug}`,
    name: `Phone Repair in ${areaName}`,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/#business`,
      name: SITE_CONFIG.name,
    },
    areaServed: {
      "@type": "Place",
      name: areaName,
      address: {
        "@type": "PostalAddress",
        addressLocality: areaName,
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
    },
    serviceType: "Device Repair",
    offers: {
      "@type": "Offer",
      name: "Free Pickup & Delivery",
      description: `Free pickup and delivery for device repair in ${areaName}`,
      price: "0",
      priceCurrency: "AED",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Review Schema for displaying individual reviews
interface ReviewSchemaProps {
  reviews: {
    author: string;
    rating: number;
    text: string;
    date?: string;
  }[];
}

export function ReviewSchema({ reviews }: ReviewSchemaProps) {
  const schemas = reviews.map((review, index) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${SITE_CONFIG.url}/#review-${index}`,
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.text,
    datePublished: review.date || new Date().toISOString().split("T")[0],
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/#business`,
      name: SITE_CONFIG.name,
    },
  }));

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// Action Schema for CTAs (WhatsApp, Call)
export function ActionSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.url}/#webpage`,
    name: `${SITE_CONFIG.name} - Dubai's Fastest Device Repair`,
    description: SITE_CONFIG.description,
    potentialAction: [
      {
        "@type": "CommunicateAction",
        name: "Get Free Quote via WhatsApp",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/AndroidPlatform",
            "http://schema.org/IOSPlatform",
          ],
        },
      },
      {
        "@type": "CommunicateAction",
        name: "Call for Same-Day Repair",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `tel:${SITE_CONFIG.phone}`,
          actionPlatform: [
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/AndroidPlatform",
            "http://schema.org/IOSPlatform",
          ],
        },
      },
      {
        "@type": "ReserveAction",
        name: "Book Pickup & Delivery",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://wa.me/${SITE_CONFIG.whatsapp.replace("+", "")}?text=Hi!%20I%20need%20free%20pickup%20for%20device%20repair`,
        },
        result: {
          "@type": "Reservation",
          name: "Free Pickup & Delivery Service",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// AboutPage Schema - for /about page
export function AboutPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_CONFIG.url}/about`,
    name: `About ${SITE_CONFIG.name}`,
    description: "Dubai Marina's trusted phone & laptop repair experts since 2018. Same-day service with free pickup & delivery.",
    url: `${SITE_CONFIG.url}/en/about`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/#business`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE_CONFIG.url}/en/about` },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ContactPage Schema - for /contact page
export function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_CONFIG.url}/contact`,
    name: `Contact ${SITE_CONFIG.name}`,
    description: "Get in touch with Genius Tech for phone and laptop repairs in Dubai Marina. WhatsApp, call, or visit our shop.",
    url: `${SITE_CONFIG.url}/en/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/#business`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_CONFIG.url}/en/contact` },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// CollectionPage Schema - for blog/services listings
interface CollectionPageSchemaProps {
  type: "Blog" | "Services" | "Areas";
  name: string;
  description: string;
  items: { name: string; url: string }[];
  locale: string;
}

export function CollectionPageSchema({ type, name, description, items, locale }: CollectionPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_CONFIG.url}/${locale}/${type.toLowerCase()}`,
    name,
    description,
    url: `${SITE_CONFIG.url}/${locale}/${type.toLowerCase()}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo Schema - for repair guide content (AEO optimization)
interface HowToSchemaProps {
  name: string;
  description: string;
  steps: { name: string; text: string; image?: string }[];
  estimatedCost?: { minValue: number; maxValue: number };
  totalTime?: string; // ISO 8601 duration format, e.g., "PT2H" for 2 hours
}

export function HowToSchema({ name, description, steps, estimatedCost, totalTime }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        minValue: estimatedCost.minValue,
        maxValue: estimatedCost.maxValue,
        currency: "AED",
      },
    }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
    tool: [
      { "@type": "HowToTool", name: "Professional repair equipment" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema with Offers - for pricing pages (GEO optimization)
interface ProductSchemaProps {
  name: string;
  description: string;
  category: string;
  offers: { name: string; minPrice: number; maxPrice: number; description?: string }[];
}

export function ProductSchema({ name, description, category, offers }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    category,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...offers.map(o => o.minPrice)),
      highPrice: Math.max(...offers.map(o => o.maxPrice)),
      priceCurrency: "AED",
      offerCount: offers.length,
      offers: offers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: offer.minPrice,
          maxPrice: offer.maxPrice,
          priceCurrency: "AED",
        },
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "230",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Speakable Schema - for voice search optimization (AEO)
interface SpeakableSchemaProps {
  url: string;
  headline: string;
  cssSelectors?: string[];
}

export function SpeakableSchema({ url, headline, cssSelectors }: SpeakableSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: headline,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors || [
        ".hero-title",
        ".hero-subtitle",
        ".faq-answer",
        ".service-description",
        "h1",
        ".quick-answer",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQPage Schema with Speakable - enhanced for AEO
interface FAQPageSchemaProps {
  faqs: { question: string; answer: string }[];
  pageUrl: string;
  pageName: string;
}

export function FAQPageSchema({ faqs, pageUrl, pageName }: FAQPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": pageUrl,
    name: pageName,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".faq-question", ".faq-answer"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
