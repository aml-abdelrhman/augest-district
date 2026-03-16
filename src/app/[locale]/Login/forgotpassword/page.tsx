"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import LoadingButton from "@/components/ui/LoadingButton";
import Link from "next/link";
import { sendResetCode } from "@/lib/api"; 

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotInput = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotInput>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotInput) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await sendResetCode(data.email);

      if (res.success) {
        setMessage(res.message || "Verification code sent!");
       router.push(`/${locale}/Login/verify-code?email=${encodeURIComponent(data.email)}`);
      } else {
        setMessage(res.message || "Failed to send code");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 xs:p-10 flex flex-col gap-4 bg-background-secondary rounded-md w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-4">Forgot Password</h1>

        {message && <p className="text-green-500 text-center">{message}</p>}

        <p className="text-start text-sm text-[#999999] mb-4">
          Enter your email address below, and we will send you a 4-digit password reset code.
        </p>

        <div className="relative w-full flex items-center">
          <input
            type="email"
            placeholder="example@xyz.com"
            {...register("email")}
            className={`flex-1 text-color-secondary h-10 border-b-2 border-solid border-[#2E2E2E] py-2 px-3 rounded-3xl bg-background-primary text-13 pr-10 ${errors.email ? "inputError" : ""}`}
          />
        </div>
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}

        <LoadingButton type="submit" className="w-full bg-[#59B1C2] py-2 rounded-3xl text-white" loading={isLoading}>
          {isLoading ? "Sending..." : "Send Code"}
        </LoadingButton>

        <div className="flex items-center justify-center gap-2 text-sm text-[#999999] mt-2">
          <p>Don't have an account?</p>
          <Link href={`/${locale}/signup`} className="transition duration-150 ease text-white">
            Create Account
          </Link>
        </div>
      </form>
    </section>
  );
}