import { Student } from "../models/students.model.js"; 
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";

const signup = asyncHandeler(async (req, res) => {
    const { name, branch, email, scholarId, hostel, room } = req.body;

    if (
        [name, branch, email, scholarId, hostel, room].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new apiError(400, "All fields are required");
    }

    const existingStudent = await Student.findOne({
        $or: [{ email }, { scholarId }]
    });

    if (existingStudent) {
        throw new apiError(409, "Student with this email or Scholar ID already exists");
    }

    const newStudent = await Student.create({
        name,
        branch,
        email,
        scholarId,
        hostel,
        room
    });

    if (!newStudent) {
        throw new apiError(500, "Something went wrong while registering the student");
    }

    res.status(201).json(
        new apiResponse(201, newStudent, "Student registered successfully")
    );
});

const login = asyncHandeler(async (req, res) => {
    const { email, scholarId } = req.body;

    if (!email?.trim() || !scholarId?.trim()) {
        throw new apiError(400, "Email and Scholar ID are required for login");
    }

    const student = await Student.findOne({ email, scholarId });

    if (!student) {
        throw new apiError(401, "Invalid email or Scholar ID");
    }

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };

    res.status(200)
        .cookie("objectId", student._id.toString(), cookieOptions)
        .json(
            new apiResponse(200, { studentId: student._id }, "Login successful")
        );
});

const logout = asyncHandeler(async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" 
    };

    res.status(200)
        .clearCookie("objectId", cookieOptions)
        .json(
            new apiResponse(200, {}, "Logged out successfully")
        );
});

export {
    signup,
    login,
    logout
};