import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <Skeleton className="h-8 w-1/2 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full rounded-md" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-6 w-5/6 rounded-md" />
          </div>
          <Skeleton className="h-8 w-1/2 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full rounded-md" />
            <Skeleton className="h-6 w-2/3 rounded-md" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="flex-1 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Skeleton className="h-10 w-full sm:max-w-md rounded-xl" />
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-square w-full rounded-3xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3 rounded" />
                  <Skeleton className="h-6 w-3/4 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-1/4 rounded" />
                  <Skeleton className="h-5 w-1/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
