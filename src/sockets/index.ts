import { Server } from "socket.io";
import { handleJoinRoom } from "../controllers/socket/roomSocketController";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Register your event handlers
    socket.on("joinRoom", (data) => handleJoinRoom(io, socket, data));

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};
