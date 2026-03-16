"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingButton from "@/components/ui/LoadingButton";
import { verifyResetCode, sendResetCode } from "@/lib/api";

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const locale = searchParams.get("locale") || "en";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [code, setCode] = useState(Array(4).fill(""));

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, idx: number) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);

    if (value && idx < 3) inputsRef.current[idx + 1]?.focus();
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const verificationCode = code.join("");
      if (verificationCode.length < 4) {
        setError("Please enter the 4-digit code");
        setIsLoading(false);
        return;
      }

      const res = await verifyResetCode(verificationCode);
      if (res.success) {
        router.push(`/${locale}/Login/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setError(res.message || "Invalid code");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  // إعادة إرسال الكود
  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await sendResetCode(email); // هنا نفس الدالة اللي بترسل كود
      if (res.success) {
        setMessage("Code resent successfully!");
        setCode(Array(4).fill("")); 
      } else {
        setError(res.message || "Failed to resend code");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to resend code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="p-6 xs:p-10 flex flex-col gap-4 bg-background-secondary rounded-md w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="text-start text-sm text-[#999999] mb-10">
          A 4-digit verification code has been sent to <span className="font-medium">{email}</span>. 
          It will be available within a minute.
        </p>

        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-start text-sm text-[#999999] font-semibold mb-2">Code</p>

        <div className="flex justify-between gap-3 mb-4">
          {code.map((num, idx) => (
            <input
              key={idx}
              ref={el => { inputsRef.current[idx] = el; }}
              type="text"
              maxLength={1}
              placeholder="-"
              value={num}
              onChange={e => handleChange(e.target.value, idx)}
              onKeyDown={e => handleBackspace(e, idx)}
              className="md:w-29 h-14 max-sm:w-18 sm:h-14 text-center border border-solid border-[#2E2E2E] text-lg rounded-4xl bg-background-primary placeholder:text-center"
            />
          ))}
        </div>

        <LoadingButton
          type="button"
          className="w-full py-3 bg-[#59B1C2] rounded-3xl text-[#000000] font-semibold text-md"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Continue
        </LoadingButton>

        <div className="flex flex-row items-center justify-center mt-3 gap-1">
          <p className="text-sm text-[#999999]">The code wasn't sent?</p>
          <button
            type="button"
            className="text-sm text-[#59B1C2] underline"
            onClick={handleResend}
          >
            Resend the code
          </button>
        </div>
      </div>
    </section>
  );
}