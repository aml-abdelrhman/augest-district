'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const BreadcrumbBar = () => {
  const t = useTranslations("breadcrumb"); // استخدم المفتاح "breadcrumb" من JSON
  const pathname = usePathname();
  let paths = pathname.split("/").filter(Boolean);

  paths = paths.filter(p => p !== "en" && p !== "ar");

  return (
    <div className="flex items-center gap-1 text-sm px-2 py-1 mt-2">
      {paths.length === 0 ? (
        <span className="text-white font-semibold">{t("home")}</span>
      ) : (
        <>
          <Link href="/" className="text-gray-400 hover:text-white transition">
            {t("home")}
          </Link>
          {paths.map((path, index) => {
            const href = "/" + paths.slice(0, index + 1).join("/");
            const isLast = index === paths.length - 1;
            const translation = t(path) || path.replace("-", " ");

            return (
              <React.Fragment key={index}>
                <span className="text-gray-500"> &gt; </span>
                {isLast ? (
                  <span className="text-white font-semibold capitalize text-md">
                    {translation}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-gray-400 text-md hover:text-white transition capitalize"
                  >
                    {translation}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </>
      )}
    </div>
  );
};

export default BreadcrumbBar;