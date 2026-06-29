import Link from "next/link";
import { Flower2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-24 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-accent/20 blur-3xl"></div>
        <Flower2 className="h-32 w-32 text-primary opacity-50" strokeWidth={1} />
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-8xl font-black text-foreground drop-shadow-sm">
          404
        </h1>
      </div>
      
      <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground">
        Oops! This flower hasn&apos;t bloomed yet.
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        We can&apos;t seem to find the page you&apos;re looking for. It might have been moved, deleted, or perhaps it never existed at all.
      </p>
      
      <div className="flex gap-4">
        <Button asChild className="h-12 px-8 rounded-xl gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 px-8 rounded-xl">
          <Link href="/shop">
            Browse Shop
          </Link>
        </Button>
      </div>
    </div>
  );
}
