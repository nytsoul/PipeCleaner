import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const orderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 ring-8 ring-green-50 dark:ring-green-900/10">
            <CheckCircle2 className="h-12 w-12" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. We&apos;ve received your order and are
            getting it ready to be shipped.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              Order Number
            </span>
            <span className="font-heading text-xl font-bold text-foreground">
              {orderId}
            </span>
          </div>
          
          <div className="mt-6 space-y-3">
            <p className="text-sm text-muted-foreground">
              We&apos;ll send a confirmation email with your order details and tracking info once it ships.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row justify-center pt-4">
          <Button asChild variant="outline" className="h-12 px-8 rounded-xl">
            <Link href="/profile">
              View Order Status
            </Link>
          </Button>
          <Button asChild className="h-12 px-8 rounded-xl gap-2">
            <Link href="/shop">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
