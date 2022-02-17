const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    author: String
    title: String
  }

  type Query {
    books: [Book]
  }
`;

//Data
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

//Resolver
const resolvers = {
  Query: {
    books: () => books,
  },
};

//Server
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
