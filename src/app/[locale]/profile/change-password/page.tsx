"use client";

import { useEffect, useState } from "react";
import SidebarProfile from "../SidebarProfile";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function ChangePasswordPage() {
  const [avatar, setAvatar] = useState("/avatar.png");

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      if (data.avatar) setAvatar(data.avatar);
    }
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAvatar(url);

    const savedProfile = localStorage.getItem("profile");
    const data = savedProfile ? JSON.parse(savedProfile) : {};

    localStorage.setItem(
      "profile",
      JSON.stringify({
        ...data,
        avatar: url,
      }),
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("password", form.newPassword);
    alert("Password updated successfully");

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className=" min-h-screen text-white px-4 py-5 md:px-8 mx-auto max-w-8xl mt-16">
      {/* Breadcrumb */}
      <div className="text-gray-200 text-sm mb-6 md:mb-10">
        Home Page &gt; Change Password
      </div>

      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-8 md:mb-14">
                My Profile
 
      </h1>

<div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 w-full md:w-3/4 mx-auto max-sm:justify-end">        
        <SidebarProfile />

        {/* Content */}
        <div className="w-full flex-1 pb-12">
          {/* Avatar */}
          <div className="flex items-start gap-4 mb-10">
            <div className="relative">
              <div className="w-25 h-20 max-sm:w-25 max-sm:h-25 md:w-25 md:h-25 rounded-full overflow-hidden border border-gray-500">
                <img
                  src={avatar}
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              </div>

              <label className="absolute bottom-3 right-0 bg-cyan-400 p-1 rounded-full cursor-pointer hover:bg-cyan-600 flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.28962 1.47247C9.1021 1.285 8.84779 1.17969 8.58262 1.17969C8.31746 1.17969 8.06315 1.285 7.87562 1.47247L7.05312 2.29547L9.70462 4.94697L10.5271 4.12497C10.62 4.03211 10.6937 3.92185 10.744 3.8005C10.7943 3.67915 10.8202 3.54908 10.8202 3.41772C10.8202 3.28637 10.7943 3.1563 10.744 3.03495C10.6937 2.91359 10.62 2.80334 10.5271 2.71047L9.28962 1.47247ZM8.99762 5.65397L6.34612 3.00247L1.92862 7.41997L1.39062 10.61L4.58062 10.0715L8.99762 5.65397Z"
                    fill="#191919"
                  />
                </svg>

                <input type="file" className="hidden" onChange={handleImage} />
              </label>
            </div>
          </div>

          {/* Password Fields */}
          <div className="space-y-6 max-w-4xl">
            {/* Current Password */}
            <div className="relative">
              <label className="text-gray-200 text-sm mb-1 block">
                Current Password
              </label>

              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full bg-transparent border-b border-gray-400 p-3 pr-10 outline-none text-white placeholder-gray-400 rounded-4xl"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showCurrent ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} className="line-through" />
                )}
              </button>
            </div>

            {/* New + Confirm */}
            <div className="flex gap-4 mt-6">
              {/* New Password */}
              <div className="relative flex-1">
                <label className="text-gray-200 text-sm mb-1 block">
                  New Password
                </label>

                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full bg-transparent border-b border-gray-400 p-3 pr-10 outline-none text-white placeholder-gray-400 rounded-4xl"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNew ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} className="line-through" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative flex-1">
                <label className="text-gray-200 text-sm mb-1 block">
                  Confirm Password
                </label>

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full bg-transparent border-b border-gray-400 p-3 pr-10 outline-none text-white placeholder-gray-400 rounded-4xl"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} className="line-through" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 mt-10">
            <button
              onClick={handleSave}
              className="bg-cyan-400 text-black px-26 py-3 rounded-full font-medium hover:bg-cyan-600 transition w-full sm:w-auto"
            >
              Save changes
            </button>

            <button
              onClick={() => window.location.reload()}
              className="bg-gray-700 px-38 py-3 rounded-full hover:bg-gray-600 transition w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
