"use client"

import { useState } from "react"
import Image from "next/image"
import IllustrationSVG from "@/components/IllustrationSVG";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { useTranslations } from "next-intl";

type Tab = "hoodie" | "tshirt" | "pants" | "sweatpants"
type Unit = "cm" | "inch"

export default function SizeGuide() {
  const t = useTranslations("SizeGuide");
  const [tab, setTab] = useState<Tab>("hoodie")
  const [unit, setUnit] = useState<Unit>("cm")

  const sizesData: Record<Tab, {label: string, xs: number, s: number, m: number, l: number, xl: number}[]> = {
    hoodie: [
      {label: t("aLengthFromHPS"), xs:62, s:64, m:66, l:68, xl:70},
      {label: t("bHalfUnderarmChest"), xs:64, s:66, m:68, l:70, xl:72},
      {label: t("cHalfHem"), xs:41.3, s:43.5, m:45.5, l:47.5, xl:49.5},
      {label: t("dSleeveLength"), xs:58.5, s:59.5, m:60.5, l:61, xl:62.5}
    ],
    tshirt: [
      {label: t("aLengthFromHPS"), xs:60, s:62, m:64, l:66, xl:68},
      {label: t("bHalfUnderarmChest"), xs:48, s:50, m:52, l:54, xl:56},
      {label: t("cHalfHem"), xs:40, s:42, m:44, l:46, xl:48},
      {label: t("dSleeveLength"), xs:18, s:19, m:20, l:21, xl:22}
    ],
    pants: [
      {label: t("waist"), xs:64, s:68, m:72, l:76, xl:80},
      {label: t("hip"), xs:88, s:92, m:96, l:100, xl:104},
      {label: t("inseam"), xs:76, s:77, m:78, l:79, xl:80},
      {label: t("outseam"), xs:102, s:103, m:104, l:105, xl:106}
    ],
    sweatpants: [
      {label: t("waist"), xs:60, s:64, m:68, l:72, xl:76},
      {label: t("hip"), xs:86, s:90, m:94, l:98, xl:102},
      {label: t("inseam"), xs:74, s:75, m:76, l:77, xl:78},
      {label: t("outseam"), xs:100, s:101, m:102, l:103, xl:104}
    ]
  }

  const tabs = [
    {id:"hoodie", label: t("hoodiesAndJackets")},
    {id:"tshirt", label: t("tShirts")},
    {id:"pants", label: t("pantsAndShorts")},
    {id:"sweatpants", label: t("sweatpants")}
  ]

  const currentSizes = sizesData[tab]

  return (
    <div className="min-h-screen text-white px-4 py-10 md:px-8 mx-auto max-w-7xl bg-[#1D1D23]">
      <div className="mt-6 md:mt-10 mb-8 md:mb-16 flex justify-start">
        <BreadcrumbBar />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as Tab)}
              className={`px-6 md:px-8 py-2 rounded-full text-md transition
                ${tab === item.id ? "bg-cyan-400 text-black" : "bg-[#1a1f2b] text-gray-400"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-10">
          <IllustrationSVG />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-6 text-xs">
          <span className="text-gray-400">{t("sizes")}</span>

          <div className="flex items-center gap-2 bg-[#1a1f2b] rounded-full p-1">
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 rounded-full ${unit==="cm"?"bg-cyan-400 text-black":"text-gray-400"}`}
            >
              {t("cm")}
            </button>
            <button
              onClick={() => setUnit("inch")}
              className={`px-3 py-1 rounded-full ${unit==="inch"?"bg-cyan-400 text-black":"text-gray-400"}`}
            >
              {t("inches")}
            </button>
          </div>

          <div className="flex gap-4 md:gap-10 text-gray-400">
            <span>XS</span>
            <span>S</span>
            <span>M</span>
            <span>L</span>
            <span>XL</span>
          </div>
        </div>

        {/* Sizes Table */}
        <div className="max-w-3xl mx-auto text-xs">
          {currentSizes.map((row,i) => (
            <div key={i} className="grid grid-cols-6 py-3 border-t border-gray-800">
              <span className="text-gray-400">{row.label} ({unit})</span>
              <span>{row.xs}</span>
              <span>{row.s}</span>
              <span>{row.m}</span>
              <span>{row.l}</span>
              <span>{row.xl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}