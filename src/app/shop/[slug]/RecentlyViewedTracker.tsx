"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecentlyViewedTracker({ product }: { product: any }) {
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    try {
      // Get existing
      const existing = localStorage.getItem("recentlyViewed");
      let items = existing ? JSON.parse(existing) : [];
      
      // Remove this product if it's already in the list
      items = items.filter((item: any) => item.id !== product.id);
      
      // Store minimal product info
      const productToStore = {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        image: product.images?.[0]?.url || "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop"
      };
      
      // Add to front
      items.unshift(productToStore);
      
      // Keep only last 4
      if (items.length > 4) {
        items = items.slice(0, 4);
      }
      
      localStorage.setItem("recentlyViewed", JSON.stringify(items));
      
      // We set the list excluding the current product for display
      setRecentlyViewed(items.filter((item: any) => item.id !== product.id));
    } catch (e) {
      console.error("Failed to update recently viewed", e);
    }
  }, [product]);

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="border-t border-border/50 pt-12 mt-12">
      <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentlyViewed.map((item) => (
          <Link href={`/shop/${item.slug}`} key={item.id} className="group rounded-xl border border-border/50 bg-card overflow-hidden hover:shadow-md transition-all">
            <div className="aspect-square bg-muted relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-medium line-clamp-1">{item.title}</h4>
              <p className="text-muted-foreground mt-1">${item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
