"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="text-text-secondary mb-8">
            We apologize for the inconvenience. An unexpected error occurred while loading this page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Go to Homepage
            </Button>
          </div>
          {error.digest && (
            <p className="mt-6 text-sm text-text-tertiary">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
