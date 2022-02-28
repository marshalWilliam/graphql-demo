import { UserInputError } from "apollo-server-core";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

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

    if (ast.value !== new Date(Date.parse(ast.value)).toISOString()) {
      throw new UserInputError(
        `BAD_USER_INPUT: Date: ${ast.value} is not a valid ISO date string`
      );
    }

    return new Date(ast.value);
  },
});
