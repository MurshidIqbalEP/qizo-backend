import mongoose, { Schema, Document } from "mongoose";

export interface IOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion extends Document {
  roomId: mongoose.Types.ObjectId;
  questionText: string;
  options: IOption[];
  createdAt: Date;
  updatedAt: Date;
}

const optionSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

const questionSchema: Schema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [optionSchema],
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model<IQuestion>("Question", questionSchema);
