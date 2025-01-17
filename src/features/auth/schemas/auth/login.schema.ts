import S from "fluent-json-schema";
import { UserSchema } from "../user.schema"; // Assuming UserSchema is already defined

export const LoginUserInputType = S.object()
  .prop("email", S.string().format("email").required())
  .prop("password", S.string().required());

export const LoginUserOutputType = UserSchema;

export type LoginUserInput = {
  email: string;
  password: string;
};

export type LoginUserOutput = typeof UserSchema;
