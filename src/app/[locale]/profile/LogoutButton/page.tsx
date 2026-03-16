"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogoutIcon } from "@/icons";
import { logout } from "@/lib/api"; // المسار حسب مشروعك


export default function LogoutButton({ locale }: { locale: string }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

 const handleLogout = async () => {
  await logout();
    router.push(`/${locale}/Login`);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-3 hover:text-cyan-400 transition text-white w-full text-left px-3 py-2 rounded-md"
      >
        <LogoutIcon className="w-6 h-6 text-white" />
        Log out
      </button>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
            >
              <div className="bg-[#1f1f1f] rounded-3xl p-6 sm:p-8 w-full max-w-lg flex flex-col items-center text-center gap-6 min-h-[400px] justify-center">
                <div>
                  <svg
                    width="90"
                    height="90"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44.8938 4.19727C67.3468 4.19727 85.6128 22.4643 85.6128 44.9163C85.6128 67.3683 67.3458 85.6353 44.8938 85.6353C22.4418 85.6353 4.1748 67.3683 4.1748 44.9163C4.1748 22.4643 22.4418 4.19727 44.8938 4.19727ZM44.8938 0.197266C20.2358 0.197266 0.174805 20.2583 0.174805 44.9163C0.174805 69.5743 20.2358 89.6353 44.8938 89.6353C69.5518 89.6353 89.6128 69.5743 89.6128 44.9163C89.6128 20.2583 69.5518 0.197266 44.8938 0.197266Z"
                      fill="#FF4545"
                    />
                    <path
                      d="M81.1242 53.6056C85.9269 33.6051 73.6066 13.4982 53.6061 8.69552C33.6056 3.89285 13.4987 16.2131 8.69601 36.2136C3.89334 56.2141 16.2136 76.3211 36.2141 81.1237C56.2146 85.9264 76.3216 73.6061 81.1242 53.6056Z"
                      fill="#FF4545"
                    />
                    <path
                      d="M55.4058 45.0742H34.3828V33.5032C34.3828 27.6982 39.0888 22.9922 44.8938 22.9922C50.6988 22.9922 55.4048 27.6982 55.4048 33.5032V45.0742H55.4058Z"
                      stroke="white"
                      strokeWidth={5}
                      strokeMiterlimit={10}
                      strokeLinejoin="round"
                    />
                    <path
                      d="M44.8938 70.2921C36.1908 70.2921 29.1357 63.2371 29.1357 54.5341V42.2461C29.1357 41.2331 29.9568 40.4131 30.9698 40.4131H58.8188C59.8318 40.4131 60.6528 41.2341 60.6528 42.2461V54.5341C60.6528 63.2371 53.5978 70.2921 44.8938 70.2921Z"
                      fill="white"
                    />
                    <path
                      d="M48.3289 51.561C48.3289 49.664 46.7909 48.127 44.8949 48.127C42.9979 48.127 41.4609 49.665 41.4609 51.561C41.4609 52.788 42.1059 53.8609 43.0739 54.4689V56.8549C43.0739 57.861 43.8899 58.677 44.8959 58.677C45.9019 58.677 46.7179 57.861 46.7179 56.8549V54.4689C47.6839 53.8609 48.3289 52.787 48.3289 51.561Z"
                      fill="#FF4545"
                    />
                  </svg>
                </div>

                <p className="text-white text-xl font-semibold">Log Out</p>

                <p className="text-white text-center text-sm sm:text-xl font-medium">
                  Are you sure you want to log out of your account?{" "}
                </p>

                <div className="flex flex-col gap-3 w-full px-9 mt-4">
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full transition font-semibold"
                  >
                    Log Out
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-full transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
