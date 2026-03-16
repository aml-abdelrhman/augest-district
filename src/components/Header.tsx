"use client";

import Link from "next/link";

type HeaderProps = {
  currentPath: string;
};

const pageNames: Record<string, string> = {
  "/": "Home",
  "/products": "Products",
  "/size-guide": "Size Guide",
  "/about": "About Us",
  "/sustainability": "Sustainability",
};

export default function Header({ currentPath }: HeaderProps) {
  const pageTitle = pageNames[currentPath] || "August District";

  return (
    <header className="w-full border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-semibold text-lg tracking-wide">
          AUGUST DISTRICT
        </Link>

        {/* Page Title */}
        <h1 className="text-sm text-gray-500 dark:text-gray-400">
          {pageTitle}
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Language */}
          <button className="text-sm border border-gray-300 dark:border-zinc-700 px-2 py-1 rounded">
            EN
          </button>

          {/* Account */}
          <div className="w-6 h-6 rounded-full border border-gray-400"></div>

          {/* Cart */}
          <div className="w-6 h-6 rounded-full border border-gray-400"></div>

        </div>
      </div>
    </header>
  );
}