import { NextFunction, Request, RequestHandler, Response } from "express";
import config from "../../config";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  //create a newUser object
  const userData: Partial<TUser> = {};
  //more simplify for this avobe condition, if password is exist or no exists condition
  userData.password = password || (config.default_pass as string);
  //set a role
  userData.role = "student";
  //set manually generated id
  userData.id = "203010001";
  //create a user
  const newUser = await User.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    //set id , _id as user
    studentData.id = newUser.id; //embedding id
    studentData.user = newUser._id; //reference id
    const newStudent = await Student.create(studentData);
  }
  res.status(200).json({
    success: true,
    message: "student is created succesfully",
    data: newUser,
  });
});

export const userController = {
  createStudent,
};
