import Link from "next/link";
import { Home } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

export default function NotFound() {
  const whatsappLink = getWhatsAppLink(SITE_CONFIG.whatsapp, "Hi! I need help finding a page on your website.");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        {/* 404 Graphic */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text">404</h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          Page Not Found
        </h2>
        <p className="text-foreground-muted mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="whatsapp" asChild>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Contact Us
            </a>
          </Button>
        </div>

        {/* Contact Info */}
        <p className="mt-8 text-sm text-foreground-muted">
          Need help? Call us at{" "}
          <a href={`tel:${SITE_CONFIG.phone}`} className="text-primary hover:underline">
            {SITE_CONFIG.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
