import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { StudentValidations } from "../student/student.zod_validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

const router = express.Router();

//destructuring
const { createStudent } = userController;

router.post(
  "/create-student",
  validateRequest(StudentValidations.createStudentValidationSchema),
  createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);
export const userRoutes = router;
