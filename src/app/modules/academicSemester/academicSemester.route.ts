import express from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
  "/create-academic-semester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  academicSemesterController.createAcademicSemester
);
router.get("/", academicSemesterController.getAllAcademicSemesters);

router.get(
  "/:semesterId",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  academicSemesterController.getSingleAcademicSemester
);

router.patch(
  "/:semesterId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  academicSemesterController.updateAcademicSemester
);

export const academicSemesterRoutes = router;
