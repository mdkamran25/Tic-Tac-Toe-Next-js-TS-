import { updateRoom } from "@/constants/apiUrl";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export async function handleGameState(
  game: Game,
  setGame: (game: Game) => void,
  updatedBoard: string[],
  updatedTurn: string
) {
  try {
    // Emit updated game data to server
    socket.emit("updateGame", { board: updatedBoard, turn: updatedTurn });

    const res = await fetch(`${updateRoom}/${game?.roomCode}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: updatedBoard,
        turn: updatedTurn,
        winner: null,
        status: true,
      }),
    });

    if (!res.ok) {
      console.error("Failed to update game state in API:", res.status);
      return;
    }
    
  } catch (error) {
    if(error instanceof Error){
      console.error("Error handling game state:", error?.message);
    }
  }
}
