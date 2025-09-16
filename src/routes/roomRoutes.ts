import express, { Request, Response } from "express";
const router = express.Router();

// Routes
router.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript 🚀");
});

export default router;