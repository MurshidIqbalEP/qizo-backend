import { Room } from "../../model/roomModel";
import { Server, Socket } from "socket.io";

export const handleJoinRoom = async (io: Server, socket: Socket, data: { roomId: string; name: string; userId: string }) => {
  const { roomId, name, userId } = data;

  try {
    socket.join(roomId);
    console.log(`${name} joined room ${roomId}`);

    // Update DB: Add user if not already in the room
    const room = await Room.findById(roomId);
    if (!room) return socket.emit("error", { message: "Room not found" });

    const alreadyJoined = room.joinedUsers?.some((u: any) => u.userId === userId);
    if (!alreadyJoined) {
      room.joinedUsers.push({ userId, name });
      await room.save();
    }

    // Send updated members list to everyone in the room
    io.to(roomId).emit("roomMembers", {
      roomId,
      members: room.joinedUsers.map((u: any) => u.name),
    });
  } catch (error) {
    console.error("Error joining room:", error);
    socket.emit("error", { message: "Failed to join room" });
  }
};