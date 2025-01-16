import { Static, Type } from "@sinclair/typebox";

export const CreateUserInputType = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 5 }),
  username: Type.String({ minLength: 5 }),
});

export type CreateUserInput = Static<typeof CreateUserInputType>;
