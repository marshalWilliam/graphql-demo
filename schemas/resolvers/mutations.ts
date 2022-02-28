import { addUser } from "../functions";

type User = {
  input: {
    emailAddress: string;
    firstname: string;
    lastname: string;
    password: string;
  };
};

export const mutations = {
  Mutation: {
    signUp(_: never, { input }: User) {
      return addUser(input);
    },
  },
  Authentication: {
    token: (parent: string) => {
      return parent;
    },
  },
};
