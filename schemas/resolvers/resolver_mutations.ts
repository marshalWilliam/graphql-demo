import { ApolloError } from "apollo-server-core";
import { addProduct, addUser, login } from "../functions/post";
import { LoginUser, CreateUser } from "../functions/usertypes";

export const mutations_resolver = {
  Mutation: {
    signUp(_: undefined, { input }: CreateUser) {
      return addUser(input);
    },
    authenticate(_: undefined, { input }: LoginUser) {
      return login(input);
    },
    createProduct(_: undefined, { input }: any, context: any) {
      if (context.isAuth) {
        return addProduct(input);
      } else {
        throw new ApolloError("Invalid Token", "INVALID_TOKEN");
      }
    },
  },
  Authentication: {
    token: (parent: string) => {
      return parent;
    },
  },
};
