"use client";

import { useEffect, useState } from "react";
import SidebarProfile from "@/app/[locale]/profile/SidebarProfile";
import { getLastOrders, Order } from "@/lib/api";

export default function LastOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const lastOrders = await getLastOrders(4); // آخر 4 طلبات
      setOrders(lastOrders.slice(0, 4));
    }
    loadOrders();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-white px-4 py-10 md:px-8 mx-auto max-w-7xl">
      <div className="text-gray-200 text-sm mb-6 md:mb-10">
        Home Page &gt; Last Orders
      </div>

      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-8 md:mb-14">
        Last Orders
      </h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full mx-auto">
        {/* Sidebar */}
        <SidebarProfile />

        {/* Orders Grid */}
        <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#35353F] rounded-3xl px-6 py-4 flex flex-col gap-4 hover:scale-[1.02] transition-transform h-fit"
            >
              {/* Top Row: Icon + Order # + Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* SVG Icon */}
                  <div className="flex-shrink-0">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="20"
                        fill="#FAFAFA"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M19.0833 28.9199C19.362 29.0808 19.6782 29.1655 20 29.1655C20.3218 29.1655 20.638 29.0808 20.9167 28.9199L27.3333 25.2532C27.6118 25.0925 27.843 24.8613 28.0039 24.583C28.1648 24.3046 28.2497 23.9889 28.25 23.6674V16.3341C28.2497 16.0126 28.1648 15.6968 28.0039 15.4185C27.843 15.1401 27.6118 14.909 27.3333 14.7482L20.9167 11.0816C20.638 10.9206 20.3218 10.8359 20 10.8359C19.6782 10.8359 19.362 10.9206 19.0833 11.0816L12.6667 14.7482C12.3882 14.909 12.157 15.1401 11.9961 15.4185C11.8352 15.6968 11.7503 16.0126 11.75 16.3341V23.6674C11.7503 23.9889 11.8352 24.3046 11.9961 24.583C12.157 24.8613 12.3882 25.0925 12.6667 25.2532L19.0833 28.9199Z"
                        stroke="#FAFAFA"
                        strokeWidth="1.22222"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 29.1667V20"
                        stroke="#FAFAFA"
                        strokeWidth="1.22222"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.0166 15.416L20.0008 19.9993L27.9849 15.416"
                        stroke="#FAFAFA"
                        strokeWidth="1.22222"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.875 12.9131L24.125 17.6339"
                        stroke="#FAFAFA"
                        strokeWidth="1.22222"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Order Number & Date */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                      Order #{order.id}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="text-gray-300 text-sm font-medium bg-gray-600 rounded-3xl px-3 py-1">
                  {order.status || "Pending"}
                </div>
              </div>

              {/* Order Details */}
              <div className="text-white bg-[#000000] rounded-2xl px-6 py-4 space-y-2">
                <div className="flex justify-between text-[#B3B3B3] text-md">
                  <span className="font-semibold text-color[#B3B3B3]">
                    Items:
                  </span>
                  <span>
                    {order.products.reduce((acc, p) => acc + p.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-[#B3B3B3] text-md">
                  <span className="font-semibold">Total:</span>
                  <span>${order.total?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#B3B3B3] text-md">
                  <span className="font-semibold">Shipping:</span>
                  <span>${order.shipping?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
