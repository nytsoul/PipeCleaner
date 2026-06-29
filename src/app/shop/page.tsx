"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeader } from "@/components/shared/section-header";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { SORT_OPTIONS } from "@/lib/constants";
import type { CategorySlug } from "@/types";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (slug: CategorySlug) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [searchQuery, selectedCategories, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || sortBy !== "newest";

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary/5 to-muted py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Shop"
            title="All Products"
            description="Explore our complete collection of handcrafted pipe cleaner gifts"
          />

          {/* Search + Filter Bar */}
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-11 rounded-xl"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 gap-2 rounded-xl lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar Filters – Desktop */}
          <aside className={`shrink-0 space-y-6 ${showFilters ? "fixed inset-0 z-50 overflow-y-auto bg-card p-6 lg:static lg:w-64 lg:bg-transparent lg:p-0" : "hidden lg:block lg:w-64"}`}>
            {/* Mobile Close */}
            <div className="flex items-center justify-between lg:hidden">
              <h3 className="font-heading text-lg font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sort */}
            <div>
              <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">
                Sort By
              </h4>
              <div className="space-y-1">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      sortBy === option.value
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Categories */}
            <div>
              <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">
                Categories
              </h4>
              <div className="space-y-1">
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => toggleCategory(cat.slug)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategories.includes(cat.slug)
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <>
                <Separator />
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full rounded-xl"
                >
                  Clear All Filters
                </Button>
              </>
            )}

            {/* Mobile Apply */}
            <div className="lg:hidden">
              <Button
                onClick={() => setShowFilters(false)}
                className="w-full rounded-xl bg-primary"
              >
                Show {filteredProducts.length} Results
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active Filters & Count */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </span>

              {selectedCategories.map((slug) => {
                const cat = categories.find((c) => c.slug === slug);
                return (
                  <Badge
                    key={slug}
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() => toggleCategory(slug)}
                  >
                    {cat?.icon} {cat?.name}
                    <X className="h-3 w-3" />
                  </Badge>
                );
              })}
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 text-6xl">🔍</div>
                <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                  No products found
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={clearFilters} className="rounded-xl">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
