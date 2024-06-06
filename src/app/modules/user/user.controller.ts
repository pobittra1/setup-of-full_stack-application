import { NextFunction, Request, RequestHandler, Response } from "express";
import config from "../../config";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import catchAsync from "../../utils/catchAsync";
import { TAcademicSemester } from "../academicSemester/academicSemester.Interface";
import { academicSemester } from "../academicSemester/academicSemester.model";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created succesfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
