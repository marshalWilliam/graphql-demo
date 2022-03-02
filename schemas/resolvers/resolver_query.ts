import {
  getAccounts,
  getProducts,
  getAccount,
  getProduct,
} from "../functions/get";

export const queries_resolver = {
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
