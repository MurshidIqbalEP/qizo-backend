import express, { Request, Response } from "express";
import { addQuestion, createRoom, fetchQuizByUser } from "../controllers/roomController";
const router = express.Router();

// Routes
router.post("/createRoom", createRoom);
router.post("/addQuestion", addQuestion);
router.get("/fetchQuestionByUser", fetchQuizByUser);

export default router;