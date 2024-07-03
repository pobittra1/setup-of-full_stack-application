import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidation } from "./offeredCourse.validation";
import { offeredCourseController } from "./offeredCourse.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-offered-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(offeredCourseValidation.updateOfferedCourseValidationSchema),
  offeredCourseController.updateOfferedCourse
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  offeredCourseController.getAllOfferedCourses
);

router.get(
  "/my-offered-courses",
  auth(USER_ROLE.student),
  offeredCourseController.getMyOfferedCourses
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  offeredCourseController.getSingleOfferedCourse
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  offeredCourseController.deleteOfferedCourseFromDB
);

export const offeredCourseRoute = router;
