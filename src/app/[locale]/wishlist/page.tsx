"use client";

import { useWishlist } from "@/hooks/wishlist-context";
import { useCartContext } from "@/hooks/catrcontext";
import Image from "next/image";
import Link from "next/link";
import SidebarProfile from "../profile/SidebarProfile";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useTranslations } from "next-intl";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { usePathname, useParams } from "next/navigation";


export default function WishlistPage() {
  const t = useTranslations("wishlist");
const pathname = usePathname();
  const params = useParams();
  const locale = params.locale || "en";
  
  const { items, toggleWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCartContext();

  const [products, setProducts] = useState(items);

  useEffect(() => {
    async function loadProducts() {
      const updated = await Promise.all(
        items.map(async (p) => {
          if (!p.rating) {
            try {
              const res = await api.get(`/products/${p.id}`);
              return res.data;
            } catch {
              return p;
            }
          }
          return p;
        })
      );

      setProducts(updated);
    }

    loadProducts();
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 space-y-4">
        <h1 className="text-3xl font-bold text-center">
          {t("Your Wishlist is Empty 💔")}
        </h1>

        <Link href={`/${locale}/products`}
          className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition"
        >
          {t("Browse Products")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-8 max-w-7xl mx-auto bg-[#1D1D23]">
     <div className=" mb-8 md:mb-16 flex justify-start ">
        <BreadcrumbBar />
      </div> 
     
      <h2 className="text-4xl font-bold text-center mb-6 text-white">
        {t("My Profile")}
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
          <SidebarProfile />

        <div className="flex-1">
          

          <div className="hidden md:flex text-gray-400 text-md border-b border-gray-700 pb-3 mb-4 px-2">
            <div className="flex-1">{t("Productname")}</div>
            <div className="w-24 text-center mx-5">{t("Unit price")}</div>
            <div className="w-32 text-center">{t("Stock")}</div>
            <div className="w-32 text-center">{t("Cart")}</div>
          </div>

          <div className="space-y-4">
            {products.map((product) => {
              const inStock = (product.rating?.count ?? 0) > 0;

              return (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row md:items-center text-white rounded-xl p-4 gap-3 md:gap-0"
                >
                  <div className="flex items-center flex-1 gap-3">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-gray-400 text-lg hover:text-gray-700"
                    >
                      ✕
                    </button>

                    <div className="relative w-20 h-20 md:w-35 md:h-25">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>

                    <p className="text-sm line-clamp-2 max-w-[220px]">
                      {product.title}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 max-w-[350px]">
                    <p className="flex items-center gap-3">
                      <span className="text-cyan-400 font-light text-lg">
                        {product.price.toFixed(2)}$
                      </span>
                      <span className="text-white text-sm">
                        {product.price.toFixed(2)}$
                      </span>
                    </p>
                  </div>

                  <div
                    className={`md:w-32 text-sm md:text-center font-semibold ${
                      inStock ? "text-cyan-400" : "text-red-400"
                    }`}
                  >
                    {inStock ? t("In Stock") : t("Out of Stock")}
                  </div>

                  <div className="md:w-32 md:text-center">
                    <button
                      onClick={() => {
                        addItem(product);
                        toggleWishlist(product);
                      }}
                      disabled={!inStock}
                      className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-sm font-semibold disabled:bg-gray-600 w-full md:w-auto"
                    >
                      {t("Add to Cart")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


// from api$hook:
// hook يستدعي دوال الـ .
// Context يستدعي الـ hook والـ
// APIهو يستدعي الدوال الموجودة في الـ Context والـ
// "use client";

// import { useCart } from "@/hooks/catrcontext";
// import Image from "next/image";
// import Link from "next/link";
// import SidebarProfile from "../profile/SidebarProfile";
// import { useWishlist } from "@/hooks/useWishlist"; // هوك الـ API الحقيقي

// export default function WishlistPage() {
//   const { items, addItem: addWishlistItem, removeItem, clearWishlist } = useWishlist();
//   const { addItem } = useCart();

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center pt-24 space-y-4">
//         <h1 className="text-3xl font-bold text-center">
//           Your Wishlist is Empty 💔
//         </h1>

//         <Link
//           href="/products"
//           className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition"
//         >
//           Browse Products
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-28 px-4 max-w-7xl mx-auto">

//       <div className="flex flex-col lg:flex-row gap-8">

//         {/* Sidebar */}
//         <div className="lg:w-64 w-full">
//           <SidebarProfile />
//         </div>

//         {/* Content */}
//         <div className="flex-1">

//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">
//               Wishlist ({items.length})
//             </h2>

//             <button
//               onClick={() => clearWishlist.mutate()}
//               className="text-red-500 hover:text-red-700 underline text-sm"
//             >
//               Clear All
//             </button>
//           </div>

//           {/* Table Header - desktop */}
//           <div className="hidden md:flex text-gray-400 text-sm border-b border-gray-700 pb-3 mb-4 px-2">
//             <div className="flex-1">Product</div>
//             <div className="w-24 text-center">Price</div>
//             <div className="w-32 text-center">Stock</div>
//             <div className="w-32 text-center">Action</div>
//           </div>

//           {/* Products */}
//           <div className="space-y-4">

//             {items.map((product) => {
//               const inStock = (product.rating?.count ?? 0) > 0;
//               return (
//                 <div
//                   key={product.id}
//                   className="flex flex-col md:flex-row md:items-center bg-[#1b1e27] text-white rounded-xl p-4 gap-3 md:gap-0"
//                 >

//                   {/* Product Section */}
//                   <div className="flex items-center flex-1 gap-3">

//                     {/* remove */}
//                     <button
//                       onClick={() => removeItem.mutate(product.id)}
//                       className="text-red-500 text-lg hover:text-red-700"
//                     >
//                       ✕
//                     </button>

//                     {/* image */}
//                     <div className="relative w-20 h-20">
//                       <Image
//                         src={product.image}
//                         alt={product.title}
//                         fill
//                         className="object-contain"
//                         unoptimized
//                       />
//                     </div>

//                     {/* title */}
//                     <p className="text-sm line-clamp-2 max-w-[220px]">
//                       {product.title}
//                     </p>
//                   </div>

//                   {/* Price */}
//                   <div className="md:w-24 text-cyan-400 font-bold text-sm md:text-center">
//                     {product.price.toFixed(2)}€
//                   </div>

//                   {/* Stock */}
//                   <div
//                     className={`md:w-32 text-sm md:text-center font-semibold ${
//                       inStock ? "text-green-400" : "text-red-400"
//                     }`}
//                   >
//                     {inStock ? "In Stock" : "Out of Stock"}
//                   </div>

//                   {/* Add to cart */}
//                   <div className="md:w-32 md:text-center">
//                     <button
//                       onClick={() => addItem(product)}
//                       disabled={!inStock}
//                       className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-sm font-semibold disabled:bg-gray-600 w-full md:w-auto"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>

//                   {/* Add/remove from wishlist */}
//                   <div className="md:w-12 md:text-center">
//                     <button
//                       onClick={() => {
//                         inStock
//                           ? removeItem.mutate(product.id)
//                           : addWishlistItem.mutate(product);
//                       }}
//                       className={`px-2 py-1 rounded text-white ${
//                         inStock ? "bg-red-500 hover:bg-red-600" : "bg-green-500"
//                       }`}
//                     >
//                       {inStock ? "Remove" : "Add"}
//                     </button>
//                   </div>

//                 </div>
//               );
//             })}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
