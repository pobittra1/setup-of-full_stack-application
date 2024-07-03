import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { enrolledCourseController } from "./enrolledCourse.controller";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";
import { USER_ROLE } from "../user/user.constant";

//destructure controllers
const { createEnrolledCourse, updateEnrolledCourseMarks } =
  enrolledCourseController;
//destructure validations
const {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
} = EnrolledCourseValidations;
const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth(USER_ROLE.student),
  validateRequest(createEnrolledCourseValidationZodSchema),
  createEnrolledCourse
);

router.get(
  "/my-enrolled-courses",
  auth(USER_ROLE.student),
  enrolledCourseController.getMyEnrolledCourses
);

router.patch(
  "/update-enrolled-course-marks",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(updateEnrolledCourseMarksValidationZodSchema),
  updateEnrolledCourseMarks
);

export const enrolledCourseRoute = router;
