import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <>
      {/* Schema markup for SEO */}
      <BreadcrumbSchema items={items} />

      {/* Visible breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb"
        className={`text-sm text-foreground-muted ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.url} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-foreground-muted/50 flex-shrink-0" />
                )}

                {isLast ? (
                  <span
                    className="text-foreground font-medium truncate max-w-[200px]"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {isFirst && <Home className="h-3.5 w-3.5" />}
                    <span className="truncate max-w-[150px]">{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
