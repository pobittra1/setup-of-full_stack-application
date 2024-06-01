import {
  Months,
  academicSemesterSchemaCode,
  academicSemesterSchemaName,
} from "./academicSemester.constant";
import { academicSemester } from "./academicSemester.model";
import { z } from "zod";

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterSchemaName] as [string, ...string[]]),
    code: z.enum([...academicSemesterSchemaCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
