"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

export default function AddToCartButton({ product }: { product: any }) {
  const [adding, setAdding] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.length > 0 ? product.variants[0].color : undefined
  );
  
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    setAdding(true);
    
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price - (product.price * (product.discount || 0)) / 100,
      image: product.images?.[0]?.url || "",
      variant: selectedVariant,
      quantity: 1
    });

    setTimeout(() => {
      setAdding(false);
      // Optional: open a side cart or toast notification here
    }, 400);
  };

  return (
    <div className="space-y-6">
      {product.variants?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Colors</h3>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v: any) => (
              <button 
                key={v.id} 
                onClick={() => setSelectedVariant(v.color)}
                className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium
                  ${selectedVariant === v.color ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
              >
                {v.color}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button 
        size="lg" 
        className="w-full sm:w-auto text-lg px-12 py-6 h-auto gap-3"
        onClick={handleAddToCart}
        disabled={adding || product.stock === 0}
      >
        <ShoppingCart className="h-6 w-6" />
        {adding ? "Added!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
