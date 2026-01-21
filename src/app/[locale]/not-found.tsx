import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-text-secondary mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button>Go to Homepage</Button>
            </Link>
            <Link href="/services">
              <Button variant="outline">View Services</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
