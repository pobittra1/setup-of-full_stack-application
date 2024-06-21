import express from "express";
import { userController } from "./user.controller";
import { StudentValidations } from "../student/student.zod_validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

//destructuring
const { createStudent } = userController;

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.createStudentValidationSchema),
  createStudent
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);
export const userRoutes = router;
