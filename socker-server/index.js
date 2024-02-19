import express from "express";
import http from "http";
import { Server } from "socket.io";


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
          socket.join(data);
      });
  
      socket.on("joinGame", (data) => {
          socket.to(data.roomCode).emit("recieveJoinGame", data);
      });
  
      socket.on("updateGame", (data) => {
          socket.to(data.roomCode).emit("recieveUpdateGameData", data);
      });
  
      socket.on("disconnect", () => {
          socketConnections.delete(socketId);
      });
  });
  
  server.listen(8000, () => {
      console.log("Server running on port: 8000");
  });