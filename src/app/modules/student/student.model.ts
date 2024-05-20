import { Schema, model } from "mongoose";
import {
  IStudent,
  TGurdians,
  TLocalGurdian,
  TStudentName,
} from "./student.interface";

// Define sub-schemas for nested objects
const guardiansSchema = new Schema<TGurdians>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const studentNameSchema = new Schema<TStudentName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// Define the main student schema
const studentSchema = new Schema<IStudent>({
  id: { type: String },
  name: { type: studentNameSchema },
  gender: { type: String, enum: ["male", "female"] },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  parmanentAddress: { type: String, required: true },
  guardians: { type: guardiansSchema },
  localGuardian: { type: localGuardianSchema },
  profileImg: { type: String },
  isActive: { type: String, enum: ["active", "inactive"] },
});

// Create the model from the schema
const Student = model<IStudent>("Student", studentSchema);

export default Student;
