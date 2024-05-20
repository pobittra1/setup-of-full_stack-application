import { Request, Response } from "express";
import { studentService } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await studentService.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: "student is created succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentController = {
  createStudent,
};
