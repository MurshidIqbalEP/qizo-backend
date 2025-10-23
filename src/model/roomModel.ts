import mongoose, { Schema } from "mongoose";
import { IRoom } from "../lib/types";



const roomSchema: Schema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      trim: true,
    },
    userLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    type: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
    hostId: {
      type: String,
      required: true,
    },
    joinedUsers: [
      {
        userId: { type: String, required: true, },
        name: { type: String, required: true },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } 
);


export const Room = mongoose.model<IRoom>("Room", roomSchema);
