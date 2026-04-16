import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    scholarId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    branch: {
        type: String,
        lowercase: true,
    },
    hostel: {
        type: String,
        lowercase: true
    },
    room: {
        type: String,
        lowercase: true,
    }
})

export const Student = mongoose.model("Student",StudentSchema)