import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrolledCourseService } from "./enrolledCourse.service";

//destructure services
const { createEnrolledCourseIntoDB } = enrolledCourseService;

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await createEnrolledCourseIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is enrolled succesfully",
    data: result,
  });
});

export const enrolledCourseController = {
  createEnrolledCourse,
};
