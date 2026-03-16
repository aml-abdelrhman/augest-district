'use client';

import { useEffect, useState, useMemo } from "react";
import { getProducts, Product } from "@/lib/api";
import Image from "next/image";
import { useCartContext } from "@/hooks/catrcontext";
import { useWishlist } from "@/hooks/wishlist-context";
import { useTranslations } from "next-intl";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const t = useTranslations("productsPage");
  const params = useParams();
  const locale = params.locale;

  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get("category") || t("all");

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromQuery);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const productsPerPage = 9;

  const { items: cartItems, addItem } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    setSelectedCategory(categoryFromQuery);
  }, [categoryFromQuery]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory !== t("all"))
      filtered = filtered.filter((p) => p.category === selectedCategory);
    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, selectedCategory, sort, t]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage,
  );

  const categories = [
    t("all"),
    ...Array.from(new Set(products.map((p) => p.category || t("other")))),
  ];

  return (
    <div className="p-4 lg:p-10 bg-[#0f1117] text-white min-h-screen flex flex-col gap-6 lg:gap-10">
      <div className="mt-6 md:mt-10 mb-8 md:mb-16 md:ml-8 flex justify-start">
        <BreadcrumbBar />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Sidebar Categories */}
        <aside className="w-full lg:w-52 bg-[#1b1e27] p-4 rounded-xl h-[fit-content] overflow-y-auto">
          <h3 className="font-semibold mb-4 text-lg">{t("categories")}</h3>
          <div className="space-y-3 text-sm">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-[#2a2e3a] transition`}
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center border border-gray-400 rounded-full ${
                    selectedCategory === cat ? "bg-cyan-400 border-cyan-400" : ""
                  }`}
                >
                  {selectedCategory === cat && <span className="text-black font-bold">✓</span>}
                </span>
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <select
              className="bg-[#1b1e27] px-4 py-3 rounded-3xl hover:bg-[#2a2e3a] transition"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">{t("defaultSort")}</option>
              <option value="low">{t("priceLow")}</option>
              <option value="high">{t("priceHigh")}</option>
            </select>
            <p className="text-sm text-gray-400">
              {t("showingResults", { shown: paginatedProducts.length, total: filteredProducts.length })}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedProducts.map((product) => {
              const cartItem = cartItems.find((i) => i.id === product.id);
              return (
                <div key={product.id} className="relative group flex flex-col items-center text-center p-4">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute right-3 top-3 text-2xl md:text-3xl transition-transform duration-300 ${
                      isInWishlist(product.id) ? "text-red-500 scale-125" : "text-gray-400 hover:text-red-500"
                    }`}
                    aria-label={t("wishlist")}
                  >
                    {isInWishlist(product.id) ? "❤️" : "🤍"}
                  </button>

                  <Link href={`/${locale}/product/${product.id}`} className="w-full">
                    <div className="relative h-48 w-full md:w-48 mx-auto mb-3">
                      <Image src={product.image} alt={product.title} fill className="object-contain" unoptimized />
                    </div>
                    <h3 className="text-sm font-medium mb-1">{product.title}</h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-cyan-400 text-sm">${product.price.toFixed(2)}</p>
                    <p className="text-white text-xs">${product.price.toFixed(2)}</p>
                  </div>

                  <button
                    onClick={async () => { if (!cartItem) await addItem(product); }}
                    className={`mt-1 w-full md:w-32 bg-cyan-500 hover:bg-cyan-600 transition py-2 rounded-lg text-sm ${cartItem ? "opacity-80 cursor-default" : ""}`}
                  >
                    {cartItem ? t("inCart", { quantity: cartItem.quantity }) : t("addToCart")}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`w-9 h-9 rounded-full ${page === i + 1 ? "bg-cyan-500" : "bg-[#1b1e27]"} transition`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}