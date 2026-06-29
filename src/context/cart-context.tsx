"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { Product, CartItem } from "@/types";

// ============================================
// Cart State & Actions
// ============================================

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_COUPON"; code: string; discount: number }
  | { type: "REMOVE_COUPON" }
  | { type: "LOAD_CART"; state: CartState };

const initialState: CartState = {
  items: [],
  couponCode: null,
  couponDiscount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + (action.quantity || 1),
        };
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity || 1 },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return initialState;
    case "APPLY_COUPON":
      return {
        ...state,
        couponCode: action.code,
        couponDiscount: action.discount,
      };
    case "REMOVE_COUPON":
      return { ...state, couponCode: null, couponDiscount: 0 };
    case "LOAD_CART":
      return action.state;
    default:
      return state;
  }
}

// ============================================
// Context
// ============================================

interface CartContextType {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  totalItems: number;
  subtotal: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pipebloom-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_CART", state: parsed });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("pipebloom-cart", JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const total = subtotal - (subtotal * state.couponDiscount) / 100;

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", product, quantity });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    const coupons: Record<string, number> = {
      PIPE10: 10,
      BLOOM20: 20,
      FIRST15: 15,
    };
    const discount = coupons[code.toUpperCase()];
    if (discount) {
      dispatch({ type: "APPLY_COUPON", code: code.toUpperCase(), discount });
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    dispatch({ type: "REMOVE_COUPON" });
  }, []);

  const isInCart = useCallback(
    (productId: string) => state.items.some((item) => item.product.id === productId),
    [state.items]
  );

  return (
    <CartContext value={{
      items: state.items,
      couponCode: state.couponCode,
      couponDiscount: state.couponDiscount,
      totalItems,
      subtotal,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      isInCart,
    }}>
      {children}
    </CartContext>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
