import { addUser, login } from "../functions";
import { LoginUser, CreateUser } from "../usertypes";

export const mutations = {
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
