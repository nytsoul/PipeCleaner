import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // Product ID
  title: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string; // e.g. Color
}

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  savedForLater: CartItem[];
  couponCode: string | null;
  discountPercent: number;
  
  // Cart Actions
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string, variant?: string) => void;
  increaseQuantity: (id: string, variant?: string) => void;
  decreaseQuantity: (id: string, variant?: string) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;

  // Save for Later
  saveForLater: (id: string, variant?: string) => void;
  moveToCart: (id: string, variant?: string) => void;
  removeFromSaved: (id: string, variant?: string) => void;

  // Checkout Data
  applyCoupon: (code: string, percent: number) => void;
  removeCoupon: () => void;
  
  // Derived state (getters)
  getSubtotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      savedForLater: [],
      couponCode: null,
      discountPercent: 0,

      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(i => i.id === item.id && i.variant === item.variant);
        if (existingItem) {
          return {
            cart: state.cart.map(i => 
              (i.id === item.id && i.variant === item.variant) 
                ? { ...i, quantity: i.quantity + (item.quantity || 1) } 
                : i
            )
          };
        }
        return { cart: [...state.cart, { ...item, quantity: item.quantity || 1 }] };
      }),

      removeFromCart: (id, variant) => set((state) => ({
        cart: state.cart.filter(i => !(i.id === id && i.variant === variant))
      })),

      increaseQuantity: (id, variant) => set((state) => ({
        cart: state.cart.map(i => 
          (i.id === id && i.variant === variant) 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      })),

      decreaseQuantity: (id, variant) => set((state) => ({
        cart: state.cart.map(i => 
          (i.id === id && i.variant === variant && i.quantity > 1) 
            ? { ...i, quantity: i.quantity - 1 } 
            : i
        )
      })),

      clearCart: () => set({ cart: [] }),

      addToWishlist: (item) => set((state) => {
        if (state.wishlist.find(w => w.id === item.id)) return state;
        return { wishlist: [...state.wishlist, item] };
      }),

      removeFromWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.filter(w => w.id !== id)
      })),

      isInWishlist: (id) => {
        return get().wishlist.some(w => w.id === id);
      },

      saveForLater: (id, variant) => set((state) => {
        const item = state.cart.find(i => i.id === id && i.variant === variant);
        if (!item) return state;
        return {
          cart: state.cart.filter(i => !(i.id === id && i.variant === variant)),
          savedForLater: [...state.savedForLater, item]
        };
      }),

      moveToCart: (id, variant) => set((state) => {
        const item = state.savedForLater.find(i => i.id === id && i.variant === variant);
        if (!item) return state;
        
        // Add back to cart (handle if already exists)
        const existingCartItem = state.cart.find(i => i.id === id && i.variant === variant);
        let newCart = [...state.cart];
        if (existingCartItem) {
           newCart = newCart.map(i => 
             (i.id === id && i.variant === variant) ? { ...i, quantity: i.quantity + item.quantity } : i
           );
        } else {
           newCart.push(item);
        }

        return {
          savedForLater: state.savedForLater.filter(i => !(i.id === id && i.variant === variant)),
          cart: newCart
        };
      }),

      removeFromSaved: (id, variant) => set((state) => ({
        savedForLater: state.savedForLater.filter(i => !(i.id === id && i.variant === variant))
      })),

      applyCoupon: (code, percent) => set({ couponCode: code, discountPercent: percent }),
      
      removeCoupon: () => set({ couponCode: null, discountPercent: 0 }),

      getSubtotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const percent = get().discountPercent;
        return (subtotal * percent) / 100;
      },

      getTax: () => {
        const afterDiscount = get().getSubtotal() - get().getDiscount();
        return afterDiscount * 0.08; // 8% Tax rate
      },

      getShipping: () => {
        return get().cart.length > 0 ? 5.00 : 0; // Flat $5 shipping
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal - get().getDiscount() + get().getTax() + get().getShipping();
      }
    }),
    {
      name: 'pipebloom-cart-storage',
    }
  )
);
