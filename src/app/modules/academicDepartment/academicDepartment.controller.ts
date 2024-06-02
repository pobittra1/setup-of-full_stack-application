import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartmemt = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.createAcademicDepartmentIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department is created succesfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentService.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic departments are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentService.getSingleAcademicDepartmentFromDB(
      departmentId
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department is retrieved succesfully",
    data: result,
  });
});

const updateAcademicDeartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(
    departmentId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department is updated succesfully",
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartmemt,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDeartment,
};
