import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { blogPosts, getAllCategories } from "@/data/blog";
import { SITE_CONFIG } from "@/lib/constants";

// Category-based images
const categoryImages: Record<string, string> = {
  "iPhone": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
  "MacBook": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
  "Tips": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
  "Water Damage": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  "Battery": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
  "default": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80",
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Blog | Device Repair Tips & Guides",
    description: `Expert tips and guides for phone and laptop repair in Dubai. Learn about iPhone screen replacement, MacBook battery issues, water damage repair, and more from ${SITE_CONFIG.name}.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/blog`,
    },
  };
}

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  const categories = getAllCategories();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero Banner */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=80"
            alt="Device Repair Blog"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4 backdrop-blur-sm">
                  <Tag className="h-4 w-4" />
                  {tNav("blog")}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {t("title")}
                </h1>
                <p className="text-lg text-foreground-muted max-w-xl">
                  {t("subtitle")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium">
              {t("allPosts")}
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 rounded-full bg-card border border-card-border text-sm font-medium hover:border-primary/50 transition-colors cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const imageUrl = post.image || categoryImages[post.category] || categoryImages.default;

              return (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl bg-card border border-card-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)]"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    {/* Title */}
                    <h2 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-foreground-muted mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-xs text-foreground-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} {t("minRead")}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
