import express, { Application, Request, Response } from "express";
import connectDB from "./db";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import roomRoutes from "./routes/roomRoutes";

const app: Application = express();
const PORT = 5000;

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
app.listen(PORT, async() => {
  await connectDB()
  console.log(`⚡️ Server is running on http://localhost:${PORT}`);
});
