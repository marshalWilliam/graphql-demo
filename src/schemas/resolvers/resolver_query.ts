import { UserInputError } from "apollo-server-core";
import { getAccount, getProduct } from "../functions/get";
import { Product } from "../functions/producttypes";
import { ID, User } from "../functions/usertypes";

export const queries_resolver = {
  Query: {
    node: async (_: undefined, { id }: ID) => {
      let result: any;
      if (id.includes("product", 32)) {
        result = await getProduct(id);
        if (result) {
          return {
            __typename: "Product",
            result,
          };
        } else {
          throw new UserInputError("ID not found");
        }
      } else if (id.includes("account", 32)) {
        result = await getAccount(id);
        if (result) {
          return {
            __typename: "Account",
            result,
          };
        } else {
          throw new UserInputError("ID not found");
        }
      } else {
        throw new UserInputError("ID not found");
      }
    },
  },

  Account: {
    id: ({ result }: User) => {
      return result.id;
    },
    firstname: ({ result }: User) => {
      return result.firstname;
    },
    lastname: ({ result }: User) => {
      return result.lastname;
    },
    emailAddress: ({ result }: User) => {
      return result.emailAddress;
    },
    createdAt: ({ result }: User) => {
      return result.createdAt;
    },
    updatedAt: ({ result }: User) => {
      return result.updatedAt;
    },
  },

  Product: {
    id: ({ result }: Product) => {
      return result.id;
    },
    name: ({ result }: Product) => {
      return result.name;
    },
    description: ({ result }: Product) => {
      return result.description;
    },
    owner: async ({ result }: Product) => {
      return { result: await getAccount(result.owner) };
    },
    createdAt: ({ result }: Product) => {
      return result.createdAt;
    },
    updatedAt: ({ result }: Product) => {
      return result.updatedAt;
    },
  },
};
