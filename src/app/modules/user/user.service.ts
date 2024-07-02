/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.Interface";
import { IStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import AppError from "../../config/error/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../Faculty/faculty.model";
import { Admin } from "../Admin/admin.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: IStudent
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // console.log("just file=>", file);

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "student";
  userData.email = payload.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );

    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;

    //send image to cloudinary
    // const profileImg = await sendImageToCloudinary(imageName, path); //store data in profileImg for updating profileImg in database profileImg>secure_url
    await sendImageToCloudinary(imageName, path);
    // console.log("from cloudinary=>", profileImg);
    // const { secure_url } = profileImg;
    // console.log(secure_url);
    // const secureUrlData = profileImg.secure_url
    //here, on the avobe line we can't set or destructure secure_url from profileImg object that why i use normal image addrees for all imgages with single link

    // create a user //transaction-1
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to create user");
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // payload.profileImg = secure_url;
    payload.profileImg = "https://i.ibb.co/N9mMCqt/download-5.jpg";

    //create a student //transaction-2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to create student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "faculty";
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    //stop this 3 line causes my secure_url isn't work that why i set secure_url = profileImg = imgstr
    //error is = [ERROR] 14:13:12 TypeError: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined
    // const imageName = `${userData.id}${payload?.name?.firstName}`;
    // const path = file?.path;
    // await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg =
      "https://i.ibb.co/H218SfC/confident-smiling-businesswoman-writing-notes-176420-16602.jpg";

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    //stop this 3 line causes my secure_url isn't work that why i set secure_url = profileImg = imgstr
    //error is = [ERROR] 14:13:12 TypeError: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined
    // const imageName = `${userData.id}${payload?.name?.firstName}`;
    // const path = file?.path;
    // await sendImageToCloudinary(imageName, path);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg =
      "https://i.ibb.co/K6QMr2F/man-stands-front-stacks-books-library-188544-32988.jpg";

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;
  let result = null;
  if (role === "student") {
    result = await Student.findOne({ id: userId }).populate("user");
  }
  if (role === "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
  }

  if (role === "faculty") {
    result = await Faculty.findOne({ id: userId }).populate("user");
  }
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
