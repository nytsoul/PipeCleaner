"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Search, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setInventory([
      { id: "1", title: "Rose Bouquet", sku: "RB-001", stock: 2, status: "Low Stock" },
      { id: "2", title: "Tulip Pot", sku: "TP-002", stock: 0, status: "Out of Stock" },
      { id: "3", title: "Sunflower Keychain", sku: "SK-003", stock: 25, status: "In Stock" },
      { id: "4", title: "Custom Teddy", sku: "CT-004", stock: 5, status: "Low Stock" },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor product stock levels and get alerts.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 flex items-center gap-4">
          <div className="p-3 bg-destructive/10 rounded-full text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
            <h3 className="text-2xl font-bold text-destructive">1 Item</h3>
          </div>
        </div>
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-600 dark:text-yellow-500">
            <TrendingDown className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
            <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">2 Items</h3>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search inventory..." className="pl-9 bg-background/50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/30 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {inventory.map((item) => (
                <tr key={item.id} className="bg-card/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.sku}</td>
                  <td className="px-6 py-4 font-bold">{item.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm">Update Stock</Button>
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
