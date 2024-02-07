"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoadingButton from "../loadingButton/loadingButton";
import Input from "../input/input";
import { room } from "@/constants/apiUrl";

const StartGame = () => {
  const [loading, setLoading] = useState({
    createRoom: false,
    joinRoom: false,
  });
  const [joinRoomCode, setJoinRoomCode] = useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJoinRoomCode(e.target.value);
  };
  const router = useRouter();

  const createRoom = async () => {
    setLoading({ ...loading, createRoom: true });

    const customRoomCode = Math.random().toString().substring(2, 8);
    // Perform API call to create a room at backend
    try {
      const res = await fetch(room, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customRoomCode),
      });
      const data = await res.json();
      console.log({data})
      if (res.ok) {
        router.push(`/room/${customRoomCode}`);
      } else {
        // setApiResponse(data);
        setLoading({ ...loading, createRoom: false });
        throw new Error("Failed to create account");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoading({ ...loading, createRoom: false });
        console.error("Error creating account:", error?.message);
      }
    }
  };

  const joinRoom = () => {
    if (joinRoomCode && joinRoomCode.length === 6) {
      //here I have to perform some API call to check that such room exist or not
      setLoading({ ...loading, joinRoom: true });
      router.push(`/room/${joinRoomCode}`);
      return;
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <p>Start a new game</p>{" "}
        <button
          className="group flex justify-center cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          onClick={createRoom}
        >
          {loading.createRoom ? <LoadingButton /> : "Create Room"}
        </button>
      </div>
      <div className="flex flex-col px-2 w-full md:w-[20rem] justify-center items-center">
        <div className="w-[15rem] md:w-full">
          <Input
            key={"joinRoom"}
            handleChange={handleChange}
            value={joinRoomCode}
            labelText={"Enter Room Code"}
            labelFor={"joinRoom"}
            id={"joinRoom"}
            name={"joinRoomCode"}
            type={"text"}
            isRequired={true}
            placeholder={"Enter Room Code"}
          />
        </div>

        <div className="w-full">
          <button
            className="group mx-auto md:w-[10rem]  break-keep flex justify-center cursor-pointer py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={joinRoom}
          >
            {loading.joinRoom ? <LoadingButton /> : "Join Room"}
          </button>
        </div>
      </div>
    </>
  );
};

export default StartGame;
