import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import { facultyController } from "./faculty.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyController.getSingleFaculty
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateFacultyValidationSchema),
  facultyController.updateFaculty
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  facultyController.deleteFaculty
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyController.getAllFaculties
);

export const facultyRoutes = router;
