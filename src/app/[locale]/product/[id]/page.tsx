"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import Image from "next/image";
import { useCartContext } from "@/hooks/catrcontext";
import { useWishlist } from "@/hooks/wishlist-context";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { useTranslations } from 'next-intl';

const sizes = ["XXS", "XS", "S", "M", "L", "XL"];
const colors = [
  "#ffffff",
  "#000000",
  "#860000",
  "#FFB7B7",
  "#FFCD0F",
  "#f97316",
  "#22c55e",
  "#3b82f6",
];

const SingleProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const id = params?.id || "";
  const locale = params?.locale || "en";

  const { items: cartItems, addItem } = useCartContext();
  const { items, removeItem, updateQty, clearCart } = useCartContext();
  const handleRemove = (id: number) => removeItem(id);
  const handleIncrease = (id: number) => updateQty(id, 1);
  const handleDecrease = (id: number) => updateQty(id, -1);
  const { items: wishlistItems, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const t = useTranslations('productDetails');

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(Number(id));
      setProduct(data);
    }
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="p-4 text-center text-red-500">
        {t('productNotFound')}
      </div>
    );
  }

  const cartItem = cartItems.find((i) => i.id === product.id);
  const isWishlisted = wishlistItems.some((i) => i.id === product.id);

  const handleAddToCart = () => {
    if (!cartItem) {
      addItem({
        ...product,
        size,
        color,
        quantity: qty,
      });
    }
  };

  return (
    <div className="w-full min-h-screen text-white flex flex-col justify-center ">
      <div className="max-w-7xl mx-auto bg-[#0f1117] rounded-3xl pt-28 px-4 sm:px-8 flex flex-col md:flex-row gap-12 ">
        <div className="flex-1 flex flex-col items-center ">
          <div className="w-full mb-9">
            <BreadcrumbBar />
          </div>

          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-2xl object-contain w-full max-w-[400px]"
            unoptimized
          />

          <div className="flex gap-3 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#151821] rounded-lg p-3 cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt="thumb"
                  width={60}
                  height={60}
                  className="rounded-lg object-cover max-w-[60px]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 pb-5 border-b-2 border-dashed border-gray-500">
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex flex-col gap-1">
                  <span className="text-md md:text-xl text-cyan-400 font-bold">
                    ${product.price}
                  </span>
                  <p className="text-xs text-gray-400">{t('exclusiveOfVAT')}</p>
                </div>
                <span className="text-sm md:text-md font-bold line-through text-gray-400">
                  ${product.price}
                </span>
                <span className="bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-xl">
                  {t('discount')}
                </span>
              </div>
              <p className="text-gray-400 text-sm md:text-base mt-2">
                {product.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 pb-5 border-b-2 border-dashed border-gray-500">
            <div className="flex items-center gap-4 mb-4 ">
              <p className="font-medium w-24">{t('size')}</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-3xl text-sm font-semibold border ${
                      size === s
                        ? "border-cyan-400 text-white bg-gray-600"
                        : "text-white bg-gray-600 border-gray-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <p className="font-medium w-24">{t('color')}</p>
              <div className="flex gap-3 flex-wrap">
                {colors.map((c) => (
                  <div
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                      color === c ? "border-white" : "border-gray-500"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <p className="font-medium w-24">{t('quantity')}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (qty > 1) setQty(qty - 1);
                    handleDecrease(Number(id));
                  }}
                  className="px-4 py-2 bg-gray-700 rounded-3xl"
                >
                  -
                </button>
                <span>{qty}</span>
                <button
                  onClick={() => {
                    setQty(qty + 1);
                    handleIncrease(Number(id));
                  }}
                  className="px-4 py-2 bg-gray-700 rounded-3xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* ======= LINKS & SUBSCRIPTION DIV ======= */}
          <div className="w-full mt-6 flex flex-col items-start gap-4">
            <div className="flex justify-start gap-40 w-full px-6">
              <div className="flex flex-col items-start">
                <span className="text-white font-semibold text-md mb-1">
                  {t('sizeGuide')}
                </span>
                <div className="flex items-center gap-2 justify-end w-full">
                  <a
                    href={`/${locale}/size-guide`}
                    className="text-cyan-400 underline hover:opacity-80 text-right text-sm"
                  >
                    {t('viewSizeGuide')}
                  </a>
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5487 2.32224L11.2845 2.50917L11.4714 1.77336L10.7356 1.58643L10.5487 2.32224ZM0.371875 7.49223C0.198801 7.59518 0.0737127 7.76267 0.0241273 7.95785C-0.0254581 8.15302 0.00452124 8.35991 0.107471 8.53298C0.21042 8.70605 0.377907 8.83114 0.573085 8.88073C0.768263 8.93031 0.975144 8.90033 1.14822 8.79738L0.371875 7.49223ZM9.69807 8.75365L11.2845 2.50917L9.81288 2.1353L8.22645 8.37979L9.69807 8.75365ZM10.7356 1.58643L4.49113 -2.44326e-07L4.11727 1.47162L10.3618 3.05804L10.7356 1.58643ZM10.1605 1.66966L0.371875 7.49223L1.14822 8.79738L10.9369 2.97481L10.1605 1.66966Z"
                      fill="#59B1C2"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-white font-semibold mb-1 text-md">
                  {t('policies')}
                </span>
                <div className="flex items-center gap-2 justify-end w-full">
                  <a
                    href="/policy"
                    className="text-cyan-400 underline hover:opacity-80 text-right text-sm"
                  >
                    
                    dealing-policies
                  </a>
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5487 2.32224L11.2845 2.50917L11.4714 1.77336L10.7356 1.58643L10.5487 2.32224ZM0.371875 7.49223C0.198801 7.59518 0.0737127 7.76267 0.0241273 7.95785C-0.0254581 8.15302 0.00452124 8.35991 0.107471 8.53298C0.21042 8.70605 0.377907 8.83114 0.573085 8.88073C0.768263 8.93031 0.975144 8.90033 1.14822 8.79738L0.371875 7.49223ZM9.69807 8.75365L11.2845 2.50917L9.81288 2.1353L8.22645 8.37979L9.69807 8.75365ZM10.7356 1.58643L4.49113 -2.44326e-07L4.11727 1.47162L10.3618 3.05804L10.7356 1.58643ZM10.1605 1.66966L0.371875 7.49223L1.14822 8.79738L10.9369 2.97481L10.1605 1.66966Z"
                      fill="#59B1C2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Subscription div */}
            <div className="w-full md:w-140 bg-[#35353F] rounded-3xl text-white  p-4 mt-4 relative">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-lg font-semibold">
                    42$
                  </span>
                  <span>Per Month / 24 months</span>
                </div>

                <span className="text-sm">{dropdownOpen ? "▲" : "▼"}</span>
              </div>

               {dropdownOpen && (
                <div className="flex flex-col gap-4 mt-2">
                  {/* Card 1 */}
                  <div className="flex justify-between items-start bg-[#1D1D23] p-3 rounded-md text-white">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-lg">tamara </span>
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 text-lg font-semibold">
                            42$
                          </span>
                          <span> / for up to 24 months</span>
                        </div>
                      </div>
                    </div>
                    <img
                      src="/tamara.png"
                      alt="Tamara"
                      className="w-16 h-4 rounded object-cover"
                    />
                  </div>

                  {/* Card 2 */}
                  <div className="flex justify-between items-start bg-[#1D1D23] p-3 rounded-md text-white">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-lg">tobby </span>
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 text-lg font-semibold">
                              170$
                            </span>
                            <span>/ for up to 24 months</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <svg
                      width="52"
                      height="17"
                      viewBox="0 0 52 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M47.9728 17H4.02722C1.80548 17 0 15.5182 0 13.6905V3.3052C0 1.48179 1.80548 0 4.02722 0H47.9728C50.1997 0 52 1.48179 52 3.3052V13.6905C52 15.5182 50.1945 17 47.9728 17Z"
                        fill="url(#paint0_linear_1222_706)"
                      />
                      <path
                        d="M44.8599 4.674L42.1021 14.855L42.0918 14.875H44.2453L47.0134 4.674H44.8599Z"
                        fill="#292929"
                      />
                      <path
                        d="M10.7029 10.4654C10.4189 10.61 10.0316 10.6948 9.66489 10.6948C8.89024 10.6948 8.45127 10.5751 8.40479 9.97154V9.93163C8.40479 9.90669 8.39962 9.88175 8.39962 9.85681V8.10094L8.40479 7.89143V6.64935H8.39962V6.1206L8.40479 5.91109V4.71391L6.48365 4.95833C7.78507 4.71391 8.52873 3.72124 8.52873 2.73357V2.125H6.37004V4.9733L6.24609 5.00822V10.2858C6.31839 11.7673 7.33061 12.6502 8.98836 12.6502C9.57709 12.6502 10.2226 12.5205 10.7184 12.306L10.7287 12.3011V10.4504L10.7029 10.4654Z"
                        fill="#292929"
                      />
                      <path
                        d="M11.0441 4.2899L4.98633 5.19278V6.67429L11.0441 5.77142V4.2899Z"
                        fill="#292929"
                      />
                      <path
                        d="M11.0441 6.45981L4.98633 7.36268V8.77935L11.0441 7.87647V6.45981Z"
                        fill="#292929"
                      />
                      <path
                        d="M17.8346 7.14319C17.7468 5.49706 16.6829 4.51936 14.9477 4.51936C13.951 4.51936 13.1247 4.89348 12.567 5.59683C12.0092 6.30017 11.7148 7.33274 11.7148 8.5848C11.7148 9.83685 12.0092 10.8744 12.567 11.5728C13.1247 12.2761 13.951 12.6502 14.9477 12.6502C16.6829 12.6502 17.752 11.6675 17.8346 10.0114V12.4956H19.9933V4.68896L17.8346 5.00821M17.9482 8.5848C17.9482 10.0464 17.1529 10.9891 15.9289 10.9891C14.6637 10.9891 13.9097 10.0913 13.9097 8.5848C13.9097 7.07335 14.6637 6.16549 15.9289 6.16549C16.5435 6.16549 17.0599 6.39495 17.4163 6.83392C17.7623 7.2679 17.9482 7.87148 17.9482 8.5848Z"
                        fill="#292929"
                      />
                      <path
                        d="M26.2897 4.51937C24.5493 4.51937 23.4855 5.49707 23.4028 7.14818V2.41931L21.2441 2.73856V12.4956H23.4028V10.0114C23.4855 11.6676 24.5545 12.6502 26.2897 12.6502C28.3245 12.6502 29.5381 11.1288 29.5381 8.5848C29.5381 6.04079 28.3245 4.51937 26.2897 4.51937ZM25.3085 10.9891C24.0794 10.9891 23.2892 10.0464 23.2892 8.5848C23.2892 7.87148 23.4751 7.2679 23.8211 6.83891C24.1775 6.39995 24.6939 6.17049 25.3085 6.17049C26.5737 6.17049 27.3277 7.07336 27.3277 8.58979C27.3277 10.0913 26.5737 10.9891 25.3085 10.9891Z"
                        fill="#292929"
                      />
                      <path
                        d="M35.4108 4.51937C33.6704 4.51937 32.6066 5.49707 32.5239 7.14818V2.41931L30.3652 2.73856V12.4956H32.5239V10.0114C32.6066 11.6676 33.6756 12.6502 35.4108 12.6502C37.4455 12.6502 38.6592 11.1288 38.6592 8.5848C38.6592 6.04079 37.4455 4.51937 35.4108 4.51937ZM34.4347 10.9891C33.2056 10.9891 32.4155 10.0464 32.4155 8.5848C32.4155 7.87148 32.6014 7.2679 32.9474 6.83891C33.3037 6.39995 33.8202 6.17049 34.4347 6.17049C35.7 6.17049 36.454 7.07336 36.454 8.58979C36.454 10.0913 35.7 10.9891 34.4347 10.9891Z"
                        fill="#292929"
                      />
                      <path
                        d="M38.6621 4.674H40.9654L42.8401 12.4856H40.7743L38.6621 4.674Z"
                        fill="#292929"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1222_706"
                          x1="0"
                          y1="849.933"
                          x2="5200.05"
                          y2="849.933"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#3BFF9D" />
                          <stop offset="1" stop-color="#3BFFC8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap pt-4">
            <button
              onClick={handleAddToCart}
              disabled={!!cartItem}
              className="bg-cyan-400 text-white px-18 py-3 rounded-3xl hover:opacity-80 transition"
            >
              {cartItem ? t('inCart', { quantity: cartItem.quantity }) : t('addToCart')}
            </button>

            <button className="border border-gray-600 px-18 py-3 rounded-3xl hover:opacity-80 transition">
              {t('buyNow')}
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-full transition ${
                isWishlisted
                  ? "bg-red-500 text-white-400"
                  : "bg-grey-500 text-white"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="#EEEEEE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;