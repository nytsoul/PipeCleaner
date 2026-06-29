"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Upload, X, Save, Plus } from "lucide-react";
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

export default function EditProductPage() {
  const params = useParams();
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<string[]>([]);
  const [newVariant, setNewVariant] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sku: "",
    materials: "",
    dimensions: "",
    estimatedDelivery: "",
    price: "",
    discount: "",
    stock: "",
    category: ""
  });

  useEffect(() => {
    // Mocking fetch product by ID
    setTimeout(() => {
      setFormData({
        title: "Rose Bouquet",
        description: "A beautiful handmade rose bouquet using premium pipe cleaners.",
        sku: "RB-001",
        materials: "Premium Pipe Cleaners, Ribbon",
        dimensions: "10x10x15 cm",
        estimatedDelivery: "3-5 Business Days",
        price: "45.00",
        discount: "10",
        stock: "10",
        category: "bouquets"
      });
      setImages(["https://via.placeholder.com/150"]);
      setVariants(["Red", "Pink"]);
      setTags(["Romantic", "Valentine"]);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      const files = Array.from(e.target.files);
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.url) {
            setImages(prev => [...prev, data.url]);
          }
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      }
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    if (newVariant && !variants.includes(newVariant)) {
      setVariants([...variants, newVariant]);
      setNewVariant("");
    }
  };

  const removeVariant = (v: string) => {
    setVariants(variants.filter(item => item !== v));
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter(item => item !== t));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = "/admin/products";
    }, 1000);
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading product details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground mt-1">
            Update {formData.title} details.
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
                  <Input 
                    id="title" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input 
                      id="sku" 
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="materials">Materials</Label>
                    <Input 
                      id="materials" 
                      value={formData.materials}
                      onChange={(e) => setFormData({...formData, materials: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input 
                      id="dimensions" 
                      value={formData.dimensions}
                      onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                    <Input 
                      id="estimatedDelivery" 
                      value={formData.estimatedDelivery}
                      onChange={(e) => setFormData({...formData, estimatedDelivery: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Pricing & Inventory</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input 
                    id="discount" 
                    type="number" 
                    step="1" 
                    min="0" 
                    max="100" 
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    min="0" 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Variants (Colors)</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add a color variant..." 
                    value={newVariant}
                    onChange={(e) => setNewVariant(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addVariant())}
                  />
                  <Button type="button" onClick={addVariant} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.map(v => (
                    <span key={v} className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {v} <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeVariant(v)} />
                    </span>
                  ))}
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
                    <span className="text-xs font-medium">{uploading ? "Uploading..." : "Upload"}</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      multiple 
                      disabled={uploading}
                      onChange={handleImageUpload} 
                    />
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">Upload up to 5 images.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Organization</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v || ""})}>
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

                <div className="space-y-2 pt-4">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add tag..." 
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map(t => (
                      <span key={t} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        {t} <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(t)} />
                      </span>
                    ))}
                  </div>
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
            {isSubmitting ? "Saving..." : <><Save className="h-4 w-4" /> Update Product</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
