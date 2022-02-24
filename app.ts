//imports
import http = require("http");
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-koa";
import Koa = require("koa");
import json = require("koa-json");
import { typeDefs, resolvers } from "./schemas/index";

//apollo server
async function startApolloServer() {
  const httpServer = http.createServer();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  const app = new Koa();
  app.use(json());
  server.applyMiddleware({ app });
  httpServer.on("request", app.callback());
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);

  return { server, app };
}

startApolloServer();
