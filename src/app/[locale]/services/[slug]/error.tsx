"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ServiceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Service page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">🔧</div>
        <h2 className="text-2xl font-bold mb-4">Service Unavailable</h2>
        <p className="text-text-secondary mb-6">
          We could not load this service page. Please try again or browse our other services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Link href="/services">
            <Button variant="outline">All Services</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
