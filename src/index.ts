import express, { Application, Request, Response } from "express";
import connectDB from "./db";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript 🚀");
});

// Start server
app.listen(PORT, async() => {
  await connectDB()
  console.log(`⚡️ Server is running on http://localhost:${PORT}`);
});
