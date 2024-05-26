import mongoose from "mongoose";
import { z } from "zod";

// Define sub-schemas for nested objects
const GuardiansZodSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const StudentNameZodSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const LocalGuardianZodSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Define the main student schema
const StudentZodSchema = z.object({
  id: z.string().min(1),
  user: z.custom<mongoose.Types.ObjectId>(mongoose.Types.ObjectId.isValid),
  password: z.string(),
  name: StudentNameZodSchema,
  gender: z.enum(["male", "female", "others"]),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string().min(1),
  emergencyNo: z.string().min(1),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardians: GuardiansZodSchema,
  localGuardian: LocalGuardianZodSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "inactive"]).default("active"),
  isDeleted: z.boolean(),
});

export default StudentZodSchema;
