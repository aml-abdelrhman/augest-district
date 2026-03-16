"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProfile, updateProfile } from "@/lib/api";
import SidebarProfile from "./SidebarProfile";
import { EmailIcon, PhoneIcon, UserIcon } from "@/icons";
import BreadcrumbBar from "@/components/BreadcrumbBar";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProfile();
      setProfile(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setProfile({
      ...profile,
      avatar: url,
    });
  };

  const handleSave = async () => {
    await updateProfile(profile);
    alert("Profile updated successfully");
  };

  if (loading)
    return <div className="p-20 text-white text-center">Loading...</div>;

  return (
    
    <div className=" min-h-screen text-white px-4 py-10 md:px-8 mx-auto max-w-7xl bg-[#1D1D23]">
      {/* Breadcrumb */}
          <div className="mt-6 md:mt-10 mb-8 md:mb-16 flex justify-start ">
        <BreadcrumbBar />
      </div>

      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-8 md:mb-14">
        My Profile
      </h1>

      <div className="flex flex-col items-center md:flex-row gap-6 md:gap-8 w-full">
        <SidebarProfile />

        <div className="w-full flex-1  p-6 pb-12 md:p-10 rounded-xl">
          {/* Avatar + Change Photo */}
          <div className="flex items-start md:items-center gap-4 mb-8 md:mb-10">
            <div className="relative">
              <div className="w-25 h-20 max-sm:w-25 max-sm:h-25 md:w-25 md:h-25 rounded-full overflow-hidden border border-gray-500">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="avatar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src="/avatar.png"
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <label className="absolute bottom-0 right-0 bg-cyan-400 p-1 rounded-full cursor-pointer flex items-center justify-center hover:bg-cyan-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M16 3l5 5L7 22H2v-5L16 3z"
                  />
                </svg>

                <input type="file" className="hidden" onChange={handleImage} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="relative w-full">
              <label className="text-gray-200 text-sm mb-1 block">
                First Name
              </label>
              <input
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 p-3 pr-10 outline-none text-white placeholder-gray-400 rounded-4xl"
                placeholder="Enter first name"
              />
              <UserIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Last Name */}
            <div className="relative w-full">
              <label className="text-gray-200 text-sm mb-1 block">
                Last Name
              </label>
              <input
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 p-3 pr-10 outline-none text-white placeholder-gray-400 rounded-4xl"
                placeholder="Enter last name"
              />
              <UserIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Email */}
            <div className="relative w-full">
              <label className="text-gray-200 text-sm mb-1 block">
                Email Address
              </label>
              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full bg-transparent border-b border-gray-400 p-3 pr-12 outline-none text-white placeholder-gray-400 rounded-4xl"
              />
              {/* Icon داخل الـ input */}
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <EmailIcon className="text-gray-400 w-5 h-5" />
              </span>
            </div>
            {/* Phone */}
            <div className="relative w-full">
              <label className="text-gray-200 text-sm mb-1 block">Phone</label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter phone"
                className="w-full bg-transparent border-b border-gray-400 p-3 pr-10 outline-none text-white placeholder-gray-400 rounded-4xl"
              />
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <PhoneIcon className="text-gray-400 w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 mt-10 md:mt-10">
            <button
              onClick={handleSave}
              className="bg-cyan-400 text-black md:px-40 px-20 py-3 rounded-full font-medium hover:bg-cyan-600 transition w-full sm:w-auto"
            >
              Save changes
            </button>

            <button
              onClick={() => window.location.reload()}
              className="bg-gray-700 px-40 py-3 rounded-full hover:bg-gray-600 transition w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
