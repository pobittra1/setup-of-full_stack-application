import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseService.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is created succesfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseService.getAllCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses are retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved succesfully",
    data: result,
  });
});

// const updateCourse = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   const result = await academicFacultyService.updateAcademicFacultyIntoDB(
//     facultyId,
//     req.body
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Academic faculty is updated succesfully",
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is deleted succesfully",
    data: result,
  });
});
export const courseController = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
};
