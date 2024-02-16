"use client";
import React, { useContext, useEffect } from "react";
import { OIcon } from "../oIcon/oIcon";
import { XIcon } from "../xIcon/xIcon";
import { GameContext } from "@/context/gameContext";
import { checkTurn } from "@/utils/checkCurrentTurn";
import { useSession } from "next-auth/react";
import { checkWinner } from "@/utils/checkWinner";
import { handleGameState } from "@/utils/handleGameState";
import { handleGameEnd } from "@/utils/handleGameEnd";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function Square({ value, i, session }: SquareProps) {
  const { game, setGame } = useContext(GameContext) as GameContextType;
  
  useEffect(()=>{
    socket.on("recieveUpdateGameData", (data) => {
      console.log("Recieved Game Data")
      setGame({
        ...game,
        ...data,
      });
    });
    return ()=>{
      socket.off("recieveUpdateGameData")
    }
  })

async function handlePlayer(index: number) {
  const updatedBoard = [...game.board];
  updatedBoard[index] = game.turn === "X" ? "X" : "O";
  const updatedTurn = game.turn === "X" ? "O" : "X";

  let winner = checkWinner(updatedBoard);
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




const Squares = ({ i }: SquaresProps) => {
  const { game } = useContext(GameContext) as GameContextType;
  const { data: session } = useSession();

  const value =
    game.board[i] === "X" ? <XIcon /> : game.board[i] === "O" ? <OIcon /> : null;
    // console.log("draw:",game.board.every((square) => square === "X" || square === "O") && !game.winner)
  return (
    <Square
      value={value}
      i={i}
      session={session?.user}
    />
  );
};

export default Squares;
