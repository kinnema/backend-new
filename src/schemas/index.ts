import { FastifyInstance } from "fastify";
import { buildJsonSchemas } from "fastify-zod";
import { loginSchema, loginSchemaOutput } from "./auth/login.schema";
import {
  createUserResponseSchema,
  registerSchema,
} from "./auth/register.schema";
import {
  lastWatchedCreateSchemaInput,
  lastWatchedCreateSchemaOutput,
  lastWatchedPatchSchemaInput,
  lastWatchedPatchSchemaOutput,
  lastWatchedSchemaOutput,
} from "./last_watched.schema";

export const { schemas, $ref: $appSchemas } = buildJsonSchemas({
  lastWatchedSchemaOutput,
  loginSchema,
  registerSchema,
  createUserResponseSchema,
  loginSchemaOutput,
  lastWatchedCreateSchemaOutput,
  lastWatchedCreateSchemaInput,
  lastWatchedPatchSchemaInput,
  lastWatchedPatchSchemaOutput,
});

export function registerSchemas(app: FastifyInstance) {
  for (let schema of [...schemas]) {
    app.addSchema(schema);
  }
}
