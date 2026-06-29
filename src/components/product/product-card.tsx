"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/shared/star-rating";
import { PriceDisplay } from "@/components/shared/price-display";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <Link href={`/shop/${product.slug}`} className="relative block w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge variant="accent" className="text-[10px] shadow-md">
                NEW
              </Badge>
            )}
            {product.discount && product.discount > 0 && (
              <Badge variant="accent-orange" className="text-[10px] shadow-md">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleItem(product)}
            className={cn(
              "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all duration-300",
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white/80 text-foreground/60 backdrop-blur-sm hover:bg-white hover:text-red-500"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn("h-4 w-4", wishlisted && "fill-current")}
            />
          </button>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform duration-500 group-hover:translate-y-0">
            <button
              onClick={() => addItem(product)}
              disabled={inCart}
              className={cn(
                "flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium shadow-lg transition-all",
                inCart
                  ? "bg-white/20 text-white cursor-default"
                  : "bg-white text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <ShoppingBag className="h-4 w-4" />
              {inCart ? "In Cart" : "Add to Cart"}
            </button>
            <Link
              href={`/shop/${product.slug}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-foreground"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <Link
            href={`/shop/${product.slug}`}
            className="mb-1 block text-xs font-medium uppercase tracking-wider text-primary/60"
          >
            {product.category.replace(/-/g, " ")}
          </Link>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="mb-2 font-heading text-sm font-semibold text-foreground line-clamp-1 transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <div className="mb-3 flex items-center gap-2">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="sm"
          />
        </div>
      </div>
    </motion.div>
  );
}
