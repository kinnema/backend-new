import S from "fluent-json-schema";

export const CreateUserInputType = S.object()
  .id("#CreateUserInputType")
  .title("CreateUserInputType")
  .prop("email", S.string().format("email").required())
  .prop("password", S.string().minLength(5).required())
  .prop("username", S.string().minLength(5).required());

// Define the TypeScript type manually since `fluent-json-schema` does not generate types
export type CreateUserInput = {
  email: string;
  password: string;
  username: string;
};
