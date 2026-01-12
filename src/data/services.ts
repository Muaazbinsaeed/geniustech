export interface ServiceDetail {
  id: string;
  slug: string;
  icon: string;
  image: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "iphone-repair",
    slug: "iphone-repair",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
  },
  {
    id: "macbook-repair",
    slug: "macbook-repair",
    icon: "Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
  },
  {
    id: "android-repair",
    slug: "android-repair",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
  },
  {
    id: "ipad-repair",
    slug: "ipad-repair",
    icon: "Tablet",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
  },
  {
    id: "laptop-repair",
    slug: "laptop-repair",
    icon: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
  },
  {
    id: "smartwatch-repair",
    slug: "smartwatch-repair",
    icon: "Watch",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((service) => service.slug);
}
