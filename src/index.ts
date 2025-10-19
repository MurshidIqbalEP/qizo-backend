import express, { Application, Request, Response } from "express";
import connectDB from "./db";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import roomRoutes from "./routes/roomRoutes";
import { createServer } from "http";
import { Server } from "socket.io";

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

// --- Socket.io Logic ---
interface User {
  socketId: string;
  name: string;
  roomId: string;
}

const users: User[] = [];

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // When user joins a quiz room
  socket.on("join_room", ({ name, roomId }) => {
    socket.join(roomId);

    // Add user to list
    users.push({ socketId: socket.id, name, roomId });

    // Get all members of that room
    const members = users.filter((u) => u.roomId === roomId);

    // Notify everyone in the room
    io.to(roomId).emit("room_members", members);
    console.log(`${name} joined room ${roomId}`);
  });

  // When user leaves or disconnects
  socket.on("disconnect", () => {
    const user = users.find((u) => u.socketId === socket.id);
    if (user) {
      users.splice(users.indexOf(user), 1);
      io.to(user.roomId).emit(
        "room_members",
        users.filter((u) => u.roomId === user.roomId)
      );
      console.log(`${user.name} left room ${user.roomId}`);
    }
  });
});



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

app.use('/api/room',roomRoutes)

// Start server
httpServer.listen(PORT, async() => {
  await connectDB()
  console.log(`⚡️ Server is running on http://localhost:${PORT}`);
});
