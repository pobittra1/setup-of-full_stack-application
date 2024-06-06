import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import { facultyController } from "./faculty.controller";

const router = express.Router();

router.get("/:id", facultyController.getSingleFaculty);

router.patch(
  "/:id",
  validateRequest(updateFacultyValidationSchema),
  facultyController.updateFaculty
);

router.delete("/:id", facultyController.deleteFaculty);

router.get("/", facultyController.getAllFaculties);

export const facultyRoutes = router;
