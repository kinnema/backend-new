import { Static, Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  username: Type.String(),
  email: Type.String({
    format: "email",
  }),
});

export type TUserSchema = Static<typeof UserSchema>;
