import { z } from "zod";
import { userSchema } from "../user.schema";
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const loginSchemaOutput = userSchema;

export type LoginUserInput = z.infer<typeof loginSchema>;
export type LoginUserOutput = z.infer<typeof loginSchemaOutput>;
