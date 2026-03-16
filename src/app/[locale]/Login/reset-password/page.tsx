"use client";

import { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { resetPassword } from "@/lib/api";
import LoadingButton from "@/components/ui/LoadingButton";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const password = form.newPassword;

  // حساب قوة الباسورد
  const passwordStrength = () => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    return score;
  };

  const strength = passwordStrength();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrorConfirm(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage(null);

    if (form.newPassword !== form.confirmPassword) {
      setErrorConfirm(true);
      setIsLoading(false);
      return;
    }

    try {
      const res = await resetPassword(email, form.newPassword);

      if (res.success) {
        setMessage("Password updated successfully");

        setTimeout(() => {
          router.push(`/${locale}/Login`);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="p-6 xs:p-10 flex flex-col gap-10 bg-background-secondary rounded-md w-full max-w-xl">
        <h1 className="text-4xl font-bold text-start mb-4">Change Password</h1>

        {message && <p className="text-green-500">{message}</p>}

        {/* New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#999999]">Password</label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full h-12 border-b-2 border-[#2E2E2E] px-3 pr-10 rounded-3xl bg-background-primary"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showNew ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
          </div>

          {/* password strength */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 text-xs text-[#999999]">
              <span className="w-1.5 h-1.5 bg-[#999999] rounded-full"></span>
              <p>Create strong 8-char, includes a numb and symbol.</p>
            </div>

            <div className="w-17 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#59B1C2] transition-all"
                style={{ width: `${(strength / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#999999]">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full h-12 border-b-2 px-3 pr-10 rounded-3xl bg-background-primary 
              ${errorConfirm ? "border-red-500" : "border-[#2E2E2E]"}`}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirm ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
          </div>

        {errorConfirm && (
  <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-md mt-1">
    <span className="w-1.5 h-1.5 bg-red-700 rounded-full"></span>
    <p className="text-red-700">
      The password appears to be incorrect.
    </p>
  </div>
)}
        </div>


        <LoadingButton
          type="button"
          loading={isLoading}
          onClick={handleSubmit}
          className="w-full py-3 bg-[#59B1C2] rounded-3xl text-black mt-4"
        >
          Save New Password
        </LoadingButton>
      </div>
    </section>
  );
}
