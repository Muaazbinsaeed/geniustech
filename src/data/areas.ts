export interface AreaDetail {
  id: string;
  slug: string;
  image: string;
}

export const areasData: AreaDetail[] = [
  {
    id: "dubai-marina",
    slug: "dubai-marina",
    // Dubai Marina with boats and towers
    image: "https://images.unsplash.com/photo-1722502831583-b4e93ecc6027?w=800&q=80",
  },
  {
    id: "jlt",
    slug: "jlt",
    // JLT towers with lakes
    image: "https://images.unsplash.com/photo-1722942461266-625f57773ca8?w=800&q=80",
  },
  {
    id: "jbr",
    slug: "jbr",
    // JBR beach and Ain Dubai
    image: "https://images.unsplash.com/photo-1654673207910-bf813a89b625?w=800&q=80",
  },
];

export function getAreaBySlug(slug: string): AreaDetail | undefined {
  return areasData.find((area) => area.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return areasData.map((area) => area.slug);
}
