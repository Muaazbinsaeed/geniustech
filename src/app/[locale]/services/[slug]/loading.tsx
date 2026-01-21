export default function ServiceLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="h-64 bg-background-secondary animate-pulse" />
      
      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 bg-background-secondary rounded animate-pulse w-1/3" />
          <div className="h-4 bg-background-secondary rounded animate-pulse w-full" />
          <div className="h-4 bg-background-secondary rounded animate-pulse w-5/6" />
          <div className="h-4 bg-background-secondary rounded animate-pulse w-4/6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-background-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
