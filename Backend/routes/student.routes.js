import { Router } from "express";
import { signup, login,logout } from "../controller/student.controller.js"; 
import multer from "multer";
const upload = multer()

const router = Router();

router.route("/signup").post(upload.none(),signup);

router.route("/login").post(upload.none(),login);

router.route("/logout").post(upload.none(),logout);

export default router;