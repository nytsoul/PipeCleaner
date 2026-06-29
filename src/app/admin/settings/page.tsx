"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your store preferences and configurations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Store Details</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="PipeBloom" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input id="supportEmail" type="email" defaultValue="support@pipebloom.com" required />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Shipping & Tax</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="shippingFee">Flat Shipping Fee ($)</Label>
              <Input id="shippingFee" type="number" step="0.01" defaultValue="5.00" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
              <Input id="taxRate" type="number" step="0.1" defaultValue="8.5" required />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-border/50 pt-6">
          <Button type="button" variant="outline">Reset</Button>
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            {isSubmitting ? "Saving..." : <><Save className="h-4 w-4" /> Save Settings</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
