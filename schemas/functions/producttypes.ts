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
};
