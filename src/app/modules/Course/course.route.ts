import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import { courseController } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse
);

router.get("/:id", courseController.getSingleCourse);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  courseController.getAllCourses
);
router.delete("/:id", auth(USER_ROLE.admin), courseController.deleteCourse);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(courseValidation.facultiesWithCourseValidationSchema),
  courseController.assignFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  validateRequest(courseValidation.facultiesWithCourseValidationSchema),
  courseController.removeFacultiesFromCourse
);

export const courseRoutes = router;
