import config from "../../config";
import { IStudent } from "../student/student.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
  if (password) {
    password = config.default_pass as string;
  }
  const result = await User.create(studentData);
  return result;
};

export const userService = {
  createStudentIntoDB,
};
