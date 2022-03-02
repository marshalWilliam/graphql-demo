/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { UserInputError } from "apollo-server-koa";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

const EMAIL_ADDRESS_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validate = (value: any) => {
  if (typeof value !== "string") {
    throw new UserInputError(`Value is not string: ${value}`);
  }

  if (!EMAIL_ADDRESS_REGEX.test(value)) {
    throw new UserInputError(`Value is not a valid email address: ${value}`);
  }

  return value.toLowerCase().trim();
};

export const emailAddScalar = new GraphQLScalarType({
  name: "EmailAddress",
  description: "EmailAddress custom scalar type",
  serialize: validate,
  parseValue: validate,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query Error: Can only parse strings as email addresses but got a: ${ast.kind}`
      );
    }

    return validate(ast.value);
  },
});
