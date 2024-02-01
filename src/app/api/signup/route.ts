import connectMongoDb from "../../../../utils/dbConnection";
import User from "../../../../models/userModels";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  try {
    await connectMongoDb();
    const { name, email, password } = await req.json();
    console.log({ name, email, password })
    const exists = await User.findOne({ $or: [{ email }] });
    console.log({exists})
    if (exists) {
      return NextResponse.json(
        { message: "User already exist", status: false },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    console.log("user created");
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
