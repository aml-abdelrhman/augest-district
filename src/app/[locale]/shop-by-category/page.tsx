'use client';

import Image from "next/image";
import { ArrowIcon } from "@/icons";
import { useTranslations, useLocale } from "next-intl";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import Link from "next/link";

export default function ShopByCategory() {
  const t = useTranslations("shopByCategory");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const categories = [
    {
      name: "hoodies-jackets",
      products: [
        { id: 1, title: t("hoodiesJackets"), images: ["/hoodies.png"], bgGradient: "linear-gradient(180deg, #313139 -20.05%, #5A5A62 130.89%)", buttonColor: "#757575" },
        { id: 2, title: t("tShirts"), images: ["/shirt.png"], bgGradient: "linear-gradient(180deg, #313139 -20.05%, #774F5E 121.27%)", buttonColor: "#D50066", rotate: 340 },
        { id: 3, title: t("pantsShorts"), images: ["/pants.png"], bgGradient: "linear-gradient(180deg, #313139 -20.05%, #58774F 121.27%)", buttonColor: "#348100", rotate: 330 },
        { id: 4, title: t("accessories"), images: ["/hat.png"], bgGradient: "linear-gradient(180deg, #35353C -20%, #775C4F 121%)", buttonColor: "#6B573C" },
        { id: 5, title: t("sweatpants"), images: ["/sweatpants.png"], bgGradient: "linear-gradient(180deg, #313139 -20.05%, #4F5E77 121.27%)", buttonColor: "#0071CE", rotate: 340 },
      ],
    },
  ];

  return (
    <div className="p-8 space-y-16" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mt-13 md:ml-8 mb-8 md:mb-16 flex justify-start">
        <BreadcrumbBar />
      </div>

      <h1 className="text-4xl font-bold text-center mb-12">{t("shopByCategory")}</h1>

      {categories.map((category, catIndex) => {
        const firstFive = category.products;
        if (firstFive.length === 0) return null;

        return (
          <div key={catIndex}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div
                className="relative h-[450px] md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden"
                style={{ background: firstFive[0].bgGradient }}
              >
                <div
                  className="absolute top-0"
                  style={{ [isRTL ? "left" : "right"]: 0 }}
                >
                  <Image
                    src={firstFive[0].images[0]}
                    alt={firstFive[0].title}
                    width={350}
                    height={350}
                    className={`object-contain ${isRTL ? "scale-x-[-1]" : ""}`}
                  />
                </div>

                <div className="absolute top-2/3 left-1/2 md:top-auto md:bottom-4 -translate-x-1/2 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{firstFive[0].title}</h2>
                  <Link href={`/${locale}/products?category=${category.name}`}>
                    <button
                      className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full transition hover:opacity-80"
                      style={{ background: firstFive[0].buttonColor }}
                    >
                      {t("shopNow")}
                      <ArrowIcon className={`w-7 h-7 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-3">
                {firstFive.slice(1).map((product) => (
                  <div
                    key={product.id}
                    className="relative h-[220px] rounded-3xl overflow-hidden"
                    style={{ background: product.bgGradient }}
                  >
                    <div
                      className="absolute -top-4"
                      style={{ [isRTL ? "left" : "right"]: 0 }}
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={260}
                        height={220}
                        className={`object-cover object-bottom ${isRTL ? "scale-x-[-1]" : ""}`}
                        style={{ transform: product.rotate ? `rotate(${isRTL ? -product.rotate : product.rotate}deg)` : undefined }}
                      />
                    </div>

                    <div className={`absolute inset-x-0 bottom-0 p-3 md:bottom-10 md:p-4 flex flex-col items-center md:items-start text-center md:text-left ${isRTL ? "md:items-end md:text-right" : ""}`}>
                      <h2 className="text-lg md:text-2xl font-bold text-white mb-2">{product.title}</h2>
                      <Link href={`/${locale}/products?category=${category.name}`}>
                        <button
                          className="inline-flex items-center gap-2 text-white px-2 md:px-6 py-2 md:py-3 rounded-full transition hover:opacity-80"
                          style={{ background: product.buttonColor }}
                        >
                          {t("shopNow")}
                          <ArrowIcon className={`w-6 md:w-7 h-6 md:h-7 ${isRTL ? "rotate-180" : ""}`} />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}