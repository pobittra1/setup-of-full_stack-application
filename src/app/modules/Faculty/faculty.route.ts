import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import { facultyController } from "./faculty.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/:id", facultyController.getSingleFaculty);

router.patch(
  "/:id",
  validateRequest(updateFacultyValidationSchema),
  facultyController.updateFaculty
);

router.delete("/:id", facultyController.deleteFaculty);

router.get("/", auth(USER_ROLE.admin), facultyController.getAllFaculties);

export const facultyRoutes = router;
