import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

//create schema for user
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "admin", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
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

//create model for user
export const User = model<TUser>("User", userSchema);
