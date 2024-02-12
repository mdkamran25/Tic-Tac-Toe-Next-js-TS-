import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDb from "../../../../utils/dbConnection";
import User from "../../../../../models/userModel";
import bcrypt from "bcrypt";
import { Document } from "mongoose";

interface user extends Document {
  name: string;
  email: string;
  password: string;
}

async function login(credentials: Credentials): Promise<user | null> {
  try {
    await connectMongoDb();
    const user = await User.findOne({ email: credentials?.email });
    if (!user) throw new Error("Invalid User Credentials");
    const isCorrect = await bcrypt.compare(
      credentials?.password,
      user?.password
    );
    if (!isCorrect) throw new Error("Invalid User Credentials");
    return user;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unknown error occurred.");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.id = token.id;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
