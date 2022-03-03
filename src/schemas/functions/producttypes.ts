export type CreateProduct = {
  input: {
    name: string;
    description: string;
    id: string;
  };
};

export type ContextType = {
  bearer: string;
  isAuth: boolean;
  user: any;
};

export type UpdateProduct = {
  input: {
    id: Buffer;
    body: {
      name: string;
      description: string;
    };
  };
};
