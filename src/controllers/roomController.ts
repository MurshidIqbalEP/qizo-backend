import { Request, Response } from "express";
import { Room } from "../model/roomModel";
import { Question } from "../model/questionModal";

// For unblock educator
export const createRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {roomName,limit,difficulty,type,hostId} = req.body
    const newRoom = await Room.create({roomName,userLimit:limit,difficulty,type,hostId})

    res.status(200).json({message:"Room created successfully",newRoom})

  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};
// add quize question
export const addQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {questions,roomId} = req.body
    
    
    const room = await Room.findById(roomId);
    if (!room) {
       res.status(404).json({ message: "Room not found" });
       return
    }

     const formattedQuestions = questions.map((q: any) => ({
        roomId,
        questionText: q.question, 
        options: q.options.map((opt: any) => ({
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
    }));


    const newQuestions = await Question.insertMany(formattedQuestions);
    
    res.status(200).json({message:"question added",})

  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

// fetch quiz rooms by user
export const fetchQuizByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {userId} = req.query
  
    if(!userId){
      res.status(400).json({message:"userid needed",})
      return
    }

    const rooms = await Room.find({hostId:userId})    
    res.status(200).json({rooms})

  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};