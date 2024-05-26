import express from "express";
import { studentController } from "./student.controller";

const router = express.Router();

const { createStudent, getAllStudents, getSingleStudent, deleteStudent } =
  studentController;

router.get("/", getAllStudents);
router.get("/:studentId", getSingleStudent);
router.delete("/:studentId", deleteStudent);
export const studentRoutes = router;
