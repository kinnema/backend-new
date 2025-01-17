import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";
import { LoginUserInputType, LoginUserOutputType } from "./auth/login.schema";
import { CreateUserInputType } from "./auth/register.schema";
import { UserSchema } from "./user.schema";

export function addAuthSchemas(app: FastifyInstance) {
  const commonSchemas = S.object()
    .id(`${process.env.SCHEMA_REF_URL}/auth`)
    .definition("UserSchema", UserSchema)
    .definition("LoginUserInputType", LoginUserInputType)
    .definition("LoginUserOutputType", LoginUserOutputType)
    .definition("CreateUserInputType", CreateUserInputType);

  app.addSchema(commonSchemas);
}
