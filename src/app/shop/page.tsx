"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Filter, ChevronDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  
  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  
  const observerTarget = useRef(null);

  const fetchProducts = async (cursor?: string, reset = false) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (sort) params.append("sort", sort);
      if (cursor) params.append("cursor", cursor);
      params.append("limit", "12");

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      
      if (reset) {
        setProducts(data.items);
      } else {
        setProducts(prev => [...prev, ...data.items]);
      }
      setNextCursor(data.nextCursor || null);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts(undefined, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, sort]); // Refresh when filters change

  // Infinite Scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && nextCursor && !loadingMore && !loading) {
          setLoadingMore(true);
          fetchProducts(nextCursor);
        }
      },
      { threshold: 1.0 }
    );
    
    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [nextCursor, loadingMore, loading]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight">Our Collection</h1>
          <p className="text-muted-foreground mt-2">Discover beautiful handmade pipe cleaner gifts.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Input 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground gap-2 cursor-pointer">
              Sort by: {sort === "newest" ? "Newest" : sort === "price_asc" ? "Price: Low to High" : "Price: High to Low"}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSort("newest")}>Newest Arrivals</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("price_asc")}>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("price_desc")}>Price: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {["All", "Bouquets", "Flower Pots", "Keychains", "Teddy Bears"].map(cat => (
                    <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat === "All" ? "" : cat.toLowerCase().replace(" ", "-")}
                        checked={cat === "All" ? category === "" : category === cat.toLowerCase().replace(" ", "-")}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-full text-primary focus:ring-primary accent-primary"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCategory(""); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link href={`/shop/${product.slug}`} key={product.id} className="group flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                      {/* Using mock image placeholder if no images exist */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop"} 
                        alt={product.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{product.category?.name}</div>
                      <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.title}</h3>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="font-bold text-lg">
                          ${(product.price - (product.price * (product.discount || 0)) / 100).toFixed(2)}
                          {product.discount > 0 && (
                            <span className="ml-2 text-sm text-muted-foreground line-through font-normal">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Infinite Scroll Target */}
              <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
                {loadingMore && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                {!nextCursor && products.length > 0 && (
                  <p className="text-muted-foreground text-sm">You&apos;ve reached the end of the collection.</p>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
