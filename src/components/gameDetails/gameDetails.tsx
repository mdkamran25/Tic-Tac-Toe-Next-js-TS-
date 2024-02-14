"use client";
import React, { useContext, useMemo } from "react";
import DashboardCard from "../dashboardCard/card";
import { checkGameStatus } from "@/utils/checkGameStatus";
import { checkOpponent } from "@/utils/checkOpponent";
import { GameContext } from "@/context/gameContext";
import { useSession } from "next-auth/react";
import ReactConfetti from "@/modals/react-confetti";

const GameDetails = ({ roomData }: { roomData: Game }) => {
  const { data: session, status: sessionStatus } = useSession();
  const { game } = useContext(GameContext) as GameContextType;
  const status: string = useMemo(() => {
    return checkGameStatus(game, session?.user?.email as string);
  }, [game, session?.user?.email]);

  return (
    <>
      <DashboardCard>
        <div className="">
          <p className="text-xl font-semibold font-sans">
            Oppoenent:{" "}
            <span className="text-xl font-medium font-sans">
              {checkOpponent(game, session?.user?.email as string)}
            </span>
          </p>
          <p className="text-xl font-semibold font-sans">
            Room Code:{" "}
            <span className="text-xl font-medium font-sans">
              {roomData?.roomCode}
            </span>
          </p>
          <p className="text-xl font-semibold font-sans">
            Your Symbol:{" "}
            <span className="text-purple-600 text-2xl font-bold">
              {(session?.user?.email as string) ===
              (game.playerXId as UserData).email
                ? "X"
                : "O"}
            </span>
          </p>
          <p className="text-xl font-semibold font-sans">
            Game Status:{" "}
            <span className="text-xl font-medium font-sans">{status}</span>
          </p>
        </div>
      </DashboardCard>
      {(status === "You Won" || status === "You Lose" || status==="Match Draw" ) && (
        <ReactConfetti status={status} />
      )}
    </>
  );
};

export default GameDetails;
