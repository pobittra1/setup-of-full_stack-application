import Joi from "joi";

const guardiansJoiSchema = Joi.object({
  fatherName: Joi.string().trim().required().label("Father Name"),
  fatherOccupation: Joi.string().trim().required().label("Father Occupation"),
  fatherContactNo: Joi.string().trim().required().label("Father Contact No"),
  motherName: Joi.string().trim().required().label("Mother Name"),
  motherOccupation: Joi.string().trim().required().label("Mother Occupation"),
  motherContactNo: Joi.string().trim().required().label("Mother Contact No"),
}).label("Guardians");

// Define Joi schema for studentName
const studentNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .label("First Name"),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .label("Last Name"),
}).label("Student Name");

// Define Joi schema for localGuardian
const localGuardianJoiSchema = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  occupation: Joi.string().trim().required().label("Occupation"),
  contactNo: Joi.string().trim().required().label("Contact No"),
  address: Joi.string().trim().required().label("Address"),
}).label("Local Guardian");

// Define the main Joi schema for student
const studentJoiSchema = Joi.object({
  id: Joi.string().trim().required().label("ID"),
  password: Joi.string().trim().required(),
  name: studentNameJoiSchema.required().label("Name"),
  gender: Joi.string().trim().valid("male", "female", "others").label("Gender"),
  dateOfBirth: Joi.string().label("Date of Birth"),
  email: Joi.string().trim().email().required().label("Email"),
  contactNo: Joi.string().trim().required().label("Contact No"),
  emergencyNo: Joi.string().trim().required().label("Emergency No"),
  bloodGroup: Joi.string()
    .trim()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .label("Blood Group"),
  presentAddress: Joi.string().trim().required().label("Present Address"),
  permanentAddress: Joi.string().trim().required().label("Permanent Address"),
  guardians: guardiansJoiSchema.required().label("Guardians"),
  localGuardian: localGuardianJoiSchema.required().label("Local Guardian"),
  profileImg: Joi.string().trim().label("Profile Image"),
  isActive: Joi.string()
    .trim()
    .valid("active", "inactive")
    .default("active")
    .label("Status"),
}).label("Student");

export default studentJoiSchema;
