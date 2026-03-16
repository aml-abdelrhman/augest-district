"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { MdError } from "react-icons/md";
import { GmailIcon } from "@/icons";
import LoadingButton from "@/components/ui/LoadingButton";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { api } from "@/lib/api"; 

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type SignUpInput = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({
    resolver: zodResolver(signupSchema),
  });

  const toggleShowPassword = useCallback(() => setShowPassword(prev => !prev), []);

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // 🔹 تسجيل المستخدم عبر API
      const res = await api.post("/users", {
        name: { firstname: data.firstName, lastname: data.lastName },
        email: data.email,
        password: data.password,
        role: "user", 
      });

      console.log("User created:", res.data);

      router.push(`/${params.locale}/Login`);

    } catch (err: any) {
      console.error("API Error:", err);
      setError(err?.response?.data?.message || "Network error — try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: `/${params.locale}/profile`});
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 xs:p-10 flex flex-col justify-between items-center gap-2.5 bg-background-secondary rounded-md w-full max-w-lg"
      >
        {error && (
          <div className="text-[#FF6166] flex items-center justify-center gap-2 w-full">
            <MdError />
            <div className="text-sm">{error}</div>
          </div>
        )}

        <h1 className="w-full mb-5 text-2xl font-bold text-start">Sign Up</h1>

        {/* First Name + Last Name */}
        <div className="w-full flex gap-4 mb-2">
          <div className="flex-1">
            <label className="text-sm">First Name:</label>
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstName")}
              className={`w-full text-color-secondary h-10 border-b-2 border-solid border-[#2E2E2E] py-2 px-3 rounded-3xl bg-background-primary text-13 ${errors.firstName ? "inputError" : ""}`}
            />
            {errors.firstName && <p className="errorMsg">{errors.firstName.message}</p>}
          </div>

          <div className="flex-1">
            <label className="text-sm">Last Name:</label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName")}
              className={`w-full text-color-secondary h-10 border-b-2 border-solid border-[#2E2E2E] py-2 px-3 rounded-3xl bg-background-primary text-13 ${errors.lastName ? "inputError" : ""}`}
            />
            {errors.lastName && <p className="errorMsg">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="relative w-full mb-2">
          <label className="text-sm">Email:</label>
          <input
            type="email"
            placeholder="example@xyz.com"
            {...register("email")}
            className={`w-full text-color-secondary h-10 border-b-2 border-solid border-[#2E2E2E] py-2 px-3 rounded-3xl bg-background-primary text-13 ${errors.email ? "inputError" : ""}`}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <label className="w-full text-sm mt-2">Password:</label>
        <div className="relative w-full mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className={`w-full text-color-secondary h-10 border-b-2 border-solid border-[#2E2E2E] py-2 px-3 rounded-3xl bg-background-primary text-13 pr-10 ${errors.password ? "inputError" : ""}`}
          />
          <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-color-secondary">
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.password && <p className="errorMsg">{errors.password.message}</p>}
        </div>

        {/* Accept Terms */}
        <div className="w-full mb-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="w-5 h-5 rounded-full border-2 border-gray-300 checked:bg-black checked:text-white appearance-none relative after:content-['✔'] after:absolute after:text-[12px] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
            />
            <span className="text-sm text-color-secondary">
              I accept the <Link href="/terms" className="underline text-[#59B1C2]">Terms & Conditions</Link>
            </span>
          </label>
          {errors.acceptTerms && <p className="errorMsg">{errors.acceptTerms.message}</p>}
        </div>

        <LoadingButton type="submit" className="w-full bg-[#59B1C2] py-2 mt-2.5 rounded-3xl transition-all hover:bg-background-tertiary hover:border-[#454545] text-13" loading={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </LoadingButton>

        {/* OR separator */}
        <div className="flex items-center justify-center w-full my-2">
          <div className="flex-1 h-px bg-[#2E2E2E]"></div>
          <p className="px-10 py-1 bg-background-secondary text-center z-10">OR</p>
          <div className="flex-1 h-px bg-[#2E2E2E]"></div>
        </div>

        {/* Google Sign Up */}
        <button type="button" onClick={handleGoogleSignUp} className="flex text-color-secondary items-center gap-3 px-4 py-2 text-13 transition-all bg-background-primary border rounded border-[#2E2E2E] hover:bg-background-tertiary hover:border-[#454545] w-full justify-center">
          <GmailIcon className="w-5 h-5" />
          Sign up with Google
        </button>

        {/* Login Link */}
        <div className="flex items-center gap-2 text-sm text-color-secondary mt-2">
          <p>Already have an account?</p>
          <Link href={`/${params.locale}/Login`} className="transition duration-150 ease hover:text-white underline">
            Log In
          </Link>
        </div>
      </form>
    </section>
  );
}