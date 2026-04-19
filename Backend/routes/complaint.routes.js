import { Router } from "express";
import { addComplaint, changeStatus, deleteComplaint, getDepartmentComplaints, getRecentComplaints } from "../controller/complaint.controller.js";
import multer from "multer";
const upload = multer()

const router = Router();

router.route("/add").post(upload.none(),addComplaint);
router.route("/fetchComplaint").get(getRecentComplaints);
router.route("/delete/:complaintId").delete(deleteComplaint);
router.route("/:department").get(getDepartmentComplaints);
router.route("/changeStatus").post(changeStatus)
export default router;