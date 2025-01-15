import { app } from "@src/index";
import { buildJsonSchemas } from "fastify-zod";
import { loginSchema, loginSchemaOutput } from "./login.schema";
import { createUserResponseSchema, registerSchema } from "./register.schema";

export const { schemas, $ref: $authSchemas } = buildJsonSchemas({
  loginSchema,
  registerSchema,
  createUserResponseSchema,
  loginSchemaOutput,
});

export function registerAuthSchemas() {
  for (let schema of [...schemas]) {
    app.addSchema(schema);
  }
}
