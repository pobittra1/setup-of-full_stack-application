import mongoose from "mongoose";
import { IStudent } from "./student.interface";
import Student from "./student.model";
import AppError from "../../config/error/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

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

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //---------raw queryBuilder-------------
  /*
  const queryObj = { ...query }; //copy from query for another query data
  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  //{ email: { $regex : query.searchTerm , $options: i}}
  //{ presentAddress: { $regex : query.searchTerm , $options: i}}
  //{ 'name.firstName': { $regex : query.searchTerm , $options: i}}
  const studentSearchableFields = ["email", "name.firstName", "presentAddress"];
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  //filtering
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log({ query }, { queryObj });
  //console.log({ query, queryObj });

  //chaining here
  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  let sort = "createdAt";
  //sorting
  if (query.sort) {
    sort = query.sort as string;
  }
  //chaining here
  const sortQuery = filterQuery.sort(sort);

  //by default limit is 1
  let page = 1;
  let limit = 1;
  let skip = 0;
  //limiting
  if (query.limit) {
    limit = Number(query.limit);
  }
  //pagination
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  //field filtering
  let fields = "-__v"; //that means - is separate by __v
  if (query.fields) {
    //fields: "name,email"; converted should be fields: "name email"; //space between name and email
    fields = (query.fields as string).split(",").join(" ");
    console.log({ fields });
  }
  const fieldFilteringQuery = await limitQuery.select(fields);
  return fieldFilteringQuery;
  */

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardians, localGuardian, ...remainingStudentData } = payload; //here remainingStudentData is primitive and others are non primitive. we do separate causes we work with only non primitive data types.
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardians && Object.keys(guardians).length) {
    for (const [key, value] of Object.entries(guardians)) {
      modifiedUpdatedData[`guardians.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
  }
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateStudentIntoDB,
};
