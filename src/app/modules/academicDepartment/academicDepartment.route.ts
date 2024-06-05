import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  // validateRequest(
  //   academicDepartmentValidation.createAcademicDepartmentValidationSchema
  // ),
  academicDepartmentController.createAcademicDepartmemt
);

router.get(
  "/:departmentId",
  academicDepartmentController.getSingleAcademicDepartment
);

router.patch(
  "/:departmentId",
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  academicDepartmentController.updateAcademicDeartment
);

router.get("/", academicDepartmentController.getAllAcademicDepartments);

export const academicDepartmentRoutes = router;
