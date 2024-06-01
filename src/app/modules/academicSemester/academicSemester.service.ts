import { TAcademicSemester } from "./academicSemester.Interface";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { academicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //for check name and code same. like Autumn = 01 , Summar = 02 .......

  //academicSemesterNameCodeMapper[Autmn] !== 01 ------------
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code");
  }
  const result = await academicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await academicSemester.find();
  return result;
};

export const AacademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
};
