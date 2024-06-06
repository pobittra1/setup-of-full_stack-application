import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import { courseController } from "./course.controller";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse
);

router.get("/:id", courseController.getSingleCourse);
router.get("/", courseController.getAllCourses);
router.delete("/:id", courseController.deleteCourse);

router.patch(
  "/:id",
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
