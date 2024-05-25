import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { getUserById } from "./data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !user.id) return false;

      if (account?.provider !== "credentials") return true;

      const dbUser = await getUserById(user.id);
      if (!dbUser || !dbUser.emailVerified) return false;

      return true;
    },

  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
