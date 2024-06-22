import { z } from "zod";
import { UserStatus } from "./user.constant";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .max(20, {
      message: "password should be 20 character or lower than 20 character",
    })
    .optional(),

  isDeleted: z.boolean().optional().default(false),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export const userValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
