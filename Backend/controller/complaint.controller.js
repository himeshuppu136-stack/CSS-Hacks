import { Complaint } from "../models/complaints.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";

const addComplaint = asyncHandeler(async(req,res)=>{
    const {complaint,department} = req.body;
    if(!(complaint.trim())||!(department.trim())) throw new apiError(400,"Enter all fields")
    const createdComplaint = await Complaint.create({
        department: department,
        complaint: complaint,
        student: req.cookies?.objectId,
        status: "pending"
    })
    if(!createdComplaint) throw new apiError(500,"error in adding complaint");
    res.status(200).json(
        new apiResponse(200,createdComplaint,"complaint added")
    )
})

const deleteComplaint = asyncHandeler(async(req,res)=>{
    const {complaintId} = req.params;
    const complaint = await Complaint.findById(complaintId);
    if(!complaint) throw new apiError(404,"Complaint not found")
    if(complaint.student.toString()!==req.cookies?.objectId) throw new apiError(400,"Not allowed delete the complaint");
    const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);
    if(!deletedComplaint) throw new apiError(400,"error in deleting complaint")
    res.status(200).json(
        new apiResponse(200,{},"complaint deleted")
    )
})

const getRecentComplaints = asyncHandeler(async (req, res) => {
    
    const [Mess, Hostel, Security] = await Promise.all([
        Complaint.find({ department: "mess" }).sort({ createdAt: -1 }).limit(5),
        Complaint.find({ department: "hostel" }).sort({ createdAt: -1 }).limit(5),
        Complaint.find({ department: "security" }).sort({ createdAt: -1 }).limit(5)
    ]);

    const latestComplaints = {
        Mess,
        Hostel,
        Security
    };

    res.status(200).json(
        new apiResponse(200, latestComplaints, "Latest complaints fetched successfully")
    );
});

export{
    addComplaint,
    deleteComplaint,
    getRecentComplaints
}