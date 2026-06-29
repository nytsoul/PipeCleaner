"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, ShoppingCart, ArrowRight, Minus, Plus, Heart, TicketPercent, Tag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const { 
    cart, 
    savedForLater,
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity,
    saveForLater,
    moveToCart,
    removeFromSaved,
    getSubtotal,
    getDiscount,
    getTax,
    getShipping,
    getTotal,
    couponCode,
    applyCoupon,
    removeCoupon
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = async () => {
    setCouponError("");
    if (!couponInput.trim()) return;
    
    // Simulate API validation
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        body: JSON.stringify({ code: couponInput }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      
      if (res.ok) {
        applyCoupon(data.code, data.discountPercentage);
        setCouponInput("");
      } else {
        setCouponError(data.error || "Invalid coupon code");
      }
    } catch (err) {
      setCouponError("Failed to validate coupon");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4 flex items-center gap-3">
          <ShoppingCart className="h-8 w-8 text-primary" /> Shopping Cart
        </h1>
        <p className="text-muted-foreground text-lg">
          Review your handcrafted items before checkout.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Cart Area */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Cart Items */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-4">
              Your Items ({cart.length})
            </h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl bg-muted/20">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added anything yet.
                </p>
                <Link href="/shop">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.variant}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-6 p-4 rounded-2xl bg-card border border-border/50 shadow-sm"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <Link href={`/shop/${item.id}`} className="hover:underline">
                              <h3 className="font-heading font-bold text-lg">{item.title}</h3>
                            </Link>
                            {item.variant && (
                              <p className="text-sm text-muted-foreground mt-1">Color: {item.variant}</p>
                            )}
                          </div>
                          <div className="font-bold text-lg whitespace-nowrap">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 bg-muted rounded-full p-1 border border-border">
                            <button 
                              onClick={() => decreaseQuantity(item.id, item.variant)}
                              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => increaseQuantity(item.id, item.variant)}
                              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => saveForLater(item.id, item.variant)}
                              className="text-sm font-medium text-primary hover:underline px-2"
                            >
                              Save for Later
                            </button>
                            <span className="text-border">|</span>
                            <button 
                              onClick={() => removeFromCart(item.id, item.variant)}
                              className="text-sm font-medium text-destructive hover:underline px-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Saved For Later */}
          {savedForLater.length > 0 && (
            <div className="space-y-6 pt-12">
              <h2 className="text-2xl font-bold border-b border-border pb-4">
                Saved for Later ({savedForLater.length})
              </h2>
              <div className="space-y-4">
                {savedForLater.map(item => (
                  <div key={`saved-${item.id}-${item.variant}`} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{item.title}</h4>
                          <span className="text-sm font-bold text-muted-foreground">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Button variant="outline" size="sm" onClick={() => moveToCart(item.id, item.variant)}>
                          Move to Cart
                        </Button>
                        <button onClick={() => removeFromSaved(item.id, item.variant)} className="text-sm text-destructive hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-6 shadow-xl">
            <h2 className="text-xl font-heading font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${getSubtotal().toFixed(2)}</span>
              </div>
              
              {couponCode && (
                <div className="flex justify-between items-center text-primary">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Discount ({couponCode})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>-${getDiscount().toFixed(2)}</span>
                    <button onClick={removeCoupon} className="text-xs hover:underline">(Remove)</button>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax (8%)</span>
                <span className="font-medium">${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">${getShipping().toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-bold text-primary">${getTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code */}
            {!couponCode && (
              <div className="mb-6 space-y-2">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Promo Code" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="bg-background"
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
                </div>
                {couponError && <p className="text-xs text-destructive">{couponError}</p>}
              </div>
            )}

            <Link href="/checkout" className={cart.length === 0 ? "pointer-events-none" : ""}>
              <Button size="lg" className="w-full gap-2 text-lg h-14" disabled={cart.length === 0}>
                Proceed to Checkout <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <TicketPercent className="h-4 w-4" /> Secure SSL Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
