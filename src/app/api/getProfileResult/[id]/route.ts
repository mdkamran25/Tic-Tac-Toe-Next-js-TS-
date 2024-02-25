import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDb from "../../../../utils/dbConnection";
import ResultModel from "../../../../../models/resultModel";
import UserModel from "../../../../../models/userModel";

export async function GET(
  req: Request,
  { params, query }: { params: { id: string }; query: { page: string } }
) {
  const { id } = params;
  const page = parseInt(query?.page) || 1; 
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    await connectMongoDb();

    const matchData = await ResultModel.find({
      $or: [
        { "player.x": new mongoose.Types.ObjectId(id) },
        { "player.o": new mongoose.Types.ObjectId(id) },
      ],
    })
      .select("createdAt winner player.x player.o")
      .skip(skip)
      .limit(limit);

    await ResultModel.populate(matchData, [
      { path: "player.x", model: UserModel, select: "name" },
      { path: "player.o", model: UserModel, select: "name" },
    ]);

    const matchDataWithOpponentName: MatchDataWithOpponentName[] =
      matchData.map((match) => {
        const playerId = new mongoose.Types.ObjectId(id);
        const winner =
          match.winner === "X"
            ? match.player.x.equals(playerId)
              ? "You Won"
              : match.player.o.equals(playerId)
              ? "You Lost"
              : ""
            : match.winner === "O"
            ? match.player.o.equals(playerId)
              ? "You Won"
              : match.player.x.equals(playerId)
              ? "You Lost"
              : ""
            : "Match Draw";
        const matchedPlayerId = match.player.x.equals(playerId)
          ? match.player.o
          : match.player.x;
        const opponentName = (matchedPlayerId)?.name || "";
        return {
          time: match.createdAt as string,
          winner: winner,
          opponentName,
        };
      });

    return NextResponse.json({ matchData: matchDataWithOpponentName });
  } catch (error) {
    console.error("Error retrieving match data:", error);
    return NextResponse.error();
  }
}
