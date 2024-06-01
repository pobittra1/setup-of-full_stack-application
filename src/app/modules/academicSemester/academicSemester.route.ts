import express from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";
const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  academicSemesterController.createAcademicSemester
);
router.get("/", academicSemesterController.getAllAcademicSemesters);

router.get(
  "/:semesterId",
  academicSemesterController.getSingleAcademicSemester
);

export const academicSemesterRoutes = router;
