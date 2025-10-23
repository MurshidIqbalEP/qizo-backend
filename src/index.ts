import express, { Application, Request, Response } from "express";
import connectDB from "./db";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import roomRoutes from "./routes/roomRoutes";
import { createServer } from "http";
import { Server } from "socket.io";
import { Room } from "./model/roomModel";
import { setupSocket } from "./sockets";

const app: Application = express();
const PORT = 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setupSocket(io);



// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_URL,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/room", roomRoutes);

// Start server
httpServer.listen(PORT, async () => {
  await connectDB();
  console.log(`⚡️ Server is running on http://localhost:${PORT}`);
});
