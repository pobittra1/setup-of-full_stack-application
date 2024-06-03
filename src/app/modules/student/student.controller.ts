import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentService } from "./student.service";
import { IStudent } from "./student.interface";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { StudentValidations } from "./student.zod_validation";

const createStudent = catchAsync(async (req, res) => {
  //create a schema validation using zod

  const { student: studentData } = req.body;
  //const zodParseData = StudentZodSchema.safeParse(studentData);
  const zodParseData =
    StudentValidations.createStudentValidationSchema.parse(studentData);
  //console.log(zodParseData);
  //destructure zod parse data
  //const { success, data } = zodParseData;
  //console.log(data);
  // //joi object schema
  // const { error, value } = studentJoiSchema.validate(studentData);
  const result = await studentService.createStudentIntoDB(studentData);

  // if (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: "something is wrong",
  //     error: error.details,
  //   });
  // }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student is created successfuly",
    data: result,
  });
});

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentsFromDB();
  // console.log(result);
  res.status(200).json({
    success: true,
    message: "get all students data successfuly",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentService.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get single data of student",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentService.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated succesfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentService.deleteSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "data deleted successfuly",
    data: result,
  });
});

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
