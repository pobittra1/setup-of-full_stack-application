import { NextFunction, Request, RequestHandler, Response } from "express";
import config from "../../config";
import Student from "../student/student.model";
import catchAsync from "../../utils/catchAsync";
import { AacademicSemesterService } from "./academicSemester.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AacademicSemesterService.createAcademicSemesterIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "academic semester  is created successfuly",
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
};
