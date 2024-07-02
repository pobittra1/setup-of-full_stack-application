import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { enrolledCourseService } from "./enrolledCourse.service";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
//destructure services
const { createEnrolledCourseIntoDB } = enrolledCourseService;

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await createEnrolledCourseIntoDB(userId, req.body);

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
