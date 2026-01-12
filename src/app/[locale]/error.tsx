"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const whatsappLink = getWhatsAppLink(
    SITE_CONFIG.whatsapp,
    `Hi! I encountered an error on your website: ${error.message}`
  );

  useEffect(() => {
    // Log error to console in development
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <span className="text-4xl">!</span>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          Something Went Wrong
        </h2>
        <p className="text-foreground-muted mb-8">
          We apologize for the inconvenience. Please try again or contact us on WhatsApp.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* WhatsApp Contact */}
        <div className="mt-8">
          <Button variant="whatsapp" asChild>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Report Issue on WhatsApp
            </a>
          </Button>
        </div>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="mt-4 text-xs text-foreground-muted">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
