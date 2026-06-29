"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would upload to an API and return URLs
    // For now, we'll just create local object URLs to preview
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = "/admin/products";
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground mt-1">
            Add a new handmade creation to your store.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">General Information</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Name</Label>
                  <Input id="title" placeholder="e.g. Handmade Rose Bouquet" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the handmade details, materials, and perfect occasions..." 
                    rows={5}
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Pricing & Inventory</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" min="0" placeholder="0.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" min="0" placeholder="0" required />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Media</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer text-muted-foreground hover:text-primary">
                    <Upload className="h-6 w-6" />
                    <span className="text-xs font-medium">Upload</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      multiple 
                      onChange={handleImageUpload} 
                    />
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">Upload up to 5 images. First image will be the cover.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Organization</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bouquets">Bouquets</SelectItem>
                      <SelectItem value="flower-pots">Flower Pots</SelectItem>
                      <SelectItem value="keychains">Keychains</SelectItem>
                      <SelectItem value="teddy-bears">Teddy Bears</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-border/50 pt-6">
          <Link href="/admin/products">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Product
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
