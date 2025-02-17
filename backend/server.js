import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import ConnectDB from "./db/db.connect.js";
import { app, server } from "./socket/socket.js";

// app.get("/", (req, res) => {
//   res.send("Root Route");
// });

app.use(express.json()); // to parse json from req.body
app.use(cookieParser()); // to parse cookie (in middleware)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}..`);
  ConnectDB();
});
