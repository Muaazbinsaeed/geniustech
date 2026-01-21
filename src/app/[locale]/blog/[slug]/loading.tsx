export default function BlogLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="h-48 bg-background-secondary animate-pulse" />
      
      {/* Article skeleton */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-10 bg-background-secondary rounded animate-pulse w-3/4" />
          <div className="flex gap-4">
            <div className="h-4 bg-background-secondary rounded animate-pulse w-24" />
            <div className="h-4 bg-background-secondary rounded animate-pulse w-24" />
          </div>
          
          <div className="space-y-4 mt-8">
            <div className="h-4 bg-background-secondary rounded animate-pulse w-full" />
            <div className="h-4 bg-background-secondary rounded animate-pulse w-11/12" />
            <div className="h-4 bg-background-secondary rounded animate-pulse w-10/12" />
            <div className="h-4 bg-background-secondary rounded animate-pulse w-9/12" />
            <div className="h-4 bg-background-secondary rounded animate-pulse w-full" />
            <div className="h-4 bg-background-secondary rounded animate-pulse w-10/12" />
          </div>
        </div>
      </article>
    </div>
  );
}
