import { gql } from "apollo-server-core";

export const inputs_typeDefs = gql`
  input SignUpInput {
    emailAddress: EmailAddress!
    firstname: String!
    lastname: String!
    password: String!
  }

  input AuthenticateInput {
    emailAddress: EmailAddress!
    password: String!
  }
`;
