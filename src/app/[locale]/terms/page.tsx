"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import BreadcrumbBar from "@/components/BreadcrumbBar";

const CustomArrow = ({ className }: { className?: string }) => (
  <svg 
    width="14" 
    height="11" 
    viewBox="0 0 14 11" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`mt-1 flex-shrink-0 transition-transform duration-300 ${className}`}
  >
    <path d="M12.1487 5.11269L12.6828 5.65219L13.2223 5.11806L12.6882 4.57856L12.1487 5.11269ZM0.763195 4.29638C0.56182 4.29537 0.368292 4.3744 0.225185 4.51608C0.0820776 4.65776 0.00111431 4.85049 0.000106084 5.05187C-0.000902137 5.25324 0.0781273 5.44677 0.219808 5.58988C0.36149 5.73298 0.554217 5.81395 0.755592 5.81495L0.763195 4.29638ZM8.1043 10.1851L12.6828 5.65219L11.6146 4.57319L7.03605 9.1061L8.1043 10.1851ZM12.6882 4.57856L8.1553 2.34554e-05L7.07629 1.06828L11.6092 5.64682L12.6882 4.57856ZM12.1525 4.3534L0.763195 4.29638L0.755592 5.81495L12.1449 5.87198L12.1525 4.3534" fill="#59B1C2"/>
  </svg>
);

export default function TermsPage() {
  const t = useTranslations("termsPage");
  const params = useParams();
  const locale = params.locale as string;

  const arrowClass = locale === "ar" ? "rotate-180" : "";

  return (
    <div className="min-h-screen pt-8 md:pt-18 md:px-6 px-3 bg-[#1D1D23] max-w-7xl mx-auto text-white">
      
      <div className="mb-10 md:mb-16  flex justify-start">
        <BreadcrumbBar />
      </div>

      <div className="max-w-5xl">
        
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6">
            {t("sections.terms.title")}
          </h2>
          <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
            {t("sections.terms.description")}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                <CustomArrow className={arrowClass} />
                {t(`sections.terms.points.${index}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Returns */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6">
            {t("sections.returns.title")}
          </h2>
          <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
            {t("sections.returns.description")}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                <CustomArrow className={arrowClass} />
                {t(`sections.returns.points.${index}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Customs */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6">
            {t("sections.customs.title")}
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            {t("sections.customs.description")}
          </p>
        </div>

        {/* Section 4: Online Store */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6">
            {t("sections.onlineStore.title")}
          </h2>
          <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
            {t("sections.onlineStore.description")}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                <CustomArrow className={arrowClass} />
                {t(`sections.onlineStore.points.${index}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5: General Conditions */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6">
            {t("sections.general.title")}
          </h2>
          <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
            {t("sections.general.description")}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[0, 1, 2].map((index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                <CustomArrow className={arrowClass} />
                {t(`sections.general.points.${index}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Support Section */}
        <div className="mt-24 pt-10 border-t border-white/5">
          <h2 className="text-xl font-bold mb-5">
            {t("sections.contact.title")}
          </h2>
          <p className="text-[15px] text-gray-400">
            {t("sections.contact.description")}
          </p>
          <a 
            href="mailto:support@augustdistrict.com" 
            className="text-[#59B1C2] text-sm font-medium underline mt-3 inline-block hover:opacity-80 transition-opacity"
          >
            support@augustdistrict.com
          </a>
        </div>

        
      </div>
    </div>
  );
}