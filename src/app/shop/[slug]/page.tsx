import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartButton from "./AddToCartButton";
import RecentlyViewedTracker from "./RecentlyViewedTracker";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: true,
      tags: true,
      variants: true,
      reviews: {
        where: { isApproved: true },
        include: { user: true }
      }
    }
  });

  if (!product) {
    notFound();
  }

  const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length
    : 0;

  // Fetch related products (same category, excluding current)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id }
    },
    take: 4,
    include: { images: true }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Tracker to save to localStorage */}
      <RecentlyViewedTracker product={product} />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop"} 
              alt={product.title}
              className="object-cover w-full h-full"
            />
            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground font-bold px-3 py-1 rounded-full shadow-lg">
                Save {product.discount}%
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1).map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-border/50 cursor-pointer hover:border-primary transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={`${product.title} ${idx+2}`} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            {product.category && (
              <Link href={`/shop?category=${product.category.slug}`} className="text-sm text-primary hover:underline font-medium uppercase tracking-wider">
                {product.category.name}
              </Link>
            )}
          </div>
          
          <h1 className="text-4xl font-heading font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'fill-current' : 'text-muted stroke-current'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
          </div>

          <div className="text-3xl font-bold mb-6 flex items-end gap-3">
            ${discountedPrice.toFixed(2)}
            {product.discount && product.discount > 0 && (
              <span className="text-xl text-muted-foreground line-through font-normal mb-0.5">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}

          {/* Add to Cart / Actions */}
          <div className="mt-auto space-y-4">
            <AddToCartButton product={product} />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50">
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted/30">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">Delivery: {product.estimatedDelivery || "3-5 Business Days"}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted/30">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted/30">
                <RotateCcw className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs / Sections */}
      <div className="border-t border-border/50 pt-12">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
          <ul className="space-y-4">
            <li className="flex gap-4"><span className="font-medium text-foreground w-32">SKU:</span> {product.sku || "N/A"}</li>
            <li className="flex gap-4"><span className="font-medium text-foreground w-32">Materials:</span> {product.materials || "Premium Pipe Cleaners"}</li>
            <li className="flex gap-4"><span className="font-medium text-foreground w-32">Dimensions:</span> {product.dimensions || "Handcrafted standard size"}</li>
          </ul>
          <ul className="space-y-4">
            <li className="flex gap-4"><span className="font-medium text-foreground w-32">Stock Status:</span> {product.stock > 0 ? "In Stock" : "Out of Stock"}</li>
            <li className="flex gap-4">
              <span className="font-medium text-foreground w-32">Tags:</span> 
              <div className="flex flex-wrap gap-2">
                {product.tags.map(t => (
                  <span key={t.id} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium">{t.name}</span>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border/50 pt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <Link href={`/shop/${rp.slug}`} key={rp.id} className="group rounded-xl border border-border/50 bg-card overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-square bg-muted relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={rp.images?.[0]?.url || "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop"} alt={rp.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h4 className="font-medium line-clamp-1">{rp.title}</h4>
                  <p className="text-muted-foreground mt-1">₹${rp.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
