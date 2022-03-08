import { checkID, getAccount } from "../functions/get";
import { Product } from "../functions/producttypes";
import { ID } from "../functions/usertypes";

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

  Product: {
    owner: async ({ owner }: Product["result"]) => {
      return getAccount(owner);
    },
  },
};
