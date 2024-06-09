import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { offeredCourseService } from "./offeredCourse.service";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is created successfully !",
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await offeredCourseService.updateOfferedCourseIntoDB(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourse updated successfully",
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.getAllOfferedCoursesFromDB(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Courses are retrieved successfully !",
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "offered course is retrieved succesfully",
    data: result,
  });
});

const deleteOfferedCourseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await offeredCourseService.deleteOfferedCourseFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OfferedCourse deleted successfully",
      data: result,
    });
  }
);

export const offeredCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  deleteOfferedCourseFromDB,
};
