import { z } from "zod";

export const registerSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
  username: z.string(),
});

export const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
});

export type CreateUserInput = z.infer<typeof registerSchema>;
