import connectMongoDb from "../../../utils/dbConnection";
import { NextResponse } from "next/server";
import Result from "../../../../models/resultModel";

export async function POST(req: Request) {
  try {
    console.log("Create result API");
    const { result } = await req.json();
    console.log({result})
    await connectMongoDb();
    
    // const resultExist = await Result.findOne({ gameId: result.gameId });
    // if (resultExist) {
    //   return NextResponse.json(
    //     {
    //       message: "Result already added for this game",
    //       status: false,
    //     },
    //     { status: 409 }
    //   );
    // }

    await Result.create(result);

    return NextResponse.json(
      {
        message: "Result added successfully.",
        status: true,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while adding result:", error.message);
      return NextResponse.json(
        {
          message: `Error while adding result: ${error.message}`,
          status: false,
        },
        { status: 500 }
      );
    }
  }
}
