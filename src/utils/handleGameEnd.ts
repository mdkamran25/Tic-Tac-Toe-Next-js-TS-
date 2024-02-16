import { createResult, updateRoom } from "@/constants/apiUrl";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export async function handleGameEnd(
  game: Game,
  setGame: (game: Game) => void,
  updatedBoard: string[],
  updatedTurn: string,
  winner: string
) {
  console.log("Handle Game End");
  if (winner)
    socket.emit("updateGame", {
      board: updatedBoard,
      turn: updatedTurn,
      winner: winner,
      roomCode: game.roomCode,
    });
    
  try {
    console.log("Update room API called");
    const res = await fetch(`${updateRoom}/${game?.roomCode}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: updatedBoard,
        turn: updatedTurn,
        winner: winner,
      }),
    });
    if (!res.ok) {
      console.error("Failed to update game state in API:", res.status);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating game state in API:", error.message);
    }
  }

  try {
    console.log("create result api called");
    const res = await fetch(createResult, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result: {
          gameId: game._id,
          gameStatus: winner ? "Completed" : "Incompleted",
          player: {
            x: (game.playerXId as UserData)._id,
            o: (game.playerOId as UserData)._id,
          },
          winner: winner,
        },
      }),
    });
    if (!res.ok) {
      throw new Error("Error adding result");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding result: ", error?.message);
    }
  }
}
