import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { prompt: "select_account" }, 
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: true,

  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      session.user = {
        ...session.user,
        role: user?.role ?? "user", // افتراضي "user"
      };
      return session;
    },

    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        (token as any).role = user?.role ?? "user";
      }
      return token;
    },
  },
};

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;