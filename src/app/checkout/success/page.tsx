"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading/verifying order
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-6">
        <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-medium animate-pulse">Verifying your order...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="mb-8 flex justify-center">
        <div className="h-24 w-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center animate-bounce-short">
          <CheckCircle2 className="h-12 w-12" />
        </div>
      </div>
      
      <h1 className="text-4xl font-heading font-bold mb-4">Payment Successful!</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Thank you for your purchase. Your handcrafted items are being prepared with love.
      </p>

      {orderId && (
        <div className="bg-muted rounded-xl p-6 mb-8 inline-block text-left">
          <p className="text-sm text-muted-foreground mb-1">Order Reference ID</p>
          <p className="font-mono font-bold text-lg">{orderId}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/profile/orders">
          <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
            <Package className="h-4 w-4" /> Track Order
          </Button>
        </Link>
        <Link href="/shop">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SuccessContent />
    </Suspense>
  );
}
