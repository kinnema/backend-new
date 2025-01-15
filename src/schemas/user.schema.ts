import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
