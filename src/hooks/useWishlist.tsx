"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/wishlist-context";

type Props = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export default function WishlistButton({ id, title, price, image }: Props) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(id);

  const handleClick = () => {
    toggleWishlist({ id, title, price, image });
  };

  return (
    <button onClick={handleClick} className="relative">
      <Heart
        className={`w-6 h-6 transition ${
          inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
        }`}
      />
    </button>
  );
}


 // src/hooks/useWishlist.ts
//  from api
// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "sonner"; // أو react-hot-toast
// import { WishlistItem, fetchWishlist, addWishlistItem, removeWishlistItem, clearWishlistApi } from "@/lib/api";
// import { useSession } from "next-auth/react";

// export function useWishlist() {
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
//   const addItem = useMutation({
//     mutationFn: (item: WishlistItem) => addWishlistItem(token, item),
//     onSuccess: () => {
//       toast.success("Item added to wishlist");
//       queryClient.invalidateQueries(["wishlist"]);
//     },
//     onError: () => toast.error("Failed to add item"),
//   });

//   // حذف عنصر
//   const removeItem = useMutation({
//     mutationFn: (id: string | number) => removeWishlistItem(token, id),
//     onSuccess: () => {
//       toast.success("Item removed from wishlist");
//       queryClient.invalidateQueries(["wishlist"]);
//     },
//     onError: () => toast.error("Failed to remove item"),
//   });

//   // مسح كل القائمة
//   const clearWishlist = useMutation({
//     mutationFn: () => clearWishlistApi(token),
//     onSuccess: () => {
//       toast.success("Wishlist cleared");
//       queryClient.invalidateQueries(["wishlist"]);
//     },
//     onError: () => toast.error("Failed to clear wishlist"),
//   });

//   // helper
//   const isInWishlist = (id: string | number) => items.some((i) => i.id === id);

//   return { items, isLoading, isError, addItem, removeItem, clearWishlist, isInWishlist };
