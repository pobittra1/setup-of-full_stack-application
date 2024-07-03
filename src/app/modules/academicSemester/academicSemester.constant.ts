import {
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
  TAcadenicSemesterCode,
  TMonths,
} from "./academicSemester.Interface";

export const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemesterSchemaName: TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const academicSemesterSchemaCode: TAcadenicSemesterCode[] = [
  "01",
  "02",
  "03",
];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

export const AcademicSemesterSearchableFields = ["name", "year"];
