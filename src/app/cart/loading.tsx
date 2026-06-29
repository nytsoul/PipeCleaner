import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-sm divide-y divide-border">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 p-6">
                <Skeleton className="h-24 w-24 shrink-0 rounded-2xl" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-1/4 rounded-md" />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-9 w-24 rounded-lg" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
            <Skeleton className="h-6 w-40 rounded-md mb-4" />
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
            </div>

            <Skeleton className="h-px w-full" />

            <div className="flex justify-between">
              <Skeleton className="h-6 w-24 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>

            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
