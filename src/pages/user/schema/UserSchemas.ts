import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(3, { message: "First name is required" }),
  lastName: z.string().min(3, { message: "Last name is required" }),
  email: z.string().min(10, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must contains at least 6 characters" }),
});
