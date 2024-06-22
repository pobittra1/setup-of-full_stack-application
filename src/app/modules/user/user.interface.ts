import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

// export type TUser = {
//   id: string;
//   password: string;
//   needsPasswordChange: boolean;
//   role: "student" | "admin" | "faculty";
//   status: "in-progress" | "blocked";
//   isDeleted: boolean;
// };

// export type TNewUser = {
//   password: string;
//   role: string;
//   id: string;
// };

// use statics method
export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: "student" | "admin" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
