"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp, FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import BreadcrumbBar from "@/components/BreadcrumbBar";

export default function AboutPage() {
  const t = useTranslations("about");
  const params = useParams();
  const locale = params.locale as string;

  const arrowClass = `text-[#59B1C2] ${locale === "ar" ? "rotate-180" : ""}`;

  return (
    <div className="min-h-screen pt-18 md:px-6 px-3 bg-[#1D1D23] max-w-7xl mx-auto">
      
      <div className="mb-8 md:mb-16 flex justify-start">
        <BreadcrumbBar />
      </div>

      <div className="text-center max-w-4xl mx-auto mb-20 relative">
        <span
          className="absolute -top-10 md:-top-20 left-2 text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] leading-[120px] sm:leading-[150px] md:leading-[187px] lg:leading-[220px] text-white/80"
          style={{ transform: "rotate(-8.88deg)" }}
        >
          👒
        </span>

        <span
          className="absolute -top-10 md:-top-20 right-2 sm:right-10 md:right-28 text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] leading-[120px] sm:leading-[150px] md:leading-[187px] lg:leading-[220px] text-white/80"
          style={{ transform: "rotate(-1.86deg)" }}
        >
          🔥
        </span>

        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          {t("brandName")}
        </h1>

        <p className="text-2xl md:text-4xl leading-relaxed font-semibold">
          {t("brandDescription")}{" "}
          <span className="text-[#59B1C2]">{t("highlight1")}</span>,{" "}
          <span className="text-[#59B1C2]">{t("highlight2")}</span> ✨ 👕
        </p>
      </div>

      <div className="space-y-12 mb-24">

        <div>
          <h2 className="text-xl font-bold mb-6">
            {t("sections.foundation.title")}
          </h2>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.foundation.points.0")}
            </li>

            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.foundation.points.1")}
            </li>

            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.foundation.points.2")}
            </li>
          </ul>
        </div>

        {/* Challenges */}
        <div>
          <h2 className="text-xl font-bold mb-6">
            {t("sections.challenges.title")}
          </h2>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.challenges.points.0")}
            </li>

            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.challenges.points.1")}
            </li>

            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.challenges.points.2")}
            </li>
          </ul>
        </div>

        {/* Charity Status */}
        <div>
          <h2 className="text-xl font-bold mb-6">
            {t("sections.charityStatus.title")}
          </h2>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.charityStatus.points.0")}
            </li>

            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.charityStatus.points.1")}
            </li>

            <li className="flex items-start gap-3">
              <span className={arrowClass}>➞</span>
              {t("sections.charityStatus.points.2")}
            </li>
          </ul>
        </div>

      </div>

      {/* Contact */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-10">
          {t("contactUs.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-[#212124] py-12 px-6 rounded-[40px] flex flex-col items-center gap-3">
            <div className="bg-[#59B1C2] p-3 rounded-full text-black">
              <Mail size={24} />
            </div>
            <p className="text-xs text-gray-500">{t("contactUs.email")}</p>
            <p className="text-sm font-medium">{t("contactUs.emailValue")}</p>
          </div>

          <div className="bg-[#212124] py-12 px-6 rounded-[40px] flex flex-col items-center gap-3">
            <div className="bg-[#59B1C2] p-3 rounded-full text-black">
              <Phone size={24} />
            </div>
            <p className="text-xs text-gray-500">{t("contactUs.phone")}</p>
            <p className="text-sm font-medium">{t("contactUs.phoneValue")}</p>
          </div>

          <div className="bg-[#212124] py-12 px-6 rounded-[40px] flex flex-col items-center gap-3">
            <div className="bg-[#59B1C2] p-3 rounded-full text-black">
              <MapPin size={24} />
            </div>
            <p className="text-xs text-gray-500">{t("contactUs.location")}</p>
            <p className="text-sm font-medium">{t("contactUs.locationValue")}</p>
          </div>

          <div className="bg-[#212124] py-12 px-6 rounded-[40px] grid grid-cols-2 gap-4">
            <div className="bg-[#2A2A2D] p-3 rounded-full border border-gray-700 flex justify-center hover:text-[#25D366] cursor-pointer">
              <FaWhatsapp size={20} />
            </div>

            <div className="bg-[#2A2A2D] p-3 rounded-full border border-gray-700 flex justify-center hover:text-[#1DA1F2] cursor-pointer">
              <FaTwitter size={20} />
            </div>

            <div className="bg-[#2A2A2D] p-3 rounded-full border border-gray-700 flex justify-center hover:text-[#E4405F] cursor-pointer">
              <FaInstagram size={20} />
            </div>

            <div className="bg-[#2A2A2D] p-3 rounded-full border border-gray-700 flex justify-center hover:text-[#1877F2] cursor-pointer">
              <FaFacebookF size={20} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}