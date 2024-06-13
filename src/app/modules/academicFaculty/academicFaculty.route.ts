import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFacultyController } from "./academicFaculty.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  academicFacultyController.createAcademicFaculty
);

router.get("/:facultyId", academicFacultyController.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFacultyController.updateAcademicFaculty
);

router.get("/", auth(), academicFacultyController.getAllAcademicFaculties);

export const academicFacultyRoutes = router;
