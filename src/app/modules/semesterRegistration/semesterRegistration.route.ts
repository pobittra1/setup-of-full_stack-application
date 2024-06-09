import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationValidation } from "./semesterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";
const router = express.Router();
router.post(
  "/create-semester-registration",
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.createSemesterRegistration
);

router.get("/", semesterRegistrationController.getAllSemesterRegistrations);

router.get(
  "/:id",
  semesterRegistrationController.getSingleSemesterRegistration
);

router.patch(
  "/:id",
  validateRequest(
    semesterRegistrationValidation.upadateSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.updateSemesterRegistration
);

router.delete(
  "/:id",
  semesterRegistrationController.deleteSemesterRegistration
);

export const semesterRegistrationRoute = router;
