import connectMongoDb from "../../../../utils/dbConnection";
import User from "../../../../models/userModels";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  try {
    await connectMongoDb();
    const { username, email, password } = await req.json();
    const exists = await User.findOne({ $or: [{ username }] });
    if (exists) {
      return (
        NextResponse.json({ message: "Email Already Exist" }), { status: 500 }
      );
    }
  } catch (error) {}
}
