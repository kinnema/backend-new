import S from "fluent-json-schema";

export const UserSchema = S.object()
  .id("#UserSchema")
  .prop("id", S.string().format("uuid").required())
  .prop("username", S.string().required())
  .prop("email", S.string().format("email").required());

interface _UserSchema {
  id: string;
  username: string;
  email: string;
}

export type TUserSchema = _UserSchema;
