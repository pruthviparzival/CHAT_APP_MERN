import "dotenv/config";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import ConnnectDB from "./db/db.connect.js";

const app = express();

// app.get("/", (req, res) => {
//   res.send("Root Route");
// });

app.use(express.json()); // to parse json from req.body
app.use(cookieParser()); // to parse cookie (in middleware)

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 6000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}..`);
  ConnnectDB();
});
