import React from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/hooks/catrcontext"; // Assuming you have a CartProvider in this path
import { WishlistProvider } from "@/hooks/wishlist-context";
import { Toaster } from "react-hot-toast";
import { id } from "zod/v4/locales";

// real userid from api
// import { getUserIdFromToken } from "@/lib/auth"; // دالة JWT

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const userId = getUserIdFromToken();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
           {/* <SessionProvider>
          {userId ? (
            <CartProvider userId={userId}></CartProvider> */}
        <CartProvider userId={2}>
        <WishlistProvider>
          <Toaster position="top-center" />
        {children}
        </WishlistProvider>
        </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}