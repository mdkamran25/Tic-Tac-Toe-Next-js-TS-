import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDb from "./dbConnection";
import UserModel from "../../models/userModel";
import bcrypt from "bcrypt";
import { User } from "next-auth";


async function login(credentials: Credentials):Promise<User | null> {
  try {
    await connectMongoDb();
    const user = await UserModel.findOne({ email: credentials?.email });
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
      async authorize(credentials: Record<never, string> | undefined) {
        try {
          const user = await login(credentials as Credentials)
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
  callbacks: { },
};