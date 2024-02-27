import connectMongoDb from "../../../utils/dbConnection";
import UserModel from "../../../../models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectMongoDb();
    const { name, email, password } = await req.json();

    const userExist = await UserModel.findOne({ $or: [{ email }] });

    if (userExist) {
      return NextResponse.json(
        { message: "User already exist", status: false },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password: hashedPassword });
    return NextResponse.json(
      { message: "User Registered...!!", status: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while registering user", status: false },
      { status: 500 }
    );
  }
}
