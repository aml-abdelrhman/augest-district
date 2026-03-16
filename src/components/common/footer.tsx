"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale || "en"; 
  const t = useTranslations("Footer");

  const links = [
    { href: "/products", label: t("products") },
    { href: "/About", label: t("aboutUs") },
    { href: "/size-guide", label: t("sizeGuide") },
    { href: "/sustainability", label: t("sustainability") },
    { href: "/terms", label: t("termsAndConditions") },
  ];

  return (
    <footer className="w-full mt-6 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-sm">
        {links.map((link) => {
          const hrefWithLocale = `/${locale}/${link.href}`;
          const isActive = pathname === hrefWithLocale;

          return (
            <div key={link.href} className="relative">
              <Link
                href={hrefWithLocale}
                className={`hover:text-gray-400 transition-colors duration-200 py-1 mb-1 ${
                  isActive ? "font-semibold" : "font-normal"
                }`}
              >
                {link.label}
              </Link>
              <span
                className={`absolute -bottom-2 left-0 h-1 w-full rounded-full transition-all duration-300 ${
                  isActive ? "bg-[#59B1C2]" : "bg-transparent"
                }`}
              />
            </div>
          );
        })}
      </div>

    </footer>
  );
}