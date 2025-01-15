import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const loginSchemaOutput = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
});

export type LoginUserInput = z.infer<typeof loginSchema>;
export type LoginUserOutput = z.infer<typeof loginSchemaOutput>;
