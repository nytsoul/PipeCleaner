import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isProfileRoute = nextUrl.pathname.startsWith("/profile");
      const isCheckoutRoute = nextUrl.pathname.startsWith("/checkout");

      // Exception for admin login
      if (nextUrl.pathname === "/admin/login") {
        if (isLoggedIn && auth.user.role === "ADMIN") {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return true;
      }

      if (isAdminRoute) {
        if (isLoggedIn && auth.user.role === "ADMIN") return true;
        return Response.redirect(new URL("/admin/login", nextUrl));
      }

      if (isProfileRoute || isCheckoutRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect to sign-in
      }

      const isAuthRoute = nextUrl.pathname.startsWith("/auth/");
      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/profile", nextUrl));
        }
        return true;
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
