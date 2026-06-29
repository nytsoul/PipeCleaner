// ============================================
// PipeBloom – Site Constants
// ============================================

export const SITE_NAME = "PipeBloom";
export const SITE_TAGLINE = "Handmade Pipe Cleaner Gifts";
export const SITE_DESCRIPTION =
  "Discover beautifully handcrafted pipe cleaner gifts — flower bouquets, flower pots, teddy bears, mini plants, keychains, and customized gifts. Each piece is made with love and creativity.";

export const CURRENCY = "₹";
export const CURRENCY_CODE = "INR";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Artisans", href: "/about#artisans" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Press", href: "/about#press" },
  ],
  customerService: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "FAQ", href: "/faq" },
  ],
  quickLinks: [
    { label: "Shop All", href: "/shop" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Bulk Orders", href: "/bulk-orders" },
    { label: "Custom Orders", href: "/contact" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/pipebloom", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/pipebloom", icon: "facebook" },
  { label: "Pinterest", href: "https://pinterest.com/pipebloom", icon: "pinterest" },
  { label: "Twitter", href: "https://twitter.com/pipebloom", icon: "twitter" },
] as const;

export const USP_ITEMS = [
  {
    icon: "hand-heart",
    title: "100% Handmade",
    description: "Every piece crafted with love and precision",
  },
  {
    icon: "leaf",
    title: "Eco-Friendly",
    description: "Sustainable materials, minimal waste",
  },
  {
    icon: "truck",
    title: "Fast Delivery",
    description: "Ships within 3-5 business days",
  },
  {
    icon: "shield-check",
    title: "Secure Payment",
    description: "100% safe and encrypted transactions",
  },
] as const;

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Best Rated", value: "rating" },
] as const;

export const PRICE_RANGE = {
  min: 0,
  max: 5000,
} as const;

export const FREE_DELIVERY_THRESHOLD = 999;
export const DELIVERY_CHARGE = 49;

export const CONTACT_INFO = {
  email: "hello@pipebloom.com",
  phone: "+91 98765 43210",
  address: "Studio 42, Creative Hub, Koramangala, Bangalore - 560034",
} as const;
