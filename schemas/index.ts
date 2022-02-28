import { gql } from "apollo-server-koa";
import { mutations } from "./resolvers/mutations";
import { queries } from "./resolvers/query";
import { binaryScalar } from "./scalars/binary";
import { dateTimeScalar } from "./scalars/datetime";
import { emailAddScalar } from "./scalars/emailadd";

export const typeDefs = gql`
  scalar Binary
  scalar EmailAddress
  scalar DateTime

  interface Node {
    id: Binary!
  }

  type Account implements Node {
    id: Binary!
    firstname: String!
    lastname: String!
    emailAddress: EmailAddress!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Product implements Node {
    id: Binary!
    name: String!
    description: String!
    owner: Account!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Authentication {
    token: String!
  }

  type Mutation {
    signUp(input: SignUpInput!): Authentication!
    authenticate(input: AuthenticateInput!): Authentication!
  }

  input SignUpInput {
    emailAddress: EmailAddress!
    firstname: String!
    lastname: String!
    password: String!
  }

  input AuthenticateInput {
    emailAddress: EmailAddress!
    password: String!
  }

  type Query {
    accounts: [Account]
    products: [Product]
    account(id: Binary!): Account
    product(id: Binary!): Product
  }
`;

//Resolver
export const resolvers = {
  Binary: binaryScalar,
  EmailAddress: emailAddScalar,
  DateTime: dateTimeScalar,

  ...queries,

  ...mutations,
};
