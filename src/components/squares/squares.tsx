"use client";
import React, { useContext } from "react";
import { OIcon } from "../oIcon/oIcon";
import { XIcon } from "../xIcon/xIcon";
import { GameContext } from "@/context/gameContext";
import { checkTurn } from "@/utils/checkCurrentTurn";
import { useSession } from "next-auth/react";
import { updateRoom } from "@/constants/apiUrl";
import { checkWinner } from "@/utils/checkWinner";
import { handleGameState } from "@/utils/handleGameState";
import { handleGameEnd } from "@/utils/handleGameEnd";


function Square({ value, i, session, roomData }: SquareProps) {
  const { game, setGame } = useContext(GameContext) as GameContextType;
  
 
async function handlePlayer(index: number) {
  const updatedBoard = [...game.board];
  updatedBoard[index] = game.turn === "X" ? "X" : "O";
  const updatedTurn = game.turn === "X" ? "O" : "X";

  const winner = checkWinner(updatedBoard);
  if (winner) {
    handleGameEnd(game, setGame, updatedBoard, updatedTurn, winner);
    return;
  }

  handleGameState(game, setGame, updatedBoard, updatedTurn);
}

  return (
    <button
      className="square"
      onClick={() => handlePlayer(i)}
      disabled={checkTurn(game, session, i)}
    >
      {value}
    </button>
  );
}




const Squares = ({ i, roomData }: SquaresProps) => {
  const { game } = useContext(GameContext) as GameContextType;
  const { data: session } = useSession();

  const value =
    game.board[i] === "X" ? <XIcon /> : game.board[i] === "O" ? <OIcon /> : null;

  return (
    <Square
      value={value}
      i={i}
      session={session?.user}
      roomData={roomData}
    />
  );
};

export default Squares;
