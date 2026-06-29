import Link from "next/link";
import { Package, User, MapPin, Heart, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "ORD-948102",
    date: "May 15, 2026",
    total: 1298,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-839210",
    date: "April 02, 2026",
    total: 349,
    status: "Processing",
    items: 1,
  }
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and view orders.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                PS
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Priya Sharma</h3>
                <p className="text-sm text-muted-foreground">priya@example.com</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-2">
              <Button variant="secondary" className="w-full justify-start rounded-xl">
                <User className="mr-3 h-4 w-4" />
                Personal Info
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground">
                <MapPin className="mr-3 h-4 w-4" />
                Saved Addresses
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground">
                <Link href="/wishlist">
                  <Heart className="mr-3 h-4 w-4" />
                  Wishlist
                </Link>
              </Button>
            </div>
            
            <div className="mt-8">
              <Button asChild variant="outline" className="w-full rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10">
                <Link href="/auth/login">
                  <LogOut className="mr-3 h-4 w-4" />
                  Log out
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Order History */}
          <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border p-6">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-lg font-bold text-foreground">Order History</h2>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4 hover:bg-muted/30 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-foreground">{order.id}</span>
                        <Badge variant={order.status === "Delivered" ? "secondary" : "default"} className="text-[10px]">
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                    
                    <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-6">
                      <div className="font-semibold text-foreground">
                        ₹{order.total.toLocaleString("en-IN")}
                      </div>
                      <Button asChild variant="ghost" size="sm" className="rounded-lg">
                        <Link href={`/profile/orders`}>
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-muted-foreground">
                  <p>You haven&apos;t placed any orders yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
