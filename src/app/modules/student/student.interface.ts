import { Date, Model, Schema, Types, model } from "mongoose";

export type TGurdians = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TStudentName;
  gender: "male" | "female" | "others";
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardians: TGurdians;
  localGuardian: TLocalGurdian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
}

//for creating static

export interface StudentModel extends Model<IStudent> {
  isUserExists(id: string): Promise<IStudent | null>;
}

//for creating instance
// export type TStudentMethods = {
//   isUserExists(id: string): Promise<IStudent | null>;
// };

// export type StudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   TStudentMethods
// >;
