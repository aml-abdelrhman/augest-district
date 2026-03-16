// src/hooks/wishlist-context.tsx
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

export type WishlistItem = {
  id: number;
  title: string;
  price: number;
  image: string;
     rating?: {
    rate: number;
    count: number;
  };
};

type WishlistContextType = {
  items: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // تحميل القائمة من localStorage
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem("wishlist-items");
      if (storedItems) {
        const parsed = JSON.parse(storedItems);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
    setIsInitialized(true);
  }, []);

  // حفظ القائمة عند التغيير
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wishlist-items", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const wishlistCount = items.length;

  const isInWishlist = (id: number) => items.some((item) => item.id === id);

  const toggleWishlist = (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      setItems((prev) => prev.filter((i) => i.id !== product.id));
      toast.success("Removed from wishlist");
    } else {
      setItems((prev) => [...prev, product]);
      toast.success("Added to wishlist");
    }
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success("Wishlist cleared");
  };

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, clearWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}


// src/hooks/wishlist-context.tsx
// "use client";

// import { createContext, useContext, ReactNode } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "sonner"; // أو react-hot-toast
// import { useSession } from "next-auth/react";
// import {
//   WishlistItem,
//   fetchWishlist,
//   addWishlistItem,
//   removeWishlistItem,
//   clearWishlistApi,
// } from "@/lib/api";

// type WishlistContextType = {
//   items: WishlistItem[];
//   isLoading: boolean;
//   isError: boolean;
//   addItem: (item: WishlistItem) => void;
//   removeItem: (id: string | number) => void;
//   clearWishlist: () => void;
//   isInWishlist: (id: string | number) => boolean;
// };

// const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// // Provider يلف أي components
// export function WishlistProvider({ children }: { children: ReactNode }) {
//   const queryClient = useQueryClient();
//   const { data: session } = useSession();
//   const token = session?.user?.token || null;

//   // جلب عناصر الـ Wishlist
//   const { data: items = [], isLoading, isError } = useQuery<WishlistItem[]>({
//     queryKey: ["wishlist"],
//     queryFn: () => fetchWishlist(token),
//     enabled: !!token,
//     staleTime: 1000 * 60 * 5,
//   });

//   // إضافة عنصر
//   const addMutation = useMutation({
//     mutationFn: (item: WishlistItem) => addWishlistItem(token, item),
//     onSuccess: () => {
//       toast.success("Item added to wishlist");
//       queryClient.invalidateQueries(["wishlist"]);
//     },
//     onError: () => toast.error("Failed to add item"),
//   });

//   // حذف عنصر
//   const removeMutation = useMutation({
//     mutationFn: (id: string | number) => removeWishlistItem(token, id),
//     onSuccess: () => {
//       toast.success("Item removed from wishlist");
//       queryClient.invalidateQueries(["wishlist"]);
//     },
//     onError: () => toast.error("Failed to remove item"),
//   });

//   // مسح كل العناصر
//   const clearMutation = useMutation({
//     mutationFn: () => clearWishlistApi(token),
//     onSuccess: () => {
//       toast.success("Wishlist cleared");
//       queryClient.invalidateQueries(["wishlist"]);
//     },
//     onError: () => toast.error("Failed to clear wishlist"),
//   });

//   // helper: هل العنصر موجود في القائمة؟
//   const isInWishlist = (id: string | number) => items.some((i) => i.id === id);

//   return (
//     <WishlistContext.Provider
//       value={{
//         items,
//         isLoading,
//         isError,
//         addItem: (item: WishlistItem) => addMutation.mutate(item),
//         removeItem: (id: string | number) => removeMutation.mutate(id),
//         clearWishlist: () => clearMutation.mutate(),
//         isInWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }

// // 👇 Hook جاهز للاستعمال في أي component
// export function useWishlist() {
//   const context = useContext(WishlistContext);
//   if (!context) throw new Error("useWishlist must be used within WishlistProvider");
//   return context;
// }