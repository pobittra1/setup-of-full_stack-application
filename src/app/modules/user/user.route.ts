import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { StudentValidations } from "../student/student.zod_validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { userValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

//destructuring
const { createStudent } = userController;

router.post(
  "/create-student",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(StudentValidations.createStudentValidationSchema),
  createStudent
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin),
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);
router.get(
  "/me",
  auth(
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
    USER_ROLE.superAdmin
  ),
  userController.getMe
);

router.post(
  "/change-status/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(userValidation.changeStatusValidationSchema),
  userController.changeStatus
);
export const userRoutes = router;
