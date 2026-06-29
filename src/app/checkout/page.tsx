"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, CreditCard, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { CURRENCY, FREE_DELIVERY_THRESHOLD, DELIVERY_CHARGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirm", icon: Check },
];

export default function CheckoutPage() {
  const { items, subtotal, total, couponDiscount } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const finalTotal = total + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 text-6xl">🛍️</div>
          <h1 className="mb-2 font-heading text-2xl font-bold">No items to checkout</h1>
          <p className="mb-6 text-muted-foreground">Add some products to your cart first.</p>
          <Button asChild className="rounded-xl">
            <Link href="/shop">Go Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="mb-8 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Checkout
        </h1>

        {/* Step Indicator */}
        <div className="mb-10 flex items-center justify-center">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
                  currentStep >= step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium hidden sm:inline",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-px w-12 sm:w-20",
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="rounded-2xl bg-card p-6 ring-1 ring-foreground/5">
                  <h2 className="mb-6 font-heading text-lg font-bold">Shipping Address</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder="Full Name" className="h-11 rounded-xl" />
                    <Input placeholder="Phone Number" className="h-11 rounded-xl" />
                    <Input placeholder="Address Line 1" className="h-11 rounded-xl sm:col-span-2" />
                    <Input placeholder="Address Line 2 (Optional)" className="h-11 rounded-xl sm:col-span-2" />
                    <Input placeholder="City" className="h-11 rounded-xl" />
                    <Input placeholder="State" className="h-11 rounded-xl" />
                    <Input placeholder="PIN Code" className="h-11 rounded-xl" />
                    <Input placeholder="Country" defaultValue="India" className="h-11 rounded-xl" />
                  </div>
                  <Button
                    onClick={() => setCurrentStep(2)}
                    className="mt-6 h-11 w-full rounded-xl bg-primary"
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="rounded-2xl bg-card p-6 ring-1 ring-foreground/5">
                  <h2 className="mb-6 font-heading text-lg font-bold">Payment Method</h2>
                  <div className="space-y-3">
                    {["Credit/Debit Card", "UPI", "Net Banking", "Cash on Delivery"].map((method) => (
                      <label
                        key={method}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/50"
                      >
                        <input type="radio" name="payment" className="h-4 w-4 text-primary" defaultChecked={method === "Credit/Debit Card"} />
                        <span className="text-sm font-medium">{method}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="h-11 flex-1 rounded-xl"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      className="h-11 flex-1 rounded-xl bg-primary"
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="rounded-2xl bg-card p-6 ring-1 ring-foreground/5">
                  <h2 className="mb-6 font-heading text-lg font-bold">Order Confirmation</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted/30">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.product.name}</div>
                          <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-semibold">
                          {CURRENCY}{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="h-11 flex-1 rounded-xl"
                    >
                      Back
                    </Button>
                    <Button className="h-11 flex-1 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
                      Place Order — {CURRENCY}{finalTotal.toLocaleString("en-IN")}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl bg-card p-6 ring-1 ring-foreground/5">
              <h3 className="mb-4 font-heading text-base font-bold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{CURRENCY}{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-{couponDiscount}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-success" : ""}>
                    {deliveryCharge === 0 ? "FREE" : `${CURRENCY}${deliveryCharge}`}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-heading text-lg font-bold">
                <span>Total</span>
                <span>{CURRENCY}{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
