"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Trash2, ShoppingCart, ArrowRight, Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const wishlist = useCartStore((state) => state.wishlist);
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    removeFromWishlist(item.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4 flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary" /> My Wishlist
        </h1>
        <p className="text-muted-foreground text-lg">
          Save your favorite handcrafted items for later.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-border rounded-2xl bg-muted/20">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            You haven't saved any items yet. Explore our handcrafted collection and find something you love!
          </p>
          <Link href="/shop">
            <Button size="lg" className="gap-2">
              Explore Shop <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image || "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop"} 
                  alt={item.title} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-background transition-colors shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <Link href={`/shop/${item.id}`} className="hover:underline">
                  <h3 className="font-heading font-bold text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <div className="text-lg font-bold mb-4">
                  ${item.price.toFixed(2)}
                </div>

                <div className="mt-auto">
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => handleMoveToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
