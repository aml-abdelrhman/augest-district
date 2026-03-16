"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  CreditCard,
  Ticket,
} from "lucide-react";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { getProfile, placeOrder } from "@/lib/api";
import { useCartContext } from "@/hooks/catrcontext";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CheckoutPage = () => {
  const params = useParams();
  const locale = params.locale;
  const { items, updateQty, clearCart } = useCartContext();

  const t = useTranslations("checkout");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = subtotal > 0 ? 10 : 0;
  const [discount, setDiscount] = useState("");
  const discountValue = discount === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discountValue;

  useEffect(() => {
    const totalSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(totalSubtotal);
  }, [items]);

  const handleIncrease = (id: number) => updateQty(id, 1);
  const handleDecrease = (id: number) => updateQty(id, -1);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  const userId = 1;

  return (
    <div className="min-h-screen bg-[#121212] rounded-3xl text-white p-4 md:p-10 font-sans">
      <div className="mb-8 md:mb-16 mt-8 ml-8 flex justify-start">
        <BreadcrumbBar />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Details Form */}
        <div className="lg:col-span-2 bg-[#1E1E21] p-6 md:p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-8">{t("billingDetails")}</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("firstName")}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  placeholder={t("firstName")}
                  className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none focus:border-[#59B1C2] transition"
                />
                <User className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("lastName")}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  placeholder={t("lastName")}
                  className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none focus:border-[#59B1C2] transition"
                />
                <User className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">{t("companyName")}</label>
              <input
                type="text"
                placeholder={t("companyName")}
                className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none focus:border-[#59B1C2]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("countryRegion")}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none appearance-none cursor-pointer">
                  <option className="bg-[#1E1E21]">Select your Region</option>
                </select>
                <ChevronDown className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("townCity")}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none appearance-none cursor-pointer">
                  <option className="bg-[#1E1E21]">Select your city</option>
                </select>
                <ChevronDown className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("streetName")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("streetName")}
                className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none focus:border-[#59B1C2]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("state")}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none appearance-none cursor-pointer">
                  <option className="bg-[#1E1E21]">Select your State</option>
                </select>
                <ChevronDown className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("houseNumber")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("houseNumber")}
                className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none focus:border-[#59B1C2]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("zipCode")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("zipCode")}
                className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none focus:border-[#59B1C2]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                {t("phone")}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  placeholder={t("phone")}
                  className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none focus:border-[#59B1C2]"
                />
                <Phone className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm">
                {t("email")}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  placeholder={t("email")}
                  className="w-full bg-transparent border-b border-gray-600 py-3 px-2 outline-none focus:border-[#59B1C2]"
                />
                <Mail className="absolute right-2 top-3 text-gray-500 w-5 h-5" />
              </div>
            </div>

            {/* Agreement */}
            <div className="md:col-span-2 flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 rounded accent-[#59B1C2]"
              />
              <label htmlFor="terms" className="text-sm text-gray-300">
                {t("terms")}
              </label>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-8">
              <button
                className="bg-[#59B1C2] text-black font-bold py-4 px-12 rounded-full hover:bg-[#4a96a5] transition-all"
                onClick={async () => {
                  try {
                    const billingData = {
                      firstName: profile.firstName,
                      lastName: profile.lastName,
                      email: profile.email,
                      phone: profile.phone,
                      company: "",
                      country: "",
                      city: "",
                      street: "",
                      state: "",
                      houseNumber: "",
                      zipCode: "",
                    };

                    const result = await placeOrder(
                      userId,
                      items,
                      billingData,
                      paymentMethod,
                      discountValue,
                      shippingCost
                    );
                    alert(t("placeOrder") + " " + "successful!");
                    clearCart();
                  } catch (err) {
                    alert("Failed to place order. Try again.");
                  }
                }}
              >
                {t("placeOrder")}
              </button>

              <Link
                href={`/${locale}/cart`}
                className="bg-[#3A3A3E] text-white font-bold py-4 px-12 rounded-full hover:bg-[#4a4a4e] transition-all flex justify-center"
              >
                {t("backToCart")}
              </Link>
            </div>
          </form>
        </div>

        {/* Order Summary & Payment */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#1E1E21] p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">{t("yourOrder")}</h3>
            <div className="space-y-4 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-400">
                    {item.title}{" "}
                    <span className="text-[#59B1C2]">x {item.quantity}</span>
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm mt-4">
                <span>{t("subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("shipping")}</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              {discountValue > 0 && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>{t("discount")}</span>
                  <span>-${discountValue.toFixed(2)}</span>
                </div>
              )}
              <hr className="border-gray-700 my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>{t("total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Coupon */}
              <div className="relative mt-4">
                <div className="flex items-center bg-[#2A2A2D] rounded-xl p-1 pl-3">
                  <Ticket className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder={t("coupon")}
                    className="bg-transparent flex-1 outline-none text-sm"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <button className="text-[#59B1C2] px-4 py-2 font-semibold">
                    {t("apply")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#1E1E21] p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">{t("paymentMethod")}</h3>
            <div className="space-y-3">
              {["card", "tamara", "tabby"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === method
                      ? "border-[#59B1C2] bg-[#2A2A2D]"
                      : "border-transparent bg-[#2A2A2D]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      className="accent-[#59B1C2]"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span className="text-sm font-medium">
                      {method === "card"
                        ? t("creditCard")
                        : method === "tamara"
                        ? t("tamara")
                        : t("tabby")}
                    </span>
                  </div>
                  {method === "card" && <CreditCard className="text-orange-400" />}
                  {method === "tamara" && (
                    <div className="bg-[#FFC439] text-black text-[10px] px-2 py-0.5 rounded font-bold italic">
                      {t("tamara")}
                    </div>
                  )}
                  {method === "tabby" && (
                    <div className="bg-[#3CF2B5] text-black text-[10px] px-2 py-0.5 rounded font-bold lowercase">
                      {t("tabby")}
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;