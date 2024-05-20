import { Request, Response } from "express";
import { studentService } from "./student.service";
import Joi from "joi";
import studentJoiSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    //create a schema validation using Joi

    const { student: studentData } = req.body;
    //joi object schema
    const { error, value } = studentJoiSchema.validate(studentData);
    const result = await studentService.createStudentIntoDB(studentData);

    if (error) {
      res.status(500).json({
        success: false,
        message: "something is wrong",
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: "student is created succesfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something is wrong",
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "get all students data successfuly",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: " get single data of student",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something is wrong",
      error: err,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
