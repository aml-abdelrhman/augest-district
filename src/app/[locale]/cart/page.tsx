"use client";

import { useCartContext } from "@/hooks/catrcontext";
import { useState } from "react";
import Image from "next/image";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  User, MapPin, Phone, Mail, 
  ChevronDown, CreditCard, Ticket 
} from "lucide-react";

export default function CartPage() {
    const params = useParams();
    const locale = params.locale;
  const t = useTranslations("cart"); // استخدام ملف الترجمة الجديد للـ Cart
  const { items, removeItem, updateQty, clearCart } = useCartContext();
  const [discount, setDiscount] = useState("");

  const handleRemove = (id: number) => removeItem(id);
  const handleIncrease = (id: number) => updateQty(id, 1);
  const handleDecrease = (id: number) => updateQty(id, -1);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = subtotal > 0 ? 10 : 0;
  const discountValue = discount === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discountValue;

  const handleClearCart = () => {
    if (window.confirm(t("clearCartConfirm"))) clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{t("emptyCart")}</h1>
          <p className="text-gray-500">{t("emptyCartMsg")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-18 md:px-6 px-3 bg-[#1D1D23] max-w-7xl mx-auto">
      <div className="mb-8 md:mb-16 flex justify-start">
        <BreadcrumbBar />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center">{t("cartTitle")}</h2>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ================= CART ================= */}
        <div className="flex-1 p-6 rounded-2xl shadow-md text-white">
          <div className="grid grid-cols-6 text-gray-400 text-md border-b border-white/20 pb-3 mb-4">
            <span></span>
            <span>{t("image")}</span>
            <span className="col-span-2">{t("product")}</span>
            <span className="text-center">{t("quantity")}</span>
            <span className="text-right">{t("price")}</span>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 items-center gap-5 md:gap-2 border-b border-white/10 pb-4"
              >
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:bg-white/10 w-6 h-6 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>

                <div className="w-14 h-15 rounded-md overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    width={56}
                    height={60}
                  />
                </div>

                <span className="col-span-2 font-medium text-sm">
                  {item.title}
                </span>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="w-7 h-7 bg-[#59B1C2] rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="w-7 h-7 bg-[#59B1C2] rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <span className="text-right font-semibold">
                  {(item.price * item.quantity).toFixed(2)}€
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="w-full lg:w-[300px] p-6 rounded-2xl shadow-md h-fit bg-gray-500">
          <h3 className="text-xl font-bold mb-6">{t("orderSummary")}</h3>

          <div className="flex justify-between mb-3 text-sm">
            <span>{t("subtotal")}</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>

          <div className="flex justify-between mb-4 text-sm">
            <span>{t("shipping")}</span>
            <span>{shippingCost.toFixed(2)}€</span>
          </div>

          {discountValue > 0 && (
            <div className="flex justify-between mb-4 text-sm text-green-400">
              <span>{t("discount")}</span>
              <span>-{discountValue.toFixed(2)}€</span>
            </div>
          )}

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>{t("total")}</span>
            <span>{total.toFixed(2)}€</span>
          </div>


          <button
            onClick={handleClearCart}
            className="w-full bg-[#59B1C2] text-white py-3 rounded-3xl font-semibold mb-3"
          >
            {t("clearCart")}
          </button>

          <Link
        href={`/${locale}/checkout`} // لو عايزة تحافظي على الـlocale الحالي
        className="w-full bg-[#59B1C2] text-white py-3 rounded-3xl font-semibold flex justify-center"
      >
        {t("checkout")}
      </Link>
        </div>
      </div>
    </div>
  );
}
