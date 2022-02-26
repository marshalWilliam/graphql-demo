import { gql } from "apollo-server-koa";
import { accounts, products } from "./sample-data";

export const typeDefs = gql`
  interface Node {
    id: String!
  }

  type Account implements Node {
    id: String!
    firstname: String!
    lastname: String!
    emailAddress: String!
    createdAt: String!
    updatedAt: String!
  }

  type Product implements Node {
    id: String!
    name: String!
    description: String!
    owner: Account!
    createdAt: String!
    updatedAt: String!
  }

  type Authentication {
    token: String!
  }

  type Query {
    accounts: [Account]
    products: [Product]
    account(id: String!): Account
    product(id: String!): Product
  }
`;

//Resolver
export const resolvers = {
  Query: {
    accounts: () => accounts,
    products: () => products,
    account: (_: never, args: any) => {
      return accounts.find((account) => account.id === args.id);
    },
    product: (_: never, args: any) => {
      return products.find((product) => product.id === args.id);
    },
  },
};
