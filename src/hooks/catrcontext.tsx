"use client";

import { createContext, useContext } from "react";
import { useCart } from "./useCart";

type CartContextType = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextType | undefined>(undefined);

type Props = { userId: number; children: React.ReactNode };

export function CartProvider({ userId, children }: Props) {
  const cart = useCart(userId);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within CartProvider");
  return context;
}