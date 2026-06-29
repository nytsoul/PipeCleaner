"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { CURRENCY, FREE_DELIVERY_THRESHOLD, DELIVERY_CHARGE } from "@/lib/constants";
import { useState } from "react";

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    total,
    couponCode,
    couponDiscount,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const finalTotal = total + deliveryCharge;

  const handleApplyCoupon = () => {
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponError("");
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6 text-7xl">🛒</div>
          <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">
            Your Cart is Empty
          </h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Button asChild size="lg" className="h-12 rounded-xl bg-primary px-8 gap-2">
            <Link href="/shop">
              <ShoppingBag className="h-4 w-4" />
              Start Shopping
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
            Shopping Cart ({totalItems})
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-destructive hover:text-destructive/80"
          >
            Clear All
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex gap-4 rounded-2xl bg-card p-4 ring-1 ring-foreground/5 sm:gap-6 sm:p-6"
                >
                  {/* Image */}
                  <Link
                    href={`/shop/${item.product.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted/30 sm:h-32 sm:w-32"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-heading text-sm font-semibold text-foreground hover:text-primary transition-colors sm:text-base"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground capitalize">
                        {item.product.category.replace(/-/g, " ")}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex h-8 w-8 items-center justify-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex items-center gap-4">
                        <span className="font-heading text-sm font-bold text-foreground sm:text-base">
                          {CURRENCY}{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-card p-6 ring-1 ring-foreground/5">
              <h2 className="mb-6 font-heading text-lg font-bold text-foreground">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">{CURRENCY}{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {couponCode && (
                  <div className="flex justify-between text-success">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {couponCode}
                      <button
                        onClick={removeCoupon}
                        className="ml-1 text-xs underline text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </span>
                    <span>-{couponDiscount}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-success font-medium" : "font-medium"}>
                    {deliveryCharge === 0 ? "FREE" : `${CURRENCY}${deliveryCharge}`}
                  </span>
                </div>
                {deliveryCharge > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free delivery on orders above {CURRENCY}{FREE_DELIVERY_THRESHOLD}
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-heading text-lg font-bold">
                <span>Total</span>
                <span>{CURRENCY}{finalTotal.toLocaleString("en-IN")}</span>
              </div>

              {/* Coupon */}
              {!couponCode && (
                <div className="mt-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      className="h-10 rounded-lg text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      className="h-10 rounded-lg shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <p className="mt-1 text-xs text-destructive">{couponError}</p>
                  )}
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Try: PIPE10, BLOOM20, FIRST15
                  </p>
                </div>
              )}

              <Button
                asChild
                size="lg"
                className="mt-6 h-12 w-full rounded-xl bg-accent text-sm font-semibold text-accent-foreground hover:bg-accent/90 gap-2"
              >
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="ghost" className="mt-2 w-full text-sm">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
