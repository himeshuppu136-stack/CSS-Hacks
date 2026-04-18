import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import studentRouter from "./routes/student.routes.js"
app.use("/student",studentRouter)
import complaintRouter from "./routes/complaint.routes.js"
app.use("/complaint",complaintRouter)

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
});

export {app}