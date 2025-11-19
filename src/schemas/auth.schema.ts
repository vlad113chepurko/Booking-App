import * as z from "zod";

const ERRORS = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Invalid email address",
  PASSWORD_LENGTH: "Password must be between 6 and 20 characters",
  NAME_LENGTH: "Name must be between 2 and 20 characters",
};


export const registerUserSchema = z.object({
  name: z.string().min(2, ERRORS.NAME_LENGTH).max(20, ERRORS.NAME_LENGTH),
  email: z.string().email(ERRORS.INVALID_EMAIL),
  password: z
    .string()
    .min(6, ERRORS.PASSWORD_LENGTH)
    .max(20, ERRORS.PASSWORD_LENGTH),
});

export const loginUserSchema = z.object({
  email: z.string().email(ERRORS.INVALID_EMAIL),
  password: z
    .string()
    .min(6, ERRORS.PASSWORD_LENGTH)
    .max(20, ERRORS.PASSWORD_LENGTH),
});
