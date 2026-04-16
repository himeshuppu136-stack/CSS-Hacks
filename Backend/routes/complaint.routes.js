import { Router } from "express";
import { addComplaint, deleteComplaint, getRecentComplaints } from "../controller/complaint.controller.js";
import multer from "multer";
const upload = multer()

const router = Router();

router.route("/add").post(upload.none(),addComplaint);
router.route("/fetchComplaint").get(getRecentComplaints);
router.route("/:complaintId").delete(deleteComplaint);

export default router;