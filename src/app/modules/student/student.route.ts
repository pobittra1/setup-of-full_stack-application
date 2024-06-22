import express from "express";
import { studentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.zod_validation";
import auth from "../../middlewares/auth";

const router = express.Router();

const { updateStudent, getAllStudents, getSingleStudent, deleteStudent } =
  studentController;

router.get("/", getAllStudents);
router.get("/:id", auth("admin", "faculty"), getSingleStudent);
router.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  updateStudent
);
router.delete("/:id", deleteStudent);
export const studentRoutes = router;
