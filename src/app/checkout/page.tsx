"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotal, getSubtotal, getTax, getShipping, getDiscount, clearCart } = useCartStore();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("STRIPE");

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "US"
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const processMockPayment = async () => {
    setIsProcessing(true);
    
    try {
      const endpoint = paymentMethod === "STRIPE" ? "/api/checkout/stripe" : "/api/checkout/razorpay";
      
      // 1. Create order
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          totalAmount: getTotal(),
          shippingAddress: shippingDetails
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      // 2. Mock payment success webhook
      await fetch("/api/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: data.orderId,
          paymentStatus: "PAID",
          transactionId: paymentMethod === "STRIPE" ? "pi_mock_123" : "pay_mock_123"
        })
      });

      // 3. Clear cart & redirect
      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (error: any) {
      console.error("Payment failed", error);
      alert(`Payment failed: ${error?.message || "Please try again."}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push("/shop")}>Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-heading font-bold mb-12">Secure Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: Shipping */}
          <div className={`p-6 rounded-2xl border ${step === 1 ? 'border-primary ring-1 ring-primary' : 'border-border'} bg-card shadow-sm transition-all`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <h2 className="text-2xl font-bold">Shipping Details</h2>
              {step > 1 && <CheckCircle2 className="h-6 w-6 text-green-500 ml-auto" />}
            </div>

            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" required value={shippingDetails.fullName} onChange={e => setShippingDetails({...shippingDetails, fullName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={shippingDetails.email} onChange={e => setShippingDetails({...shippingDetails, email: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required value={shippingDetails.address} onChange={e => setShippingDetails({...shippingDetails, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required value={shippingDetails.city} onChange={e => setShippingDetails({...shippingDetails, city: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" required value={shippingDetails.postalCode} onChange={e => setShippingDetails({...shippingDetails, postalCode: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" required value={shippingDetails.country} onChange={e => setShippingDetails({...shippingDetails, country: e.target.value})} />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">Continue to Payment</Button>
              </form>
            ) : (
              <div className="text-muted-foreground flex justify-between items-center">
                <p>{shippingDetails.fullName}, {shippingDetails.address}, {shippingDetails.city} {shippingDetails.postalCode}</p>
                <Button variant="ghost" onClick={() => setStep(1)}>Edit</Button>
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className={`p-6 rounded-2xl border ${step === 2 ? 'border-primary ring-1 ring-primary' : 'border-border'} bg-card shadow-sm opacity-${step === 2 ? '100' : '50 pointer-events-none'} transition-all`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</div>
              <h2 className="text-2xl font-bold">Payment Method</h2>
            </div>

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setPaymentMethod("STRIPE")}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-colors ${paymentMethod === "STRIPE" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  >
                    <CreditCard className="h-8 w-8" />
                    <span className="font-semibold">Credit Card / GPay</span>
                    <span className="text-xs text-muted-foreground">Via Stripe</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("RAZORPAY")}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-colors ${paymentMethod === "RAZORPAY" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  >
                    <div className="font-bold text-xl tracking-wider text-blue-600">RZP</div>
                    <span className="font-semibold">UPI / Net Banking</span>
                    <span className="text-xs text-muted-foreground">Via Razorpay</span>
                  </button>
                </div>

                <div className="bg-muted p-6 rounded-xl border border-border">
                  {paymentMethod === "STRIPE" ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        This is a simulated Stripe integration. In production, the Stripe Elements UI would render here.
                      </p>
                      <Button size="lg" className="w-full" onClick={processMockPayment} disabled={isProcessing}>
                        {isProcessing ? "Processing..." : `Pay ₹${getTotal().toFixed(2)} with Stripe`}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        This is a simulated Razorpay integration. In production, this would open the Razorpay popup.
                      </p>
                      <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={processMockPayment} disabled={isProcessing}>
                        {isProcessing ? "Processing..." : `Pay ₹${getTotal().toFixed(2)} with Razorpay`}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-xl space-y-6">
            <h2 className="text-xl font-heading font-bold">Order Summary</h2>
            
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image || undefined} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-bold line-clamp-1">{item.title}</p>
                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="font-bold">₹${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>Discount</span>
                <span>-${getDiscount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>₹${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>₹${getShipping().toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 flex justify-between items-end">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold">₹${getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
