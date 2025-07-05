import express from "express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();


const PORT = process.env.PORT;

// Middleware to parse JSON request bodies
app.use(express.json({ limit: '10mb' }));           // ← increase limit here

// If you also parse URL-encoded bodies:
app.use(express.urlencoded({ extended: true, limit: '10mb' })); 


// Middleware to parse cookies
app.use(cookieParser());

// Middleware to handle CORS
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});