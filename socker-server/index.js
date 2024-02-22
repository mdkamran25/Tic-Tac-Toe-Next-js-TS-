import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
  });

  const socketConnections = new Map();
  
  io.on("connection", (socket) => {
      const socketId = socket.id;
  
      socketConnections.set(socketId, socket);
  
      socket.on("joinSocketChannel", (data) => {
        console.log("Join Socket Room")  
        socket.join(data);
      });
  
      socket.on("joinGame", (data) => {
        console.log("Joined Game")
          socket.to(data.roomCode).emit("recieveJoinGame", data);
      });
  
      socket.on("updateGame", (data) => {
        console.log("Update Game")
          socket.to(data.roomCode).emit("recieveUpdateGameData",data);
      });
  
      socket.on("leaveGame", (data) => {
        console.log("Leave Game")
          socket.to(data.roomCode).emit("recieveLeaveGame", data.message);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected")
          socketConnections.delete(socketId);
      });
  });
  
  server.listen(8000, () => {
      console.log("Server running on port: ", PORT);
  });