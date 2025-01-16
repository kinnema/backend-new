import { TSchema, Type } from "@sinclair/typebox";

export const Nullable = <T extends TSchema>(schema: T) =>
  Type.Union([schema, Type.Null()]);

export const UndefinedOr = <T extends TSchema>(schema: T) =>
  Type.Optional(schema);
