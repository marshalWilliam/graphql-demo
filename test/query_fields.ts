/* eslint-disable max-len */
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

const mutationDataInvalid = {
  query: `mutation Authenticate($input: AuthenticateInput!) {
          
        }`,
  variables: {
    input: {
      emailAddress: "logan.oliver@example.com",
      password: "paris1",
    },
  },
};

/*************** CREATE PRODUCT QUERIES *********************************** */

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

const createProductDataFail = {
  query: `mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      
    }
  }`,
  variables: {
    input: {
      name: "Natural Battle Water",
      description: "Something of a description.",
    },
  },
};

export {
  mutationDataSuccess,
  mutationDataFail,
  mutationDataInvalid,
  createProductDataSuccess,
  createProductDataFail,
  headerSuccess,
  headerFail,
};
