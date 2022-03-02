import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "../index";
import { privateDirectiveTransformer } from "./private";

let schema = makeExecutableSchema({ typeDefs, resolvers });

schema = privateDirectiveTransformer(schema, "private");

export default schema;
