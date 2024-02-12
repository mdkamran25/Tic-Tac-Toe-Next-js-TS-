import { NextResponse } from "next/server";
import connectMongoDb from "../../../../utils/dbConnection";
import Game from "../../../../../models/gameModel";

export async function GET(
  _req: Request,
  { params }: { params: { roomCode: string } }
) {
  const { roomCode } = params;

  try {
    console.log("Get Room APi called")
    await connectMongoDb();
    const room = await Game.findOne({ roomCode })
      .populate("playerXId")
      .populate("playerOId");
      
    return NextResponse.json(
      { message: "Room found", data: room, status: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error, status: false },
      { status: 500 }
    );
  }
}
