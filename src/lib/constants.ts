export const SITE_CONFIG = {
  name: "Genius Tech",
  tagline: "Quality means doing something right when no one is looking",
  description: "Dubai's fastest device repair service. Expert repairs for iPhones, MacBooks, Android phones, laptops, and wearables. Free pickup & delivery in JLT, JBR, and Dubai Marina.",
  url: "https://geniustech.ae",
  phone: "+971502719636",
  whatsapp: "+971547507842",
  email: "Geniustechmob@gmail.com",
  address: {
    full: "West Avenue Building, Shop 1, Al Yahoom St, Dubai Marina (Inside Pluspoint Mini Mart)",
    short: "Dubai Marina, Inside Pluspoint Mini Mart",
    city: "Dubai",
    country: "United Arab Emirates",
  },
  location: {
    lat: 25.0818, // Update with actual coordinates
    lng: 55.1367,
    googleMapsPin: "https://maps.app.goo.gl/tofFaRBugv3Qn3st6",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.0!2d55.1367!3d25.0818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA0JzU0LjUiTiA1NcKwMDgnMTIuMSJF!5e0!3m2!1sen!2sae!4v1",
    promoVideoLink: "https://maps.app.goo.gl/Dy54YGBNDdUCtvR27",
    // Add your YouTube video ID here (the part after v= in YouTube URL)
    // Example: for https://youtube.com/watch?v=ABC123 use "ABC123"
    youtubeVideoId: "dQw4w9WgXcQ", // Replace with your actual promo video ID
    // Or add direct video URL (mp4, webm)
    videoUrl: "",
    // YouTube Shorts video IDs
    youtubeShorts: [
      { id: "7F_-X3XZCns", title: "Expert MacBook Repair Service" },
      { id: "UUOwX1M60_U", title: "iPhone Screen Repair in Minutes" },
    ],
  },
  social: {
    instagram: "https://www.instagram.com/geniustechmobrepair",
    tiktok: "https://www.tiktok.com/@geniustech66",
    facebook: "https://www.facebook.com/MobileRepairGeniusTech",
  },
  serviceAreas: ["Dubai Marina", "JLT", "JBR"],
} as const;

export const SERVICES = [
  {
    id: "iphone-repair",
    icon: "Smartphone",
    title: "iPhone Repair",
    shortDesc: "Screen, battery, and all iPhone repairs",
    description: "Expert iPhone repair services for all models. Screen replacement, battery replacement, water damage repair, and more.",
    featured: true,
  },
  {
    id: "macbook-repair",
    icon: "Laptop",
    title: "MacBook Repair",
    shortDesc: "MacBook Pro & Air repairs",
    description: "Professional MacBook repair services. Screen replacement, keyboard repair, battery replacement, and logic board repair.",
    featured: false,
  },
  {
    id: "android-repair",
    icon: "Smartphone",
    title: "Android Repair",
    shortDesc: "Samsung, Google, OnePlus & more",
    description: "Repair services for all Android phones. Samsung, Google Pixel, OnePlus, Huawei, and other brands.",
    featured: false,
  },
  {
    id: "ipad-repair",
    icon: "Tablet",
    title: "iPad & Tablet Repair",
    shortDesc: "iPad and Android tablet repairs",
    description: "iPad and tablet repair services. Screen replacement, battery replacement, charging port repair.",
    featured: false,
  },
  {
    id: "laptop-repair",
    icon: "Laptop",
    title: "Laptop Repair",
    shortDesc: "Dell, HP, Lenovo & more",
    description: "Windows laptop repair services. Screen replacement, keyboard repair, hardware upgrades, and virus removal.",
    featured: false,
  },
  {
    id: "smartwatch-repair",
    icon: "Watch",
    title: "Smartwatch Repair",
    shortDesc: "Apple Watch & wearables",
    description: "Smartwatch repair services. Apple Watch screen replacement, battery replacement, and more.",
    featured: false,
  },
] as const;

export const USPS = [
  {
    icon: "Zap",
    title: "Fastest Repairs",
    description: "Same-day service, often within hours",
  },
  {
    icon: "Gem",
    title: "Premium Parts",
    description: "OEM and genuine quality spare parts",
  },
  {
    icon: "BadgeDollarSign",
    title: "Best Prices",
    description: "Competitive and transparent pricing",
  },
  {
    icon: "Truck",
    title: "Free Pickup",
    description: "Free pickup & delivery in Marina, JLT, JBR",
  },
  {
    icon: "Home",
    title: "Onsite Service",
    description: "We come to your home or office",
  },
  {
    icon: "ShieldCheck",
    title: "Expert Technicians",
    description: "Certified and experienced professionals",
  },
] as const;

export const STATS = [
  { value: "5000+", label: "Repairs Completed" },
  { value: "Same Day", label: "Service Available" },
  { value: "4.9", label: "Google Rating", suffix: "★" },
  { value: "Free", label: "Pickup & Delivery" },
] as const;

export const LOCALES = ["en", "ar", "hi", "ur", "ru", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const RTL_LOCALES: Locale[] = ["ar", "ur"];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  hi: "हिन्दी",
  ur: "اردو",
  ru: "Русский",
  fr: "Français",
  es: "Español",
};

export const DEFAULT_LOCALE: Locale = "en";
