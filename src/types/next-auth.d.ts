import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// هذا الملف لتوسيع أنواع البيانات الافتراضية في NextAuth
// لإضافة خصائص مخصصة مثل `id` و `role` بشكل آمن (Type-Safe)

declare module "next-auth" {
  /**
   * هذا هو شكل كائن `user` الذي يتم إرجاعه في `session`.
   * نضيف إليه `id` و `role`.
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]; // للحفاظ على الخصائص الافتراضية (name, email, image)
  }

  /**
   * هذا هو شكل كائن `user` الذي يتم تمريره إلى دالة `jwt`.
   * نضيف إليه `role` كخاصية اختيارية.
   */
  interface User extends DefaultUser {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  /** هذا هو شكل `token` الذي يتم تمريره إلى دالة `session`. */
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}