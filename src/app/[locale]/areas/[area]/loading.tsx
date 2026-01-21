export default function AreaLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="h-64 bg-background-secondary animate-pulse" />
      
      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 bg-background-secondary rounded animate-pulse w-1/2" />
          <div className="h-4 bg-background-secondary rounded animate-pulse w-full" />
          <div className="h-4 bg-background-secondary rounded animate-pulse w-4/5" />
          
          {/* Services grid skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-background-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
