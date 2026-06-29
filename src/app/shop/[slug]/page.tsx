"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  Clock,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/shared/star-rating";
import { PriceDisplay } from "@/components/shared/price-display";
import { ProductCard } from "@/components/product/product-card";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { cn } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "specs">(
    "description"
  );
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h1 className="mb-2 font-heading text-2xl font-bold">Product Not Found</h1>
          <p className="mb-6 text-muted-foreground">This product doesn&apos;t exist or has been removed.</p>
          <Button asChild className="rounded-xl">
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted/30 ring-1 ring-foreground/5">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.discount && product.discount > 0 && (
                  <Badge
                    variant="accent-orange"
                    className="absolute top-4 left-4 text-sm shadow-lg"
                  >
                    -{product.discount}% OFF
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category */}
            <div>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-xs font-semibold uppercase tracking-wider text-primary/70 hover:text-primary"
              >
                {product.category.replace(/-/g, " ")}
              </Link>
            </div>

            {/* Name */}
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size="md" showValue />
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              size="lg"
            />

            <Separator />

            {/* Short Description */}
            <p className="text-base leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  product.stock > 10 ? "bg-success" : product.stock > 0 ? "bg-warning" : "bg-destructive"
                )}
              />
              <span className="text-sm font-medium">
                {product.stock > 10
                  ? "In Stock"
                  : product.stock > 0
                  ? `Only ${product.stock} left`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <div className="flex items-center rounded-xl border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-12 items-center justify-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => addItem(product, quantity)}
                disabled={inCart || product.stock === 0}
                size="lg"
                className="h-12 flex-1 rounded-xl bg-primary text-sm font-semibold hover:bg-primary/90 gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                {inCart ? "Already in Cart" : "Add to Cart"}
              </Button>
              <Button
                onClick={() => toggleItem(product)}
                variant="outline"
                size="lg"
                className={cn(
                  "h-12 w-12 rounded-xl shrink-0",
                  wishlisted && "border-red-500 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
                )}
              >
                <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
              </Button>
            </div>

            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-xl bg-accent text-sm font-semibold text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/checkout">Buy Now</Link>
            </Button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 rounded-2xl bg-muted/30 p-4">
              <div className="text-center">
                <Truck className="mx-auto mb-1 h-5 w-5 text-primary" />
                <div className="text-[11px] text-muted-foreground">{product.deliveryTime}</div>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-1 h-5 w-5 text-primary" />
                <div className="text-[11px] text-muted-foreground">Quality Assured</div>
              </div>
              <div className="text-center">
                <Clock className="mx-auto mb-1 h-5 w-5 text-primary" />
                <div className="text-[11px] text-muted-foreground">{product.handmadeTime}</div>
              </div>
            </div>

            <Separator />

            {/* Tabs */}
            <div>
              <div className="flex gap-1 rounded-xl bg-muted/50 p-1">
                {(["description", "reviews", "specs"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all capitalize",
                      activeTab === tab
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab === "reviews" ? `Reviews (${productReviews.length})` : tab}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                {activeTab === "description" && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                )}

                {activeTab === "specs" && (
                  <div className="space-y-3">
                    {[
                      { label: "Material", value: product.material },
                      { label: "Dimensions", value: product.dimensions },
                      { label: "Handmade Time", value: product.handmadeTime },
                      { label: "Delivery Time", value: product.deliveryTime },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between rounded-lg bg-muted/30 px-4 py-3 text-sm"
                      >
                        <span className="font-medium text-foreground">{spec.label}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {productReviews.length > 0 ? (
                      productReviews.map((review) => (
                        <div
                          key={review.id}
                          className="rounded-xl border border-border p-4"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <div className="text-sm font-medium">{review.userName}</div>
                                <div className="text-xs text-muted-foreground">{review.createdAt}</div>
                              </div>
                            </div>
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                          {review.isVerified && (
                            <Badge variant="secondary" className="mt-2 text-[10px]">
                              ✓ Verified Purchase
                            </Badge>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No reviews yet. Be the first to review this product!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similarProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
