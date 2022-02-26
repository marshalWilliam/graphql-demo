//imports
import http = require("http");
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-koa";
import Koa = require("koa");
import { typeDefs, resolvers } from "../schemas/index";

const port = process.env.PORT || 5000;

//apollo server
export async function startApolloServer() {
  const httpServer = http.createServer();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  const app = new Koa();
  server.applyMiddleware({ app });
  httpServer.on("request", app.callback());
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}
