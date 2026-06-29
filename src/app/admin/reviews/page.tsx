"use client";

import { useState } from "react";
import { Star, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    { id: "1", product: "Rose Bouquet", customer: "Alice", rating: 5, comment: "Absolutely beautiful work!", approved: true },
    { id: "2", product: "Tulip Pot", customer: "Bob", rating: 4, comment: "Looks great on my desk.", approved: true },
    { id: "3", product: "Custom Teddy", customer: "Charlie", rating: 2, comment: "A bit smaller than expected.", approved: false },
  ]);

  const toggleApproval = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Moderate customer reviews before they appear on the store.
        </p>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-muted stroke-current'}`} />
                  ))}
                </div>
                <span className="font-semibold text-sm">{review.customer}</span>
                <span className="text-muted-foreground text-xs">on {review.product}</span>
              </div>
              <p className="text-sm italic">&ldquo;{review.comment}&rdquo;</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant={review.approved ? "outline" : "default"} 
                size="sm" 
                className={`gap-2 ${review.approved ? 'text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20' : ''}`}
                onClick={() => toggleApproval(review.id)}
              >
                <CheckCircle className="h-4 w-4" />
                {review.approved ? "Approved" : "Approve"}
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
