import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-department",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
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
