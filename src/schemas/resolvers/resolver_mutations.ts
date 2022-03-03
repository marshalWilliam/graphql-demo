import { ApolloError } from "apollo-server-core";
import { delete_Product } from "../functions/delete";
import { addProduct, addUser, login } from "../functions/post";
import {
  ContextType,
  CreateProduct,
  UpdateProduct,
} from "../functions/producttypes";
import { update_Product } from "../functions/put";
import { LoginUser, CreateUser } from "../functions/usertypes";

export const mutations_resolver = {
  Mutation: {
    signUp(_: undefined, { input }: CreateUser) {
      return addUser(input);
    },
    authenticate(_: undefined, { input }: LoginUser) {
      return login(input);
    },
    createProduct(
      _: undefined,
      { input }: CreateProduct,
      context: ContextType
    ) {
      return addProduct(input, context.user);
    },
    updateProduct(
      _: undefined,
      { input }: UpdateProduct,
      context: ContextType
    ) {
      return update_Product(input, context.user);
    },
    deleteProduct(_: undefined, { input }: any, context: any) {
      return delete_Product(input.id, context.user);
    },
  },

  Authentication: {
    token: (parent: string) => {
      return parent;
    },
  },
};
