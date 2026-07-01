"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X, Save, Plus, Loader2 } from "lucide-react";
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
  const router = useRouter();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<string[]>([]);
  const [newVariant, setNewVariant] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [materials, setMaterials] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        const p = data.data;
        setTitle(p.title || "");
        setDescription(p.description || "");
        setSku(p.sku || "");
        setMaterials(p.materials || "");
        setDimensions(p.dimensions || "");
        setEstimatedDelivery(p.estimatedDelivery || "");
        setPrice(String(p.price || ""));
        setDiscount(String(p.discount || ""));
        setStock(String(p.stock || ""));
        setCategory(p.category?.slug || "");
        setImages(p.images?.map((img: any) => img.url) || []);
        setVariants(p.variants?.map((v: any) => v.color) || []);
        setTags(p.tags?.map((t: any) => t.name) || []);
      } catch (err) {
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      for (const file of Array.from(e.target.files)) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await res.json();
          if (data.url) setImages(prev => [...prev, data.url]);
        } catch {
          console.error("Upload failed");
        }
      }
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => setImages(prev => prev.filter((_, i) => i !== idx));

  const addVariant = () => {
    if (newVariant && !variants.includes(newVariant)) {
      setVariants([...variants, newVariant]);
      setNewVariant("");
    }
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, description, sku, materials, dimensions, estimatedDelivery,
          price, discount, stock, categorySlug: category, images, variants, tags,
        }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
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
          <p className="text-muted-foreground mt-1">Update product details and inventory.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">General Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Name</Label>
                  <Input id="title" placeholder="e.g. Handmade Rose Bouquet" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the handmade details..." rows={4} required value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="e.g. RB-001" value={sku} onChange={e => setSku(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="materials">Materials</Label>
                    <Input id="materials" placeholder="e.g. Premium Pipe Cleaners" value={materials} onChange={e => setMaterials(e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input id="dimensions" placeholder="e.g. 10x10x15 cm" value={dimensions} onChange={e => setDimensions(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                    <Input id="estimatedDelivery" placeholder="e.g. 3-5 Business Days" value={estimatedDelivery} onChange={e => setEstimatedDelivery(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Pricing & Inventory</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" min="0" placeholder="0.00" required value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" type="number" step="1" min="0" max="100" placeholder="0" value={discount} onChange={e => setDiscount(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" min="0" placeholder="0" required value={stock} onChange={e => setStock(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Variants (Colors)</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Add a color variant..." value={newVariant} onChange={e => setNewVariant(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addVariant())} />
                  <Button type="button" onClick={addVariant} variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.map(v => (
                    <span key={v} className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {v} <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => setVariants(variants.filter(i => i !== v))} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold">Media</h2>
              <div className="grid grid-cols-2 gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer text-muted-foreground hover:text-primary">
                  <Upload className="h-6 w-6" />
                  <span className="text-xs font-medium">{uploading ? "Uploading..." : "Upload"}</span>
                  <input type="file" className="hidden" accept="image/*" multiple disabled={uploading} onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">Upload up to 5 images.</p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold">Organization</h2>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={v => setCategory(v ?? "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flower-pots">Flower Pots</SelectItem>
                    <SelectItem value="flower-bouquets">Flower Bouquets</SelectItem>
                    <SelectItem value="sunflowers">Sunflowers</SelectItem>
                    <SelectItem value="teddy-bears">Teddy Bears</SelectItem>
                    <SelectItem value="mini-plants">Mini Plants</SelectItem>
                    <SelectItem value="keychains">Keychains</SelectItem>
                    <SelectItem value="valentine-gifts">Valentine Gifts</SelectItem>
                    <SelectItem value="tulips">Tulips</SelectItem>
                    <SelectItem value="customized-gifts">Customized Gifts</SelectItem>
                    <SelectItem value="birthday-gifts">Birthday Gifts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 pt-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input placeholder="Add tag..." value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} />
                  <Button type="button" onClick={addTag} variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(t => (
                    <span key={t} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs flex items-center gap-1">
                      {t} <X className="h-3 w-3 cursor-pointer" onClick={() => setTags(tags.filter(i => i !== t))} />
                    </span>
                  ))}
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
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Save className="h-4 w-4" /> Update Product</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
