/* eslint-disable max-len */

const Invalid_Data = {
  query: `mutation Authenticate($input: AuthenticateInput!) {
          
        }`,
  variables: {
    input: {
      emailAddress: "logan.oliver@example.com",
      password: "paris1",
    },
  },
};

const valid_token = {
  bearer:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmI1YzdjYTZlNDczNGM0MWJhNDM3MTk0NGE0ZGRmOTFhY2NvdW50IiwiZW1haWwiOiJrZWxseS5ibGFja0BleGFtcGxlLmNvbSIsImlhdCI6MTY0NjI3NDg2MSwiZXhwIjoxNjU2Mjc5NDYxfQ.Uyidf3xHDZsWXbTzsAf_r4mFJ1baiiL6wJOJEEXAaTc",
  user: null,
};

const invalid_token = {
  bearer:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmI1YzdjYTZlNDczNGM0MWJhNDM3MTk0NGE0ZGRmOTFhY2NvdW4iLCJlbWFpbCI6ImtlbGx5LmJsYWNrQGV4YW1wbGUuY29tIiwiaWF0IjoxNjQ2Mjc0ODYxLCJleHAiOjE2NTYyNzk0NjF9.I34BUkTwFutujol6UwM5JaIlSzDJM-zyYzJ60MIlOnQ",
  user: null,
};

const headerSuccess = { Authorization: JSON.stringify(valid_token) };
const headerFail = { Authorization: JSON.stringify(invalid_token) };

/*************** AUTHENTICATION QUERIES *********************************** */
const mutationDataSuccess = {
  query: `mutation Authenticate($input: AuthenticateInput!) {
        authenticate(input: $input) {
          token
        }
      }`,
  variables: {
    input: {
      emailAddress: "logan.oliver@example.com",
      password: "paris1",
    },
  },
};

const mutationDataFail = {
  query: `mutation Authenticate($input: AuthenticateInput!) {
        authenticate(input: $input) {
          token
        }
      }`,
  variables: {
    input: {
      emailAddress: "logan.oliver@example.com",
      password: "paris",
    },
  },
};

/*************** CREATE PRODUCT QUERIES *********************************** */

const createProductDataSuccess = {
  query: `mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
    }
  }`,
  variables: {
    input: {
      name: "Natural Battle Water",
      description: "Something of a description.",
    },
  },
};

/*************** UPDATE PRODUCT QUERIES *********************************** */

const updateProductDataSuccess = {
  query: `mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      description
    }
  }`,
  variables: {
    input: {
      id: "937f6cd8de9d400e89ff3f82cb472b47product",
      body: {
        name: "Keyboard",
        description: "The keys got aboard.",
      },
    },
  },
};

const updateProductDataFail_notFound = {
  query: `mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      description
    }
  }`,
  variables: {
    input: {
      id: "bc6f5226add74603b322085fef8cd099produc",
      body: {
        name: "Keyboard",
        description: "The keys got aboard.",
      },
    },
  },
};

const updateProductDataFail_cannotUpdate = {
  query: `mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      description
    }
  }`,
  variables: {
    input: {
      id: "c8fc2ab428d142d5a02912bb01247ae2product",
      body: {
        name: "Keyboard",
        description: "The keys got aboard.",
      },
    },
  },
};

/*************** DELETE PRODUCT QUERIES *********************************** */

const deleteProductDataSuccess = {
  query: `mutation DeleteProduct($input: DeleteProductInput!) {
    deleteProduct(input: $input)
  }`,
  variables: {
    input: {
      id: "03791ef51f7247ceb7be920419cf3caeproduct",
    },
  },
};

const deleteProductDataFail_notFound = {
  query: `mutation DeleteProduct($input: DeleteProductInput!) {
    deleteProduct(input: $input)
  }`,
  variables: {
    input: {
      id: "bc6f5226add74603b322085fef8cd099produc",
    },
  },
};

const deleteProductDataFail_cannotUpdate = {
  query: `mutation DeleteProduct($input: DeleteProductInput!) {
    deleteProduct(input: $input)
  }`,
  variables: {
    input: {
      id: "c8fc2ab428d142d5a02912bb01247ae2product",
    },
  },
};

export {
  mutationDataSuccess,
  mutationDataFail,
  Invalid_Data,
  createProductDataSuccess,
  headerSuccess,
  headerFail,
  updateProductDataSuccess,
  updateProductDataFail_notFound,
  updateProductDataFail_cannotUpdate,
  deleteProductDataSuccess,
  deleteProductDataFail_notFound,
  deleteProductDataFail_cannotUpdate,
};
