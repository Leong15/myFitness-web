import NextAuth from "next-auth";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

interface CustomUser extends User {
  id: string;
  username: string;
  role: string; 
  acclevel: number | undefined;
  email: string | null;
}

const Options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username: ",
          type: "text",
          placeholder: "Type your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Missing username or password");
        }

        const user = await db.users.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error("No user found with this username");
        }

        if (!(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid password");
        }

        if (user.active === 0) {
          throw new Error("Account has been locked");
        }

        return {
          id: user.id.toString(),
          username: user.username,
          role: user.role ?? "USER",
          acclevel: user.acc_level_id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.name = customUser.username;
        token.email = customUser.email;
        token.role = customUser.role;
        token.acc_level = customUser.acclevel;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? null;
        session.user.role = token.role as string;
        session.user.acc_level = token.acc_level as number;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60, // 5 hours
    updateAge: 30 * 60, // 30 minutes
  },
  pages: {
    signIn: "/login",
    newUser: "/staff_leave_record",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(Options);

export { handler as GET, handler as POST };