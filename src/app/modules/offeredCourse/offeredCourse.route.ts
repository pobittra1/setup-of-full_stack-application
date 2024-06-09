import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidation } from "./offeredCourse.validation";
import { offeredCourseController } from "./offeredCourse.controller";

const router = express.Router();

router.post(
  "/create-offered-course",
  validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse
);

router.patch(
  "/:id",
  validateRequest(offeredCourseValidation.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse
);

router.get("/", offeredCourseController.getAllOfferedCourses);

router.get("/:id", offeredCourseController.getSingleOfferedCourse);

router.delete("/:id", offeredCourseController.deleteOfferedCourseFromDB);

export const offeredCourseRoute = router;
