"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { MdError } from "react-icons/md";
import { GmailIcon } from "@/icons";
import LoadingButton from "@/components/ui/LoadingButton";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useTranslations } from "next-intl";

// تعريف schema للتحقق من البيانات
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean().optional(),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations("login"); // namespace "login"
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail") ?? "";
    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setRememberMe(true);
      setValue("remember", true);
    }
  }, [setValue]);

  const toggleShowPassword = useCallback(() => setShowPassword(prev => !prev), []);

  // إرسال بيانات تسجيل الدخول
  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (rememberMe) localStorage.setItem("rememberEmail", data.email);
      else localStorage.removeItem("rememberEmail");

      const session = await getSession();
      if (session?.user?.role === "admin") router.push(`/${params.locale}/admin/dashboard`);
      else router.push(`/${params.locale}/dashboard`);
    } catch (err) {
      console.error(err);
      setError(t("networkError"));
    } finally {
      setIsLoading(false);
    }
  };

  // تسجيل الدخول عبر Google
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: `/${params.locale}/profile` });
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

        <h1 className="w-full mb-5 text-2xl font-bold text-start">{t("loginTitle")}</h1>

        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          {...register("email")}
          className={`w-full h-10 border-b-2 border-[#2E2E2E] py-2 px-3 rounded-3xl bg-background-primary ${errors.email ? "inputError" : ""}`}
        />
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}

        <label className="w-full text-sm mt-2">{t("passwordLabel")}</label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            {...register("password")}
            className={`w-full h-10 border-b-2 border-[#2E2E2E] py-2 px-3 rounded-3xl bg-background-primary ${errors.password ? "inputError" : ""}`}
          />
          <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2">
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.password && <p className="errorMsg">{errors.password.message}</p>}

        <div className="w-full flex items-center justify-between mt-2 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className={`relative w-11 h-6 rounded-full ${rememberMe ? "bg-[#59B1C2]" : "bg-gray-500"}`} onClick={() => setRememberMe(!rememberMe)}>
              <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full ${rememberMe ? "translate-x-5" : "translate-x-0"}`}></div>
            </div>
            <span className="text-sm">{t("rememberMe")}</span>
          </label>
          
          <Link href={`/${params.locale}/Login/forgotpassword`} className="text-sm text-[#59B1C2] underline">
            {t("forgotPassword")}
          </Link>
        </div>

        <LoadingButton type="submit" className="w-full py-2 mt-2.5 rounded-3xl bg-[#59B1C2]" loading={isLoading}>
          {isLoading ? t("loggingIn") : t("loginButton")}
        </LoadingButton>

        <div className="flex items-center justify-center w-full my-2">
          <div className="flex-1 h-px bg-[#2E2E2E]"></div>
          <p className="px-10 py-1">{t("orSeparator")}</p>
          <div className="flex-1 h-px bg-[#2E2E2E]"></div>
        </div>

        <button type="button" onClick={handleGoogleSignIn} className="flex items-center justify-center gap-3 w-full py-2 bg-background-primary border rounded border-[#2E2E2E]">
          <GmailIcon className="w-5 h-5" />
          {t("loginWithGoogle")}
        </button>
        {/* // لو  فيه جوجل لينكapi
//   const handleGoogleSignIn = async () => {
//   try {
//     // هنا لازم تجيبي الـ idToken من Google Sign-In SDK
//     const idToken = await getGoogleIdToken(); // دالة افتراضية تجيب التوكن
//     const user = await loginWithGoogle(idToken);

//     // حفظ بيانات المستخدم محليًا
//     localStorage.setItem("user", JSON.stringify(user));

//     // إعادة توجيه
//     if (user.role === "admin") router.push(`/${params.locale}/admin/dashboard`);
//     else router.push(`/${params.locale}/dashboard`);
//   } catch (err: any) {
//     console.error(err);
//     setError(err?.message || "Google login failed");
//   }
// }; */}

        <div className="flex items-center gap-2 text-sm mt-2">
          <p>{t("dontHaveAccount")}</p>
          <Link href={`/${params.locale}/signup`} className="underline">{t("createAccount")}</Link>
        </div>
      </form>
    </section>
  );
}