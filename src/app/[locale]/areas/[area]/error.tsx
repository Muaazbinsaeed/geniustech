"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AreaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Area page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">📍</div>
        <h2 className="text-2xl font-bold mb-4">Area Page Unavailable</h2>
        <p className="text-text-secondary mb-6">
          We could not load this service area page. Please try again or view all areas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Link href="/areas">
            <Button variant="outline">All Areas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
