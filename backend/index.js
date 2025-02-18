import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Set up CORS with dynamic origins for development and production
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local frontend URL
    "https://auth-system-p8ow.onrender.com/api/auth/check-auth", // Production frontend URL
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json()); // Parse incoming requests' body
app.use(cookieParser()); // Parse incoming cookies

app.get("/", (req, res) => {  
  res.send("Server running");  
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Serve frontend in production if built
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
