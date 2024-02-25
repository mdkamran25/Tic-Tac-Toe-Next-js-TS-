"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import LoadingButton from "../loadingButton/loadingButton";
import { joinRoom, room } from "@/constants/apiUrl";
import { GameContext } from "@/context/gameContext";
import ToastConainer from "../toastConainer";
import { showErrorToast } from "../../utils/toast";
import socket from "../../utils/socket";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface JoinRoomState {
  joinRoomCode: number;
}

const schema = yup.object().shape({
  joinRoomCode: yup
    .number()
    .typeError("Room code must be a number")
    .test("is-6-digits", "Enter a 6-digit room code", (value) => {
      if (!value) {
        return true;
      }
      return /^\d{6}$/.test(value.toString()); // Check if value is exactly 6 digits
    })
    .required("Room code is required"),
});



const StartGame = ({ userData }: { userData: UserResponseData }) => {
  const { game, setGame } = useContext(GameContext) as GameContextType;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinRoomState>({
    resolver: yupResolver(schema) as Resolver<JoinRoomState>,
  });

  useEffect(() => {
    socket.emit("renderIssue");
  }, []);

  const [loading, setLoading] = useState({
    createRoom: false,
    joinRoom: false,
  });

  const router = useRouter();

  const createRoom = async () => {
    setLoading({ ...loading, createRoom: true });

    try {
      const customRoomCode = Math.random().toString().substring(2, 8);

      const newGame = {
        roomCode: customRoomCode,
        playerXId: userData.data._id,
      };

      const res = await fetch(room, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game: newGame }),
      });

      const data = await res.json();
      if (res.ok) {
        socket.emit("joinSocketChannel", customRoomCode);
        router.push(`/room/${customRoomCode}`);
      } else {
        showErrorToast(data.message, "error");
        setLoading({ ...loading, createRoom: false });
        throw new Error("Failed to create room");
      }
    } catch (error) {
      setLoading({ ...loading, createRoom: false });
      if (error instanceof Error) {
        console.error("Error creating room:", error.message);
      }
    }
  };

  const handleJoinRoom: SubmitHandler<JoinRoomState> = async (room) => {
    setLoading({ ...loading, joinRoom: true });

    try {
      const res = await fetch(`${joinRoom}/${room.joinRoomCode}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "true",
          playerOId: userData.data._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        showErrorToast(data.message, "error");
        setLoading({ ...loading, joinRoom: false });
        return;
      }
      setGame({
        ...game,
        status: true,
        playerOId: userData.data._id,
      });
      socket.emit("joinSocketChannel", room.joinRoomCode);

      socket.emit("joinGame", {
        status: true,
        playerOId: userData.data,
        roomCode: room.joinRoomCode,
      });
      router.push(`/room/${room.joinRoomCode}`);
    } catch (error) {
      setLoading({ ...loading, joinRoom: false });
      if (error instanceof Error) {
        console.error(error.message);
      }
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
      <form onSubmit={handleSubmit(handleJoinRoom)}>
        <div className="flex flex-col px-2 w-full md:w-[20rem] justify-center items-center">
          <div className="w-[15rem] md:w-full relative">
            <input
              className="inputClass"
              {...register("joinRoomCode")}
              placeholder="Enter Room Code here..."
            />
            <p className="text-red-600">{errors.joinRoomCode?.message}</p>
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="group mt-2 mx-auto md:w-[10rem]  break-keep flex justify-center cursor-pointer py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {loading.joinRoom ? <LoadingButton /> : "Join Room"}
            </button>
          </div>
        </div>
      </form>

      <ToastConainer />
    </>
  );
};

export default StartGame;
