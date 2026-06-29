"use client";

import { useState } from "react";
import { Plus, Search, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: "1", code: "WELCOME10", discount: "10%", uses: 45, status: "Active" },
    { id: "2", pipe: "SPRING20", discount: "20%", uses: 120, status: "Expired" },
    { id: "3", code: "FREESHIP", discount: "Free Shipping", uses: 8, status: "Active" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage discount codes for your customers.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search coupons..." className="pl-9 bg-background/50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/30 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Code</th>
                <th className="px-6 py-4 font-medium">Discount</th>
                <th className="px-6 py-4 font-medium">Uses</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="bg-card/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-bold font-mono tracking-wider flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    {coupon.code || coupon.pipe}
                  </td>
                  <td className="px-6 py-4 font-medium">{coupon.discount}</td>
                  <td className="px-6 py-4">{coupon.uses} times</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      coupon.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
