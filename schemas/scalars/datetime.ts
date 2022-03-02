import { UserInputError } from "apollo-server-core";
import dayjs from "dayjs";
import formatParser from "dayjs/plugin/customParseFormat";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

dayjs.extend(formatParser);

export const dateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "Date custom scalar type",
  serialize(value: any) {
    return new Date(value).toISOString();
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query Error: Can only parse strings as datetime but got a: ${ast.kind}`
      );
    }

    if (!dayjs(ast.value, "YYYY-MM-DDTHH:mm:ss.sssZ", true).isValid()) {
      throw new UserInputError(
        "Date " + ast.value + " is not a valid ISO date string"
      );
    }

    return new Date(ast.value);
  },
});
