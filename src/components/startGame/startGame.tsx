"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoadingButton from "../loadingButton/loadingButton";

const StartGame = () => {
    const [loading, setLoading] = useState(false)
  const router = useRouter();
  const customRoomCode = () => {
    setLoading(true)
    const customRoomCode = Math.random().toString().substring(2, 8);
    router.push(`/room/${customRoomCode}`);
  };
  return (
    <>
    <div className="flex flex-row gap-2 items-center">
    <p>Start a new game</p>{" "}
      <p
        className="group flex justify-center cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        onClick={() => {
          customRoomCode();
        }}
      >
        {loading ? <LoadingButton /> : "Create Room"}
      </p>
    </div>
      <div className="flex flex-col">
      <button
        className="group  flex justify-center cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        onClick={() => {
          customRoomCode();
        }}
      >
        Join Room
      </button>
      </div>
      
    </>
  );
};

export default StartGame;
