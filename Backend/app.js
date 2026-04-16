import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import studentRouter from "./routes/student.routes.js"
app.use("/student",studentRouter)
import complaintRouter from "./routes/complaint.routes.js"
app.use("/complaint",complaintRouter)

export {app}