import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import { verify } from "jsonwebtoken";
import { checkID } from "../functions/get";

export function privateDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const privateDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (privateDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const userInfo: any = verify(context.bearer, "RANDOM_STRING");

          if (userInfo) {
            context.user = await checkID(userInfo.user_id);
            if (context.user) {
              context.isAuth = true;
            }
          }

          const result = await resolve(source, args, context, info);

          return result;
        };

        return fieldConfig;
      }
    },
  });
}
