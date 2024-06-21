import { Schema, model } from "mongoose";
import {
  IStudent,
  StudentModel,
  TGurdians,
  TLocalGurdian,
  TStudentName,
} from "./student.interface";
import validator from "validator";

// Define sub-schemas for nested objects
const guardiansSchema = new Schema<TGurdians>({
  fatherName: {
    type: String,
    required: [true, "fatherName is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "fatherOccupasion is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "fatherContactNo is required"],
    trim: true,
  },
  motherName: { type: String, required: [true, "motherName is required"] },
  motherOccupation: {
    type: String,
    required: [true, "motherOccupasion is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "motherContactNo is required"],
    trim: true,
  },
});

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    maxlength: [20, "firstName can'nt be more than 20 character"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not format of capital leter",
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid name",
    },
  },
});

const localGuardianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: [true, "name is required"], trim: true },
  occupation: {
    type: String,
    required: [true, "occupasion is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "contactNo is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "address is required"],
    trim: true,
  },
});

// Define the main student schema
const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, "id is required"],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: studentNameSchema,
      required: [true, "name is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message:
          "the gender field can only be one of the folllowing 'male', 'female', 'others'",
      },
      trim: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not valid email",
      },
    },
    contactNo: {
      type: String,
      required: [true, "contactNo is required"],
      trim: true,
    },
    emergencyNo: {
      type: String,
      required: [true, "emergency is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not any blood group",
      },
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, "presentAddress is required"],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, "permanentAddress is required"],
      trim: true,
    },
    guardians: {
      type: guardiansSchema,
      required: [true, "guardians is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "localGuardian is required"],
    },
    profileImg: { type: String, trim: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//create virtual
studentSchema.virtual("fullName").get(function () {
  //const { firstName, middleName, lastName } = this.name; how to declare type in object
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

//query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
//creating a custom instance method
// studentSchema.method("isUserExists", async function isUserExists(id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// });

// Create the model from the schema

//error handling for not existing id
/*studentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const data = await Student.findOne(query);
  if (!data) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "not found this student or not exists"
    );
  }
  next();
});*/
const Student = model<IStudent, StudentModel>("Student", studentSchema);

export default Student;
