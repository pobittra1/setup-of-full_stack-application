import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import { courseController } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  courseController.getSingleCourse
);
router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  courseController.getAllCourses
);
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  courseController.deleteCourse
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(courseValidation.facultiesWithCourseValidationSchema),
  courseController.assignFacultiesWithCourse
);

router.get(
  "/:courseId/get-faculties",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  courseController.getFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(courseValidation.facultiesWithCourseValidationSchema),
  courseController.removeFacultiesFromCourse
);

export const courseRoutes = router;
