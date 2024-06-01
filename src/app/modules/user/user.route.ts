import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { StudentValidations } from "../student/student.zod_validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

//destructuring
const { createStudent } = userController;

router.post(
  "/create-student",
  validateRequest(StudentValidations.createStudentValidationSchema),
  createStudent
);
export const userRoutes = router;
