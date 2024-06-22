import catchAsync from "../../utils/catchAsync";
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
const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;
  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, "Token not found !");
  // }
  const { userId, role } = req.user;
  const result = await userService.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved succesfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status is updated succesfully",
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
