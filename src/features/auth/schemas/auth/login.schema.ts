import { Static, Type } from "@sinclair/typebox";
import { UserSchema } from "../user.schema";

export const LoginUserInputType = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
});
export const LoginUserOutputType = UserSchema;

// export const loginSchemaOutput = userSchema;

export type LoginUserInput = Static<typeof LoginUserInputType>;
export type LoginUserOutput = Static<typeof LoginUserOutputType>;
