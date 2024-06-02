import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.Interface";
import { academicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester
  );

  //set  generated id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
