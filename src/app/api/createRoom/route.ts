import connectMongoDb from "../../../../utils/dbConnection";
import { NextResponse } from "next/server";
import Game from "../../../../models/gameModel";

export async function POST(req: Request) {
  try {
    console.log("api");
    await connectMongoDb();
    const { game } = await req.json();
    console.log(game);
    const roomExist = await Game.findOne({
      $or: [{ roomCode: game.roomCode }],
    });
    console.log({ roomExist })
    if (roomExist) {
      return NextResponse.json(
        { message: "Room already exist. Please Try again...", status: false },
        { status: 500 }
      );
    }

    await Game.create(game);

    return NextResponse.json({ message: "", status: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while creating Room", status: false },
      { status: 500 }
    );
  }
}
