import { addUser, login } from "../functions/post";
import { LoginUser, CreateUser } from "../functions/usertypes";

export const mutations_resolver = {
  Mutation: {
    signUp(_: undefined, { input }: CreateUser) {
      return addUser(input);
    },
    authenticate(_: undefined, { input }: LoginUser) {
      return login(input);
    },
  },
  Authentication: {
    token: (parent: string) => {
      return parent;
    },
  },
};
