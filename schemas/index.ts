import { gql } from "apollo-server-koa";
import {
  getAccounts,
  getProducts,
  getAccount,
  getProduct,
} from "../src/functions";
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

  Query: {
    accounts: async () => {
      return getAccounts();
    },
    products: async () => {
      return getProducts();
    },
    account: async (_: never, args: any) => {
      return getAccount(args.id);
    },
    product: async (_: never, args: any) => {
      return getProduct(args.id);
    },
  },

  Product: {
    owner: async (parent: any) => {
      return getAccount(parent.owner);
    },
  },
};
