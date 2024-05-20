import express from "express";
import { studentController } from "./student.controller";

const router = express.Router();

const { createStudent, getAllStudents, getSingleStudent } = studentController;

router.post("/create-student", createStudent);
router.get("/", getAllStudents);
router.get("/:studentId", getSingleStudent);
export const studentRoutes = router;
