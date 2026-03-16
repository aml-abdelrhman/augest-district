"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  ArrowUpRight,
  Plus,
  Minus,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import BreadcrumbBar from "@/components/BreadcrumbBar";

const SustainabilityFullPage = () => {
  const t = useTranslations("sustainability");
  const params = useParams();
  const locale = params.locale as string;
  const isRtl = locale === "ar";
  const [openFAQ, setOpenFAQ] = useState<number | null>(3);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["/sus.jpg", "/hoodies.png", "/hero.png"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const [openIndex, setOpenIndex] = useState<number | null>(0); // مفتوح أول واحد تلقائياً مثل الصورة
  const toggleIndex = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  const faqItems = [
    t("faqQuestion0"),
    t("faqAnswer0"),
    t("faqQuestion1"),
    t("faqAnswer1"),
    t("faqQuestion2"),
    t("faqAnswer2"),
    t("faqQuestion3"),
    t("faqAnswer3"),
  ];

  return (
    <div className="min-h-screen pt-8 md:pt-18 md:px-6 px-3 bg-[#1D1D23] max-w-7xl mx-auto rounded-3xl">
      <div dir={isRtl ? "rtl" : "ltr"}>
        <div className="mb-8 md:mb-16 mr-2 flex justify-start">
          <BreadcrumbBar />
        </div>
        <div className=" space-y-12 mb-24">
          {[
            { id: "sustainability", points: false },
            { id: "philosophy", points: true },
            { id: "fashion", points: true },
            { id: "reality", points: true },
            { id: "circular", points: true },
            { id: "community", points: true },
            { id: "innovation", points: true },
          ].map((section) => (
            <section key={section.id} className="group">
              <h2 className="text-xl font-bold mb-4 text-[#F0F0F0]">
                {t(`sections.${section.id}.title`)}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {t(`sections.${section.id}.description`)}
              </p>
              {section.points && (
                <ul className="space-y-3 text-sm text-gray-400">
                  {[0, 1, 2].map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <span
                        className={`inline-block text-[#47D1E0] transition-transform ${
                          isRtl ? "rotate-180" : ""
                        }`}
                      >
                        ➞
                      </span>
                      {t(`sections.${section.id}.points.${p}`)}
                    </li>
                  ))}
                </ul>
              )}
              <hr className="border-dashed border-gray-800 mt-8" />
            </section>
          ))}
        </div>

        <div className="mt-32 ">
          <h2 className="text-4xl font-bold md:mb-20 text-center">
            {t("faq.title")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start md:px-10">
            <div className="relative w-full max-w-[500px] aspect-[4/5]">
              <svg
                viewBox="0 0 500 520"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="xMidYMid meet"
              >
                <clipPath id="customClip" clipPathUnits="userSpaceOnUse">
                  <path d="M250,150 C180,20 50,20 10,120 C10,350 100,520 250,520 C400,520 490,350 490,120 C450,20 320,20 250,150 Z" />
                </clipPath>
                <image
                  href={images[currentImageIndex]}
                  className="object-cover w-full h-full grayscale-[30%] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                  clipPath="url(#customClip)"
                  preserveAspectRatio="xMidYMid slice"
                  width="500"
                  height="520"
                />
              </svg>

              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
                <button
                  onClick={prevImage}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-black border border-gray-700 hover:bg-[#59B1C2] hover:text-black transition-all"
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-black border border-gray-700 hover:bg-[#59B1C2] hover:text-black transition-all"
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 ${
                    openFAQ === i
                      ? "bg-[#1E1E21] p-8 rounded-[35px] border border-gray-800 shadow-xl"
                      : "bg-transparent border-b border-gray-800 p-6"
                  }`}
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span
                      className={`text-base md:text-md pr-4 ${
                        openFAQ === i ? "font-bold text-white" : "text-gray-300"
                      }`}
                    >
                      {t(`faq.faqQuestion${i}`)}
                    </span>
                    <div
                      className={`p-2 rounded-full transition-colors ${
                        openFAQ === i
                          ? "bg-[#59B1C2] text-black"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {openFAQ === i ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  {openFAQ === i && (
                    <div className="mt-6 pt-6 border-t border-gray-700/50 rounded-3xl">
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed italic">
                        {t(`faq.faqAnswer${i}`)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityFullPage;
