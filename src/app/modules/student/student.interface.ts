import { Schema, model } from "mongoose";

export type TGurdians = {
  fatherName: string;
  fatherOccupasion: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupasion: string;
  motherContactNo: string;
};

export type TStudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface IStudent {
  name: TStudentName;
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyNo: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  parmanentAddress: string;
  guradians: TGurdians;
  localGurdian: TLocalGurdian;
  profileImg?: string;
  isActive: "active" | "inactive";
}
