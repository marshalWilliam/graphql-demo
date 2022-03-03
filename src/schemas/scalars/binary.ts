import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

export const binaryScalar = new GraphQLScalarType({
  name: "Binary",
  description: "Binary custom scalar type",
  serialize(value: any) {
    return String(value);
  },
  parseValue(value: any) {
    return Buffer.from(value);
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query Error: Can only parse strings as ids but got a: ${ast.kind}`
      );
    }

    return Buffer.from(ast.value);
  },
});
