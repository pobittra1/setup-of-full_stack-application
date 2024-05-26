import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

//destructuring
const { createStudent } = userController;

router.post("/create-student", createStudent);
export const userRoutes = router;
