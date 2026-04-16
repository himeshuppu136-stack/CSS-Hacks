import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
    department:{
        type: String,
        required: true
    },
    complaint: {
        type: String,
        lowercase: true,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"
    }
})
export const Complaint = mongoose.model("Complaint",complaintSchema)