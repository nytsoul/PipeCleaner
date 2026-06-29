"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { useWishlist } from "@/context/wishlist-context";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6 text-7xl">💝</div>
          <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">
            Your Wishlist is Empty
          </h1>
          <p className="mb-8 text-muted-foreground">
            Save items you love for later. Start exploring our collection!
          </p>
          <Button asChild size="lg" className="h-12 rounded-xl bg-primary px-8 gap-2">
            <Link href="/shop">
              <Heart className="h-4 w-4" />
              Explore Products
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            My Wishlist ({items.length})
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearWishlist}
            className="text-destructive hover:text-destructive/80 gap-1"
          >
            <Trash2 className="h-3 w-3" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
