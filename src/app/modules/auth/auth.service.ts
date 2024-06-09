import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../config/error/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  //console.log(payload);
  // checking if the user is exist
  const user = await User.findOne({ id: payload?.id });
  //console.log(user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }
  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );
  console.log(isPasswordMatched);
  //access granted: send access token , refresh token
  //ending line of this block
};

export const authService = {
  loginUser,
};
