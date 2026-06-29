// ============================================
// PipeBloom – Mock Review Data
// ============================================

import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "rev-001",
    userId: "user-001",
    userName: "Priya Sharma",
    productId: "prod-001",
    rating: 5,
    comment:
      "Absolutely stunning! The tulip pot looks so realistic on my desk. My colleagues keep asking where I got it. The craftsmanship is incredible — you can tell each petal was made with love. Will definitely order more!",
    createdAt: "2025-06-15",
    isVerified: true,
  },
  {
    id: "rev-002",
    userId: "user-002",
    userName: "Arjun Patel",
    productId: "prod-002",
    rating: 5,
    comment:
      "Gifted this rose bouquet to my wife for our anniversary. She was thrilled! The colors are vibrant and the wrapping is so elegant. Best part? It will never wilt. Worth every rupee!",
    createdAt: "2025-06-10",
    isVerified: true,
  },
  {
    id: "rev-003",
    userId: "user-003",
    userName: "Sneha Reddy",
    productId: "prod-004",
    rating: 5,
    comment:
      "The teddy bear is SO adorable! I got one for my niece and she absolutely loves it. The tiny red heart detail is precious. Already ordered two more for her friends' birthdays.",
    createdAt: "2025-06-08",
    isVerified: true,
  },
  {
    id: "rev-004",
    userId: "user-004",
    userName: "Rahul Kumar",
    productId: "prod-005",
    rating: 4,
    comment:
      "Great little desk cactus! My only wish is that it was slightly bigger. The craftsmanship is excellent though, and the tiny pot is really cute. Perfect for someone who kills every plant they touch (me).",
    createdAt: "2025-06-05",
    isVerified: true,
  },
  {
    id: "rev-005",
    userId: "user-005",
    userName: "Meera Nair",
    productId: "prod-006",
    rating: 5,
    comment:
      "Ordered the keychain set as party favors for my daughter's birthday. All the kids loved them! Great quality and the flower design is so pretty. Fast delivery too!",
    createdAt: "2025-06-01",
    isVerified: true,
  },
  {
    id: "rev-006",
    userId: "user-006",
    userName: "Karthik Iyer",
    productId: "prod-003",
    rating: 4,
    comment:
      "The sunflower vase is beautiful and brightens up my living room. The vase quality is good and the flowers look very realistic. Shipping was well-packed. Minor issue: one leaf was slightly bent, but I fixed it easily.",
    createdAt: "2025-05-28",
    isVerified: true,
  },
  {
    id: "rev-007",
    userId: "user-007",
    userName: "Ananya Gupta",
    productId: "prod-008",
    rating: 5,
    comment:
      "This Valentine's gift box is EVERYTHING! My boyfriend was so surprised. The mini rose and teddy inside are gorgeous. The packaging is premium — gold ribbon and all. Best Valentine's gift ever!",
    createdAt: "2025-02-15",
    isVerified: true,
  },
  {
    id: "rev-008",
    userId: "user-008",
    userName: "Deepak Joshi",
    productId: "prod-010",
    rating: 5,
    comment:
      "Got a custom name pot with 'AMMA' for Mother's Day. Mom cried happy tears! The letters are so well-made and the flowers are beautiful. This is truly a one-of-a-kind gift. Thank you PipeBloom!",
    createdAt: "2025-05-12",
    isVerified: true,
  },
  {
    id: "rev-009",
    userId: "user-009",
    userName: "Ritu Agarwal",
    productId: "prod-011",
    rating: 5,
    comment:
      "The succulent trio is adorable! They look incredibly realistic. I keep them on my work desk and everyone thinks they're real (until they touch them). The pots are also very well made.",
    createdAt: "2025-05-25",
    isVerified: true,
  },
  {
    id: "rev-010",
    userId: "user-010",
    userName: "Vikram Singh",
    productId: "prod-014",
    rating: 5,
    comment:
      "The mini teddy keychain is the cutest thing I've ever owned. Got the brown one and attached it to my car keys. So tiny and so detailed — the bow tie is incredible at that size!",
    createdAt: "2025-06-18",
    isVerified: true,
  },
];

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
}
