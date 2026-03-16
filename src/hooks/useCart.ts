"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  CartItem,
  Product,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartApi,
  getLastOrders,
} from "@/lib/api";

export function useCart(userId: number | null) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // إضافة عنصر للكارت
  const addItem = async (product: Omit<CartItem, "quantity">) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await addCartItem(userId, product); // استخدام API

      const exists = items.find((i) => i.id === product.id);
      if (exists) {
        setItems(
          items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      } else {
        setItems([...items, { ...product, quantity: 1 }]);
      }

      toast.success(`${product.title} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  // إزالة عنصر ولكنه ليس موجود حقيقي في api 
const removeItem = async (id: number) => {
  if (!userId) return;

  try {
    setItems((prev) => prev.filter((i) => i.id !== id));

    toast.success("Item removed from cart");
  } catch {
    toast.error("Failed to remove item");
  }
};

// remove item from cart from api:
// const removeItem = async (productId: number) => {
//   if (!userId) return;

//   try {
//     await removeCartItem(userId, productId);   

//     setItems((prev) =>
//       prev.filter((item) => item.id !== productId)
//     );

//     toast.success("Item removed from cart");
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to remove item");
//   }
// };

  // تعديل الكمية
  const updateQty = async (id: number, change: number) => {
    if (!userId) return;
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQty = Math.max(item.quantity + change, 1);
    try {
      await updateCartItem(userId, id, newQty);
      setItems(
        items.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
      );
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await clearCartApi(userId);
      setItems([]);
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

useEffect(() => {
  const storedCart = localStorage.getItem("cart");

  if (storedCart) {
    setItems(JSON.parse(storedCart));
  }
}, []);

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(items));
}, [items]);

  return { items, isLoading, addItem, removeItem, updateQty, clearCart };
}