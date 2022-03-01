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

export { mutationDataSuccess, mutationDataFail, mutationDataInvalid };
