// ============================================
// PipeBloom – TypeScript Interfaces
// ============================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  stock: number;
  dimensions: string;
  material: string;
  handmadeTime: string;
  deliveryTime: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: string;
}

export type CategorySlug =
  | "flower-bouquets"
  | "flower-pots"
  | "teddy-bears"
  | "tulips"
  | "roses"
  | "sunflowers"
  | "mini-plants"
  | "customized-gifts"
  | "keychains"
  | "valentine-gifts"
  | "birthday-gifts"
  | "festival-gifts";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  comment: string;
  rating: number;
  productName: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  discount: number;
  deliveryCharge: number;
  finalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "dispatched"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  role: "customer" | "admin";
  createdAt: string;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface FilterState {
  categories: CategorySlug[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: string;
  searchQuery: string;
}
