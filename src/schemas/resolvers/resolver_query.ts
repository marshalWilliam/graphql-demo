import { checkID, getAccount } from "../functions/get";
import { ContextType, Product } from "../functions/producttypes";
import { ID, User } from "../functions/usertypes";

export const queries_resolver = {
  Query: {
    node: async (_: undefined, { id }: ID) => {
      return checkID(id);
    },
  },

  Node: {
    __resolveType: ({ id }: ID) => {
      if (id.includes("product", 32)) {
        return "Product";
      } else if (id.includes("account", 32)) {
        return "Account";
      } else {
        return null;
      }
    },
  },

  Account: {
    id: (user: User["result"]) => {
      return user.id;
    },
    firstname: (user: User["result"]) => {
      return user.firstname;
    },
    lastname: (user: User["result"]) => {
      return user.lastname;
    },
    emailAddress: (user: User["result"]) => {
      return user.emailAddress;
    },
    createdAt: (user: User["result"]) => {
      return user.createdAt;
    },
    updatedAt: (user: User["result"]) => {
      return user.updatedAt;
    },
  },

  Product: {
    id: (product: Product["result"]) => {
      return product.id;
    },
    name: (product: Product["result"]) => {
      return product.name;
    },
    description: (product: Product["result"]) => {
      return product.description;
    },
    owner: async (product: Product["result"]) => {
      return getAccount(product.owner);
    },
    createdAt: (product: Product["result"]) => {
      return product.createdAt;
    },
    updatedAt: (product: Product["result"]) => {
      return product.updatedAt;
    },
  },
};
