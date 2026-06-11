import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import express from "express";

import { app, server } from "./lib/socket.js";
import passport from "./lib/passport.js";
import friendRequestRouter from "./routes/friendRequest.route.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import connectDB from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173"
      : process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/friends", friendRequestRouter);

if (process.env.NODE_ENV === "production") {
  const frontendDist = path.resolve("..", "frontend", "dist");

  app.use(express.static(frontendDist));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.log("Database Connection Error:", error);
  }
};

startServer();