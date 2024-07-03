import express from "express";
import { studentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.zod_validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

const { updateStudent, getAllStudents, getSingleStudent, deleteStudent } =
  studentController;

router.get("/", auth(USER_ROLE.superAdmin, USER_ROLE.admin), getAllStudents);
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  getSingleStudent
);
router.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  updateStudent
);
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  deleteStudent
);
export const studentRoutes = router;
