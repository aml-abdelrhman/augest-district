"use client";

import Link from "next/link";
import { useLocale } from "next-intl"; 
import Image from "next/image";
import LangSelector from "./lang-selector";
import { CartIcon, UserIcon } from "@/icons";
import { useCartContext } from "@/hooks/catrcontext";

export const Navbar = () => {
  const locale = useLocale(); 
  const { items: cartProducts } = useCartContext();
  const totalItemsCart = cartProducts.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  return (
    <nav className="flex w-[93%] xl:w-full container items-center justify-between px-4 md:px-18 relative top-7 xl:top-15 left-0 right-0 z-50  h-20 xl:h-auto rounded-2xl">

      {/* Logo */}
      <Image
        src="/logoo.svg"
        alt="logo"
        width={120}
        height={60}
        className="w-full h-auto max-w-30 max-xl:max-w-26"
      />

      {/* Navbar Items */}
      <div className="flex items-center gap-3 max-sm:gap-1">
        {/* Language Selector */}
        <LangSelector />

        {/* Cart */}
        <Link
          href={`/${locale}/cart`}
          className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#313139]"
        >
          <CartIcon className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 text-xs font-medium text-white bg-[#59B1C2] rounded-full flex items-center justify-center">
            {totalItemsCart || 0}
          </span>
        </Link>

        {/* User/Login */}
        <Link
          href={`/${locale}/Login`}
          className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#313139]"
        >
          <UserIcon className="w-6 h-6 text-white" />
        </Link>
      </div>
    </nav>
  );
};
{/* 
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#313139] p-0"
            >
              <MenuIcon className="w-6 h-6 text-white" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-10">
              <LangSelector />
              
              <Link
                href={`/${locale}/cart`}
                className="flex w-full items-center gap-3 cursor-pointer relative px-5 py-2 rounded hover:bg-[#313139]"
              >
                <div className="relative w-5 h-5">
                  <CartIcon className="w-5 h-5 text-white" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-xs font-medium text-white bg-[#0072F5] rounded-full flex items-center justify-center">
                    {totalItemsCart || 0}
                  </span>
                </div>
                <span>Cart</span>
              </Link>

              <Link
                href={`/${locale}/Login`}
                className="flex w-full items-center gap-3 cursor-pointer relative px-5 py-2 rounded hover:bg-[#313139]"
              >
                <div className="relative w-5 h-5">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <span>Login</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}; */}