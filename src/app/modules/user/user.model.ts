import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import { UserStatus } from "./user.constant";

//create schema for user
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["student", "admin", "faculty"],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, //it automatically given that createdAt and updatedAt propery with value
  }
);

//document middlware
//pre save middleware/hook: will work on create(), save()
userSchema.pre("save", async function (next) {
  //hashing password and save into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post save middleware/hook: will work on create(), save()
//set empty str of password after creating data
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

//use statics methods
//explore like mezba vaiya
// userSchema.static.isUserExistsByCustomId = async function (id: string) {
//   return await User.findOne({ id });
// };
//explore like doc
userSchema.static(
  "isUserExistsByCustomId",
  async function isUserExistsByCustomId(id: string) {
    return await User.findOne({ id }).select("+password");
  }
);
userSchema.static(
  "isPasswordMatched",
  async function isPasswordMatched(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
);
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

//create model for user
export const User = model<TUser, UserModel>("User", userSchema);
