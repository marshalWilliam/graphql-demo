import { startApolloServer } from "./app";
import { main } from "./db";

// DB
main().then(() => {
  //open server
  startApolloServer();
});
