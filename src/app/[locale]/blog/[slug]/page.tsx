import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronDown,
  Tag,
  User,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { Button } from "@/components/ui/Button";
import { blogPosts, getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import { SITE_CONFIG, type Locale } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";
import { generateAlternates, getOGLocale, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { BlogPostSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const { locale } = await params;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: generateAlternates(locale as Locale, `/blog/${slug}`),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      locale: getOGLocale(locale as Locale),
      siteName: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/${locale}/blog/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [post.image] : [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [DEFAULT_OG_IMAGE.url],
    },
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("common");
  const tBlog = await getTranslations("blog");

  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    `Hi! I have a question about: ${post.title}`
  );

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <Header />

      {/* Schema Markup */}
      <BlogPostSchema post={post} locale={locale} />
      {post.faqs && <FAQSchema faqs={post.faqs} />}

      <main id="main-content" className="pt-24 pb-16">
        <article className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {tBlog("backToBlog")}
          </Link>

          {/* Featured Image */}
          {post.image && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          )}

          {/* Article Header */}
          <header className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold uppercase tracking-wider mb-4">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-foreground-muted mb-6">{post.excerpt}</p>

            <div className="flex items-center justify-center gap-6 text-sm text-foreground-muted">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} {tBlog("minRead")}
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-background-secondary text-sm text-foreground-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold mb-6">
                  {t("faq")}
                </h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group p-6 rounded-xl bg-card border border-card-border"
                    >
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="font-medium pr-4">{faq.question}</span>
                        <ChevronDown className="h-5 w-5 text-foreground-muted transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-4 text-foreground-muted">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan/5 text-center">
              <h3 className="text-xl font-bold mb-3">{t("needHelp")}</h3>
              <p className="text-foreground-muted mb-6">
                {t("contactUsWhatsapp")}
              </p>
              <Button variant="whatsapp" asChild>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t("whatsapp")}
                </a>
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="max-w-5xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-8 text-center">
                {t("relatedArticles")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/${locale}/blog/${relatedPost.slug}`}
                    className="p-6 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-colors"
                  >
                    <span className="text-xs text-primary font-semibold uppercase">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold mt-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-foreground-muted mt-2 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

// Simple markdown-like formatting with input validation
function formatContent(content: string | undefined | null): string {
  // Validate input
  if (!content || typeof content !== "string") {
    console.warn("formatContent received invalid content:", typeof content);
    return "<p>Content not available.</p>";
  }

  // Basic sanitization - escape HTML entities to prevent XSS
  // (allowing only our markdown-like syntax)
  const sanitized = content
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  let html = sanitized
    .replace(/^## (.*$)/gim, '<h2 class="mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p class='my-4'>")
    .replace(/^\|(.+)\|$/gim, (match) => {
      const cells = match.split("|").filter((c) => c.trim());
      const row = cells.map((c) => `<td class="border border-border px-4 py-2">${c.trim()}</td>`).join("");
      return `<tr>${row}</tr>`;
    })
    .replace(/^❌ (.*$)/gim, '<p class="flex items-start gap-2 text-red-500"><span>❌</span><span>$1</span></p>')
    .replace(/^✅ (.*$)/gim, '<p class="flex items-start gap-2 text-green-500"><span>✅</span><span>$1</span></p>');

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul class="list-disc pl-6 my-4">$&</ul>');

  // Wrap consecutive tr elements in table
  html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table class="w-full border-collapse my-6">$&</table>');

  return html;
}
