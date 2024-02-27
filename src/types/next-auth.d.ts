import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  }
}