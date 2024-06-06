import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { adminController } from "./admin.controller";
import { updateAdminValidationSchema } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllAdmins);

router.get("/:id", adminController.getSingleAdmin);

router.patch(
  "/:id",
  validateRequest(updateAdminValidationSchema),
  adminController.updateAdmin
);

router.delete("/:adminId", adminController.deleteAdmin);

export const adminRoutes = router;
