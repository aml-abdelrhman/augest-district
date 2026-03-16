"use client";

import { UserIcon, HistoryIcon, HeartIcon, KeyIcon } from "@/icons";
import LogoutButton from "@/app/[locale]/profile/LogoutButton/page"; // تأكد إن المسار صح
import { useParams } from "next/navigation";

export default function SidebarProfile() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="max-sm:w-full max-sm:mx-4 md:w-64 bg-[#35353F] rounded-3xl p-4 flex flex-col h-full text-gray-200">
      <div className="flex flex-col justify-evenly flex-1 text-base text-center gap-4 p-2">
        <a
          href={`/${locale}/profile`}
          className="flex items-center gap-3 hover:text-cyan-400 transition border-b-2 border-gray-600 pb-4"
        >
          <UserIcon className="w-6 h-6 text-white" />
          My Profile
        </a>

        <a
          href={`/${locale}/profile/change-password`}
          className="flex items-center gap-3 hover:text-cyan-400 transition border-b-2 border-gray-600 pb-4"
        >
          <KeyIcon className="w-6 h-6 text-white" />
          Change password
        </a>

        <a
          href={`/${locale}/profile/orders`}
          className="flex items-center gap-3 hover:text-cyan-400 transition border-b-2 border-gray-600 pb-4"
        >
          <HistoryIcon className="w-6 h-6 text-white" />
          History order
        </a>

        <a
          href={`/${locale}/wishlist`}
          className="flex items-center gap-3 hover:text-cyan-400 transition border-b-2 border-gray-600 pb-4"
        >
          <HeartIcon className="w-6 h-6 text-white" />
          My favorites
        </a>

        <LogoutButton locale={locale} />
      </div>
    </div>
  );
}
