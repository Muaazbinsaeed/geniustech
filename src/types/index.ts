import { LOCALES } from "@/lib/constants";

export type Locale = (typeof LOCALES)[number];

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  description: string;
  featured: boolean;
}

export interface USP {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  category: string;
  image?: string;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  description: string;
}
