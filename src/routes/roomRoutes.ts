import express, { Request, Response } from "express";
import { addQuestion, createRoom } from "../controllers/roomController";
const router = express.Router();

// Routes
router.post("/createRoom", createRoom);
router.post("/addQuestion", addQuestion);

export default router;