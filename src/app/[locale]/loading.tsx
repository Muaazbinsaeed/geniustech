export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Spinner */}
        <div className="mb-6 flex justify-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>

        {/* Loading Text */}
        <p className="text-foreground-muted animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
