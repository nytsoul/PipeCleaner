// ============================================
// PipeBloom – Category Data
// ============================================

import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "flower-bouquets",
    name: "Flower Bouquets",
    description: "Handcrafted pipe cleaner bouquets for every occasion",
    icon: "🌸",
    image: "/images/products/rose-bouquet.png",
    productCount: 8,
  },
  {
    slug: "flower-pots",
    name: "Flower Pots",
    description: "Decorative flower pots that brighten any space",
    icon: "🌼",
    image: "/images/products/tulip-flower-pot.png",
    productCount: 6,
  },
  {
    slug: "teddy-bears",
    name: "Teddy Bears",
    description: "Adorable pipe cleaner teddy bears to cuddle",
    icon: "🐻",
    image: "/images/products/teddy-bear.png",
    productCount: 4,
  },
  {
    slug: "sunflowers",
    name: "Sunflowers",
    description: "Bright and cheerful sunflower arrangements",
    icon: "🌻",
    image: "/images/products/sunflower-arrangement.png",
    productCount: 5,
  },
  {
    slug: "mini-plants",
    name: "Mini Plants",
    description: "Tiny desk plants that never need watering",
    icon: "🌵",
    image: "/images/products/mini-cactus.png",
    productCount: 7,
  },
  {
    slug: "keychains",
    name: "Keychains",
    description: "Cute pipe cleaner keychains for bags and keys",
    icon: "🔑",
    image: "/images/products/keychain-set.png",
    productCount: 10,
  },
  {
    slug: "customized-gifts",
    name: "Customized Gifts",
    description: "Personalized creations made just for you",
    icon: "🎁",
    image: "/images/products/custom-gift.png",
    productCount: 3,
  },
  {
    slug: "valentine-gifts",
    name: "Valentine's Gifts",
    description: "Express your love with handmade charm",
    icon: "❤️",
    image: "/images/products/valentine-gift.png",
    productCount: 5,
  },
  {
    slug: "roses",
    name: "Roses",
    description: "Classic rose arrangements in vivid colors",
    icon: "🌹",
    image: "/images/products/rose-bouquet.png",
    productCount: 6,
  },
  {
    slug: "tulips",
    name: "Tulips",
    description: "Elegant tulip creations for sophisticated tastes",
    icon: "💐",
    image: "/images/products/tulip-flower-pot.png",
    productCount: 4,
  },
  {
    slug: "birthday-gifts",
    name: "Birthday Gifts",
    description: "Make their birthday extra special",
    icon: "🎂",
    image: "/images/products/birthday-gift.png",
    productCount: 5,
  },
  {
    slug: "festival-gifts",
    name: "Festival Gifts",
    description: "Celebrate festivals with handmade joy",
    icon: "🎄",
    image: "/images/products/festival-gift.png",
    productCount: 4,
  },
];

export const featuredCategories = categories.slice(0, 6);
