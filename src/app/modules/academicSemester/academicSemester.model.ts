import { Schema, model } from "mongoose";
import {
  Months,
  academicSemesterSchemaCode,
  academicSemesterSchemaName,
} from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.Interface";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: academicSemesterSchemaName,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterSchemaCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

//pre hook middleware for dont create same semester in same year
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExits = await academicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExits) {
    throw new Error("In this year semester is already exists");
  }
  next();
});

export const academicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
