import { IStudent } from "./student.interface";
import Student from "./student.model";

const createStudentIntoDB = async (studentData: IStudent) => {
  //call static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("user already exists");
  }
  const result = await Student.create(studentData); // built in static method

  // const student = new Student(studentData); // create instance from StudentModel model
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("user already exists");
  // }
  //const result = await student.save(); // bult in instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
