import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; //{userId : socketId}

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  const userId = socket.handshake.query.userId; // from client-side
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }
  console.log("Online Users", Object.keys(userSocketMap));
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    const userId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id
    ); // Find userId by socket.id
    if (userId) {
      // Check if userId exists before deleting
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      console.log("Online Users", Object.keys(userSocketMap));
    }
  });
});
export { app, io, server };
