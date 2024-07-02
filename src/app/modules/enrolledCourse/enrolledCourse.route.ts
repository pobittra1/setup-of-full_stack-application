import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { enrolledCourseController } from "./enrolledCourse.controller";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";

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
  auth("student"),
  validateRequest(createEnrolledCourseValidationZodSchema),
  createEnrolledCourse
);

router.patch(
  "/update-enrolled-course-marks",
  auth("faculty"),
  validateRequest(updateEnrolledCourseMarksValidationZodSchema),
  updateEnrolledCourseMarks
);

export const enrolledCourseRoute = router;
