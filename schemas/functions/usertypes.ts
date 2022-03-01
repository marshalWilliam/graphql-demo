export type LoginUser = {
  input: {
    emailAddress: string;
    password: string;
  };
};

export type CreateUser = {
  input: {
    emailAddress: string;
    firstname: string;
    lastname: string;
    password: string;
  };
};
