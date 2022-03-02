import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import { decode } from "jsonwebtoken";
import { checkEmail } from "../functions/get";

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
          const userInfo: any = decode(context.bearer);
          Object.defineProperty(context, "isAuth", {
            value: false,
            writable: true,
          });

          if (userInfo) {
            if (await checkEmail(userInfo.email)) {
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
