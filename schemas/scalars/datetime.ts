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

    return new Date(ast.value);
  },
});
