import { updateRoom } from "@/constants/apiUrl";

export async function handleGameEnd(game:Game, setGame: (game:Game)=>void, updatedBoard: string[], updatedTurn: string, winner: string) {
    console.log("Handle Game End")
    setGame({
      ...game,
      board: updatedBoard,
      turn: updatedTurn,
      winner: winner,
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
      if(error instanceof Error){
        console.error("Error updating game state in API:", error.message);
      }
    }
  }