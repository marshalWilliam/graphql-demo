export type CreateProduct = {
  input: {
    name: string;
    description: string;
  };
};

export type ContextType = {
  bearer: string;
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
